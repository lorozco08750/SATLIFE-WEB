document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const currentYearLabels = document.querySelectorAll("#currentYear");

  const setCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    currentYearLabels.forEach((label) => {
      label.textContent = currentYear;
    });
  };

  setCurrentYear();

  const toggleNavbarBackground = () => {
    if (window.scrollY > 80) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  };

  toggleNavbarBackground();
  window.addEventListener("scroll", toggleNavbarBackground);

  // --- Helper: calcula la ruta correcta para las imágenes ---
  // Si la página se sirve desde lorozco08750.github.io (GitHub Pages de proyecto)
  // añadimos el prefijo /SATLIFE-WEB para que las rutas apunten a:
  // https://lorozco08750.github.io/SATLIFE-WEB/img/...
  const getImgPath = (fileName) => {
    const isGithubUserPage = location.hostname === "lorozco08750.github.io";
    if (isGithubUserPage) {
      return `/SATLIFE-WEB/img/${fileName}`;
    }
    // caso local o servidor donde index.html esté en la raíz del repo
    return `img/${fileName}`;
  };

  const normalizeMediaSources = () => {
    const videos = document.querySelectorAll("video.media-video");
    videos.forEach((video) => {
      const currentSrc = video.getAttribute("src");
      if (currentSrc && currentSrc.includes(" ")) {
        video.setAttribute("src", encodeURI(currentSrc));
      }

      video.querySelectorAll("source[src]").forEach((source) => {
        const sourceSrc = source.getAttribute("src");
        if (sourceSrc && sourceSrc.includes(" ")) {
          source.setAttribute("src", encodeURI(sourceSrc));
        }
      });
    });
  };

  normalizeMediaSources();

  const modulesData = [
    {
      id: "cultivos",
      title: "Gestión de cultivos y peces",
      description:
        "Registra especies, ciclos, parámetros del agua y notas de mantenimiento con un historial visual.",
      placeholder: "Imagen no encontrada — coloca aquí tu vista de cultivos.",
      imageSrc: "gestion-cultivos-peces.jpeg",
      focusArea: "gestion",
      highlights: [
        "Historial visual de lotes y parámetros críticos.",
        "Checklist colaborativo con responsables por jornada.",
      ],
      tags: ["inventario", "bioseguridad"],
      impact: { communities: 4, volunteers: 12, learningHours: 18 },
    },
    {
      id: "tareas",
      title: "Asignación de tareas inteligentes",
      description:
        "Programación semanal, roles compartidos y alertas automáticas para asegurar tareas críticas.",
      placeholder: "Imagen no encontrada — agrega tu calendario colaborativo.",
      imageSrc: "asignacion-tareas-inteligentes.jpg",
      focusArea: "gestion",
      highlights: [
        "Calendario sincronizado con recordatorios multicanal.",
        "Reutiliza plantillas de tareas según temporadas.",
      ],
      tags: ["planificación", "automatización"],
      impact: { communities: 3, volunteers: 18, learningHours: 12 },
    },
    {
      id: "sensores",
      title: "Panel de monitoreo de sensores",
      description:
        "Visualiza el estado del ecosistema con lecturas de pH, temperatura y oxígeno contextualizadas.",
      placeholder: "Imagen no encontrada — integra tu panel de datos.",
      imageSrc: "panel-monitoreo-sensores.jpg",
      focusArea: "monitoreo",
      highlights: [
        "Alertas configurables según umbrales personalizados.",
        "Gráficas comparativas para decisiones basadas en datos.",
      ],
      tags: ["sensores", "datos"],
      impact: { communities: 5, volunteers: 9, learningHours: 15 },
    },
    {
      id: "recursos",
      title: "Recursos educativos",
      description:
        "Centraliza guías, videos y experiencias para fortalecer el aprendizaje comunitario.",
      placeholder: "Imagen no encontrada — espacio para tu biblioteca visual.",
      imageSrc: "recursos-educativos.jpg",
      focusArea: "educacion",
      highlights: [
        "Catálogo etiquetado por nivel de experiencia.",
        "Rutas de aprendizaje para escuelas y talleres comunitarios.",
      ],
      tags: ["contenido", "aprendizaje"],
      impact: { communities: 2, volunteers: 6, learningHours: 34 },
    },
    {
      id: "comunidad",
      title: "Comunicación comunitaria",
      description:
        "Foros, mensajería interna y tableros de anuncios conectan a cada integrante del proyecto.",
      placeholder: "Imagen no encontrada — integra tu tablero de mensajes.",
      imageSrc: "comunicacion-comunitaria.jpg",
      focusArea: "comunidad",
      highlights: [
        "Canales temáticos y tableros visibles por toda la red.",
        "Reconocimientos automáticos para quienes aportan más.",
      ],
      tags: ["participación", "historias"],
      impact: { communities: 6, volunteers: 21, learningHours: 10 },
    },
  ];

  const resourcesData = [
    {
      title: "Guías descargables",
      description: "Sube manuales técnicos, fichas de especies y hojas de verificación.",
    },
    {
      title: "Historias de impacto",
      description: "Documenta testimonios y buenas prácticas de las terrazas colaborativas.",
    },
    {
      title: "Cursos y talleres",
      description: "Comparte agendas, enlaces a sesiones en vivo y materiales complementarios.",
    },
    {
      title: "Centro de ayuda",
      description: "Resuelve dudas frecuentes con procedimientos paso a paso y tutoriales rápidos.",
    },
  ];

  const storiesData = [
    {
      title: "Red La Perseverancia",
      result: "Redujo un 30% el desperdicio de agua con alertas tempranas de sensores.",
    },
    {
      title: "Colegio Semillas",
      result: "Sumó 45 estudiantes en clubes STEM usando el módulo educativo.",
    },
    {
      title: "Colectivo Huertas del Sur",
      result: "Automatizó turnos y duplicó voluntarios disponibles los fines de semana.",
    },
  ];

  const sustainabilityTips = [
    "Programa inspecciones conjuntas cada viernes para cruzar aprendizajes.",
    "Comparte reportes semanales con los vecinos vía módulo comunitario.",
    "Vincula escuelas cercanas para sumar horas de servicio social.",
    "Registra fotografías antes y después de cada mantenimiento.",
  ];

  const moduleContainer = document.getElementById("modulesGrid");
  const moduleFilter = document.getElementById("moduleFilter");
  const moduleCounter = document.getElementById("moduleCounter");

  const renderModuleCard = (module) => {
    const highlightsList = module.highlights.length
      ? `<ul class="small text-muted ps-3 mb-3">${module.highlights
          .map((item) => `<li>${item}</li>`)
          .join("")}</ul>`
      : "";

    const tagsList = module.tags
      .map((tag) => `<span class="badge text-bg-light text-secondary">${tag}</span>`)
      .join("");

    const imageMarkup = module.imageSrc
      ? `<figure class="module-image-wrapper mb-3">
          <img class="module-image" src="${getImgPath(module.imageSrc)}" alt="${module.title}" loading="lazy" />
        </figure>`
      : `<div class="media-placeholder image-placeholder mb-3">
          <span>${module.placeholder}</span>
        </div>`;

    return `
      <div class="col-md-6 col-xl-3">
        <article class="module-card h-100" data-focus="${module.focusArea}">
          ${imageMarkup}
          <h3 class="h5">${module.title}</h3>
          <p class="text-muted">${module.description}</p>
          ${highlightsList}
          <div class="d-flex flex-wrap gap-2">${tagsList}</div>
        </article>
      </div>
    `;
  };

  const renderModules = (focus = "todos") => {
    if (!moduleContainer) {
      return;
    }

    const filteredModules =
      focus === "todos"
        ? modulesData
        : modulesData.filter((module) => module.focusArea === focus);

    moduleContainer.innerHTML = filteredModules.map(renderModuleCard).join("");

    if (moduleCounter) {
      moduleCounter.textContent = filteredModules.length.toString();
    }
  };

  renderModules();

  moduleFilter?.addEventListener("change", (event) => {
    renderModules(event.target.value);
  });

  const statsCommunities = document.getElementById("statsCommunities");
  const statsVolunteers = document.getElementById("statsVolunteers");
  const statsLearningHours = document.getElementById("statsLearningHours");
  const tagSummary = document.getElementById("tagSummary");

  const totals = modulesData.reduce(
    (acc, module) => {
      acc.communities += module.impact.communities;
      acc.volunteers += module.impact.volunteers;
      acc.learningHours += module.impact.learningHours;
      module.tags.forEach((tag) => acc.tags.add(tag));
      return acc;
    },
    { communities: 0, volunteers: 0, learningHours: 0, tags: new Set() }
  );

  if (statsCommunities) {
    statsCommunities.textContent = totals.communities.toString();
  }
  if (statsVolunteers) {
    statsVolunteers.textContent = totals.volunteers.toString();
  }
  if (statsLearningHours) {
    statsLearningHours.textContent = totals.learningHours.toString();
  }
  if (tagSummary) {
    tagSummary.textContent = [...totals.tags].join(", ");
  }

  const resourceList = document.getElementById("resourceList");
  const buildResourceCard = (resource) => `
    <div class="col-sm-6">
      <article class="resource-card h-100">
        <h4 class="h6">${resource.title}</h4>
        <p class="small text-muted mb-0">${resource.description}</p>
      </article>
    </div>
  `;

  if (resourceList) {
    resourceList.innerHTML = resourcesData.map(buildResourceCard).join("");
  }

  const storyList = document.getElementById("storyList");
  if (storyList) {
    storyList.innerHTML = storiesData
      .map(({ title, result }) => `<li><strong>${title}:</strong> ${result}</li>`)
      .join("");
  }

  const tipList = document.getElementById("tipList");
  let tipIndex = 0;
  while (tipList && tipIndex < sustainabilityTips.length) {
    const tipItem = document.createElement("li");
    tipItem.textContent = sustainabilityTips[tipIndex];
    tipList.appendChild(tipItem);
    tipIndex += 1;
  }

  const contactForm = document.querySelector("#contacto form");
  const formFeedback = document.getElementById("formFeedback");
  const requiredFields = ["nombre", "organizacion", "email", "telefono", "mensaje"];

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const values = Object.fromEntries(formData.entries());
    const missingFields = requiredFields.filter((field) => !values[field]?.trim());

    if (missingFields.length) {
      const readableFields = missingFields.map(
        (field) =>
          contactForm.querySelector(`label[for="${field}"]`)?.textContent?.trim() ?? field
      );

      if (formFeedback) {
        formFeedback.textContent = `Revisa: ${readableFields.join(", ")}.`;
        formFeedback.classList.remove("success");
        formFeedback.classList.add("error");
      }
      return;
    }

    if (formFeedback) {
      formFeedback.textContent = `Gracias ${values.nombre}, pronto te contactaremos en ${values.email}.`;
      formFeedback.classList.remove("error");
      formFeedback.classList.add("success");
    }

    contactForm.reset();
  });

  const navLinks = document.querySelectorAll('a[href^="#"]');
  for (let index = 0; index < navLinks.length; index += 1) {
    navLinks[index].addEventListener("click", (event) => {
      const targetId = navLinks[index].getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (!targetElement) {
        return;
      }

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth" });
    });
  }
});
