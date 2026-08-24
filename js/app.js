(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const isObject = value => value !== null && typeof value === "object" && !Array.isArray(value);
  const asArray = value => Array.isArray(value) ? value : [];
  const asText = value => typeof value === "string" ? value.trim() : (Number.isFinite(value) ? String(value) : "");
  const asNumber = value => {
    if (typeof value === "number") return Number.isFinite(value) ? value : null;
    if (typeof value !== "string" || !value.trim() || !/^-?(?:\d+\.?\d*|\.\d+)$/.test(value.trim())) return null;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  };
  const isSlug = value => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(asText(value));
  const warnings = [];
  const recordPaths = new WeakMap();
  const SECTION_IDS = new Set([
    "inicio", "indicadores", "perfil", "cayma", "propuestas", "roadmap",
    "proyectos", "triptico", "agenda", "galeria", "redes"
  ]);

  function warn(path, message) {
    const warning = `${path}: ${message}`;
    warnings.push(warning);
    console.warn(`[siteData] ${warning}`);
  }

  function cloneDataValue(value) {
    if (Array.isArray(value)) return value.map(cloneDataValue);
    if (isObject(value)) {
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cloneDataValue(item)]));
    }
    return value;
  }

  function mergeDeep(base, incoming, path = "", ancestors = new WeakSet()) {
    const trackIncoming = isObject(incoming) || Array.isArray(incoming);
    if (trackIncoming && ancestors.has(incoming)) {
      warn(path || "siteData", "referencia circular; se usará una estructura segura");
      return cloneDataValue(base);
    }
    if (trackIncoming) ancestors.add(incoming);
    try {
      if (isObject(base) && !isObject(incoming)) {
        if (incoming !== undefined) warn(path || "siteData", "se esperaba un objeto; se usará una estructura vacía segura");
        return cloneDataValue(base);
      }
      if (Array.isArray(base)) {
        if (Array.isArray(incoming)) {
          return incoming.map((item, index) => mergeDeep(undefined, item, `${path}[${index}]`, ancestors));
        }
        if (incoming !== undefined) warn(path || "siteData", "se esperaba una colección; se usará una colección vacía segura");
        return cloneDataValue(base);
      }
      if (Array.isArray(incoming)) {
        return incoming.map((item, index) => mergeDeep(undefined, item, `${path}[${index}]`, ancestors));
      }
      if (!isObject(incoming)) return incoming === undefined ? base : incoming;
      const result = isObject(base) ? cloneDataValue(base) : {};
      Object.entries(incoming).forEach(([key, value]) => {
        result[key] = mergeDeep(result[key], value, path ? `${path}.${key}` : key, ancestors);
      });
      return result;
    } finally {
      if (trackIncoming) ancestors.delete(incoming);
    }
  }

  const EMPTY_DATA = {
    schemaVersion: 1,
    site: {
      language: "es",
      locale: "es-PE",
      timeZone: "America/Lima",
      mode: "production",
      themeColor: "#0b3b60",
      seo: { titleTemplate: "", descriptionTemplate: "", canonicalUrl: "" },
      identity: {
        name: "", shortName: "", fullName: "", initials: "", district: "", region: "", period: "",
        brandSubtitleTemplate: "", portrait: null, heroBackground: null
      },
      ribbon: { enabled: false, icon: "", text: "" },
      share: { enabled: false, titleTemplate: "", textTemplate: "" }
    },
    ui: {
      navigation: { ariaLabel: "", homeAriaLabel: "", openMenuAriaLabel: "", items: [] },
      theme: { storageKey: "site-theme", toggleAriaLabel: "", lightAriaLabel: "", darkAriaLabel: "" },
      demo: { cardSuffix: "", mockSuffix: "", modalLabel: "", roadmapLabel: "", gallerySuffix: "", mapSuffix: "", imageAltSuffix: "" },
      proposal: { allFilterLabel: "", openLabel: "", problemTitle: "", solutionTitle: "", scheduleTitle: "", actionsTitle: "", indicatorTitle: "", indicatorNote: "", modalCloseAriaLabel: "" },
      map: { typeLabel: "", markerAriaLabel: "", unavailableMessage: "" },
      trifold: { previousLabel: "", nextLabel: "", openLabel: "", closeLabel: "", printLabel: "" },
      events: { filters: [], initialFilter: "", upcomingStatus: "", pastStatus: "", emptyMessage: "" },
      gallery: { allFilterLabel: "", openAriaLabelTemplate: "", modalCloseAriaLabel: "" },
      socials: { unavailableMessage: "", demoAriaSuffix: "" },
      share: { openActionsAriaLabel: "", shareLabel: "", copiedMessage: "", errorMessage: "" },
      empty: { generic: "" },
      quickActions: []
    },
    sections: {
      hero: { enabled: false, eyebrow: "", description: "", actions: [], highlights: [], card: {}, scroll: {} },
      stats: { enabled: false, kicker: "", items: [] },
      profile: { enabled: false, heading: {}, description: "", cards: [], timelineHeading: {}, timeline: [] },
      district: { enabled: false, heading: {}, chart: { scale: { min: 0, max: 100 } }, detail: {}, metrics: [] },
      axes: { enabled: false, itemLabel: "", items: [] },
      proposals: { enabled: false, heading: {}, filterAriaLabel: "", categories: [], items: [] },
      roadmap: { enabled: false, heading: {}, defaultStageId: "", stages: [] },
      projects: { enabled: false, heading: {}, map: { enabled: false, center: {}, zoom: 14, tileLayer: { url: "", attribution: "", maxZoom: 19 }, locations: [] }, featured: { enabled: false, items: [] } },
      trifold: { enabled: false, heading: {}, ariaLabel: "", mobileHint: "", panels: [] },
      agenda: { enabled: false, heading: {}, events: [] },
      gallery: { enabled: false, heading: {}, categories: [], items: [] },
      socials: { enabled: false, heading: {}, items: [] }
    },
    footer: { enabled: false, description: "", navigationTitle: "", navigation: [], legalTitle: "", legalText: "", copyrightTemplate: "", technologyText: "" }
  };

  function baseUrl() {
    return typeof window !== "undefined" && window.location ? window.location.href : "https://local.invalid/";
  }

  function isSafeUrl(value, options = {}) {
    const href = asText(value);
    if (!href || href.includes("\\") || /[\u0000-\u001f\u007f<>"'`]/.test(href)) return false;
    if (href.startsWith("#")) return Boolean(options.allowHash && /^#[A-Za-z][\w:-]*$/.test(href));
    if (href.startsWith("//")) return false;
    const scheme = href.match(/^([a-z][a-z0-9+.-]*):/i)?.[1]?.toLowerCase();
    if (!scheme) return options.allowRelative !== false && !href.includes("\\");
    if (scheme === "https" && !/^https:\/\//i.test(href)) return false;
    if (scheme === "mailto" || scheme === "tel") {
      if (!options.allowContact) return false;
      const recipient = href.slice(href.indexOf(":") + 1).split(/[?;]/, 1)[0].trim();
      if (scheme === "mailto") return /^[^\s@,]+@[^\s@,]+\.[^\s@,]+(?:,[^\s@,]+@[^\s@,]+\.[^\s@,]+)*$/.test(recipient);
      return /^\+?[0-9(). -]{3,}$/.test(recipient) && (recipient.match(/\d/g) || []).length >= 3;
    }
    if (scheme !== "https") return false;
    try {
      const url = new URL(href, baseUrl());
      return url.protocol === "https:" && Boolean(url.hostname);
    } catch (_error) {
      return false;
    }
  }

  function isValidIsoDateTime(value) {
    const date = asText(value);
    const match = date.match(/^(\d{4})-(\d{2})-(\d{2})T(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,3})?)?(?:Z|[+-](?:0\d|1[0-4]):[0-5]\d)$/);
    if (!match || !Number.isFinite(Date.parse(date))) return false;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const calendarDate = new Date(Date.UTC(year, month - 1, day));
    return calendarDate.getUTCFullYear() === year
      && calendarDate.getUTCMonth() === month - 1
      && calendarDate.getUTCDate() === day;
  }

  function normalizeMetricMetadata(item, path) {
    item.unit = asText(item.unit);
    item.source = asText(item.source);
    const asOf = asText(item.asOf);
    if (asOf && !isValidIsoDateTime(asOf)) {
      warn(`${path}.asOf`, "fecha ISO 8601 inválida; se omitió la fecha de referencia");
      item.asOf = "";
    } else {
      item.asOf = asOf;
    }
  }

  function normalizeImage(value, path, allowEmptyAlt = false, required = false) {
    if (!isObject(value)) {
      if (required || (value !== undefined && value !== null && value !== "")) {
        warn(path, "se esperaba una imagen { src, alt }; se omitió el recurso");
      }
      return null;
    }
    const src = asText(value.src);
    const alt = asText(value.alt);
    if (!src) {
      warn(`${path}.src`, "ruta obligatoria; se omitió la imagen");
      return null;
    }
    if (!isSafeUrl(src)) {
      warn(`${path}.src`, "URL de imagen no válida; se omitió la imagen");
      return null;
    }
    if (!allowEmptyAlt && !alt) {
      warn(`${path}.alt`, "texto alternativo obligatorio; se omitió la imagen");
      return null;
    }
    let demoOnly = value.demoOnly === true;
    if (value.demoOnly !== undefined && typeof value.demoOnly !== "boolean") {
      warn(`${path}.demoOnly`, "se esperaba true o false; se tratará como recurso exclusivo de demo");
      demoOnly = true;
    }
    return { ...value, src, alt, demoOnly };
  }

  function normalizeRecords(value, path, validate, idSelector = item => item.id, idField = "id") {
    if (!Array.isArray(value)) {
      if (value !== undefined && value !== null) warn(path, "se esperaba una colección");
      return [];
    }
    const seen = new Set();
    return value.filter((item, index) => {
      const itemPath = `${path}[${index}]`;
      if (!isObject(item)) {
        warn(itemPath, "registro no válido; se omitió");
        return false;
      }
      const rawId = idSelector(item);
      const id = asText(rawId);
      if (typeof rawId !== "string" || rawId !== id || !isSlug(id)) {
        warn(`${itemPath}.${idField}`, "debe ser un slug estable; se omitió el registro");
        return false;
      }
      if (seen.has(id)) {
        warn(`${itemPath}.${idField}`, `ID duplicado “${id}”; se omitió el registro`);
        return false;
      }
      const warningCount = warnings.length;
      if (!validate(item, itemPath)) {
        if (warnings.length === warningCount) warn(itemPath, "registro incompleto; se omitió");
        return false;
      }
      seen.add(id);
      recordPaths.set(item, itemPath);
      return true;
    });
  }

  function recordPath(item, fallback) {
    return recordPaths.get(item) || fallback;
  }

  function requireTextFields(item, fields, path) {
    let valid = true;
    fields.forEach(field => {
      if (asText(item[field])) return;
      warn(`${path}.${field}`, "texto obligatorio ausente; se omitió el registro");
      valid = false;
    });
    return valid;
  }

  function normalizeBoolean(value, path, fallback) {
    if (value === undefined) return fallback;
    if (typeof value === "boolean") return value;
    warn(path, "se esperaba true o false; se usará el valor seguro por defecto");
    return fallback;
  }

  function normalizeConfiguredText(value, path) {
    if (value === undefined || value === null || typeof value === "string" || Number.isFinite(value)) {
      return { text: asText(value), demoOnly: false };
    }
    if (!isObject(value)) {
      warn(path, "se esperaba texto o un objeto { text, demoOnly }; se omitirá el rótulo");
      return { text: "", demoOnly: false };
    }
    let demoOnly = value.demoOnly === true;
    if (value.demoOnly !== undefined && typeof value.demoOnly !== "boolean") {
      warn(`${path}.demoOnly`, "se esperaba true o false; se tratará como rótulo exclusivo de demo");
      demoOnly = true;
    }
    return { ...value, text: asText(value.text), demoOnly };
  }

  function isKnownSectionHref(href) {
    return !href.startsWith("#") || SECTION_IDS.has(href.slice(1));
  }

  function normalizeOptionalLink(value, path) {
    if (value === undefined || value === null) return null;
    if (!isObject(value)) {
      warn(path, "se esperaba un enlace { label, href }; se omitió");
      return null;
    }
    if (!requireTextFields(value, ["label", "href"], path)) return null;
    const href = asText(value.href);
    if (typeof value.href !== "string" || value.href !== href || !isSafeUrl(href, { allowHash: true, allowContact: true }) || !isKnownSectionHref(href)) {
      warn(`${path}.href`, "URL inválida o sección inexistente; se omitió el enlace");
      return null;
    }
    return {
      ...value,
      label: asText(value.label),
      href,
      icon: asText(value.icon),
      external: normalizeBoolean(value.external, `${path}.external`, href.startsWith("https://"))
    };
  }

  function deriveInitials(value) {
    const words = asText(value).split(/\s+/).filter(Boolean);
    if (!words.length) return "";
    return `${words[0][0] || ""}${words.length > 1 ? words[words.length - 1][0] || "" : ""}`.toUpperCase();
  }

  function normalizeData(raw) {
    if (!isObject(raw)) {
      warn("window.siteData", "no se encontró un objeto de contenido válido");
      return mergeDeep(EMPTY_DATA, {});
    }

    if (raw.schemaVersion !== 1) {
      warn("schemaVersion", "versión incompatible; no se cargó el contenido");
      return mergeDeep(EMPTY_DATA, {});
    }

    const data = mergeDeep(EMPTY_DATA, raw);
    if (!["demo", "production"].includes(data.site.mode)) {
      warn("site.mode", "valor inválido; se usará demo para mantener visibles los avisos");
      data.site.mode = "demo";
    }
    data.site.ribbon.enabled = normalizeBoolean(data.site.ribbon.enabled, "site.ribbon.enabled", false);
    data.site.share.enabled = normalizeBoolean(data.site.share.enabled, "site.share.enabled", false);
    data.footer.enabled = normalizeBoolean(data.footer.enabled, "footer.enabled", false);
    ["hero", "stats", "profile", "district", "axes", "proposals", "roadmap", "projects", "trifold", "agenda", "gallery", "socials"].forEach(key => {
      data.sections[key].enabled = normalizeBoolean(data.sections[key].enabled, `sections.${key}.enabled`, false);
    });
    data.sections.projects.map.enabled = normalizeBoolean(data.sections.projects.map.enabled, "sections.projects.map.enabled", false);
    data.sections.projects.featured.enabled = normalizeBoolean(data.sections.projects.featured.enabled, "sections.projects.featured.enabled", false);

    try {
      const [language] = Intl.getCanonicalLocales(asText(data.site.language));
      if (!language) throw new RangeError("missing language");
      data.site.language = language;
    } catch (_error) {
      warn("site.language", "idioma BCP 47 inválido; se usará es");
      data.site.language = "es";
    }
    try {
      new Intl.DateTimeFormat(data.site.locale);
    } catch (_error) {
      warn("site.locale", "configuración regional inválida; se usará es-PE");
      data.site.locale = "es-PE";
    }
    try {
      new Intl.DateTimeFormat(data.site.locale, { timeZone: data.site.timeZone });
    } catch (_error) {
      warn("site.timeZone", "zona horaria inválida; se usará America/Lima");
      data.site.timeZone = "America/Lima";
    }

    const canonicalUrl = asText(data.site.seo.canonicalUrl);
    if (canonicalUrl && !isSafeUrl(canonicalUrl, { allowRelative: false })) {
      warn("site.seo.canonicalUrl", "debe ser una URL HTTPS absoluta; se omitirá el enlace canónico");
      data.site.seo.canonicalUrl = "";
    } else {
      data.site.seo.canonicalUrl = canonicalUrl;
    }

    const identity = data.site.identity;
    identity.name = asText(identity.name);
    if (data.sections.hero.enabled !== false && !identity.name) {
      warn("site.identity.name", "texto obligatorio ausente; se ocultará el hero");
    }
    identity.shortName = asText(identity.shortName) || identity.name.split(/\s+/)[0] || "";
    identity.fullName = asText(identity.fullName) || identity.name;
    identity.initials = asText(identity.initials) || deriveInitials(identity.name);
    identity.portrait = normalizeImage(identity.portrait, "site.identity.portrait");
    identity.heroBackground = normalizeImage(identity.heroBackground, "site.identity.heroBackground", true);

    data.ui.navigation.items = normalizeRecords(
      data.ui.navigation.items,
      "ui.navigation.items",
      (item, path) => {
        if (!requireTextFields(item, ["sectionId", "label"], path)) return false;
        if (!SECTION_IDS.has(item.sectionId)) {
          warn(`${path}.sectionId`, "sección inexistente; se omitirá el enlace de navegación");
          return false;
        }
        return true;
      },
      item => item.sectionId,
      "sectionId"
    );
    data.ui.quickActions = normalizeRecords(
      data.ui.quickActions,
      "ui.quickActions",
      (item, path) => {
        if (!requireTextFields(item, ["sectionId", "label"], path)) return false;
        if (!SECTION_IDS.has(item.sectionId)) {
          warn(`${path}.sectionId`, "sección inexistente; se omitirá el acceso rápido");
          return false;
        }
        return true;
      }
    );

    const hero = data.sections.hero;
    hero.actions = normalizeRecords(hero.actions, "sections.hero.actions", (item, path) => {
      const href = asText(item.href);
      if (!requireTextFields(item, ["label", "href"], path)) return false;
      if (typeof item.href !== "string" || item.href !== href || !isSafeUrl(href, { allowHash: true, allowContact: true }) || !isKnownSectionHref(href)) {
        warn(`${path}.href`, "enlace inválido o sección inexistente; se omitió la acción");
        return false;
      }
      item.href = href;
      item.external = normalizeBoolean(item.external, `${path}.external`, href.startsWith("https://"));
      return true;
    });
    hero.highlights = normalizeRecords(hero.highlights, "sections.hero.highlights", (item, path) => requireTextFields(item, ["label"], path));
    const scrollHref = asText(hero.scroll.href);
    if (scrollHref && (typeof hero.scroll.href !== "string" || hero.scroll.href !== scrollHref || !isSafeUrl(scrollHref, { allowHash: true }) || !isKnownSectionHref(scrollHref))) {
      warn("sections.hero.scroll.href", "enlace inválido o sección inexistente; se ocultará el control");
      hero.scroll.href = "";
    } else {
      hero.scroll.href = scrollHref;
    }
    hero.card.badge = normalizeConfiguredText(hero.card.badge, "sections.hero.card.badge");
    hero.card.tag = normalizeConfiguredText(hero.card.tag, "sections.hero.card.tag");

    data.sections.stats.items = normalizeRecords(data.sections.stats.items, "sections.stats.items", (item, path) => {
      if (!requireTextFields(item, ["label"], path)) return false;
      if (asNumber(item.value) === null && !["proposals", "axes", "roadmap"].includes(item.derive)) {
        warn(`${path}.value`, "valor numérico ausente o inválido; se omitió el indicador");
        return false;
      }
      normalizeMetricMetadata(item, path);
      return true;
    });

    const profile = data.sections.profile;
    profile.timelineHeading.chip = normalizeConfiguredText(profile.timelineHeading.chip, "sections.profile.timelineHeading.chip");
    profile.cards = normalizeRecords(profile.cards, "sections.profile.cards", (item, path) => requireTextFields(item, ["title", "text"], path));
    profile.timeline = normalizeRecords(profile.timeline, "sections.profile.timeline", (item, path) => requireTextFields(item, ["dateLabel", "text"], path));

    const district = data.sections.district;
    district.detail.chip = normalizeConfiguredText(district.detail.chip, "sections.district.detail.chip");
    const rawScaleMin = district.chart?.scale?.min;
    const rawScaleMax = district.chart?.scale?.max;
    let scaleMin = asNumber(rawScaleMin);
    let scaleMax = asNumber(rawScaleMax);
    if (scaleMin === null) {
      warn("sections.district.chart.scale.min", "valor no numérico; se usará 0");
      scaleMin = 0;
    }
    if (scaleMax === null) {
      warn("sections.district.chart.scale.max", "valor no numérico; se usará 100");
      scaleMax = 100;
    }
    if (scaleMax <= scaleMin) {
      warn("sections.district.chart.scale.max", "debe ser mayor que min; se usará la escala 0–100");
      scaleMin = 0;
      scaleMax = 100;
    }
    district.chart.scale = { min: scaleMin, max: scaleMax };
    district.metrics = normalizeRecords(district.metrics, "sections.district.metrics", (item, path) => {
      const value = asNumber(item.value);
      if (!requireTextFields(item, ["label"], path)) return false;
      normalizeMetricMetadata(item, path);
      if (item.unit === "%" && (value === null || value < 0 || value > 100)) {
        warn(`${path}.value`, "porcentaje fuera de 0–100; se omitió la métrica");
        return false;
      }
      if (value === null || value < district.chart.scale.min || value > district.chart.scale.max) {
        warn(`${path}.value`, "métrica fuera de la escala o no numérica; se omitió");
        return false;
      }
      item.value = value;
      return true;
    });

    const axes = data.sections.axes;
    axes.itemLabel = normalizeConfiguredText(axes.itemLabel, "sections.axes.itemLabel");
    axes.items = normalizeRecords(axes.items, "sections.axes.items", (item, path) => {
      item.points = asArray(item.points).map(asText).filter(Boolean);
      return requireTextFields(item, ["name"], path);
    });

    const proposals = data.sections.proposals;
    proposals.categories = normalizeRecords(proposals.categories, "sections.proposals.categories", (item, path) => {
      if (item.id === "all") {
        warn(`${path}.id`, "“all” está reservado para el filtro general; se omitió la categoría");
        return false;
      }
      return requireTextFields(item, ["label"], path);
    });
    const categoryIds = new Set(proposals.categories.map(item => item.id));
    proposals.items = normalizeRecords(proposals.items, "sections.proposals.items", (item, path) => {
      if (!requireTextFields(item, ["title", "categoryId", "summary"], path)) return false;
      if (!categoryIds.has(item.categoryId)) {
        warn(`${path}.categoryId`, "categoría inexistente; se omitió la propuesta");
        return false;
      }
      item.actions = asArray(item.actions).map(asText).filter(Boolean);
      if (item.image !== undefined && item.image !== null) item.image = normalizeImage(item.image, `${path}.image`);
      if (isObject(item.indicator)) {
        const value = asNumber(item.indicator.value);
        if (!asText(item.indicator.label)) {
          warn(`${path}.indicator.label`, "texto obligatorio ausente; se omitió solo el indicador");
          item.indicator = null;
        } else if (value === null || value < 0 || value > 100) {
          warn(`${path}.indicator.value`, "porcentaje no numérico o fuera de 0–100; se omitió solo el indicador");
          item.indicator = null;
        } else {
          item.indicator.value = value;
          normalizeMetricMetadata(item.indicator, `${path}.indicator`);
        }
      } else {
        item.indicator = null;
      }
      return true;
    });

    const proposalIds = new Set(proposals.items.map(item => item.id));
    const proposalsById = new Map(proposals.items.map(item => [item.id, item]));
    const axisIds = new Set(axes.items.map(item => item.id));
    const roadmap = data.sections.roadmap;
    roadmap.stages = normalizeRecords(roadmap.stages, "sections.roadmap.stages", (stage, stagePath) => {
      if (!requireTextFields(stage, ["label"], stagePath)) return false;
      stage.periodLabel = asText(stage.periodLabel) || stage.id;
      stage.projects = normalizeRecords(stage.projects, `${stagePath}.projects`, (project, projectPath) => {
        if (!asText(project.title) && !proposalIds.has(project.proposalId)) {
          warn(`${projectPath}.title`, "se requiere un título o proposalId válido; se omitió el proyecto");
          return false;
        }
        if (project.proposalId && !proposalIds.has(project.proposalId)) {
          warn(`${projectPath}.proposalId`, "referencia inexistente; se conservaron los datos locales");
          project.proposalId = "";
        }
        if (project.axisId && !axisIds.has(project.axisId)) {
          warn(`${projectPath}.axisId`, "eje inexistente; se usará axisLabel si está disponible");
          project.axisId = "";
        }
        return true;
      });
      if (!stage.projects.length) {
        warn(`${stagePath}.projects`, "se requiere al menos un proyecto válido; se omitió la etapa");
        return false;
      }
      return true;
    });
    if (!roadmap.stages.some(stage => stage.id === roadmap.defaultStageId)) {
      if (asText(roadmap.defaultStageId)) {
        warn("sections.roadmap.defaultStageId", "etapa inexistente; se usará la primera etapa válida");
      }
      roadmap.defaultStageId = roadmap.stages[0]?.id || "";
    }

    const derivedStatValues = {
      proposals: proposals.items.length,
      axes: axes.items.length,
      roadmap: roadmap.stages.length
    };
    data.sections.stats.items = data.sections.stats.items.filter(item => {
      const value = Object.prototype.hasOwnProperty.call(derivedStatValues, item.derive)
        ? derivedStatValues[item.derive]
        : asNumber(item.value);
      if (item.unit === "%" && (value === null || value < 0 || value > 100)) {
        warn(`${recordPath(item, "sections.stats.items")}.value`, "porcentaje fuera de 0–100; se omitió el indicador");
        return false;
      }
      return true;
    });

    const projects = data.sections.projects;
    const mapZoom = asNumber(projects.map.zoom);
    if (mapZoom === null || mapZoom < 0 || mapZoom > 24) {
      warn("sections.projects.map.zoom", "zoom inválido; se usará 14");
      projects.map.zoom = 14;
    } else {
      projects.map.zoom = mapZoom;
    }
    const tileUrl = asText(projects.map.tileLayer?.url);
    if (tileUrl && !isSafeUrl(tileUrl, { allowRelative: false })) {
      warn("sections.projects.map.tileLayer.url", "debe ser una URL HTTPS; el mapa se mostrará sin capa de teselas");
      projects.map.tileLayer.url = "";
    } else {
      projects.map.tileLayer.url = tileUrl;
    }
    const tileMaxZoom = asNumber(projects.map.tileLayer?.maxZoom);
    if (tileMaxZoom === null || tileMaxZoom < 0 || tileMaxZoom > 24) {
      warn("sections.projects.map.tileLayer.maxZoom", "valor inválido; se usará 19");
      projects.map.tileLayer.maxZoom = 19;
    } else {
      projects.map.tileLayer.maxZoom = tileMaxZoom;
    }
    const centerLat = asNumber(projects.map.center?.lat);
    const centerLng = asNumber(projects.map.center?.lng);
    if (centerLat === null || centerLng === null || centerLat < -90 || centerLat > 90 || centerLng < -180 || centerLng > 180) {
      const hasCenterInput = isObject(projects.map.center)
        && (Object.prototype.hasOwnProperty.call(projects.map.center, "lat") || Object.prototype.hasOwnProperty.call(projects.map.center, "lng"));
      if (hasCenterInput) {
        if (centerLat === null || centerLat < -90 || centerLat > 90) {
          warn("sections.projects.map.center.lat", "latitud inválida; el centro se calculará desde los marcadores");
        }
        if (centerLng === null || centerLng < -180 || centerLng > 180) {
          warn("sections.projects.map.center.lng", "longitud inválida; el centro se calculará desde los marcadores");
        }
      }
      projects.map.center = null;
    } else {
      projects.map.center = { lat: centerLat, lng: centerLng };
    }
    projects.map.locations = normalizeRecords(projects.map.locations, "sections.projects.map.locations", (item, path) => {
      const lat = asNumber(item.coordinates?.lat);
      const lng = asNumber(item.coordinates?.lng);
      const relatedProposal = proposalsById.get(item.proposalId);
      if (!asText(item.name) && !relatedProposal) {
        warn(`${path}.name`, "se requiere un nombre o proposalId válido; se omitió la ubicación");
        return false;
      }
      if (lat === null || lat < -90 || lat > 90) {
        warn(`${path}.coordinates.lat`, "latitud inválida; se omitió la ubicación");
        return false;
      }
      if (lng === null || lng < -180 || lng > 180) {
        warn(`${path}.coordinates.lng`, "longitud inválida; se omitió la ubicación");
        return false;
      }
      item.coordinates = { lat, lng };
      if (item.proposalId && !relatedProposal) {
        warn(`${path}.proposalId`, "referencia inexistente; se conservaron los datos locales");
        item.proposalId = "";
      }
      if (relatedProposal) {
        item.name = asText(item.name) || relatedProposal.title;
        item.description = asText(item.description) || relatedProposal.summary;
        item.type = asText(item.type) || proposals.categories.find(category => category.id === relatedProposal.categoryId)?.label || "";
      }
      return true;
    });
    projects.featured.items = normalizeRecords(projects.featured.items, "sections.projects.featured.items", (item, path) => {
      const relatedProposal = proposalsById.get(item.proposalId);
      if (!asText(item.title) && !relatedProposal) {
        warn(`${path}.title`, "se requiere un título o proposalId válido; se omitió el destacado");
        return false;
      }
      item.image = normalizeImage(item.image || relatedProposal?.image, `${path}.image`, false, true);
      if (!item.image) return false;
      if (item.proposalId && !relatedProposal) {
        warn(`${path}.proposalId`, "referencia inexistente; se conservaron los datos locales");
        item.proposalId = "";
      }
      if (relatedProposal) {
        item.title = asText(item.title) || relatedProposal.title;
        item.subtitle = asText(item.subtitle) || relatedProposal.summary;
        item.tag = asText(item.tag) || proposals.categories.find(category => category.id === relatedProposal.categoryId)?.label || "";
      }
      return true;
    });

    data.sections.trifold.panels = normalizeRecords(data.sections.trifold.panels, "sections.trifold.panels", (item, path) => {
      if (asText(item.title) || asText(item.titleTemplate)) return true;
      warn(`${path}.title`, "se requiere title o titleTemplate; se omitió el panel");
      return false;
    });

    data.ui.events.filters = normalizeRecords(data.ui.events.filters, "ui.events.filters", (item, path) => requireTextFields(item, ["label"], path));
    if (!data.ui.events.filters.some(item => item.id === data.ui.events.initialFilter)) {
      if (asText(data.ui.events.initialFilter)) {
        warn("ui.events.initialFilter", "filtro inexistente; se usará el primer filtro válido");
      }
      data.ui.events.initialFilter = data.ui.events.filters[0]?.id || "all";
    }
    data.sections.agenda.events = normalizeRecords(data.sections.agenda.events, "sections.agenda.events", (item, path) => {
      const start = asText(item.start);
      if (!requireTextFields(item, ["title", "start"], path)) return false;
      if (!isValidIsoDateTime(start)) {
        warn(`${path}.start`, "fecha ISO 8601 con zona horaria inválida; se omitió el evento");
        return false;
      }
      if (item.end && (!isValidIsoDateTime(item.end) || Date.parse(item.end) < Date.parse(start))) {
        warn(`${path}.end`, "fecha final inválida; se omitió la fecha final");
        item.end = "";
      }
      if (item.location !== undefined && item.location !== null) {
        if (!isObject(item.location)) {
          warn(`${path}.location`, "se esperaba un objeto con name/address; se omitió la ubicación");
          item.location = null;
        } else {
          item.location.name = asText(item.location.name);
          item.location.address = asText(item.location.address);
          if (!item.location.name && !item.location.address) {
            warn(`${path}.location`, "ubicación vacía; se omitió");
            item.location = null;
          }
        }
      } else {
        item.location = null;
      }
      if (item.image !== undefined && item.image !== null) item.image = normalizeImage(item.image, `${path}.image`);
      else item.image = null;
      item.link = normalizeOptionalLink(item.link, `${path}.link`);
      return true;
    });

    const gallery = data.sections.gallery;
    gallery.categories = normalizeRecords(gallery.categories, "sections.gallery.categories", (item, path) => {
      if (item.id === "all") {
        warn(`${path}.id`, "“all” está reservado para el filtro general; se omitió la categoría");
        return false;
      }
      return requireTextFields(item, ["label"], path);
    });
    const galleryCategoryIds = new Set(gallery.categories.map(item => item.id));
    gallery.items = normalizeRecords(gallery.items, "sections.gallery.items", (item, path) => {
      if (!requireTextFields(item, ["title", "categoryId"], path)) return false;
      if (!galleryCategoryIds.has(item.categoryId)) {
        warn(`${path}.categoryId`, "categoría inexistente; se omitió la imagen");
        return false;
      }
      item.image = normalizeImage(item.image, `${path}.image`, false, true);
      return Boolean(item.image);
    });

    data.sections.socials.items = normalizeRecords(data.sections.socials.items, "sections.socials.items", (item, path) => {
      item.enabled = normalizeBoolean(item.enabled, `${path}.enabled`, false);
      if (item.enabled === false) return false;
      if (!requireTextFields(item, ["label", "icon"], path)) return false;
      const href = asText(item.href);
      if (href && !isSafeUrl(href, { allowContact: true, allowRelative: false })) {
        warn(`${path}.href`, "enlace no permitido; se tratará como no configurado");
        item.href = "";
      }
      item.external = normalizeBoolean(item.external, `${path}.external`, href.startsWith("https://"));
      return true;
    });

    data.footer.navigation = normalizeRecords(
      data.footer.navigation,
      "footer.navigation",
      (item, path) => {
        if (!requireTextFields(item, ["sectionId", "label"], path)) return false;
        if (!SECTION_IDS.has(item.sectionId)) {
          warn(`${path}.sectionId`, "sección inexistente; se omitirá el enlace del pie");
          return false;
        }
        return true;
      },
      item => item.sectionId,
      "sectionId"
    );
    return data;
  }

  const data = normalizeData(window.siteData);
  const isDemo = data.site.mode === "demo";
  const identity = data.site.identity;
  const DEMO_MARKERS = /\b(?:MVP|DEMO|MOCK|placeholders?|demostrativ[oa]s?|simulad[oa]s?|fictici[oa]s?)\b/gi;

  function stripDemoMarkers(value) {
    return asText(value)
      .replace(DEMO_MARKERS, "")
      .replace(/\(\s*\)/g, "")
      .replace(/\s+([,.;:])/g, "$1")
      .replace(/\s*(?:·|—)\s*(?=(?:·|—|[,.;:]|$))/g, "")
      .replace(/^[\s·—-]+|[\s·—-]+$/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  function displayText(value) {
    return isDemo ? asText(value) : stripDemoMarkers(value);
  }

  function displayConfiguredText(value) {
    if (!isObject(value)) return displayText(value);
    if (!isDemo && value.demoOnly === true) return "";
    return displayText(value.text);
  }

  function imageIsAvailable(image) {
    return Boolean(image && (isDemo || image.demoOnly !== true));
  }

  function getVisibleFeaturedItems() {
    return data.sections.projects.featured.items.filter(item => imageIsAvailable(item.image));
  }

  function getVisibleGalleryItems() {
    return data.sections.gallery.items.filter(item => imageIsAvailable(item.image));
  }

  function escapeHtml(value) {
    return displayText(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }
  const variables = () => ({
    name: asText(identity.name),
    shortName: asText(identity.shortName),
    fullName: asText(identity.fullName),
    initials: asText(identity.initials),
    district: asText(identity.district),
    region: asText(identity.region),
    period: asText(identity.period),
    year: String(new Date().getFullYear())
  });

  function formatTemplate(value, replacements = {}) {
    return asText(value).replace(/\{([a-zA-Z][\w-]*)\}/g, (_match, key) => asText(replacements[key]));
  }

  function modeAwareLabel(value) {
    return displayText(value);
  }

  function demoLabel(value) {
    return isDemo ? asText(value) : "";
  }

  function joinParts(parts) {
    return parts.map(asText).filter(Boolean).join(" · ");
  }

  function metricMetadataLabel(item) {
    return joinParts([item?.source, item?.asOf]);
  }

  function createElement(tag, className = "", text = "") {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== "") element.textContent = displayText(text);
    return element;
  }

  function createIcon(iconName) {
    const icon = createElement("i", "bi");
    const safeIcon = /^bi-[a-z0-9-]+$/.test(asText(iconName)) ? asText(iconName) : "bi-circle";
    icon.classList.add(safeIcon);
    icon.setAttribute("aria-hidden", "true");
    return icon;
  }

  function appendIconLabel(parent, iconName, label) {
    parent.append(createIcon(iconName), document.createTextNode(displayText(label)));
    return parent;
  }

  function setText(selector, value) {
    const element = typeof selector === "string" ? $(selector) : selector;
    if (element) element.textContent = displayText(value);
  }

  function setOptionalText(selector, value) {
    const element = typeof selector === "string" ? $(selector) : selector;
    if (!element) return;
    const content = displayText(value);
    element.textContent = content;
    element.hidden = !content;
  }

  function setOptionalConfiguredText(selector, value) {
    const element = typeof selector === "string" ? $(selector) : selector;
    if (!element) return;
    const content = displayConfiguredText(value);
    element.textContent = content;
    element.hidden = !content;
  }

  function setImage(element, image, path) {
    if (!element || !image) {
      if (element) element.hidden = true;
      return;
    }
    element.src = image.src;
    element.alt = displayText(image.alt);
    element.hidden = false;
    element.addEventListener("error", () => {
      element.hidden = true;
      warn(`${path}.src`, `no fue posible cargar “${image.src}”`);
    }, { once: true });
  }

  function createImage(image, className, path) {
    const img = createElement("img", className);
    img.loading = "lazy";
    setImage(img, image, path);
    return img;
  }

  function addExternalLinkPolicy(link, href, external) {
    link.href = href;
    if (external && !href.startsWith("#")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }

  function internalTargetIsVisible(href) {
    if (!href.startsWith("#")) return true;
    return Boolean(visibleSections[href.slice(1)]);
  }

  function getVisibleSocials() {
    return data.sections.socials.items.filter(item => isDemo || isSafeUrl(item.href, { allowContact: true, allowRelative: false }));
  }

  function computeVisibleSections() {
    const sections = data.sections;
    const profileHasContent = Boolean(asText(sections.profile.description) || sections.profile.cards.length || sections.profile.timeline.length);
    const districtHasContent = sections.district.metrics.length > 0 || (sections.axes.enabled !== false && sections.axes.items.length > 0);
    const projectsHasContent = (sections.projects.map.enabled !== false && sections.projects.map.locations.length > 0)
      || (sections.projects.featured.enabled !== false && getVisibleFeaturedItems().length > 0);
    return {
      inicio: sections.hero.enabled !== false && Boolean(asText(identity.name)),
      indicadores: sections.stats.enabled !== false && sections.stats.items.length > 0,
      perfil: sections.profile.enabled !== false && profileHasContent,
      cayma: sections.district.enabled !== false && districtHasContent,
      propuestas: sections.proposals.enabled !== false && sections.proposals.items.length > 0,
      roadmap: sections.roadmap.enabled !== false && sections.roadmap.stages.length > 0,
      proyectos: sections.projects.enabled !== false && projectsHasContent,
      triptico: sections.trifold.enabled !== false && sections.trifold.panels.length > 0,
      agenda: sections.agenda.enabled !== false && sections.agenda.events.length > 0,
      galeria: sections.gallery.enabled !== false && getVisibleGalleryItems().length > 0,
      redes: sections.socials.enabled !== false && getVisibleSocials().length > 0
    };
  }

  const visibleSections = computeVisibleSections();
  let proposalModal = null;
  let galleryModal = null;
  let radarChart = null;
  let projectMap = null;
  let featuredSwiper = null;
  let gallerySwiper = null;
  let roadmapStageId = data.sections.roadmap.defaultStageId;
  let eventFilter = data.ui.events.initialFilter;
  let galleryFilter = "all";
  let proposalFilter = "all";
  let trifoldIndex = 0;
  let trifoldOpen = false;
  let trifoldTouchStart = null;

  function safeRun(label, callback) {
    try {
      return callback();
    } catch (error) {
      warn(label, error?.message || "error inesperado");
      return null;
    }
  }

  function runSection(sectionId, callback) {
    const element = document.getElementById(sectionId);
    if (!visibleSections[sectionId]) {
      if (element) element.hidden = true;
      return;
    }
    try {
      callback();
      if (element) element.hidden = false;
    } catch (error) {
      visibleSections[sectionId] = false;
      if (element) element.hidden = true;
      warn(`sections.${sectionId}`, error?.message || "no se pudo renderizar la sección");
    }
  }

  function upsertMeta(selector, attribute, value) {
    const content = asText(value);
    const element = $(selector);
    if (element) element.setAttribute(attribute, content);
  }

  function applyMetadata() {
    const vars = variables();
    const seoTitle = modeAwareLabel(formatTemplate(data.site.seo.titleTemplate, vars)) || identity.name;
    const seoDescription = displayText(formatTemplate(data.site.seo.descriptionTemplate, vars));
    document.documentElement.lang = asText(data.site.language) || "es";
    document.title = seoTitle;
    upsertMeta('meta[name="description"]', "content", seoDescription);
    upsertMeta('meta[name="theme-color"]', "content", data.site.themeColor);
    upsertMeta('meta[property="og:title"]', "content", seoTitle);
    upsertMeta('meta[property="og:description"]', "content", seoDescription);
    upsertMeta('meta[name="twitter:title"]', "content", seoTitle);
    upsertMeta('meta[name="twitter:description"]', "content", seoDescription);

    const canonical = asText(data.site.seo.canonicalUrl);
    let canonicalLink = $('link[rel="canonical"]');
    if (canonical && isSafeUrl(canonical)) {
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.append(canonicalLink);
      }
      canonicalLink.href = canonical;
    } else if (canonicalLink) {
      canonicalLink.remove();
    }
  }

  function renderBaseContent() {
    const vars = variables();
    const hero = data.sections.hero;
    const ribbon = data.site.ribbon;
    const ribbonVisible = isDemo && ribbon.enabled !== false && asText(ribbon.text);
    $("#siteRibbon").hidden = !ribbonVisible;
    if (ribbonVisible) {
      $("#siteRibbonIcon").className = `bi ${/^bi-[a-z0-9-]+$/.test(ribbon.icon) ? ribbon.icon : "bi-info-circle-fill"}`;
      setText("#siteRibbonText", ribbon.text);
    }

    $("#mainNav").setAttribute("aria-label", displayText(data.ui.navigation.ariaLabel));
    $("#brandHomeLink").setAttribute("aria-label", displayText(data.ui.navigation.homeAriaLabel));
    const brandTarget = visibleSections.inicio
      ? "inicio"
      : data.ui.navigation.items.find(item => visibleSections[item.sectionId])?.sectionId;
    if (brandTarget) $("#brandHomeLink").href = `#${brandTarget}`;
    else $("#brandHomeLink").removeAttribute("href");
    $("#navToggle").setAttribute("aria-label", displayText(data.ui.navigation.openMenuAriaLabel));
    $("#themeToggle").setAttribute("aria-label", displayText(data.ui.theme.toggleAriaLabel));
    setText("#brandMark", identity.initials);
    setText("#brandName", identity.name);
    setText("#brandSubtitle", modeAwareLabel(formatTemplate(identity.brandSubtitleTemplate, vars)));

    const heroBackground = imageIsAvailable(identity.heroBackground) ? identity.heroBackground : null;
    if (heroBackground) {
      document.documentElement.style.setProperty("--hero-background-image", `url(${JSON.stringify(heroBackground.src)})`);
    } else {
      document.documentElement.style.removeProperty("--hero-background-image");
    }

    setText("#heroEyebrowText", hero.eyebrow);
    setText("#heroName", identity.name);
    setText("#heroPeriod", joinParts([identity.district, identity.period]));
    setText("#heroDescription", hero.description);
    const candidateImage = $("#candidateImage");
    const portrait = imageIsAvailable(identity.portrait) ? identity.portrait : null;
    setImage(candidateImage, portrait, "site.identity.portrait");
    candidateImage.parentElement.hidden = !portrait;
    setOptionalConfiguredText("#candidateBadge", hero.card.badge);
    setOptionalConfiguredText("#candidateTag", hero.card.tag);
    setText("#candidateCardTitle", hero.card.title);
    setText("#candidateCardDescription", hero.card.description);

    const scroll = $("#scrollIndicator");
    if (isSafeUrl(hero.scroll.href, { allowHash: true }) && internalTargetIsVisible(hero.scroll.href)) {
      scroll.href = hero.scroll.href;
      scroll.setAttribute("aria-label", displayText(hero.scroll.ariaLabel));
      setText("#scrollIndicatorText", hero.scroll.label);
      scroll.hidden = false;
    } else {
      scroll.hidden = true;
    }

    $("#proposalModalClose").setAttribute("aria-label", displayText(data.ui.proposal.modalCloseAriaLabel));
    $("#galleryModalClose").setAttribute("aria-label", displayText(data.ui.gallery.modalCloseAriaLabel));
  }

  function renderHeroLists() {
    const hero = data.sections.hero;
    const actions = $("#heroActions");
    actions.replaceChildren();
    hero.actions.filter(item => internalTargetIsVisible(item.href)).forEach(item => {
      const style = ["primary", "outline-light", "glass"].includes(item.style) ? item.style : "primary";
      const className = style === "glass" ? "btn btn-glass btn-lg" : `btn btn-${style} btn-lg`;
      const link = createElement("a", className);
      addExternalLinkPolicy(link, item.href, item.external);
      appendIconLabel(link, item.icon, item.label);
      actions.append(link);
    });

    const highlights = $("#heroHighlights");
    highlights.replaceChildren();
    hero.highlights.forEach(item => {
      const entry = createElement("div");
      appendIconLabel(entry, item.icon, item.label);
      highlights.append(entry);
    });
    actions.hidden = !actions.childElementCount;
    highlights.hidden = !highlights.childElementCount;
  }

  function renderNavigation() {
    const list = $("#navItems");
    list.replaceChildren();
    data.ui.navigation.items.filter(item => visibleSections[item.sectionId]).forEach(item => {
      const li = createElement("li", "nav-item");
      const link = createElement("a", "nav-link", item.label);
      link.href = `#${item.sectionId}`;
      li.append(link);
      list.append(li);
    });
  }

  function reconcileInternalLinks() {
    const firstVisible = visibleSections.inicio
      ? "inicio"
      : data.ui.navigation.items.find(item => visibleSections[item.sectionId])?.sectionId;
    const brand = $("#brandHomeLink");
    if (firstVisible) {
      brand.href = `#${firstVisible}`;
      brand.hidden = false;
    } else {
      brand.removeAttribute("href");
    }
    $$('a[href^="#"]').forEach(link => {
      if (link === brand) return;
      const target = link.getAttribute("href").slice(1);
      if (SECTION_IDS.has(target) && !visibleSections[target]) link.hidden = true;
    });
  }

  function resolveStatValue(item) {
    if (item.derive === "proposals") return data.sections.proposals.items.length;
    if (item.derive === "axes") return data.sections.axes.items.length;
    if (item.derive === "roadmap") return data.sections.roadmap.stages.length;
    return asNumber(item.value) ?? 0;
  }

  function renderStats() {
    const section = data.sections.stats;
    setText("#statsKicker", section.kicker);
    const grid = $("#statsGrid");
    grid.replaceChildren();
    section.items.forEach(item => {
      const column = createElement("div", "col-6 col-lg-3");
      column.dataset.aos = "fade-up";
      const article = createElement("article", "stat-card");
      const iconWrap = createElement("div", "stat-icon");
      iconWrap.append(createIcon(item.icon));
      const number = createElement("div", "stat-number", "0");
      number.dataset.counter = String(resolveStatValue(item));
      number.dataset.suffix = asText(item.unit);
      article.append(iconWrap, number, createElement("div", "stat-label", item.label));
      const metadata = metricMetadataLabel(item);
      if (metadata) article.append(createElement("small", "metric-source", metadata));
      column.append(article);
      grid.append(column);
    });
  }

  function formatCounterValue(rawValue, progress) {
    const targetText = asText(rawValue) || "0";
    const target = Number(targetText) || 0;
    if (progress >= 1) return targetText;
    const fractionDigits = Math.min(6, targetText.includes(".") ? targetText.split(".")[1].length : 0);
    const current = target * Math.max(0, progress);
    return fractionDigits ? String(Number(current.toFixed(fractionDigits))) : String(Math.round(current));
  }

  function initCounters() {
    const counters = $$('[data-counter]');
    const finish = element => {
      element.textContent = `${element.dataset.counter || "0"}${element.dataset.suffix || ""}`;
    };
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      counters.forEach(finish);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const suffix = element.dataset.suffix || "";
        const startTime = performance.now();
        const tick = now => {
          const progress = Math.min((now - startTime) / 950, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = `${formatCounterValue(element.dataset.counter, progress >= 1 ? 1 : eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(element);
      });
    }, { threshold: 0.55 });
    counters.forEach(counter => observer.observe(counter));
  }

  function renderProfile() {
    const section = data.sections.profile;
    setText("#profileKicker", section.heading.kicker);
    setText("#profileTitle", formatTemplate(section.heading.titleTemplate, variables()));
    setText("#profileDescription", section.description);
    const cards = $("#profileCards");
    cards.replaceChildren();
    section.cards.forEach((item, index) => {
      const column = createElement("div", "col-sm-6 col-lg-3");
      column.dataset.aos = "fade-up";
      column.dataset.aosDelay = String(index * 60);
      const article = createElement("article", "info-card");
      const iconWrap = createElement("div", "icon-wrap");
      iconWrap.append(createIcon(item.icon));
      article.append(iconWrap, createElement("h3", "", item.title), createElement("p", "", item.text));
      column.append(article);
      cards.append(column);
    });

    const timelineShell = $("#profileTimelineShell");
    timelineShell.hidden = section.timeline.length === 0;
    if (section.timeline.length) {
      setText("#profileTimelineKicker", section.timelineHeading.kicker);
      setText("#profileTimelineTitle", section.timelineHeading.title);
      setOptionalConfiguredText("#profileTimelineChip", section.timelineHeading.chip);
      const timeline = $("#profileTimeline");
      timeline.replaceChildren();
      section.timeline.forEach(item => {
        const article = createElement("article", "timeline-item");
        article.append(createElement("div", "timeline-year", item.dateLabel), createElement("p", "", item.text));
        timeline.append(article);
      });
    }
  }

  function renderDistrict() {
    const section = data.sections.district;
    setText("#districtKicker", section.heading.kicker);
    setText("#districtTitle", section.heading.title);
    setText("#districtDescription", section.heading.description);
    setText("#chartKicker", section.chart.kicker);
    setText("#chartTitle", section.chart.title);
    $("#caymaRadar").setAttribute("aria-label", displayText(section.chart.ariaLabel));
    $("#caymaRadar").setAttribute("role", "img");
    setText("#detailKicker", section.detail.kicker);
    setText("#detailTitle", section.detail.title);
    setOptionalConfiguredText("#detailChip", section.detail.chip);
    $("#districtMetricsBlock").hidden = section.metrics.length === 0;

    const progress = $("#progressMetrics");
    progress.replaceChildren();
    section.metrics.forEach(item => {
      const row = createElement("div", "progress-row");
      const meta = createElement("div", "progress-meta");
      meta.append(createElement("span", "", item.label), createElement("span", "", `${item.value}${asText(item.unit)}`));
      const track = createElement("div", "progress-track");
      const bar = createElement("div", "progress-bar-demo");
      const ratio = ((item.value - section.chart.scale.min) / (section.chart.scale.max - section.chart.scale.min)) * 100;
      bar.dataset.width = `${Math.max(0, Math.min(100, ratio))}%`;
      bar.setAttribute("role", "progressbar");
      bar.setAttribute("aria-label", displayText(item.label));
      bar.setAttribute("aria-valuemin", String(section.chart.scale.min));
      bar.setAttribute("aria-valuemax", String(section.chart.scale.max));
      bar.setAttribute("aria-valuenow", String(item.value));
      track.append(bar);
      row.append(meta, track);
      const metadata = metricMetadataLabel(item);
      if (metadata) row.append(createElement("small", "metric-source", metadata));
      progress.append(row);
    });

    const reveal = () => $$(".progress-bar-demo", progress).forEach(bar => { bar.style.width = bar.dataset.width; });
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
    } else if (section.metrics.length) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      }, { threshold: 0.3 });
      observer.observe(progress);
    }

    const axisGrid = $("#axisGrid");
    axisGrid.replaceChildren();
    if (data.sections.axes.enabled !== false) {
      data.sections.axes.items.forEach((axis, index) => {
        const column = createElement("div", "col-md-6 col-xl-4");
        column.dataset.aos = "fade-up";
        column.dataset.aosDelay = String((index % 3) * 70);
        const article = createElement("article", "axis-card");
        const iconWrap = createElement("div", "axis-icon");
        iconWrap.append(createIcon(axis.icon));
        const list = createElement("ul");
        axis.points.forEach(point => list.append(createElement("li", "", point)));
        article.append(iconWrap, createElement("h3", "", axis.name), list);
        const label = displayConfiguredText(data.sections.axes.itemLabel);
        if (label) article.append(createElement("span", "content-label", label));
        column.append(article);
        axisGrid.append(column);
      });
    }
  }

  function initChart() {
    const section = data.sections.district;
    if (!section.metrics.length) return;
    if (typeof window.Chart === "undefined") {
      $("#caymaRadar").hidden = true;
      setOptionalText("#chartFallback", data.ui.empty.generic);
      return;
    }
    $("#chartFallback").hidden = true;
    const css = getComputedStyle(document.documentElement);
    radarChart = new Chart($("#caymaRadar"), {
      type: "radar",
      data: {
        labels: section.metrics.map(item => item.label),
        datasets: [{
          label: displayText(section.chart.datasetLabel),
          data: section.metrics.map(item => item.value),
          borderWidth: 2,
          backgroundColor: "rgba(11, 94, 168, .16)",
          borderColor: "#0b5ea8",
          pointBackgroundColor: "#0d8b8b",
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: section.chart.scale.min === 0,
            min: section.chart.scale.min,
            max: section.chart.scale.max,
            ticks: { display: false },
            grid: { color: "rgba(120, 140, 160, .22)" },
            angleLines: { color: "rgba(120, 140, 160, .22)" },
            pointLabels: { color: css.getPropertyValue("--muted").trim() || "#6d7a88", font: { size: 12, weight: "700" } }
          }
        },
        plugins: {
          legend: { labels: { color: css.getPropertyValue("--text").trim() || "#1f2d3d" } },
          tooltip: { callbacks: { afterLabel: () => demoLabel(section.chart.tooltipNote) } }
        }
      }
    });
  }

  function refreshChartTheme() {
    if (!radarChart) return;
    const css = getComputedStyle(document.documentElement);
    radarChart.options.scales.r.pointLabels.color = css.getPropertyValue("--muted").trim();
    radarChart.options.plugins.legend.labels.color = css.getPropertyValue("--text").trim();
    radarChart.update();
  }

  function categoryById(id) {
    return data.sections.proposals.categories.find(category => category.id === id);
  }

  function renderProposalFilters() {
    const section = data.sections.proposals;
    const bar = $("#proposalFilters");
    bar.replaceChildren();
    bar.setAttribute("aria-label", section.filterAriaLabel);
    const usedCategories = new Set(section.items.map(item => item.categoryId));
    const filters = [{ id: "all", label: data.ui.proposal.allFilterLabel }, ...section.categories.filter(category => usedCategories.has(category.id))];
    filters.forEach(filter => {
      const button = createElement("button", `filter-btn${filter.id === proposalFilter ? " active" : ""}`, filter.label);
      button.type = "button";
      button.dataset.proposalFilter = filter.id;
      button.setAttribute("aria-pressed", String(filter.id === proposalFilter));
      bar.append(button);
    });
  }

  function renderProposals(filter = proposalFilter) {
    const section = data.sections.proposals;
    proposalFilter = filter;
    const items = filter === "all" ? section.items : section.items.filter(item => item.categoryId === filter);
    setText("#proposalsKicker", section.heading.kicker);
    setText("#proposalsTitle", section.heading.title);
    setText("#proposalsDescription", formatTemplate(section.heading.descriptionTemplate, { ...variables(), count: section.items.length }));
    setOptionalText("#proposalsCount", modeAwareLabel(formatTemplate(section.heading.countTemplate, { ...variables(), count: section.items.length })));

    const grid = $("#proposalsGrid");
    grid.replaceChildren();
    items.forEach(item => {
      const category = categoryById(item.categoryId);
      const column = createElement("div", "col-md-6 col-xl-4");
      const article = createElement("article", "proposal-card");
      const top = createElement("div", "proposal-top");
      const iconWrap = createElement("div", "proposal-icon");
      iconWrap.append(createIcon(item.icon));
      const yearLabel = joinParts([item.year, demoLabel(data.ui.demo.cardSuffix)]);
      top.append(iconWrap, createElement("span", "proposal-year", yearLabel));
      const footer = createElement("div", "proposal-footer");
      footer.append(createElement("span", "category-pill", category?.label));
      const button = createElement("button", "btn btn-sm btn-outline-primary");
      button.type = "button";
      button.dataset.openProposal = item.id;
      appendIconLabel(button, "bi-arrow-up-right", data.ui.proposal.openLabel);
      footer.append(button);
      article.append(top, createElement("h3", "", item.title), createElement("p", "", item.summary), footer);
      column.append(article);
      grid.append(column);
    });
    renderProposalFilters();
  }

  function modalBlock(title, content) {
    const section = createElement("section", "modal-block");
    section.append(createElement("h4", "", title), createElement("p", "", content));
    return section;
  }

  function openProposal(id) {
    const item = data.sections.proposals.items.find(proposal => proposal.id === id);
    if (!item) return;
    const category = categoryById(item.categoryId);
    setText("#modalCategory", joinParts([category?.label, item.year, demoLabel(data.ui.demo.modalLabel)]));
    setText("#modalTitle", item.title);
    const body = $("#modalBody");
    body.replaceChildren();
    if (imageIsAvailable(item.image)) {
      const media = createElement("figure", "proposal-modal-media");
      media.append(createImage(item.image, "proposal-modal-image", `${recordPath(item, "sections.proposals.items")}.image`));
      const caption = joinParts([item.image.caption, item.image.credit]);
      if (caption) media.append(createElement("figcaption", "image-credit", caption));
      body.append(media);
    }
    body.append(createElement("p", "lead-copy", item.summary));
    const summary = createElement("div", "modal-summary-grid");
    if (asText(item.problem)) summary.append(modalBlock(data.ui.proposal.problemTitle, item.problem));
    if (asText(item.solution)) summary.append(modalBlock(data.ui.proposal.solutionTitle, item.solution));
    if (asText(item.schedule)) summary.append(modalBlock(data.ui.proposal.scheduleTitle, item.schedule));
    if (summary.childElementCount) body.append(summary);

    if (item.actions.length) {
      const actions = createElement("section", "modal-block");
      actions.append(createElement("h4", "", data.ui.proposal.actionsTitle));
      const list = createElement("ul");
      item.actions.forEach(action => list.append(createElement("li", "", action)));
      actions.append(list);
      body.append(actions);
    }

    if (item.indicator) {
      const indicator = createElement("section", "modal-block mt-3");
      const head = createElement("div", "d-flex justify-content-between align-items-center gap-3 mb-2");
      head.append(createElement("h4", "mb-0", isDemo ? data.ui.proposal.indicatorTitle : item.indicator.label), createElement("strong", "", `${item.indicator.value}${asText(item.indicator.unit)}`));
      indicator.append(head);
      const note = joinParts([item.indicator.label, item.indicator.source, item.indicator.asOf, demoLabel(data.ui.proposal.indicatorNote)]);
      indicator.append(createElement("p", "mb-2", note));
      const track = createElement("div", "modal-progress");
      const bar = createElement("span");
      bar.style.width = `${item.indicator.value}%`;
      bar.setAttribute("role", "progressbar");
      bar.setAttribute("aria-valuemin", "0");
      bar.setAttribute("aria-valuemax", "100");
      bar.setAttribute("aria-valuenow", String(item.indicator.value));
      bar.setAttribute("aria-label", displayText(item.indicator.label));
      track.append(bar);
      indicator.append(track);
      body.append(indicator);
    }
    showModal("proposalModal", proposalModal);
  }

  function axisById(id) {
    return data.sections.axes.items.find(axis => axis.id === id);
  }

  function proposalById(id) {
    return data.sections.proposals.items.find(proposal => proposal.id === id);
  }

  function resolvedRoadmapProject(project) {
    const proposal = proposalById(project.proposalId);
    return {
      ...project,
      title: asText(project.title) || proposal?.title || "",
      description: asText(project.description) || proposal?.summary || "",
      icon: asText(project.icon) || proposal?.icon || "bi-kanban",
      axis: asText(axisById(project.axisId)?.name) || asText(project.axisLabel)
    };
  }

  function renderRoadmapYears() {
    const container = $("#roadmapYears");
    container.replaceChildren();
    data.sections.roadmap.stages.forEach(stage => {
      const button = createElement("button", `year-btn${stage.id === roadmapStageId ? " active" : ""}`, stage.periodLabel);
      button.type = "button";
      button.dataset.roadmapStage = stage.id;
      button.setAttribute("aria-pressed", String(stage.id === roadmapStageId));
      button.setAttribute("aria-controls", "roadmapStage");
      container.append(button);
    });
  }

  function renderRoadmap(stageId = roadmapStageId) {
    const section = data.sections.roadmap;
    const stage = section.stages.find(item => item.id === stageId) || section.stages[0];
    if (!stage) return;
    roadmapStageId = stage.id;
    setText("#roadmapKicker", section.heading.kicker);
    setText("#roadmapTitle", formatTemplate(section.heading.titleTemplate, variables()));
    setText("#roadmapDescription", section.heading.description);
    renderRoadmapYears();

    const container = $("#roadmapStage");
    container.replaceChildren();
    const head = createElement("div", "roadmap-stage-head");
    const copy = createElement("div");
    copy.append(createElement("span", "mini-label light-label", `${stage.periodLabel} — ${stage.label}`), createElement("h3", "", stage.label), createElement("p", "mb-0 text-white-50", stage.description));
    head.append(copy);
    const demo = demoLabel(data.ui.demo.roadmapLabel);
    if (demo) head.append(createElement("span", "tag", demo));
    const cards = createElement("div", "roadmap-cards");
    stage.projects.map(resolvedRoadmapProject).forEach(project => {
      const article = createElement("article", "roadmap-card");
      const iconWrap = createElement("div", "roadmap-icon");
      iconWrap.append(createIcon(project.icon));
      article.append(iconWrap, createElement("h4", "", project.title), createElement("p", "", project.description));
      const meta = createElement("div", "roadmap-meta");
      const entries = [
        ["bi-diagram-3", project.axis], ["bi-calendar3", project.periodLabel],
        ["bi-speedometer2", project.indicatorLabel]
      ];
      entries.filter(([, value]) => asText(value)).forEach(([iconName, value]) => {
        meta.append(appendIconLabel(createElement("span"), iconName, value));
      });
      if (asText(project.status)) meta.append(appendIconLabel(createElement("span", "status-pill"), "bi-circle-fill", project.status));
      article.append(meta);
      cards.append(article);
    });
    container.append(head, cards);
  }

  function renderMapFallback(locations) {
    const map = $("#projectMap");
    map.classList.add("map-fallback");
    map.replaceChildren();
    const intro = createElement("p", "map-fallback-message", data.ui.map.unavailableMessage);
    const list = createElement("ul", "map-fallback-list");
    locations.forEach(location => {
      const item = createElement("li");
      const detail = joinParts([location.address, location.description]);
      item.append(createElement("strong", "", location.name), document.createTextNode(detail ? ` — ${displayText(detail)}` : ""));
      list.append(item);
    });
    map.append(intro, list);
    $("#mapOverlay").hidden = true;
  }

  function leafletCssIsAvailable(container) {
    try {
      const probe = createElement("div", "leaflet-pane");
      probe.hidden = true;
      container.append(probe);
      const available = getComputedStyle(probe).position === "absolute";
      probe.remove();
      return available;
    } catch (_error) {
      return false;
    }
  }

  function initMap() {
    const config = data.sections.projects.map;
    if (config.enabled === false || !config.locations.length) return;
    const mapElement = $("#projectMap");
    mapElement.setAttribute("aria-label", displayText(config.ariaLabel));
    if (typeof window.L === "undefined" || !leafletCssIsAvailable(mapElement)) {
      renderMapFallback(config.locations);
      return;
    }

    mapElement.classList.remove("map-fallback");
    mapElement.replaceChildren();
    const fallbackCenter = config.locations[0].coordinates;
    const center = config.center || fallbackCenter;
    const zoom = asNumber(config.zoom) ?? 14;
    projectMap = L.map(mapElement, { scrollWheelZoom: false }).setView([center.lat, center.lng], zoom);
    const tileUrl = asText(config.tileLayer?.url);
    if (tileUrl && isSafeUrl(tileUrl)) {
      L.tileLayer(tileUrl, {
        maxZoom: asNumber(config.tileLayer.maxZoom) ?? 19,
        attribution: escapeHtml(config.tileLayer.attribution)
      }).addTo(projectMap);
    }

    const markerIcon = L.divIcon({
      className: "project-map-marker",
      html: '<div class="map-marker-inner"><i class="bi bi-geo-alt-fill" aria-hidden="true"></i></div>',
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -30]
    });

    config.locations.forEach(location => {
      const popup = createElement("div", "map-popup");
      popup.append(createElement("h4", "", location.name));
      if (asText(location.type)) {
        const type = createElement("p");
        type.append(createElement("strong", "", `${data.ui.map.typeLabel}: `), document.createTextNode(displayText(location.type)));
        popup.append(type);
      }
      if (asText(location.description)) popup.append(createElement("p", "", location.description));
      if (asText(location.address)) popup.append(appendIconLabel(createElement("p"), "bi-geo-alt", location.address));
      if (asText(location.status)) popup.append(createElement("span", "status-pill", joinParts([location.status, demoLabel(data.ui.demo.mapSuffix)])));
      L.marker([location.coordinates.lat, location.coordinates.lng], { icon: markerIcon, title: displayText(`${data.ui.map.markerAriaLabel}: ${location.name}`) })
        .addTo(projectMap)
        .bindPopup(popup);
    });
  }

  function renderProjects() {
    const section = data.sections.projects;
    setText("#projectsKicker", section.heading.kicker);
    setText("#projectsTitle", section.heading.title);
    setText("#projectsDescription", section.heading.description);

    const mapVisible = section.map.enabled !== false && section.map.locations.length > 0;
    $("#mapShell").hidden = !mapVisible;
    if (mapVisible) {
      $("#mapOverlay").hidden = false;
      setText("#mapOverlayLabel", section.map.overlayLabel);
      setText("#mapOverlayCount", modeAwareLabel(formatTemplate(section.map.countTemplate, { ...variables(), count: section.map.locations.length })));
    }

    const featuredItems = getVisibleFeaturedItems();
    const featuredVisible = section.featured.enabled !== false && featuredItems.length > 0;
    $("#featuredBlock").hidden = !featuredVisible;
    if (!featuredVisible) return;
    setText("#featuredKicker", section.featured.kicker);
    setText("#featuredTitle", section.featured.title);
    $("#featuredPrev").setAttribute("aria-label", displayText(section.featured.previousAriaLabel));
    $("#featuredNext").setAttribute("aria-label", displayText(section.featured.nextAriaLabel));
    const wrapper = $("#featuredWrapper");
    wrapper.replaceChildren();
    featuredItems.forEach(item => {
      const slide = createElement("div", "swiper-slide");
      const article = createElement("article", "feature-card");
      const body = createElement("div", "feature-body");
      body.append(createElement("span", "section-kicker", joinParts([item.tag, demoLabel(data.ui.demo.mockSuffix)])), createElement("h3", "", item.title), createElement("p", "", item.subtitle));
      const imageMetadata = joinParts([item.image.caption, item.image.credit]);
      if (imageMetadata) body.append(createElement("small", "image-credit", imageMetadata));
      article.append(createImage(item.image, "feature-image", `${recordPath(item, "sections.projects.featured.items")}.image`), body);
      slide.append(article);
      wrapper.append(slide);
    });
  }

  function initFeaturedSwiper() {
    const items = getVisibleFeaturedItems();
    if (data.sections.projects.featured.enabled === false || !items.length) return;
    const shell = $(".featuredSwiper");
    const showNavigation = items.length > 1;
    $("#featuredPrev").hidden = !showNavigation;
    $("#featuredNext").hidden = !showNavigation;
    if (typeof window.Swiper === "undefined" || !swiperCssIsAvailable(shell)) {
      shell.classList.add("swiper-unavailable");
      $("#featuredPrev").hidden = true;
      $("#featuredNext").hidden = true;
      return;
    }
    featuredSwiper = new Swiper(shell, {
      slidesPerView: 1.1,
      spaceBetween: 16,
      loop: items.length > 3,
      grabCursor: true,
      navigation: { nextEl: ".featured-next", prevEl: ".featured-prev" },
      pagination: { el: ".featured-pagination", clickable: true },
      breakpoints: { 480: { slidesPerView: 1.4 }, 768: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.1 } }
    });
  }

  function swiperCssIsAvailable(shell) {
    try {
      const wrapper = $(".swiper-wrapper", shell);
      return Boolean(wrapper && getComputedStyle(shell).overflow === "hidden" && getComputedStyle(wrapper).display === "flex");
    } catch (_error) {
      return false;
    }
  }

  function renderTrifold() {
    const section = data.sections.trifold;
    setText("#trifoldKicker", section.heading.kicker);
    setText("#trifoldTitle", section.heading.title);
    setText("#trifoldDescription", section.heading.description);
    setText("#trifoldMobileHint", section.mobileHint);
    $("#trifold").setAttribute("aria-label", displayText(section.ariaLabel));
    $("#trifold").style.setProperty("--trifold-panels", String(section.panels.length));
    const container = $("#trifold");
    container.replaceChildren();
    section.panels.forEach((panel, index) => {
      const panelClass = index === 0 ? "panel-one" : (index === section.panels.length - 1 ? "panel-three" : "panel-two");
      const article = createElement("article", `trifold-panel ${panelClass}`);
      article.append(createElement("div", "panel-number", panel.number || String(index + 1).padStart(2, "0")));
      const body = createElement("div");
      const panelVars = { ...variables(), count: data.sections.axes.items.length };
      const eyebrow = modeAwareLabel(formatTemplate(panel.eyebrowTemplate || panel.eyebrow, panelVars));
      if (eyebrow) body.append(createElement("span", `mini-label${index !== 1 ? " light-label" : ""}`, eyebrow));
      body.append(createElement("h3", "", formatTemplate(panel.titleTemplate || panel.title, panelVars)));
      if (panel.type === "cover") {
        const period = formatTemplate(panel.periodTemplate, panelVars);
        if (period) body.append(createElement("p", "trifold-period", period));
        if (asText(panel.body)) body.append(createElement("p", "", panel.body));
      } else if (panel.type === "axes") {
        const list = createElement("div", "trifold-axis-list");
        data.sections.axes.items.forEach(axis => {
          const entry = createElement("div", "trifold-axis");
          appendIconLabel(entry, axis.icon, axis.shortName || axis.name);
          list.append(entry);
        });
        body.append(list);
      } else if (panel.type === "roadmap") {
        const list = createElement("ul", "trifold-roadmap");
        data.sections.roadmap.stages.forEach(stage => {
          const item = createElement("li");
          item.append(createElement("strong", "", stage.periodLabel), createElement("span", "", stage.label));
          list.append(item);
        });
        body.append(list);
      } else if (asText(panel.body)) {
        body.append(createElement("p", "", panel.body));
      }
      article.append(body);
      const footer = modeAwareLabel(panel.footer);
      if (footer) article.append(createElement("div", "panel-footer", footer));
      container.append(article);
    });
    updateTrifold();
  }

  function setButtonContent(button, iconName, label, iconAfter = false) {
    button.replaceChildren();
    if (iconAfter) button.append(document.createTextNode(displayText(label)), createIcon(iconName));
    else button.append(createIcon(iconName), document.createTextNode(displayText(label)));
  }

  function updateTrifold() {
    const panels = data.sections.trifold.panels;
    if (!panels.length) return;
    trifoldIndex = Math.max(0, Math.min(trifoldIndex, panels.length - 1));
    const trifold = $("#trifold");
    trifold.dataset.current = String(trifoldIndex);
    trifold.style.setProperty("--trifold-index", String(trifoldIndex));
    trifold.classList.toggle("folded", !trifoldOpen);
    const toggle = $("#trifoldToggle");
    setButtonContent(toggle, trifoldOpen ? "bi-x-lg" : "bi-layout-three-columns", trifoldOpen ? data.ui.trifold.closeLabel : data.ui.trifold.openLabel);
    toggle.setAttribute("aria-expanded", String(trifoldOpen));
    toggle.setAttribute("aria-controls", "trifold");
    const multiple = panels.length > 1;
    $("#trifoldPrev").disabled = !multiple;
    $("#trifoldNext").disabled = !multiple;
  }

  function nextTrifold() {
    const count = data.sections.trifold.panels.length;
    if (!count) return;
    trifoldIndex = (trifoldIndex + 1) % count;
    updateTrifold();
  }

  function prevTrifold() {
    const count = data.sections.trifold.panels.length;
    if (!count) return;
    trifoldIndex = (trifoldIndex + count - 1) % count;
    updateTrifold();
  }

  function initTrifold() {
    setButtonContent($("#trifoldPrev"), "bi-arrow-left", data.ui.trifold.previousLabel);
    setButtonContent($("#trifoldPrint"), "bi-printer", data.ui.trifold.printLabel);
    setButtonContent($("#trifoldNext"), "bi-arrow-right", data.ui.trifold.nextLabel, true);
    updateTrifold();
    $("#trifoldToggle").addEventListener("click", () => {
      trifoldOpen = !trifoldOpen;
      updateTrifold();
    });
    $("#trifoldNext").addEventListener("click", nextTrifold);
    $("#trifoldPrev").addEventListener("click", prevTrifold);
    $("#trifoldPrint").addEventListener("click", () => window.print());
    const trifold = $("#trifold");
    trifold.addEventListener("touchstart", event => { trifoldTouchStart = event.changedTouches[0].clientX; }, { passive: true });
    trifold.addEventListener("touchend", event => {
      if (trifoldTouchStart === null) return;
      const delta = event.changedTouches[0].clientX - trifoldTouchStart;
      if (Math.abs(delta) > 50) delta < 0 ? nextTrifold() : prevTrifold();
      trifoldTouchStart = null;
    }, { passive: true });
    trifold.addEventListener("keydown", event => {
      if (event.key === "ArrowRight") nextTrifold();
      if (event.key === "ArrowLeft") prevTrifold();
    });
  }

  function renderEventFilters() {
    const bar = $("#eventFilters");
    bar.replaceChildren();
    data.ui.events.filters.forEach(filter => {
      const button = createElement("button", `filter-btn${filter.id === eventFilter ? " active" : ""}`, filter.label);
      button.type = "button";
      button.dataset.eventFilter = filter.id;
      button.setAttribute("aria-pressed", String(filter.id === eventFilter));
      bar.append(button);
    });
  }

  function renderEvents(filter = eventFilter) {
    const section = data.sections.agenda;
    eventFilter = filter;
    setText("#agendaKicker", section.heading.kicker);
    setText("#agendaTitle", section.heading.title);
    setText("#agendaDescription", section.heading.description);
    const now = Date.now();
    let events = [...section.events];
    if (filter === "upcoming") events = events.filter(event => Date.parse(event.end || event.start) >= now);
    if (filter === "past") events = events.filter(event => Date.parse(event.end || event.start) < now);
    events.sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
    const grid = $("#eventsGrid");
    grid.replaceChildren();
    events.forEach(event => {
      const date = new Date(event.start);
      const day = date.toLocaleDateString(data.site.locale, { day: "2-digit", timeZone: data.site.timeZone });
      const month = date.toLocaleDateString(data.site.locale, { month: "short", timeZone: data.site.timeZone }).replace(".", "");
      const hour = date.toLocaleTimeString(data.site.locale, { hour: "2-digit", minute: "2-digit", timeZone: data.site.timeZone });
      const isPast = Date.parse(event.end || event.start) < now;
      const column = createElement("div", "col-md-6 col-xl-4");
      const article = createElement("article", "event-card");
      const dateBox = createElement("div", "event-date");
      dateBox.append(createElement("div", "event-day", day), createElement("div", "event-month", month));
      const body = createElement("div", "event-body");
      body.append(createElement("span", "mini-label", event.type), createElement("h3", "", event.title));
      const meta = createElement("div", "event-meta");
      const endHour = event.end
        ? new Date(event.end).toLocaleTimeString(data.site.locale, { hour: "2-digit", minute: "2-digit", timeZone: data.site.timeZone })
        : "";
      meta.append(appendIconLabel(createElement("span"), "bi-clock", endHour ? `${hour}–${endHour}` : hour));
      const eventLocation = joinParts([event.location?.name, event.location?.address]);
      if (eventLocation) meta.append(appendIconLabel(createElement("span"), "bi-geo-alt", eventLocation));
      const status = isPast ? data.ui.events.pastStatus : data.ui.events.upcomingStatus;
      body.append(meta);
      if (asText(event.description)) body.append(createElement("p", "event-description", event.description));
      body.append(createElement("span", "event-status", joinParts([status, demoLabel(data.ui.demo.cardSuffix)])));
      if (event.link && internalTargetIsVisible(event.link.href)) {
        const link = createElement("a", "event-link");
        addExternalLinkPolicy(link, event.link.href, event.link.external);
        appendIconLabel(link, event.link.icon || "bi-arrow-up-right", event.link.label);
        body.append(link);
      }
      if (imageIsAvailable(event.image)) body.prepend(createImage(event.image, "event-image", `${recordPath(event, "sections.agenda.events")}.image`));
      article.append(dateBox, body);
      column.append(article);
      grid.append(column);
    });
    if (!events.length) {
      const column = createElement("div", "col-12");
      const card = createElement("div", "info-card text-center");
      card.append(createElement("p", "mb-0", modeAwareLabel(data.ui.events.emptyMessage)));
      column.append(card);
      grid.append(column);
    }
    renderEventFilters();
  }

  function galleryCategoryById(id) {
    return data.sections.gallery.categories.find(category => category.id === id);
  }

  function renderGalleryFilters() {
    const section = data.sections.gallery;
    const bar = $("#galleryFilters");
    bar.replaceChildren();
    const usedCategories = new Set(getVisibleGalleryItems().map(item => item.categoryId));
    const filters = [{ id: "all", label: data.ui.gallery.allFilterLabel }, ...section.categories.filter(category => usedCategories.has(category.id))];
    filters.forEach(filter => {
      const button = createElement("button", `filter-btn${filter.id === galleryFilter ? " active" : ""}`, filter.label);
      button.type = "button";
      button.dataset.galleryFilter = filter.id;
      button.setAttribute("aria-pressed", String(filter.id === galleryFilter));
      bar.append(button);
    });
  }

  function renderGallery(filter = galleryFilter) {
    const section = data.sections.gallery;
    galleryFilter = filter;
    setText("#galleryKicker", section.heading.kicker);
    setText("#galleryTitle", section.heading.title);
    setText("#galleryDescription", section.heading.description);
    const availableItems = getVisibleGalleryItems();
    const items = filter === "all" ? availableItems : availableItems.filter(item => item.categoryId === filter);
    if (gallerySwiper) {
      gallerySwiper.destroy(true, true);
      gallerySwiper = null;
    }
    const wrapper = $("#galleryWrapper");
    wrapper.replaceChildren();
    items.forEach(item => {
      const slide = createElement("div", "swiper-slide");
      const card = createElement("article", "gallery-card");
      card.tabIndex = 0;
      card.role = "button";
      card.dataset.galleryId = item.id;
      card.setAttribute("aria-label", displayText(formatTemplate(data.ui.gallery.openAriaLabelTemplate, { title: item.title })));
      const overlay = createElement("div", "gallery-overlay");
      overlay.append(createElement("span", "", galleryCategoryById(item.categoryId)?.label), createElement("h3", "", item.title));
      card.append(createImage(item.image, "", `${recordPath(item, "sections.gallery.items")}.image`), overlay);
      slide.append(card);
      wrapper.append(slide);
    });
    renderGalleryFilters();
    initGallerySwiper(items.length);
  }

  function initGallerySwiper(itemCount) {
    if (!itemCount) return;
    const shell = $(".gallerySwiper");
    if (typeof window.Swiper === "undefined" || !swiperCssIsAvailable(shell)) {
      shell.classList.add("swiper-unavailable");
      return;
    }
    shell.classList.remove("swiper-unavailable");
    gallerySwiper = new Swiper(shell, {
      slidesPerView: 1.1,
      spaceBetween: 16,
      grabCursor: true,
      pagination: { el: ".gallery-pagination", clickable: true },
      breakpoints: { 480: { slidesPerView: 1.35 }, 768: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }
    });
  }

  function openGallery(id) {
    const item = getVisibleGalleryItems().find(entry => entry.id === id);
    if (!item) return;
    setImage($("#galleryModalImage"), item.image, `${recordPath(item, "sections.gallery.items")}.image`);
    setText("#galleryModalCategory", joinParts([galleryCategoryById(item.categoryId)?.label, demoLabel(data.ui.demo.gallerySuffix)]));
    setText("#galleryModalTitle", item.title);
    setText("#galleryModalDescription", joinParts([item.image.caption, item.image.credit]));
    showModal("galleryModal", galleryModal);
  }

  function renderSocials() {
    const section = data.sections.socials;
    setText("#socialsKicker", section.heading.kicker);
    setText("#socialsTitle", section.heading.title);
    setText("#socialsDescription", section.heading.description);
    const grid = $("#socialGrid");
    grid.replaceChildren();
    getVisibleSocials().forEach(item => {
      const href = asText(item.href);
      const valid = isSafeUrl(href, { allowContact: true, allowRelative: false });
      const control = createElement(valid ? "a" : "button", "social-link");
      if (valid) addExternalLinkPolicy(control, href, item.external !== false);
      else {
        control.type = "button";
        control.dataset.socialUnavailable = item.id;
      }
      control.setAttribute("aria-label", displayText(joinParts([item.label, !valid ? data.ui.socials.demoAriaSuffix : ""])));
      control.append(createIcon(item.icon), createElement("span", "", item.label));
      grid.append(control);
    });
  }

  function renderFooter() {
    if (data.footer.enabled === false) return;
    const footer = $("#siteFooter");
    footer.hidden = false;
    setText("#footerBrandMark", identity.initials);
    setText("#footerBrandName", identity.name);
    setText("#footerBrandSubtitle", joinParts([identity.district, identity.period]));
    setText("#footerDescription", data.footer.description);
    setText("#footerNavigationTitle", data.footer.navigationTitle);
    const navigation = $("#footerNavigation");
    navigation.replaceChildren();
    data.footer.navigation.filter(item => visibleSections[item.sectionId]).forEach(item => {
      const link = createElement("a", "", item.label);
      link.href = `#${item.sectionId}`;
      navigation.append(link);
    });
    setText("#footerLegalTitle", data.footer.legalTitle);
    setText("#footerLegalText", data.footer.legalText);
    setText("#footerCopyright", formatTemplate(data.footer.copyrightTemplate, variables()));
    setText("#footerTechnology", data.footer.technologyText);
  }

  function renderQuickActions() {
    const shell = $("#floatingActions");
    const menu = $("#fabMenu");
    menu.replaceChildren();
    data.ui.quickActions.filter(item => visibleSections[item.sectionId]).forEach(item => {
      const link = createElement("a", "fab-item");
      link.href = `#${item.sectionId}`;
      link.dataset.fabItem = item.id;
      appendIconLabel(link, item.icon, item.label);
      menu.append(link);
    });
    const shareTitle = displayText(formatTemplate(data.site.share.titleTemplate, variables()));
    const shareText = displayText(formatTemplate(data.site.share.textTemplate, variables()));
    if (data.site.share.enabled !== false && asText(data.ui.share.shareLabel) && (shareTitle || shareText)) {
      const share = createElement("button", "fab-item");
      share.type = "button";
      share.id = "sharePage";
      appendIconLabel(share, "bi-send", data.ui.share.shareLabel);
      menu.append(share);
    }
    const configuredAriaLabel = displayText(data.ui.share.openActionsAriaLabel);
    const derivedAriaLabel = configuredAriaLabel
      || displayText(data.ui.share.shareLabel)
      || displayText(menu.firstElementChild?.textContent);
    if (!configuredAriaLabel && menu.childElementCount > 0) {
      warn("ui.share.openActionsAriaLabel", "texto ausente; se derivó un nombre accesible desde los controles disponibles");
    }
    $("#fabToggle").setAttribute("aria-label", derivedAriaLabel);
    shell.hidden = menu.childElementCount === 0 || !derivedAriaLabel;
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = displayText(message);
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function storageGet(key) {
    try { return localStorage.getItem(key); } catch (_error) { return null; }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_error) { /* preference remains in memory */ }
  }

  function setTheme(theme) {
    const next = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-bs-theme", next);
    storageSet(data.ui.theme.storageKey, next);
    const toggle = $("#themeToggle");
    toggle.replaceChildren(createIcon(next === "dark" ? "bi-sun-fill" : "bi-moon-stars-fill"));
    toggle.setAttribute("aria-label", displayText(next === "dark" ? data.ui.theme.lightAriaLabel : data.ui.theme.darkAriaLabel));
    refreshChartTheme();
  }

  function initTheme() {
    const saved = storageGet(data.ui.theme.storageKey);
    const preferred = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferred);
    $("#themeToggle").addEventListener("click", () => {
      setTheme(document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark");
    });
  }

  function initNavigation() {
    const nav = $("#mainNav");
    const collapse = $("#navbarContent");
    const toggle = $("#navToggle");
    const updateNav = () => nav.classList.toggle("scrolled", window.scrollY > 24);
    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });

    let collapseInstance = null;
    if (window.bootstrap?.Collapse) collapseInstance = bootstrap.Collapse.getOrCreateInstance(collapse, { toggle: false });
    else {
      toggle.addEventListener("click", () => {
        const open = collapse.classList.toggle("show");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    $$(".navbar .nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 1200 && collapse.classList.contains("show")) {
          if (collapseInstance) collapseInstance.hide();
          else collapse.classList.remove("show");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    if (!("IntersectionObserver" in window)) return;
    const links = $$(".navbar .nav-link");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.classList.toggle("active", link.hash.slice(1) === entry.target.id));
      });
    }, { rootMargin: "-28% 0px -62% 0px", threshold: 0.01 });
    $$(".section-anchor:not([hidden])").forEach(section => observer.observe(section));
  }

  function initFloatingActions() {
    const shell = $("#floatingActions");
    if (shell.hidden) return;
    const toggle = $("#fabToggle");
    const menu = $("#fabMenu");
    toggle.addEventListener("click", () => {
      const open = !shell.classList.contains("open");
      shell.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
    });
    menu.addEventListener("click", event => {
      if (event.target.closest('[data-fab-item]')) {
        shell.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        menu.hidden = true;
      }
    });
    $("#sharePage")?.addEventListener("click", async () => {
      const vars = variables();
      const shareData = {
        title: displayText(formatTemplate(data.site.share.titleTemplate, vars)) || document.title,
        text: displayText(formatTemplate(data.site.share.textTemplate, vars)),
        url: window.location.href
      };
      try {
        if (navigator.share) await navigator.share(shareData);
        else {
          await navigator.clipboard.writeText(window.location.href);
          showToast(data.ui.share.copiedMessage);
        }
      } catch (error) {
        if (error.name !== "AbortError") showToast(data.ui.share.errorMessage);
      }
    });
  }

  function showModalFallback(modal) {
    modal.style.display = "block";
    modal.classList.add("show", "modal-fallback-open");
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    document.body.classList.add("modal-open");
    modal.querySelector(".btn-close")?.focus();
  }

  function hideModalFallback(modal) {
    modal.style.display = "none";
    modal.classList.remove("show", "modal-fallback-open");
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    document.body.classList.remove("modal-open");
  }

  function showModal(id, instance) {
    if (instance) instance.show();
    else showModalFallback(document.getElementById(id));
  }

  function initModals() {
    if (window.bootstrap?.Modal) {
      proposalModal = bootstrap.Modal.getOrCreateInstance($("#proposalModal"));
      galleryModal = bootstrap.Modal.getOrCreateInstance($("#galleryModal"));
    }
    $$('[data-close-modal]').forEach(button => {
      button.addEventListener("click", () => {
        if (!window.bootstrap?.Modal) hideModalFallback(document.getElementById(button.dataset.closeModal));
      });
    });
  }

  function initDelegatedEvents() {
    document.addEventListener("click", event => {
      const proposalFilterButton = event.target.closest('[data-proposal-filter]');
      if (proposalFilterButton) {
        renderProposals(proposalFilterButton.dataset.proposalFilter);
        return;
      }
      const proposalButton = event.target.closest('[data-open-proposal]');
      if (proposalButton) {
        openProposal(proposalButton.dataset.openProposal);
        return;
      }
      const roadmapButton = event.target.closest('[data-roadmap-stage]');
      if (roadmapButton) {
        renderRoadmap(roadmapButton.dataset.roadmapStage);
        return;
      }
      const eventButton = event.target.closest('[data-event-filter]');
      if (eventButton) {
        renderEvents(eventButton.dataset.eventFilter);
        return;
      }
      const galleryFilterButton = event.target.closest('[data-gallery-filter]');
      if (galleryFilterButton) {
        renderGallery(galleryFilterButton.dataset.galleryFilter);
        return;
      }
      const galleryCard = event.target.closest('[data-gallery-id]');
      if (galleryCard) {
        openGallery(galleryCard.dataset.galleryId);
        return;
      }
      if (event.target.closest('[data-social-unavailable]')) showToast(data.ui.socials.unavailableMessage);
    });

    document.addEventListener("keydown", event => {
      const galleryCard = event.target.closest?.('[data-gallery-id]');
      if (galleryCard && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        openGallery(galleryCard.dataset.galleryId);
      }
      if (event.key === "Escape" && !window.bootstrap?.Modal) {
        $$(".modal-fallback-open").forEach(hideModalFallback);
      }
    });
  }

  function initAOS() {
    const disableAnimations = () => {
      $$('[data-aos]').forEach(element => {
        element.removeAttribute("data-aos");
        element.removeAttribute("data-aos-delay");
      });
    };
    if (typeof window.AOS === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      disableAnimations();
      return;
    }
    try {
      AOS.init({ duration: 650, once: true, offset: 70, easing: "ease-out-cubic" });
    } catch (error) {
      disableAnimations();
      throw error;
    }
  }

  function init() {
    safeRun("metadata", applyMetadata);
    safeRun("base", renderBaseContent);
    safeRun("modals", initModals);
    safeRun("theme", initTheme);

    runSection("indicadores", renderStats);
    runSection("perfil", renderProfile);
    runSection("cayma", renderDistrict);
    runSection("propuestas", () => renderProposals("all"));
    runSection("roadmap", () => renderRoadmap(roadmapStageId));
    runSection("proyectos", renderProjects);
    runSection("triptico", renderTrifold);
    runSection("agenda", () => renderEvents(eventFilter));
    runSection("galeria", () => renderGallery("all"));
    runSection("redes", renderSocials);
    runSection("inicio", renderHeroLists);

    safeRun("navigation", renderNavigation);
    safeRun("footer", renderFooter);
    safeRun("quickActions", renderQuickActions);
    safeRun("internalLinks", reconcileInternalLinks);
    safeRun("navigationInteractions", initNavigation);
    safeRun("quickActionInteractions", initFloatingActions);
    safeRun("delegatedInteractions", initDelegatedEvents);
    safeRun("counters", initCounters);
    if (visibleSections.cayma) safeRun("chart", initChart);
    if (visibleSections.proyectos) {
      safeRun("map", initMap);
      safeRun("featuredCarousel", initFeaturedSwiper);
    }
    if (visibleSections.triptico) safeRun("trifoldInteractions", initTrifold);
    safeRun("animations", initAOS);

    document.documentElement.dataset.contentReady = "true";
    window.siteContentDiagnostics = Object.freeze({ warnings: [...warnings], visibleSections: { ...visibleSections } });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
