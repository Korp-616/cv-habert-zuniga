/**
 * DATA.JS · FUENTE ÚNICA DE CONTENIDO DEL SITIO
 * ===================================
 * Información preparada a partir de assets/base_conocimiento.
 *
 * FUENTES REVISADAS
 * -----------------
 * - PLAN DE GOBIERNO MUNICIPAL CAYMA FINAL.pdf: plan detallado 2027-2030.
 * - PLAN DE GOBIERNO HRZH.pdf: resumen visual del diagnóstico y la hoja de ruta.
 * - WhatsApp Image 2026-08-23 at 17.44.33.jpeg: pieza gráfica de propuestas.
 * - WhatsApp Image 2026-08-23 at 17.44.34.jpeg: pieza gráfica de perfil y propuestas.
 *
 * CÓMO RECONOCER Y COMPLETAR PENDIENTES
 * --------------------------------------
 * - "" seguido de PENDIENTE significa que debes reemplazar la cadena vacía.
 * - [] seguido de PENDIENTE significa que debes agregar registros con el formato indicado.
 * - VACÍO INTENCIONAL significa que no falta información y no debes rellenarlo.
 * - No uses null en este archivo.
 * - No reemplaces arreglos, booleanos, números ni objetos tipados por "".
 * - Fechas: ISO 8601 con zona de Lima, por ejemplo 2027-03-15T18:00:00-05:00.
 * - IDs: slugs únicos, estables, sin espacios ni tildes.
 * - Imágenes: { src, alt, caption?, credit? }.
 * - Enlaces: HTTPS, mailto: o tel:. No uses # para enlaces externos pendientes.
 * - Métricas: { id, label, value, unit?, source?, asOf? }.
 * - Antes de activar mapa, agenda, proyectos destacados o redes, completa sus datos.
 *
 * ALERTA DE VALIDACIÓN DOCUMENTAL
 * -------------------------------
 * El cronograma de la propuesta 4.7, "Cayma sin Alcoholismo", repite contenido de
 * "Mano que ayuda al hermano". Se conserva la propuesta, pero su periodo y cronograma
 * quedan pendientes hasta contar con una versión corregida o una confirmación oficial.
 */

const siteData = {
  schemaVersion: 1,

  site: {
    language: "es",
    locale: "es-PE",
    timeZone: "America/Lima",
    mode: "production",
    themeColor: "#46600b",
    seo: {
      titleTemplate: "{name} | Plan de Gobierno {district} {period}",
      descriptionTemplate: "Plan de Gobierno Municipal para {district} {period}: diagnóstico, 8 ejes estratégicos, propuestas y hoja de ruta.",
      canonicalUrl: "" /* PENDIENTE: ingresa la URL HTTPS pública y definitiva del sitio. */
    },
    identity: {
      name: "Harberth Zúñiga",
      shortName: "Harberth" /* VACÍO INTENCIONAL: se deriva automáticamente de name; rellena solo si deseas otro nombre corto. */,
      fullName: "Harberth Zúñiga Herrera" /* VACÍO INTENCIONAL: se deriva automáticamente de name; usa el nombre legal completo si lo confirmas. */,
      initials: "" /* VACÍO INTENCIONAL: se derivan automáticamente de name; rellena solo para sobrescribirlas. */,
      district: "Cayma",
      region: "Arequipa",
      period: "2027–2030",
      brandSubtitleTemplate: "{district} {period} · Arequipa Avancemos",
      portrait: { src:"../assets/img/profile.png", alt: "Retrato de Harberth Zúñiga", caption: "", credit: "" } /* PENDIENTE: reemplaza "" por { src: "assets/img/retrato.webp", alt: "Retrato de Harberth Zúñiga", caption: "", credit: "" }. La pieza de WhatsApp no es un retrato aislado. */,
      heroBackground: { src: "../assets/img/hero-bg.png", alt: "Background", caption: "", credit: "" } /* PENDIENTE: reemplaza "" por { src: "assets/img/hero.webp", alt: "", caption: "", credit: "" }. Usa alt vacío solo si el fondo es decorativo. */
    },
    ribbon: {
      enabled: true,
      icon: "bi-file-earmark-check-fill",
      text: "Contenido elaborado a partir del Plan de Gobierno Municipal de Cayma 2027–2030."
    },
    share: {
      enabled: true,
      titleTemplate: "{name} | Plan de Gobierno {district} {period}",
      textTemplate: "Conoce los ejes, propuestas y la hoja de ruta para {district} {period}."
    },
/*
    sources: [
      {
        id: "plan-gobierno-detallado",
        type: "application/pdf",
        title: "Plan de Gobierno Municipal: Cayma 2027–2030",
        path: "assets/base_conocimiento/PLAN DE GOBIERNO MUNICIPAL CAYMA FINAL.pdf"
      },
      {
        id: "plan-gobierno-resumen",
        type: "application/pdf",
        title: "Cayma 2027–2030: La Villa Hermosa, cuna de la identidad",
        path: "assets/base_conocimiento/PLAN DE GOBIERNO HRZH.pdf"
      },
      {
        id: "pieza-propuestas",
        type: "image/jpeg",
        title: "Nuestras propuestas: 8 ejes para transformar Cayma",
        path: "assets/base_conocimiento/WhatsApp Image 2026-08-23 at 17.44.33.jpeg"
      },
      {
        id: "pieza-perfil",
        type: "image/jpeg",
        title: "Perfil y propuestas de Harberth Zúñiga",
        path: "assets/base_conocimiento/WhatsApp Image 2026-08-23 at 17.44.34.jpeg"
      }
    ]
*/
  },

  ui: {
    navigation: {
      ariaLabel: "Navegación principal",
      homeAriaLabel: "Ir al inicio",
      openMenuAriaLabel: "Abrir menú",
      items: [
        { sectionId: "inicio", label: "Inicio" },
        { sectionId: "perfil", label: "Perfil" },
        { sectionId: "obras-impuestos", label: "Obras por Impuestos" },
        { sectionId: "cayma", label: "Diagnóstico" },
        { sectionId: "propuestas", label: "Propuestas" },
        { sectionId: "roadmap", label: "Hoja de ruta" },
        { sectionId: "proyectos", label: "Proyectos" },
        { sectionId: "triptico", label: "Resumen" },
        { sectionId: "agenda", label: "Agenda" },
        { sectionId: "galeria", label: "Publicaciones" },
        { sectionId: "redes", label: "Redes" }
      ]
    },
    theme: {
      storageKey: "cayma-theme",
      toggleAriaLabel: "Cambiar tema",
      lightAriaLabel: "Activar modo claro",
      darkAriaLabel: "Activar modo oscuro"
    },
    demo: {
      cardSuffix: "" /* VACÍO INTENCIONAL: no mostrar rótulos DEMO en producción. */,
      mockSuffix: "" /* VACÍO INTENCIONAL: no mostrar rótulos MOCK en producción. */,
      modalLabel: "" /* VACÍO INTENCIONAL: no mostrar rótulos demostrativos. */,
      roadmapLabel: "" /* VACÍO INTENCIONAL: la hoja de ruta usa información documental. */,
      mapSuffix: "" /* VACÍO INTENCIONAL: no mostrar sufijos demostrativos. */,
      imageAltSuffix: "" /* VACÍO INTENCIONAL: no añadir "placeholder" a los textos alternativos. */
    },
    proposal: {
      allFilterLabel: "Todos",
      openLabel: "Ver propuesta",
      problemTitle: "Problema o brecha",
      solutionTitle: "Solución propuesta",
      scheduleTitle: "Implementación",
      actionsTitle: "Acciones principales",
      indicatorTitle: "Indicador",
      indicatorNote: "Meta sujeta a línea base, ficha técnica y validación oficial.",
      modalCloseAriaLabel: "Cerrar propuesta"
    },
    map: {
      typeLabel: "Tipo",
      markerAriaLabel: "Ubicación del proyecto",
      unavailableMessage: "El mapa interactivo no está disponible en este momento."
    },
    trifold: {
      previousLabel: "Anterior",
      nextLabel: "Siguiente",
      openLabel: "Abrir resumen",
      closeLabel: "Cerrar resumen",
      printLabel: "Versión imprimible"
    },
    events: {
      filters: [
        { id: "upcoming", label: "Próximos" },
        { id: "all", label: "Todos" },
        { id: "past", label: "Pasados" }
      ],
      initialFilter: "upcoming",
      upcomingStatus: "Próximo",
      pastStatus: "Evento pasado",
      emptyMessage: "No hay actividades oficiales publicadas para este filtro."
    },
    socials: {
      unavailableMessage: "Este canal todavía no tiene un enlace oficial configurado.",
      demoAriaSuffix: "" /* VACÍO INTENCIONAL: no anunciar enlaces como demostrativos. */
    },
    share: {
      openActionsAriaLabel: "Abrir accesos rápidos",
      shareLabel: "Compartir",
      copiedMessage: "Enlace copiado al portapapeles.",
      errorMessage: "No fue posible compartir desde este navegador."
    },
    empty: {
      generic: "Contenido pendiente de publicación."
    },
    quickActions: [
      { id: "quick-tax-works", sectionId: "obras-impuestos", label: "Obras por Impuestos", icon: "bi-buildings" },
      { id: "quick-proposals", sectionId: "propuestas", label: "Propuestas", icon: "bi-grid-1x2" },
      { id: "quick-roadmap", sectionId: "roadmap", label: "Hoja de ruta", icon: "bi-signpost-split" },
      { id: "quick-publications", sectionId: "galeria", label: "Publicaciones", icon: "bi-newspaper" }
    ]
  },

  sections: {
    hero: {
      enabled: true,
      eyebrow: "",//Vacio intencional
      description: "Cayma, la Villa Hermosa, balcón turístico y cuna de la identidad regional: un distrito sostenible, seguro, inclusivo, transparente y digital.",
      actions: [
        { id: "hero-proposals", label: "Conocer propuestas", href: "#propuestas", icon: "bi-grid-1x2-fill ", style: "primary" },
        { id: "hero-roadmap", label: "Ver hoja de ruta", href: "#roadmap", icon: "bi-signpost-split-fill", style: "outline-light" },
        { id: "hero-profile", label: "Conocer trayectoria", href: "#perfil", icon: "bi-person-badge-fill", style: "glass" }
      ],
      highlights: [
        { id: "eight-axes", label: "8 ejes estratégicos", icon: "bi-diagram-3-fill" },
        { id: "forty-three-proposals", label: "43 propuestas", icon: "bi-kanban-fill" },
        { id: "four-year-roadmap", label: "Hoja de ruta 2027–2030", icon: "bi-calendar-range-fill" }
      ],
      card: {
        badge: "Plan 2027–2030",
        tag: "Cayma seguirá avanzando",
        title: "Un futuro mejor para Cayma",
        description: "Capacidad, gestión y honestidad al servicio de un distrito integrado."
      },
      scroll: {
        href: "#indicadores",
        label: "Desliza para conocer el plan",
        ariaLabel: "Ir a indicadores"
      }
    },

    stats: {
      enabled: true,
      kicker: "Plan de Gobierno 2027–2030",
      items: [
        {
          id: "strategic-proposals",
          label: "Propuestas documentadas",
          derive: "proposals",
          value: 43,
          unit: "" /* VACÍO INTENCIONAL: es un conteo sin unidad. */,
          icon: "bi-kanban-fill",
          source: "Plan de Gobierno Municipal Cayma 2027–2030"
        },
        {
          id: "development-axes",
          label: "Ejes estratégicos",
          derive: "axes",
          value: 8,
          unit: "" /* VACÍO INTENCIONAL: es un conteo sin unidad. */,
          icon: "bi-diagram-3-fill",
          source: "Plan de Gobierno Municipal Cayma 2027–2030"
        },
        {
          id: "planning-years",
          label: "Años de planificación",
          derive: "roadmap",
          value: 4,
          unit: "" /* VACÍO INTENCIONAL: es un conteo sin unidad. */,
          icon: "bi-calendar-range-fill",
          source: "Plan de Gobierno Municipal Cayma 2027–2030"
        },
        {
          id: "diagnostic-indicators",
          label: "Indicadores de diagnóstico",
          value: 6,
          unit: "" /* VACÍO INTENCIONAL: es un conteo sin unidad. */,
          icon: "bi-bar-chart-fill",
          source: "Diagnóstico estratégico del Plan de Gobierno Municipal Cayma 2027–2030"
        }
      ]
    },

    profile: {
      enabled: true,
      heading: {
        kicker: "Trayectoria",
        titleTemplate: "Conoce a {shortName}"
      },
      description: "Funcionario municipal con más de 30 años de experiencia. El material proporcionado registra su trayectoria como regidor de la Municipalidad de Cayma, alcalde distrital y consejero regional por Arequipa.",
      cards: [
        {
          id: "municipal-experience",
          title: "Experiencia municipal",
          icon: "bi-building-fill-check",
          text: "Más de 30 años como funcionario municipal."
        },
        {
          id: "district-council",
          title: "Gestión distrital",
          icon: "bi-people-fill",
          text: "Regidor de la Municipalidad de Cayma."
        },
        {
          id: "mayoralty",
          title: "Alcaldía de Cayma",
          icon: "bi-bank2",
          text: "Alcalde de la Municipalidad Distrital de Cayma durante el periodo 2015–2018."
        },
        {
          id: "regional-council",
          title: "Gestión regional",
          icon: "bi-geo-alt-fill",
          text: "Consejero regional por Arequipa durante el periodo 2019–2022."
        }
      ],
      timelineHeading: {
        kicker: "Experiencia pública",
        title: "Trayectoria política y municipal",
        chip: "" //Vacio intencional: indicador de fuente o informacion complementaria
      },
      timeline: [
        { id: "career-municipal", dateLabel: "Más de 30 años", text: "Experiencia como funcionario municipal." },
        { id: "career-regidor", dateLabel: "Gestión municipal", text: "Regidor de la Municipalidad de Cayma." },
        { id: "career-mayor", dateLabel: "2015–2018", text: "Alcalde de la Municipalidad Distrital de Cayma." },
        { id: "career-councilor", dateLabel: "2019–2022", text: "Consejero regional por Arequipa." }
      ]
    },

    taxWorks: {
      enabled: true,
      heading: {
        kicker: "Gestión Municipal 2015–2018",
        title: "Obras por Impuestos: experiencia que se convierte en resultados",
        description: "Entre 2015 y 2018 impulsamos Obras por Impuestos para acelerar la inversión pública y atender brechas concretas de educación, movilidad e infraestructura vial en Cayma."
      },
      proof: {
        periodLabel: "Una gestión que supo gestionar",
        title: "Cuatro proyectos que movilizaron inversión para Cayma",
        description: "La capacidad técnica permitió convertir necesidades del distrito en proyectos adjudicados y orientados a mejorar servicios esenciales para la población.",
        projectsLabel: "proyectos adjudicados",
        amountLabel: "Inversión adjudicada acumulada",
        headlineAmount: "S/ 25.2 millones",
        exactAmountLabel: "Monto total adjudicado",
        areasLabel: "Educación + movilidad + infraestructura vial"
      },
      worksHeading: {
        kicker: "Resultados comprobables",
        title: "Obras impulsadas durante la gestión",
        description: "Una inversión enfocada en cerrar brechas que afectaban directamente la educación, la conectividad y la calidad de vida de los vecinos.",
        investmentLabel: "Inversión adjudicada",
        breachLabel: "Brecha atendida"
      },
      works: [
        {
          id: "dean-valdivia",
          area: "Educación",
          icon: "bi-mortarboard-fill",
          title: "Mejoramiento y ampliación de la I.E. 40669 Dean Valdivia",
          investment: 7858382.77,
          description: "Mejores espacios para fortalecer la prestación del servicio de educación secundaria en Alto Cayma.",
          breach: "Infraestructura y condiciones adecuadas para el aprendizaje."
        },
        {
          id: "casimiro-cuadros",
          area: "Movilidad urbana",
          icon: "bi-signpost-split-fill",
          title: "Transitabilidad en Casimiro Cuadros y sectores aledaños",
          investment: 3836944.25,
          description: "Intervención en Casimiro Cuadros – Sector I, Juan Pablo II, José Carlos Mariátegui, Santa María y Manuel A. Odría.",
          breach: "Desplazamiento peatonal y vehicular en mejores condiciones."
        },
        {
          id: "andres-avelino-san-pedro",
          area: "Movilidad y conectividad",
          icon: "bi-car-front-fill",
          title: "Transitabilidad en Andrés Avelino Cáceres y San Pedro",
          investment: 4418637.00,
          description: "Inversión orientada a sectores que necesitaban mejores condiciones de accesibilidad y circulación urbana.",
          breach: "Transitabilidad peatonal y vehicular."
        },
        {
          id: "primero-de-junio",
          area: "Infraestructura vial",
          icon: "bi-cone-striped",
          title: "Transitabilidad en las calles faltantes de Primero de Junio",
          investment: 9082604.00,
          description: "Mejoramiento vial en calles que ya contaban con saneamiento básico, pero mantenían necesidades pendientes de transitabilidad.",
          breach: "Infraestructura vial y accesibilidad urbana."
        }
      ],
      future: {
        kicker: "2027–2030 | El siguiente paso",
        title: "Experiencia para volver a conseguir inversión",
        description: "Proponemos estructurar una cartera prioritaria, cerrar las brechas técnicas y buscar alianzas con el sector privado para acelerar proyectos estratégicos mediante Obras por Impuestos.",
        portfolioLabel: "Cartera prioritaria para estructurar y gestionar",
        categories: [
          {
            id: "future-mobility",
            label: "Movilidad y conectividad",
            icon: "bi-signpost-2-fill",
            items: ["Puente Villa Continental", "Puente Arquillo", "Vía de Evitamiento del Valle Chilina", "Vía Samay"]
          },
          {
            id: "future-health",
            label: "Salud",
            icon: "bi-hospital-fill",
            items: ["Hospital Nivel II"]
          },
          {
            id: "future-education",
            label: "Educación",
            icon: "bi-book-fill",
            items: ["C.E. Almirante Miguel Grau", "C.E. Francisco Bolognesi", "C.E. José Cornejo", "C.E. Lorenzo Acosta, en articulación con el GRA"]
          },
          {
            id: "future-urban",
            label: "Equipamiento urbano",
            icon: "bi-shop",
            items: ["Mercado de Cayma"]
          },
          {
            id: "future-culture",
            label: "Ciencia, cultura y educación",
            icon: "bi-stars",
            items: ["Planetario"]
          }
        ]
      },
      closing: {
        eyebrow: "No partimos de cero",
        title: "Partimos de una experiencia que ya demostró resultados.",
        description: "2015–2018: gestionamos inversión. 2027–2030: queremos volver a gestionar para cerrar las brechas que aún siguen pendientes.",
        pillars: ["Experiencia para gestionar", "Capacidad para conseguir inversión", "Visión para cerrar brechas"]
      }
    },

    district: {
      enabled: false,
      heading: {
        kicker: "Diagnóstico estratégico",
        title: "Cayma: brechas históricas",
        description: "Indicadores consignados en el Plan de Gobierno Municipal Cayma 2027–2030. La fuente no indica una fecha de corte estadística."
      },
      chart: {
        kicker: "Punto de partida",
        title: "Indicadores documentados",
        ariaLabel: "Gráfico radar con seis indicadores del diagnóstico estratégico de Cayma",
        datasetLabel: "Valor consignado",
        tooltipNote: "Las unidades son diferentes; consulta el detalle de cada indicador.",
        scale: { min: 0, max: 100 }
      },
      detail: {
        kicker: "Fuente documental",
        title: "Realidad actual y brechas",
        chip: "Plan 2027–2030"
      },
      metrics: [
        {
          id: "population-growth",
          label: "Crecimiento poblacional anual",
          value: 2.5,
          unit: "%",
          source: "Plan de Gobierno Municipal Cayma 2027–2030, diagnóstico estratégico",
          asOf: "" /* PENDIENTE: ingresa la fecha ISO con zona horaria de la medición o de la fuente estadística oficial. */
        },
        {
          id: "water-sanitation-access",
          label: "Acceso a agua y desagüe",
          value: 92.4,
          unit: "%",
          source: "Plan de Gobierno Municipal Cayma 2027–2030, diagnóstico estratégico",
          asOf: "" /* PENDIENTE: ingresa la fecha ISO con zona horaria de la medición o de la fuente estadística oficial. */
        },
        {
          id: "housing-titling",
          label: "Titulación de viviendas",
          value: 78,
          unit: "%",
          source: "Plan de Gobierno Municipal Cayma 2027–2030, diagnóstico estratégico",
          asOf: "" /* PENDIENTE: ingresa la fecha ISO con zona horaria de la medición o de la fuente estadística oficial. */
        },
        {
          id: "insecurity-perception",
          label: "Percepción de inseguridad",
          value: 18.5,
          unit: "%",
          source: "Plan de Gobierno Municipal Cayma 2027–2030, diagnóstico estratégico",
          asOf: "" /* PENDIENTE: ingresa la fecha ISO con zona horaria de la medición o de la fuente estadística oficial. */
        },
        {
          id: "green-space",
          label: "Áreas verdes por habitante (menos de)",
          value: 3,
          unit: "m²/hab",
          source: "Plan de Gobierno Municipal Cayma 2027–2030, diagnóstico estratégico",
          asOf: "" /* PENDIENTE: ingresa la fecha ISO con zona horaria de la medición o de la fuente estadística oficial. */
        },
        {
          id: "youth-underemployment",
          label: "Desempleo y subempleo juvenil estimado",
          value: 12,
          unit: "%",
          source: "Plan de Gobierno Municipal Cayma 2027–2030, diagnóstico estratégico",
          asOf: "" /* PENDIENTE: ingresa la fecha ISO con zona horaria de la medición o de la fuente estadística oficial. */
        }
      ]
    },

    axes: {
      enabled: true,
      itemLabel: "" /* VACÍO INTENCIONAL: no se necesita un rótulo adicional por tarjeta. */,
      items: [
        {
          id: "desarrollo-urbano",
          name: "Desarrollo urbano sostenible y espacios públicos de calidad",
          shortName: "Desarrollo urbano",
          icon: "bi-buildings-fill",
          points: ["Infraestructura deportiva y recreativa", "Mercado zonal y espacio histórico", "Servicios urbanos esenciales"]
        },
        {
          id: "movilidad",
          name: "Movilidad urbana, conectividad y vías seguras",
          shortName: "Movilidad",
          icon: "bi-sign-turn-right-fill",
          points: ["Semaforización inteligente", "Conexiones viales", "Ciclovías integradas"]
        },
        {
          id: "seguridad",
          name: "Seguridad ciudadana con tecnología y prevención",
          shortName: "Seguridad",
          icon: "bi-shield-check",
          points: ["Centro C4", "Serenazgo en el Valle de Chilina", "Vigilancia vecinal e iluminación"]
        },
        {
          id: "salud-bienestar",
          name: "Salud preventiva, bienestar social e inclusión",
          shortName: "Salud y bienestar",
          icon: "bi-heart-pulse-fill",
          points: ["Hospital y tópicos municipales", "Protección social", "Nutrición, prevención e inclusión"]
        },
        {
          id: "desarrollo-economico",
          name: "Desarrollo económico, turismo y empleabilidad",
          shortName: "Desarrollo económico",
          icon: "bi-graph-up-arrow",
          points: ["Marca Cayma y turismo", "Emprendimiento y oficios", "Educación e identidad cultural"]
        },
        {
          id: "medio-ambiente",
          name: "Cayma Verde: ecología, medio ambiente y agricultura",
          shortName: "Cayma Verde",
          icon: "bi-tree-fill",
          points: ["Vivero y compostaje", "Corredor verde y riego", "Economía circular y agricultura"]
        },
        {
          id: "saneamiento",
          name: "Ordenamiento territorial, saneamiento básico y físico legal",
          shortName: "Saneamiento",
          icon: "bi-house-check-fill",
          points: ["Titulación", "Agua y alcantarillado", "Reservorio N46 y JAS"]
        },
        {
          id: "modernizacion",
          name: "Modernización municipal y transparencia",
          shortName: "Modernización",
          icon: "bi-laptop-fill",
          points: ["Ventanilla digital", "Datos abiertos", "Participación y capacidades institucionales"]
        }
      ]
    },

    proposals: {
      enabled: true,
      heading: {
        kicker: "Plan de Gobierno 2027–2030",
        title: "Propuestas por eje estratégico",
        descriptionTemplate: "Explora {count} propuestas extraídas del Plan de Gobierno Municipal de Cayma.",
        countTemplate: "{count} propuestas"
      },
      filterAriaLabel: "Filtros de propuestas por eje estratégico",
      categories: [
        { id: "desarrollo-urbano", label: "Desarrollo urbano" },
        { id: "movilidad", label: "Movilidad" },
        { id: "seguridad", label: "Seguridad" },
        { id: "salud-bienestar", label: "Salud y bienestar" },
        { id: "desarrollo-economico", label: "Desarrollo económico" },
        { id: "medio-ambiente", label: "Medio ambiente" },
        { id: "saneamiento", label: "Saneamiento" },
        { id: "modernizacion", label: "Modernización" }
      ],
      items: [
        {
          id: "piscina-municipal-temperada",
          title: "Piscina Municipal Temperada en La Nueva Cayma",
          categoryId: "desarrollo-urbano",
          year: "2027–2029",
          icon: "bi-water",
          summary: "Dotar a la zona alta de Cayma de infraestructura deportiva y recreativa de primer nivel.",
          problem: "" /* PENDIENTE: ingresa una síntesis validada de la brecha de acceso a infraestructura acuática y su fuente. */,
          solution: "Construir una piscina semiolímpica de 25 m por 12.5 m, temperada con paneles solares, con vestuarios, graderías y áreas recreativas.",
          actions: [] /* PENDIENTE: selecciona de 3 a 5 acciones oficiales del expediente, la APP, la construcción y la operación. */,
          schedule: "2027: expediente técnico y estructuración de APP. 2028: construcción. 2029: operación y programas deportivos.",
          image: "" /* PENDIENTE: reemplaza "" por { src, alt, caption?, credit? } con una imagen oficial de la piscina propuesta. */,
          indicator: "" /* PENDIENTE: reemplaza "" por { label, value: 0-100, unit, source, asOf } después de aprobar línea base y meta. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 1.1"
        },
        {
          id: "red-polideportivos-losas",
          title: "Red de Polideportivos y Losas Deportivas",
          categoryId: "desarrollo-urbano",
          year: "2027–2030",
          icon: "bi-trophy-fill",
          summary: "Multiplicar la infraestructura deportiva de barrio en zonas con mayor déficit y modernizar la existente.",
          problem: "" /* PENDIENTE: ingresa el inventario y déficit validado de losas y polideportivos por zona. */,
          solution: "Construir cinco losas multiusos, el Palacio de Vóley y un polideportivo en La Tomilla.",
          actions: [] /* PENDIENTE: ingresa acciones priorizadas de diagnóstico, expedientes, construcción y remodelación. */,
          schedule: "2027: diagnóstico y expedientes. 2028: dos losas. 2029: tres losas. 2030: remodelación del Palacio de Vóley.",
          image: "" /* PENDIENTE: agrega imagen oficial y texto alternativo del proyecto. */,
          indicator: "" /* PENDIENTE: agrega meta porcentual validada y su fuente; las cantidades de obras pueden detallarse en label y unit. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 1.2"
        },
        {
          id: "remodelacion-mercado-zonal",
          title: "Remodelación y Nueva Gestión del Mercado Zonal",
          categoryId: "desarrollo-urbano",
          year: "2027–2030",
          icon: "bi-shop-window",
          summary: "Modernizar la infraestructura comercial y el modelo de gestión del mercado para hacerlo competitivo, limpio y rentable.",
          problem: "" /* PENDIENTE: ingresa diagnóstico técnico, sanitario y comercial validado del mercado zonal. */,
          solution: "Mejorar puestos, cámaras frigoríficas, carga y descarga y patio de comidas, junto con capacitación, formalización y Mercado Saludable.",
          actions: [] /* PENDIENTE: ingresa acciones oficiales acordadas con comerciantes. */,
          schedule: "2027: socialización y expediente. 2028: inicio de obras. 2029: culminación y nuevo modelo de gestión. 2030: evaluación.",
          image: "" /* PENDIENTE: agrega fotografía o render oficial con alt y crédito. */,
          indicator: "" /* PENDIENTE: agrega indicador de avance validado, fuente y fecha de corte. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 1.3"
        },
        {
          id: "peatonalizacion-calle-arrospide",
          title: "Peatonalización de la Calle Arróspide",
          categoryId: "desarrollo-urbano",
          year: "2027–2028",
          icon: "bi-person-walking",
          summary: "Recuperar para el peatón un eje histórico y comercial integrado al circuito monumental de la Plaza de Cayma.",
          problem: "" /* PENDIENTE: ingresa diagnóstico de movilidad, espacio público y actividad comercial de la calle. */,
          solution: "Ejecutar una intervención con pavimento especial, mobiliario, iluminación LED, áreas verdes y soterrado de cableado.",
          actions: [] /* PENDIENTE: ingresa acciones del diseño participativo, expediente y ejecución. */,
          schedule: "2027: diseño participativo y expediente. 2028: ejecución de la obra.",
          image: "" /* PENDIENTE: agrega imagen oficial del ámbito de intervención. */,
          indicator: "" /* PENDIENTE: agrega indicador porcentual de avance físico o una meta validada. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 1.4"
        },
        {
          id: "escuela-deportiva-anual",
          title: "Escuela Deportiva Anual",
          categoryId: "desarrollo-urbano",
          year: "2027–2030",
          icon: "bi-dribbble",
          summary: "Promover deporte formativo y detectar talentos en niños, niñas y jóvenes mediante escuelas municipales gratuitas.",
          problem: "" /* PENDIENTE: ingresa línea base de participación deportiva, sedentarismo y demanda por disciplina. */,
          solution: "Ofrecer entrenamiento anual por niveles y disciplinas, ligas, competencias y articulación con el IPD y clubes.",
          actions: [] /* PENDIENTE: ingresa disciplinas, sedes, cupos y acciones oficialmente aprobadas. */,
          schedule: "2027: cinco disciplinas y liga distrital. 2028: ocho disciplinas y torneos. 2029: natación y juegos escolares. 2030: consolidación.",
          image: "" /* PENDIENTE: agrega imagen oficial de las escuelas deportivas. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de cobertura o cumplimiento con fuente y fecha. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 1.5"
        },
        {
          id: "velatorio-estacion-bomberos",
          title: "Servicios Urbanos Esenciales: Velatorio Municipal y Estación de Bomberos",
          categoryId: "desarrollo-urbano",
          year: "2027–2029",
          icon: "bi-building-gear",
          summary: "Proveer servicios dignos para el duelo y reducir tiempos de respuesta ante incendios y emergencias.",
          problem: "" /* PENDIENTE: ingresa diagnóstico de demanda, cobertura y tiempos de respuesta de ambos servicios. */,
          solution: "Construir un velatorio municipal y sanear un terreno estratégico para gestionar una estación de bomberos.",
          actions: [] /* PENDIENTE: ingresa por separado las acciones oficiales del velatorio y de la estación de bomberos. */,
          schedule: "Velatorio: expediente y construcción 2027–2028; operación 2029. Bomberos: saneamiento 2027; donación y gestión 2028.",
          image: "" /* PENDIENTE: agrega imagen oficial de cada servicio o una pieza aprobada que represente ambos. */,
          indicator: "" /* PENDIENTE: agrega indicador porcentual de avance con ficha técnica. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 1.6"
        },
        {
          id: "semaforizacion-inteligente",
          title: "Plan de Semaforización Inteligente",
          categoryId: "movilidad",
          year: "2027–2030",
          icon: "bi-traffic-light",
          summary: "Reducir la congestión en los corredores principales mediante regulación inteligente del tránsito.",
          problem: "" /* PENDIENTE: ingresa línea base de congestión, tiempos de viaje e intersecciones críticas. */,
          solution: "Instalar un sistema centralizado con radares, cámaras, olas verdes y paneles informativos en corredores priorizados.",
          actions: [] /* PENDIENTE: ingresa las intersecciones y fases oficialmente priorizadas. */,
          schedule: "2027: diagnóstico. 2028: primera fase en cinco intersecciones. 2029: segunda fase en cinco intersecciones. 2030: evaluación.",
          image: "" /* PENDIENTE: agrega imagen o esquema técnico oficial. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de reducción o avance validado, fuente y fecha. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 2.1"
        },
        {
          id: "conexion-vial-samay-la-tomilla",
          title: "Nueva Conexión Vial Samay - La Tomilla",
          categoryId: "movilidad",
          year: "2027–2029",
          icon: "bi-signpost-split-fill",
          summary: "Crear una ruta alterna que descongestione la avenida Cayma y conecte la zona alta con la residencial Samay.",
          problem: "" /* PENDIENTE: ingresa estudio de tráfico, demanda y viabilidad del trazado. */,
          solution: "Abrir y asfaltar una vía nueva, con expediente municipal y ejecución gestionada ante el Gobierno Regional.",
          actions: [] /* PENDIENTE: ingresa hitos técnicos, prediales, ambientales y financieros confirmados. */,
          schedule: "2027: expediente municipal. 2028: financiamiento y convenio con el GRA. 2029: ejecución prevista por el GRA.",
          image: "" /* PENDIENTE: agrega plano o render oficial de la conexión vial. */,
          indicator: "" /* PENDIENTE: agrega indicador de avance físico o gestión validado. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 2.2"
        },
        {
          id: "red-ciclovias-integradas",
          title: "Red de Ciclovías Integradas",
          categoryId: "movilidad",
          year: "2027–2030",
          icon: "bi-bicycle",
          summary: "Fomentar movilidad sostenible y saludable como alternativa al transporte motorizado.",
          problem: "" /* PENDIENTE: ingresa línea base de infraestructura ciclista, demanda y seguridad vial. */,
          solution: "Construir una ciclovía de cinco kilómetros en dos tramos e instalar bicicleteros seguros.",
          actions: [] /* PENDIENTE: ingresa trazado, puntos de conexión y acciones de seguridad oficialmente validadas. */,
          schedule: "2027: diseño participativo. 2028: primer tramo de 2 km. 2029: segundo tramo de 3 km. 2030: mantenimiento y promoción.",
          image: "" /* PENDIENTE: agrega plano o imagen oficial de la red. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de ejecución o cobertura validado. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 2.3"
        },
        {
          id: "acceso-chapi-chico",
          title: "Mejora del Acceso a Chapí Chico",
          categoryId: "movilidad",
          year: "2027–2029",
          icon: "bi-geo-alt-fill",
          summary: "Facilitar el acceso al Santuario de Chapí y mejorar la fluidez vehicular en el ingreso al distrito.",
          problem: "" /* PENDIENTE: ingresa diagnóstico de seguridad vial, congestión y estado de la vía. */,
          solution: "Gestionar asfaltado, bermas, seguridad vial y una salida hacia la avenida ASA mediante coordinación con el GRA.",
          actions: [] /* PENDIENTE: ingresa acuerdos, competencias y fases de ejecución confirmadas. */,
          schedule: "2027–2028: gestiones y convenios con el GRA. 2029: licitación y ejecución prevista.",
          image: "" /* PENDIENTE: agrega plano o fotografía oficial del acceso. */,
          indicator: "" /* PENDIENTE: agrega indicador de gestión o avance físico validado. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 2.4"
        },
        {
          id: "centro-control-c4",
          title: "Centro de Control y Videovigilancia Inteligente (C4)",
          categoryId: "seguridad",
          year: "2027–2030",
          icon: "bi-camera-video-fill",
          summary: "Implementar un sistema de monitoreo de última generación para prevención y reacción rápida ante el delito.",
          problem: "" /* PENDIENTE: ingresa línea base de cámaras, cobertura, incidencias y tiempos de respuesta. */,
          solution: "Integrar 100 cámaras con ANPR y reconocimiento facial, cámaras de serenazgo, PNP y seguridad privada en una plataforma.",
          actions: [] /* PENDIENTE: ingresa puntos priorizados, protocolos, salvaguardas legales y fases técnicas aprobadas. */,
          schedule: "2027: adquisición e instalación. 2028: operación 24/7. 2029: ampliación de cobertura. 2030: integración total.",
          image: "" /* PENDIENTE: agrega imagen o render oficial del C4. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de cobertura o implementación con fuente y fecha. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 3.1"
        },
        {
          id: "base-serenazgo-valle-chilina",
          title: "Base de Serenazgo en el Valle de Chilina",
          categoryId: "seguridad",
          year: "2027–2030",
          icon: "bi-shield-fill-check",
          summary: "Proteger el Valle de Chilina y zonas aledañas con seguridad mixta y capacidad de patrullaje ecuestre.",
          problem: "" /* PENDIENTE: ingresa diagnóstico de delitos, accesibilidad y cobertura de vigilancia del valle. */,
          solution: "Construir un puesto integrado de Serenazgo y PNP con comando, establos, personal, vehículos y conexión al C4.",
          actions: [] /* PENDIENTE: ingresa convenios, terreno, componentes y protocolos oficialmente aprobados. */,
          schedule: "2027: terreno, expediente y convenios. 2028: construcción y capacitación. 2029: operación. 2030: consolidación.",
          image: "" /* PENDIENTE: agrega render o imagen oficial de la base. */,
          indicator: "" /* PENDIENTE: agrega indicador de cobertura o avance validado. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 3.2"
        },
        {
          id: "vecino-vigilante-4",
          title: "Programa Vecino Vigilante 4.0",
          categoryId: "seguridad",
          year: "2027–2030",
          icon: "bi-people-fill",
          summary: "Empoderar a las juntas vecinales como primer anillo de seguridad e integrarlas a la vigilancia municipal.",
          problem: "" /* PENDIENTE: ingresa número y estado actual de juntas vecinales y canales de alerta. */,
          solution: "Reactivar juntas, implementar un aplicativo con botón de pánico e incentivos para participación vecinal.",
          actions: [] /* PENDIENTE: ingresa reglas, protección de datos, protocolos e incentivos oficialmente validados. */,
          schedule: "2027: convocatoria, registro y desarrollo del aplicativo. 2028–2030: capacitación, implementación e incentivos.",
          image: "" /* PENDIENTE: agrega imagen oficial del programa o de la aplicación. */,
          indicator: "" /* PENDIENTE: agrega indicador de cobertura o participación validado. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 3.3"
        },
        {
          id: "cayma-brillante",
          title: "Plan de Iluminación Total Cayma Brillante",
          categoryId: "seguridad",
          year: "2027–2030",
          icon: "bi-lightbulb-fill",
          summary: "Eliminar puntos oscuros y mejorar el espacio público nocturno con alumbrado autónomo y renovable.",
          problem: "" /* PENDIENTE: ingresa el mapa validado de puntos oscuros, cobertura y fallas del alumbrado actual. */,
          solution: "Instalar progresivamente luminarias solares LED en parques, vías, pasajes, ciclovías y zonas altas.",
          actions: [] /* PENDIENTE: ingresa zonas, cantidades, especificaciones y fases oficialmente aprobadas. */,
          schedule: "2027: diagnóstico y piloto. 2028: 1,500 luminarias. 2029: 1,500 adicionales. 2030: 2,000 adicionales y evaluación.",
          image: "" /* PENDIENTE: agrega imagen oficial del sistema o zonas intervenidas. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de puntos priorizados atendidos con fuente y fecha. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 3.4"
        },
        {
          id: "hospital-nivel-ii",
          title: "Gestión del Hospital Nivel II en Cayma",
          categoryId: "salud-bienestar",
          year: "2027–2030",
          icon: "bi-hospital-fill",
          summary: "Sentar las bases para un hospital que atienda partos, emergencias y especialidades dentro de Cayma.",
          problem: "" /* PENDIENTE: ingresa línea base de demanda, derivaciones, tiempos de viaje y brecha hospitalaria. */,
          solution: "Sanear un terreno municipal de 20,000 m² y elaborar perfil y expediente para gestión regional o nacional.",
          actions: [] /* PENDIENTE: ingresa acuerdos, competencias, terreno y pasos de inversión confirmados. */,
          schedule: "2027: saneamiento del terreno. 2028: perfil y expediente. 2029–2030: presupuesto y convenio con GRA/Minsa.",
          image: "" /* PENDIENTE: agrega render o imagen oficial del hospital. */,
          indicator: "" /* PENDIENTE: agrega indicador de madurez o avance del proyecto validado. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 4.1"
        },
        {
          id: "topicos-salva-en-tu-barrio",
          title: "Tópico Municipal Salva en tu Barrio",
          categoryId: "salud-bienestar",
          year: "2027–2030",
          icon: "bi-heart-pulse-fill",
          summary: "Llevar atención médica primaria a las zonas más alejadas del distrito.",
          problem: "" /* PENDIENTE: ingresa mapa de demanda, población objetivo y distancia a establecimientos existentes. */,
          solution: "Implementar centros de atención primaria con médico, enfermería, vacunación, controles y primeros auxilios.",
          actions: [] /* PENDIENTE: ingresa sedes, cartera de servicios, horarios y convenios confirmados. */,
          schedule: "2027: primer tópico. 2028: segundo. 2029: tercero. 2030: evaluación y ampliación.",
          image: "" /* PENDIENTE: agrega imagen oficial del tópico o servicio. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de población cubierta o cumplimiento validado. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 4.2"
        },
        {
          id: "mano-que-ayuda-al-hermano",
          title: "Programa Mano que Ayuda al Hermano",
          categoryId: "salud-bienestar",
          year: "2027–2030",
          icon: "bi-person-hearts",
          summary: "Brindar soporte territorial a personas y familias en situación de vulnerabilidad mediante gestores sociales zonales.",
          problem: "" /* PENDIENTE: ingresa padrón, línea base y caracterización validada de población vulnerable. */,
          solution: "Crear una red de gestores para visitas, derivaciones, acceso a programas, prevención y apoyo alimentario de emergencia.",
          actions: [] /* PENDIENTE: ingresa cobertura, protocolos, servicios y metas anuales oficialmente aprobados. */,
          schedule: "2027: mapeo y conformación del equipo. 2028–2030: implementación progresiva y metas anuales de atención.",
          image: "" /* PENDIENTE: agrega imagen oficial del programa con consentimiento y crédito. */,
          indicator: "" /* PENDIENTE: agrega indicador de cobertura o casos atendidos convertido a meta 0–100. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 4.3"
        },
        {
          id: "comedores-ollas-populares",
          title: "Fortalecimiento de Comedores Comunes y Ollas Populares",
          categoryId: "salud-bienestar",
          year: "2027–2030",
          icon: "bi-cup-hot-fill",
          summary: "Mejorar infraestructura, equipamiento y gestión para ofrecer alimentación segura y nutritiva.",
          problem: "" /* PENDIENTE: valida el catastro estimado de 30 a 50 comedores, beneficiarios y necesidades. */,
          solution: "Realizar catastro, entregar equipamiento, mejorar locales, capacitar y articular programas y donaciones.",
          actions: [] /* PENDIENTE: ingresa locales, lotes, criterios y metas oficiales de equipamiento. */,
          schedule: "2027: catastro y 15 comedores. 2028: 20 adicionales. 2029: restantes. 2030: evaluación y sostenibilidad.",
          image: "" /* PENDIENTE: agrega imagen oficial con autorización y texto alternativo. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de comedores priorizados atendidos con fuente y fecha. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 4.4"
        },
        {
          id: "deteccion-anemia-obras-impuestos",
          title: "Equipamiento Tecnológico para Detección de Anemia mediante Obras por Impuestos",
          categoryId: "salud-bienestar",
          year: "2027–2030",
          icon: "bi-activity",
          summary: "Equipar centros de salud para detección temprana y seguimiento de anemia en población prioritaria.",
          problem: "" /* PENDIENTE: ingresa prevalencia, línea base de tamizajes y capacidad actual por establecimiento. */,
          solution: "Adquirir equipos semiautomáticos o automatizados, capacitar personal y articular resultados con suplementación.",
          actions: [] /* PENDIENTE: ingresa establecimientos, modalidad, empresa, equipos y protocolos confirmados. */,
          schedule: "2027: perfil, expediente y empresa. 2028: convenio, equipos y operación. 2029: evaluación y ampliación. 2030: consolidación.",
          image: "" /* PENDIENTE: agrega imagen oficial del equipamiento o servicio. */,
          indicator: "" /* PENDIENTE: agrega meta porcentual de tamizaje o reducción, línea base, fuente y fecha. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 4.5"
        },
        {
          id: "saberes-productivos",
          title: "Programa Saberes Productivos con Adultos Mayores",
          categoryId: "salud-bienestar",
          year: "2027–2030",
          icon: "bi-stars",
          summary: "Recuperar y transmitir saberes tradicionales de adultos mayores y generar encuentros e iniciativas productivas.",
          problem: "" /* PENDIENTE: ingresa mapeo de portadores de saberes, oficios y demanda de talleres. */,
          solution: "Identificar maestros, realizar talleres y ferias, registrar conocimientos y articular productos con Marca Cayma.",
          actions: [] /* PENDIENTE: ingresa oficios, sedes, cupos y mecanismos de comercialización confirmados. */,
          schedule: "2027: mapeo y cuatro talleres. 2028: ocho talleres y primera feria. 2029: itinerancia y libro. 2030: consolidación.",
          image: "" /* PENDIENTE: agrega imagen oficial con autorización y crédito. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de cobertura o cumplimiento con fuente y fecha. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 4.6"
        },
        {
          id: "cayma-sin-alcoholismo",
          title: "Convenio Cayma sin Alcoholismo",
          categoryId: "salud-bienestar",
          year: "" /* PENDIENTE CRÍTICO: confirma el periodo; el cronograma del PDF repite por error la propuesta 4.3. */,
          icon: "bi-slash-circle-fill",
          summary: "Prevenir el alcoholismo, la violencia familiar y el deterioro del espacio público.",
          problem: "" /* PENDIENTE: ingresa diagnóstico validado de consumo problemático, población objetivo y servicios existentes. */,
          solution: "Articular campañas preventivas, detección temprana y derivación a centros de rehabilitación con atención preferencial.",
          actions: [] /* PENDIENTE: ingresa las acciones correctas una vez validada una versión corregida del plan. */,
          schedule: "" /* PENDIENTE CRÍTICO: ingresa el cronograma oficial corregido; no copies el bloque actual del PDF. */,
          image: "" /* PENDIENTE: agrega imagen oficial de prevención, evitando estigmatización. */,
          indicator: "" /* PENDIENTE: agrega indicador validado de prevención, detección o derivación. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 4.7; cronograma pendiente de corrección"
        },
        {
          id: "marca-cayma",
          title: "Lanzamiento e Implementación de la Marca Cayma",
          categoryId: "desarrollo-economico",
          year: "2027–2030",
          icon: "bi-award-fill",
          summary: "Posicionar a Cayma como destino y marca con identidad propia que agregue valor a productos, servicios y atractivos.",
          problem: "" /* PENDIENTE: ingresa línea base de posicionamiento, negocios adheridos, oferta turística y percepción de marca. */,
          solution: "Construir participativamente una identidad de marca, adherir negocios y promover el distrito y sus productos.",
          actions: [] /* PENDIENTE: ingresa manual de marca, criterios de adhesión, campañas y responsables oficialmente aprobados. */,
          schedule: "2027: talleres y lanzamiento. 2028: adhesión de 50 negocios. 2029: promoción turística. 2030: 100 negocios y reconocimiento.",
          image: "" /* PENDIENTE: agrega el logotipo y manual de uso oficiales, con alt y crédito. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de meta de adhesión o reconocimiento con fuente y fecha. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 5.1"
        },
        {
          id: "circuito-la-paccha-valle-chilina",
          title: "Puesta en Valor del Circuito Turístico La Paccha y Valle de Chilina",
          categoryId: "desarrollo-economico",
          year: "2027–2030",
          icon: "bi-map-fill",
          summary: "Convertir los atractivos naturales de Cayma en productos turísticos seguros y sostenibles.",
          problem: "" /* PENDIENTE: ingresa inventario turístico, estado del circuito, visitas, riesgos y capacidad de carga. */,
          solution: "Intervenir La Paccha, crear una ruta señalizada en el Valle de Chilina, capacitar guías y promover negocios asociados.",
          actions: [] /* PENDIENTE: ingresa trazado, obras, salvaguardas ambientales, operadores y acciones confirmadas. */,
          schedule: "2027: proyecto de señalización y mejoras. 2028: ejecución, capacitación y operación. 2029–2030: promoción continua.",
          image: "" /* PENDIENTE: agrega fotografía oficial del circuito con crédito. */,
          indicator: "" /* PENDIENTE: agrega indicador de avance, visitas o satisfacción validado. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 5.2"
        },
        {
          id: "impulsa-cayma",
          title: "Centro de Desarrollo Empresarial Impulsa Cayma",
          categoryId: "desarrollo-economico",
          year: "2027–2030",
          icon: "bi-briefcase-fill",
          summary: "Fortalecer el ecosistema emprendedor, formalizar negocios y conectar a MYPES con financiamiento, capacitación y mercados.",
          problem: "" /* PENDIENTE: ingresa censo validado de MYPES, formalidad, empleo, ventas y brechas de financiamiento. */,
          solution: "Crear una ventanilla empresarial con asistencia, formación, Procompite, ruedas de negocios, observatorio y Marca Cayma.",
          actions: [] /* PENDIENTE: ingresa cartera de servicios, criterios, aliados, presupuesto y metas oficiales. */,
          schedule: "2027: oficina, reglamento, censo, convenios y primera convocatoria. 2028: operación y expansión. 2029: especialización. 2030: consolidación.",
          image: "" /* PENDIENTE: agrega imagen oficial del centro o sus servicios. */,
          indicator: "" /* PENDIENTE: agrega meta porcentual de formalización, empleo o supervivencia empresarial con fuente. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 5.3"
        },
        {
          id: "cayma-capacita",
          title: "Escuela de Oficios Cayma Capacita",
          categoryId: "desarrollo-economico",
          year: "2027–2030",
          icon: "bi-tools",
          summary: "Brindar formación técnica gratuita o de bajo costo en oficios con demanda para mejorar empleabilidad e ingresos.",
          problem: "" /* PENDIENTE: ingresa estudio de demanda laboral, población objetivo, oferta formativa y brechas de acceso. */,
          solution: "Ofrecer cursos prácticos certificados, talleres en zona alta, bolsa de trabajo y seguimiento de egresados.",
          actions: [] /* PENDIENTE: ingresa oficios priorizados, sedes, cupos, certificadores y convenios confirmados. */,
          schedule: "2027: diagnóstico y cuatro cursos. 2028: ocho oficios y talleres en zona alta. 2029: especialización. 2030: consolidación.",
          image: "" /* PENDIENTE: agrega imagen oficial de talleres o estudiantes con autorización. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de egresados insertados laboralmente con línea base y fecha. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 5.4"
        },
        {
          id: "chacra-olla-expoagro",
          title: "Programa De la Chacra a la Olla y EXPOAGRO Cayma",
          categoryId: "desarrollo-economico",
          year: "2027–2030",
          icon: "bi-basket-fill",
          summary: "Potenciar la agricultura local y acercar directamente al productor con el consumidor.",
          problem: "" /* PENDIENTE: ingresa padrón de productores, canales de venta, precios, producción y demanda. */,
          solution: "Organizar ferias itinerantes semanales y una EXPOAGRO anual de tres días bajo Marca Cayma.",
          actions: [] /* PENDIENTE: ingresa calendario, sedes, productores, condiciones sanitarias y organización confirmada. */,
          schedule: "2027: primeras ferias itinerantes. 2028–2030: doce ferias anuales y EXPOAGRO anual.",
          image: "" /* PENDIENTE: agrega imagen oficial de productores o ferias con crédito. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de productores participantes o crecimiento de ventas validado. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 5.5"
        },
        {
          id: "escuela-preuniversitaria",
          title: "Escuela Municipal Preuniversitaria",
          categoryId: "desarrollo-economico",
          year: "2027–2030",
          icon: "bi-book-fill",
          summary: "Brindar preparación gratuita o de costo social para jóvenes que postulan a universidades e institutos.",
          problem: "" /* PENDIENTE: ingresa población objetivo, demanda, costos actuales y tasas de ingreso de referencia. */,
          solution: "Ofrecer cursos regulares e intensivos, docentes calificados, espacios de estudio y acceso priorizado para bajos recursos.",
          actions: [] /* PENDIENTE: ingresa currículo, sedes, turnos, criterios, cupos y convenios confirmados. */,
          schedule: "2027: primera convocatoria de 100 a 150 estudiantes. 2028: dos turnos o sedes. 2029: intensivos y simulacros. 2030: consolidación.",
          image: "" /* PENDIENTE: agrega imagen oficial de las actividades educativas con autorización. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de ingreso o culminación con fuente y fecha. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 5.6"
        },
        {
          id: "carnaval-loncco",
          title: "Escuela Municipal de Identidad Cultural Carnaval Loncco",
          categoryId: "desarrollo-economico",
          year: "2027–2030",
          icon: "bi-music-note-beamed",
          summary: "Recuperar, preservar y difundir música, canto, baile, vestimenta y costumbres del carnaval loncco.",
          problem: "" /* PENDIENTE: ingresa mapeo de portadores, estudiantes, agrupaciones y riesgo de pérdida de la tradición. */,
          solution: "Crear una escuela anual gratuita con maestros tradicionales, agrupación juvenil, concurso y registro audiovisual.",
          actions: [] /* PENDIENTE: ingresa disciplinas, docentes, sede, cupos y programación cultural confirmada. */,
          schedule: "2027: maestros, convocatoria e inicio de clases. 2028: primera promoción y agrupación. 2029: ampliación. 2030: consolidación.",
          image: "" /* PENDIENTE: agrega imagen oficial de la tradición con autorización y crédito. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de cobertura, permanencia o actividades cumplidas. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 5.7"
        },
        {
          id: "planetario-centro-ciencia",
          title: "Estudio de Factibilidad para un Planetario y Centro de Ciencia",
          categoryId: "desarrollo-economico",
          year: "2027–2030",
          icon: "bi-stars",
          summary: "Evaluar un proyecto de gran envergadura que posicione a Cayma como destino de turismo científico.",
          problem: "" /* PENDIENTE: ingresa estudio de demanda, posibles terrenos, contaminación lumínica, costos y aliados. */,
          solution: "Realizar estudios de mercado y preinversión con universidades o CONCYTEC para un centro astronómico y científico.",
          actions: [] /* PENDIENTE: ingresa alcance, metodología, aliados y criterios de viabilidad confirmados. */,
          schedule: "2027–2029: factibilidad, aliados y perfil. 2030: presentación a potenciales inversionistas o al Gobierno Nacional.",
          image: "" /* PENDIENTE: agrega visualización oficial del concepto cuando exista. */,
          indicator: "" /* PENDIENTE: agrega indicador de avance de estudios y acuerdos validado. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 5.8"
        },
        {
          id: "vivero-compostaje",
          title: "Vivero Municipal y Planta de Compostaje",
          categoryId: "medio-ambiente",
          year: "2027–2030",
          icon: "bi-tree-fill",
          summary: "Producir insumos verdes de manera sostenible y reducir residuos orgánicos enviados al vertedero.",
          problem: "" /* PENDIENTE: ingresa línea base de plantones, costos, residuos orgánicos y demanda de compost. */,
          solution: "Implementar un vivero para 50,000 plantones anuales y una planta que produzca compost y biol.",
          actions: [] /* PENDIENTE: ingresa terreno, especies, capacidad, flujos de residuos y operación confirmada. */,
          schedule: "2027: adecuación e implementación inicial. 2028: operación. 2029–2030: escalamiento.",
          image: "" /* PENDIENTE: agrega imagen o plano oficial del vivero y la planta. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de capacidad instalada o producción cumplida con fuente. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 6.1"
        },
        {
          id: "corredor-verde",
          title: "Recuperación del Corredor Verde Deán Valdivia - 01 de Junio",
          categoryId: "medio-ambiente",
          year: "2027–2030",
          icon: "bi-signpost-2-fill",
          summary: "Crear un pulmón verde lineal que conecte zonas residenciales y mejore la calidad de vida.",
          problem: "" /* PENDIENTE: ingresa situación predial, ambiental, de movilidad y áreas verdes del corredor. */,
          solution: "Convertir una franja marginal en parque lineal de dos kilómetros con veredas, ciclovía, árboles y equipamiento.",
          actions: [] /* PENDIENTE: ingresa trazado, expediente, financiamiento, etapas y salvaguardas confirmadas. */,
          schedule: "2027–2028: expediente y financiamiento. 2029: primer kilómetro. 2030: culminación de la primera etapa.",
          image: "" /* PENDIENTE: agrega plano o render oficial del corredor. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de avance físico o incremento de área verde validado. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 6.2"
        },
        {
          id: "soporte-agropecuario-riego",
          title: "Programa de Soporte Agropecuario y Riego Tecnificado",
          categoryId: "medio-ambiente",
          year: "2027–2030",
          icon: "bi-droplet-fill",
          summary: "Hacer más rentable y sostenible la actividad agrícola del distrito.",
          problem: "" /* PENDIENTE: ingresa padrón agrícola, consumo hídrico, productividad y brechas de asistencia técnica. */,
          solution: "Crear una oficina agropecuaria y ejecutar progresivamente riego por goteo con agua tratada para áreas verdes.",
          actions: [] /* PENDIENTE: ingresa beneficiarios, ámbitos, convenios, fuentes de agua y fases confirmadas. */,
          schedule: "2027: oficina y diagnóstico. 2028–2030: asistencia continua y ejecución progresiva del riego tecnificado.",
          image: "" /* PENDIENTE: agrega imagen oficial de agricultura o riego con crédito. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de área o productores atendidos con fuente y fecha. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 6.3"
        },
        {
          id: "bioguerto-granja-municipal",
          title: "Bioguerto y Granja Municipal",
          categoryId: "medio-ambiente",
          year: "2027–2030",
          icon: "bi-flower1",
          summary: "Producir alimentos frescos y abono de forma sostenible para comedores populares y familias vulnerables.",
          problem: "" /* PENDIENTE: ingresa demanda alimentaria, terreno, capacidad productiva, costos y beneficiarios. */,
          solution: "Implementar huerto orgánico, gallinas ponedoras, animales menores, compostaje, capacitación y entrega a comedores.",
          actions: [] /* PENDIENTE: ingresa terreno, especies, bioseguridad, producción, distribución y operación confirmadas. */,
          schedule: "2027: terreno y expediente. 2028: construcción y piloto. 2029: producción y entregas. 2030: ampliación y evaluación.",
          image: "" /* PENDIENTE: agrega plano o imagen oficial de la unidad productiva. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de capacidad o cobertura alimentaria con fuente. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 6.4"
        },
        {
          id: "eco-canje-recicladores",
          title: "Programa Eco-Canje y Formalización de Recicladores",
          categoryId: "medio-ambiente",
          year: "2027–2030",
          icon: "bi-recycle",
          summary: "Incentivar el reciclaje en hogares y dignificar la labor de recicladores.",
          problem: "" /* PENDIENTE: ingresa línea base de residuos, segregación, recicladores y puntos de acopio. */,
          solution: "Instalar puntos limpios, otorgar puntos ecológicos canjeables y formalizar asociaciones de recicladores.",
          actions: [] /* PENDIENTE: ingresa materiales, incentivos, puntos, aliados y reglas oficialmente aprobadas. */,
          schedule: "2027: diseño y convocatoria. 2028–2030: puntos limpios y campañas de canje.",
          image: "" /* PENDIENTE: agrega imagen oficial del programa o recicladores con autorización. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de hogares participantes o material valorizado con fuente. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 6.5"
        },
        {
          id: "operacion-titulo",
          title: "Operación Título: Saneamiento en La Nueva Cayma",
          categoryId: "saneamiento",
          year: "2027–2030",
          icon: "bi-house-check-fill",
          summary: "Acelerar masivamente la entrega de títulos de propiedad en asentamientos humanos de la zona alta.",
          problem: "" /* PENDIENTE: valida la formalidad de 78%, el padrón de predios y los expedientes por zona. */,
          solution: "Crear una oficina móvil con equipo multidisciplinario para catastro, planos, saneamiento y gestión ante COFOPRI.",
          actions: [] /* PENDIENTE: ingresa ámbitos, requisitos, convenios, metas y responsabilidades confirmadas. */,
          schedule: "2027: 300 títulos. 2028: 400. 2029: 400. 2030: 400; meta acumulada del plan: 1,500 títulos.",
          image: "" /* PENDIENTE: agrega imagen oficial de la oficina o actividad de titulación. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de la meta acumulada con fuente y fecha de corte. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 7.1"
        },
        {
          id: "brecha-agua-potable",
          title: "Cierre de Brecha de Agua Potable",
          categoryId: "saneamiento",
          year: "2027–2030",
          icon: "bi-droplet-half",
          summary: "Llevar agua potable y alcantarillado a las familias que todavía no cuentan con estos servicios.",
          problem: "" /* PENDIENTE: valida cobertura de 92.4%, población sin servicio, ámbitos y línea base por sistema. */,
          solution: "Elaborar perfiles y expedientes de redes matrices y bombeo para gestión de inversiones ante SEDAPAR y GRA.",
          actions: [] /* PENDIENTE: ingresa proyectos, sectores, competencias, financiamiento y acuerdos confirmados. */,
          schedule: "2027–2028: perfiles y expedientes. 2029–2030: gestión y supervisión de ejecución ante SEDAPAR/GRA.",
          image: "" /* PENDIENTE: agrega plano o imagen oficial de los sistemas propuestos. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de población o expedientes atendidos con fuente. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 7.2"
        },
        {
          id: "reservorio-n46-jas",
          title: "Puesta en Marcha del Reservorio N46 y Sistemas JAS",
          categoryId: "saneamiento",
          year: "2027–2030",
          icon: "bi-moisture",
          summary: "Garantizar agua segura para zonas sobre los 2,800 msnm mediante JAS y aprovechamiento de fuentes locales.",
          problem: "" /* PENDIENTE: valida población estimada de 8,000 a 10,000 personas, infraestructura, fuentes y condición del reservorio N46. */,
          solution: "Mapear fuentes e infraestructura, conformar JAS, gestionar licencia ANA, rehabilitar sistemas y ampliar cobertura.",
          actions: [] /* PENDIENTE: ingresa diagnóstico hidrogeológico, fuente elegida, licencia, sectores y diseño confirmados. */,
          schedule: "2027: mapeo, catastro, fuentes y primeras JAS. 2028: licencia y piloto. 2029: ampliación. 2030: consolidación autónoma.",
          image: "" /* PENDIENTE: agrega imagen técnica oficial del reservorio o sistemas. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de población cubierta o sistemas operativos con fuente. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 7.3"
        },
        {
          id: "fortalecimiento-jas",
          title: "Fortalecimiento de Juntas Administradoras de Servicios",
          categoryId: "saneamiento",
          year: "2027–2030",
          icon: "bi-people-fill",
          summary: "Capacitar y asistir a organizaciones comunales que gestionan agua donde no llega la red pública.",
          problem: "" /* PENDIENTE: ingresa padrón de JAS, formalidad, capacidades, calidad y continuidad del servicio. */,
          solution: "Ofrecer capacitación administrativa, operativa, legal y contable y asistencia para formalización.",
          actions: [] /* PENDIENTE: ingresa organizaciones, módulos, frecuencia, responsables y metas confirmadas. */,
          schedule: "2027–2030: capacitaciones periódicas y asistencia técnica continua.",
          image: "" /* PENDIENTE: agrega imagen oficial de capacitación con autorización. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de JAS formalizadas o capacitadas con fuente y fecha. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 7.4"
        },
        {
          id: "ventanilla-unica-digital",
          title: "Ventanilla Única Digital y Simplificación de Trámites",
          categoryId: "modernizacion",
          year: "2027–2030",
          icon: "bi-window-stack",
          summary: "Eliminar filas y burocracia en trámites municipales mediante servicios digitales y rediseño de procesos.",
          problem: "" /* PENDIENTE: ingresa catálogo, tiempos actuales, demanda, costos y madurez digital de cada trámite. */,
          solution: "Implementar plataforma web y aplicación para trámites frecuentes y reducir plazos internos.",
          actions: [] /* PENDIENTE: ingresa trámites priorizados, integraciones, seguridad, accesibilidad y responsables. */,
          schedule: "2027: desarrollo y rediseño. 2028–2030: operación y mejora continua.",
          image: "" /* PENDIENTE: agrega capturas o diseño oficial de la plataforma cuando exista. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de trámites digitalizados o reducción de tiempos con fuente. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 8.1"
        },
        {
          id: "transparencia-datos-abiertos",
          title: "Portal de Transparencia y Datos Abiertos",
          categoryId: "modernizacion",
          year: "2027–2030",
          icon: "bi-database-fill-gear",
          summary: "Hacer la gestión municipal visible y fiscalizable mediante información actualizada y formatos abiertos.",
          problem: "" /* PENDIENTE: ingresa diagnóstico de cumplimiento, actualización, calidad y reutilización de información pública. */,
          solution: "Publicar presupuesto, contratos, adquisiciones y planillas en un portal intuitivo, descargable y actualizado.",
          actions: [] /* PENDIENTE: ingresa datasets, responsables, frecuencia, estándares y política de datos confirmados. */,
          schedule: "2027: diseño e implementación. 2028–2030: actualización mensual y mejora continua.",
          image: "" /* PENDIENTE: agrega diseño o captura oficial del portal cuando exista. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de conjuntos actualizados o cumplimiento con fuente y fecha. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 8.2"
        },
        {
          id: "decide-cayma",
          title: "Presupuesto Participativo Vinculante Decide Cayma",
          categoryId: "modernizacion",
          year: "2027–2030",
          icon: "bi-check2-square",
          summary: "Devolver al vecino capacidad de decisión sobre una parte del presupuesto municipal de inversiones.",
          problem: "" /* PENDIENTE: ingresa participación actual, presupuesto elegible, zonas y evaluación de procesos anteriores. */,
          solution: "Implementar un proceso anual de propuesta y votación y asignar 10% del presupuesto de inversiones a proyectos ganadores.",
          actions: [] /* PENDIENTE: ingresa reglamento, universo presupuestal, votación, vigilancia y cronograma confirmados. */,
          schedule: "2027: reglamento y talleres. 2028–2030: procesos anuales de presupuesto participativo.",
          image: "" /* PENDIENTE: agrega imagen oficial de participación o de la plataforma. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de participación o ejecución de proyectos con fuente. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 8.3"
        },
        {
          id: "conversando-alcalde-colegios",
          title: "Programa Conversando con el Alcalde para Colegios",
          categoryId: "modernizacion",
          year: "2027–2030",
          icon: "bi-chat-square-dots-fill",
          summary: "Acercar el gobierno municipal a estudiantes y recoger sus propuestas mediante encuentros periódicos.",
          problem: "" /* PENDIENTE: ingresa padrón de colegios, participación actual y mecanismos de seguimiento existentes. */,
          solution: "Programar sesiones, actas de compromisos, consejo consultivo estudiantil y pequeños proyectos participativos.",
          actions: [] /* PENDIENTE: ingresa colegios, calendario, selección, protección de menores y recursos confirmados. */,
          schedule: "2027: mapeo y primeras atenciones. 2028: dos colegios por mes y consejo consultivo. 2029: segunda ronda. 2030: evaluación e institucionalización.",
          image: "" /* PENDIENTE: agrega imagen oficial con autorizaciones de uso, especialmente si aparecen menores. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de colegios atendidos o compromisos cumplidos con fuente. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 8.4"
        },
        {
          id: "capacitacion-funcionarios",
          title: "Programa de Capacitación y Evaluación a Funcionarios",
          categoryId: "modernizacion",
          year: "2027–2030",
          icon: "bi-person-workspace",
          summary: "Contar con una burocracia profesional, eficiente y con vocación de servicio.",
          problem: "" /* PENDIENTE: ingresa línea base de competencias, desempeño, atención y necesidades formativas. */,
          solution: "Implementar formación en atención, ética y gestión por resultados y un sistema transparente de evaluación.",
          actions: [] /* PENDIENTE: ingresa malla, cobertura, evaluación, incentivos y responsables confirmados. */,
          schedule: "2027: diseño del programa. 2028–2030: capacitaciones continuas y evaluaciones periódicas.",
          image: "" /* PENDIENTE: agrega imagen oficial de capacitación institucional. */,
          indicator: "" /* PENDIENTE: agrega porcentaje de personal capacitado o mejora de desempeño con fuente. */,
          source: "Plan de Gobierno Municipal Cayma 2027–2030, propuesta 8.5"
        }
      ]
    },

    roadmap: {
      enabled: true,
      heading: {
        kicker: "Ejecución y monitoreo",
        titleTemplate: "Hoja de ruta {district} {period}",
        description: "Hitos representativos de los cuatro años. El cronograma detallado de cada iniciativa se encuentra en su propuesta."
      },
      defaultStageId: "2027",
      stages: [
        {
          id: "2027",
          periodLabel: "2027",
          label: "Planeamiento",
          description: "Expedientes, diagnósticos, saneamiento, diseño de programas e instalación de capacidades.",
          projects: [
            { id: "roadmap-piscina-2027", proposalId: "piscina-municipal-temperada", axisId: "desarrollo-urbano", description: "Expediente técnico y estructuración de la APP.", periodLabel: "Año 1", indicatorLabel: "Expediente y APP", status: "Planeamiento" },
            { id: "roadmap-semaforos-2027", proposalId: "semaforizacion-inteligente", axisId: "movilidad", description: "Diagnóstico de puntos críticos y elaboración del proyecto.", periodLabel: "Año 1", indicatorLabel: "Diagnóstico", status: "Planeamiento" },
            { id: "roadmap-c4-2027", proposalId: "centro-control-c4", axisId: "seguridad", description: "Adquisición de equipos e instalación de infraestructura.", periodLabel: "Año 1", indicatorLabel: "Instalación inicial", status: "Planeamiento" },
            { id: "roadmap-hospital-2027", proposalId: "hospital-nivel-ii", axisId: "salud-bienestar", description: "Saneamiento físico-legal del terreno.", periodLabel: "Año 1", indicatorLabel: "Terreno saneado", status: "Planeamiento" },
            { id: "roadmap-marca-2027", proposalId: "marca-cayma", axisId: "desarrollo-economico", description: "Talleres participativos y lanzamiento de Marca Cayma.", periodLabel: "Año 1", indicatorLabel: "Marca lanzada", status: "Planeamiento" },
            { id: "roadmap-vivero-2027", proposalId: "vivero-compostaje", axisId: "medio-ambiente", description: "Adecuación del terreno e implementación inicial.", periodLabel: "Año 1", indicatorLabel: "Infraestructura inicial", status: "Planeamiento" },
            { id: "roadmap-titulos-2027", proposalId: "operacion-titulo", axisId: "saneamiento", description: "Conformación del equipo y primera meta de titulación.", periodLabel: "Año 1", indicatorLabel: "300 títulos", status: "Planeamiento" },
            { id: "roadmap-ventanilla-2027", proposalId: "ventanilla-unica-digital", axisId: "modernizacion", description: "Desarrollo de plataforma y rediseño de procesos.", periodLabel: "Año 1", indicatorLabel: "Plataforma desarrollada", status: "Planeamiento" }
          ]
        },
        {
          id: "2028",
          periodLabel: "2028",
          label: "Ejecución",
          description: "Construcción, puesta en operación y primeras ampliaciones de cobertura.",
          projects: [
            { id: "roadmap-piscina-2028", proposalId: "piscina-municipal-temperada", axisId: "desarrollo-urbano", description: "Inicio y culminación de la construcción.", periodLabel: "Año 2", indicatorLabel: "Construcción", status: "Ejecución" },
            { id: "roadmap-ciclovia-2028", proposalId: "red-ciclovias-integradas", axisId: "movilidad", description: "Implementación del primer tramo.", periodLabel: "Año 2", indicatorLabel: "2 km", status: "Ejecución" },
            { id: "roadmap-c4-2028", proposalId: "centro-control-c4", axisId: "seguridad", description: "Centro de control operativo las 24 horas.", periodLabel: "Año 2", indicatorLabel: "Operación 24/7", status: "Ejecución" },
            { id: "roadmap-topicos-2028", proposalId: "topicos-salva-en-tu-barrio", axisId: "salud-bienestar", description: "Implementación del segundo tópico municipal.", periodLabel: "Año 2", indicatorLabel: "2 tópicos acumulados", status: "Ejecución" },
            { id: "roadmap-marca-2028", proposalId: "marca-cayma", axisId: "desarrollo-economico", description: "Primera campaña de adhesión de negocios.", periodLabel: "Año 2", indicatorLabel: "50 negocios", status: "Ejecución" },
            { id: "roadmap-vivero-2028", proposalId: "vivero-compostaje", axisId: "medio-ambiente", description: "Vivero operativo y planta de compostaje en marcha.", periodLabel: "Año 2", indicatorLabel: "Operación", status: "Ejecución" },
            { id: "roadmap-titulos-2028", proposalId: "operacion-titulo", axisId: "saneamiento", description: "Ampliación de la cobertura de titulación.", periodLabel: "Año 2", indicatorLabel: "400 títulos", status: "Ejecución" },
            { id: "roadmap-transparencia-2028", proposalId: "transparencia-datos-abiertos", axisId: "modernizacion", description: "Actualización mensual del portal de transparencia.", periodLabel: "Año 2", indicatorLabel: "Actualización continua", status: "Ejecución" }
          ]
        },
        {
          id: "2029",
          periodLabel: "2029",
          label: "Consolidación",
          description: "Ampliación de servicios, operación territorial y evaluación intermedia.",
          projects: [
            { id: "roadmap-polideportivos-2029", proposalId: "red-polideportivos-losas", axisId: "desarrollo-urbano", description: "Construcción del segundo grupo de losas deportivas.", periodLabel: "Año 3", indicatorLabel: "3 losas nuevas", status: "Consolidación" },
            { id: "roadmap-samay-2029", proposalId: "conexion-vial-samay-la-tomilla", axisId: "movilidad", description: "Ejecución prevista mediante gestión con el GRA.", periodLabel: "Año 3", indicatorLabel: "Ejecución GRA", status: "Consolidación" },
            { id: "roadmap-serenazgo-2029", proposalId: "base-serenazgo-valle-chilina", axisId: "seguridad", description: "Puesta en operación del puesto de vigilancia integrado.", periodLabel: "Año 3", indicatorLabel: "Base operativa", status: "Consolidación" },
            { id: "roadmap-hospital-2029", proposalId: "hospital-nivel-ii", axisId: "salud-bienestar", description: "Gestión de presupuesto y convenio con GRA/Minsa.", periodLabel: "Año 3", indicatorLabel: "Gestión intergubernamental", status: "Consolidación" },
            { id: "roadmap-paccha-2029", proposalId: "circuito-la-paccha-valle-chilina", axisId: "desarrollo-economico", description: "Promoción continua del circuito turístico.", periodLabel: "Año 3", indicatorLabel: "Circuito promocionado", status: "Consolidación" },
            { id: "roadmap-corredor-2029", proposalId: "corredor-verde", axisId: "medio-ambiente", description: "Inicio de la primera etapa del corredor verde.", periodLabel: "Año 3", indicatorLabel: "1 km iniciado", status: "Consolidación" },
            { id: "roadmap-agua-2029", proposalId: "brecha-agua-potable", axisId: "saneamiento", description: "Gestión de ejecución ante SEDAPAR y GRA.", periodLabel: "Año 3", indicatorLabel: "Gestión de expedientes", status: "Consolidación" },
            { id: "roadmap-decide-2029", proposalId: "decide-cayma", axisId: "modernizacion", description: "Proceso anual de presupuesto participativo.", periodLabel: "Año 3", indicatorLabel: "Proceso 2029", status: "Consolidación" }
          ]
        },
        {
          id: "2030",
          periodLabel: "2030",
          label: "Culminación",
          description: "Cierre de metas, consolidación de programas y continuidad institucional.",
          projects: [
            { id: "roadmap-palacio-voley-2030", proposalId: "red-polideportivos-losas", axisId: "desarrollo-urbano", description: "Remodelación integral del Palacio de Vóley.", periodLabel: "Año 4", indicatorLabel: "Remodelación", status: "Culminación" },
            { id: "roadmap-semaforos-2030", proposalId: "semaforizacion-inteligente", axisId: "movilidad", description: "Evaluación y mantenimiento del sistema.", periodLabel: "Año 4", indicatorLabel: "Evaluación", status: "Culminación" },
            { id: "roadmap-c4-2030", proposalId: "centro-control-c4", axisId: "seguridad", description: "Integración total con sistemas vecinales.", periodLabel: "Año 4", indicatorLabel: "Integración total", status: "Culminación" },
            { id: "roadmap-topicos-2030", proposalId: "topicos-salva-en-tu-barrio", axisId: "salud-bienestar", description: "Evaluación y ampliación de los servicios.", periodLabel: "Año 4", indicatorLabel: "Evaluación", status: "Culminación" },
            { id: "roadmap-marca-2030", proposalId: "marca-cayma", axisId: "desarrollo-economico", description: "Cierre de adhesión y reconocimiento de negocios.", periodLabel: "Año 4", indicatorLabel: "100 negocios", status: "Culminación" },
            { id: "roadmap-corredor-2030", proposalId: "corredor-verde", axisId: "medio-ambiente", description: "Culminación de la primera etapa.", periodLabel: "Año 4", indicatorLabel: "Primera etapa culminada", status: "Culminación" },
            { id: "roadmap-titulos-2030", proposalId: "operacion-titulo", axisId: "saneamiento", description: "Cierre de la meta anual de titulación.", periodLabel: "Año 4", indicatorLabel: "400 títulos", status: "Culminación" },
            { id: "roadmap-ventanilla-2030", proposalId: "ventanilla-unica-digital", axisId: "modernizacion", description: "Mejora continua y consolidación de la plataforma.", periodLabel: "Año 4", indicatorLabel: "Servicio consolidado", status: "Culminación" }
          ]
        }
      ]
    },

    projects: {
      enabled: false /* PENDIENTE: cambia a true cuando exista al menos un marcador o proyecto destacado válido. */,
      heading: {
        kicker: "Intervenciones territoriales",
        title: "Proyectos en el territorio",
        description: "Esta sección se habilitará cuando se confirmen ubicaciones, coordenadas y material visual oficial."
      },
      map: {
        enabled: false /* PENDIENTE: cambia a true después de agregar ubicaciones con coordenadas verificadas. */,
        ariaLabel: "Mapa de proyectos del Plan de Gobierno de Cayma",
        overlayLabel: "Mapa interactivo",
        countTemplate: "{count} ubicaciones",
        center: {} /* PENDIENTE: puedes usar { lat: -16.0000, lng: -71.0000 }; si lo dejas vacío, el centro se deriva de los marcadores. */,
        zoom: 14,
        tileLayer: {
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19
        },
        locations: [
          // PENDIENTE: agrega { id, proposalId?, name, type?, description?, status?, address?, coordinates: { lat, lng } }.
          // No se encontraron coordenadas exactas en base_conocimiento.
        ]
      },
      featured: {
        enabled: false /* PENDIENTE: cambia a true después de agregar imágenes oficiales de proyectos. */,
        kicker: "Proyectos estratégicos",
        title: "Proyectos destacados",
        previousAriaLabel: "Proyecto anterior",
        nextAriaLabel: "Proyecto siguiente",
        items: [
          // PENDIENTE: agrega { id, proposalId?, title?, subtitle?, tag?, image: { src, alt, caption?, credit? } }.
          // Las piezas proporcionadas son composiciones generales, no fotografías independientes de proyectos.
        ]
      }
    },

    trifold: {
      enabled: false,
      heading: {
        kicker: "Resumen interactivo",
        title: "Conoce el plan en 60 segundos",
        description: "Una síntesis navegable de la visión, los ejes estratégicos y la ejecución 2027–2030."
      },
      ariaLabel: "Resumen digital del Plan de Gobierno Municipal de Cayma 2027–2030",
      mobileHint: "En móvil puedes deslizar lateralmente el resumen.",
      panels: [
        {
          id: "cover",
          type: "cover",
          number: "01",
          eyebrow: "PLAN DE GOBIERNO",
          titleTemplate: "{name}",
          periodTemplate: "{district} {period}",
          body: "Cayma, la Villa Hermosa, balcón turístico y cuna de la identidad regional.",
          footer: "Cayma seguirá avanzando"
        },
        {
          id: "axes",
          type: "axes",
          number: "02",
          eyebrowTemplate: "{count} ejes estratégicos",
          title: "Una Cayma integrada",
          footer: "Desarrollo, seguridad, prosperidad y sostenibilidad"
        },
        {
          id: "roadmap",
          type: "roadmap",
          number: "03",
          eyebrowTemplate: "Hoja de ruta {period}",
          title: "Ejecución disciplinada",
          footer: "Planeamiento, ejecución, consolidación y culminación"
        }
      ]
    },

    agenda: {
      enabled: true /* PENDIENTE: cambia a true después de agregar al menos un evento oficial con fecha y hora confirmadas. */,
      heading: {
        kicker: "Actividades",
        title: "Agenda oficial",
        description: "Próximas presentaciones, reuniones y actividades confirmadas."
      },
      events: [
        // PENDIENTE: agrega eventos con este formato:
        /*Ejemplo: 
        {
          id: "jornada-comunidad-activa",
          title: "Jornada Comunidad Activa",
          start: "2027-04-05T09:00:00-05:00",
          end: "2027-04-05T13:00:00-05:00",
          type: "Actividad",
          description: "Actividad abierta con participación ciudadana, atención de consultas y presentación de iniciativas para diferentes sectores de Cayma.",
          location: {
            name: "Parque de La Tomilla",
            address: "La Tomilla, Cayma, Arequipa"
          },
          link: {
            label: "Conocer actividad",
            href: "https://example.com/eventos/comunidad-activa",
            external: true
          }
        }
        */
        {
          id: "sabado-de-cine-3",
          title: "Sábado de Cine - Tercera Edición",
          start: "2026-08-22T17:00:00-05:00",
          end: "2026-08-22T19:00:00-05:00",
          type: "Actividad familiar",
          description: "Tercera edición de Sábado de Cine, una actividad pensada para compartir una tarde de entretenimiento y reflexión en familia. Los cupos son limitados.",
          location: {
            name: "Local Social de la Asociación T.C. de Los Pioneros - Zona A",
            address: "Cayma, Arequipa"
          },
          link: {
            label: "Ver publicación en Facebook",
            href: "https://www.facebook.com/photo/?fbid=1536008238540873&set=a.263031205838589",
            external: true
          }
        }
      ]
    },

    gallery: {
      enabled: true,
      heading: {
        kicker: "Facebook y TikTok",
        title: "Últimas publicaciones",
        description: "Consulta el contenido más reciente publicado en nuestros canales sociales."
      },
      facebook: {
        // Página pública encontrada en sections.socials.items.
        pageUrl: "https://www.facebook.com/ConsejeroRegionalArequipa/",
        iframeTitle: "Publicaciones recientes de la página de Facebook",
        fallbackLabel: "Ver en Facebook",
        fallbackTitle: "Abrir la página de Facebook en una pestaña nueva"
      },
      tiktok: {
        profileUrl: "https://www.tiktok.com/@amigossiempreamigos2",
        iframeTitle: "Publicaciones recientes del perfil de TikTok @amigossiempreamigos2",
        fallbackLabel: "Ver en TikTok",
        fallbackTitle: "Abrir el perfil de TikTok en una pestaña nueva"
      }
    },

    socials: {
      enabled: true /* PENDIENTE: cambia a true cuando al menos un canal tenga una URL oficial. */,
      heading: {
        kicker: "Canales oficiales",
        title: "Conecta con el equipo",
        description: "Redes sociales y medios de contacto verificados."
      },
      items: [
        { id: "facebook", label: "Facebook", icon: "bi-facebook", href: "https://www.facebook.com/ConsejeroRegionalArequipa/", enabled: true, external: true },
        { id: "instagram", label: "Instagram", icon: "bi-instagram", href: "" /* PENDIENTE: URL HTTPS oficial de Instagram. */, enabled: true, external: true },
        { id: "tiktok", label: "TikTok", icon: "bi-tiktok", href: "https://www.tiktok.com/@amigossiempreamigos2" /* PENDIENTE: URL HTTPS oficial de TikTok. */, enabled: true, external: true },
        { id: "youtube", label: "YouTube", icon: "bi-youtube", href: "" /* PENDIENTE: URL HTTPS oficial de YouTube. */, enabled: true, external: true },
        { id: "twitter", label: "X", icon: "bi-twitter-x", href: "" /* PENDIENTE: URL HTTPS oficial de X. */, enabled: true, external: true },
        { id: "whatsapp", label: "WhatsApp", icon: "bi-whatsapp", href: "" /* PENDIENTE: enlace https://wa.me/ seguido del número internacional, sin espacios. */, enabled: true, external: true }
      ]
    }
  },

  footer: {
    enabled: true,
    description: "Plan de Gobierno Municipal de Cayma 2027–2030.",
    navigationTitle: "Navegación",
    navigation: [
      { sectionId: "inicio", label: "Inicio" },
      { sectionId: "perfil", label: "Perfil" },
      { sectionId: "obras-impuestos", label: "Obras por Impuestos" },
      { sectionId: "propuestas", label: "Propuestas" },
      { sectionId: "roadmap", label: "Hoja de ruta" },
      { sectionId: "galeria", label: "Publicaciones" },
      { sectionId: "redes", label: "Redes" }
    ],
    legalTitle: "Fuente y alcance",
    legalText: "El contenido tiene fines informativos y de difusión. Las propuestas, actividades, comunicados y demás contenidos pueden ser actualizados conforme se publiquen nuevos documentos o información oficial.",
    copyrightTemplate: "© {year} Harberth Zúñiga",
    technologyText: "Portal informativo del Plan de Gobierno Municipal de Cayma"
  }
};

window.siteData = siteData;
