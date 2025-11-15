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

  // ------------------------------------------------------------------
  // Integración con backend PHP (solo visible al ejecutar en localhost)
  // ------------------------------------------------------------------
  const isGithubPages = location.hostname.endsWith("github.io");
  const backendAvailable = !isGithubPages;
  const backendBaseUrl = `${window.location.origin}/backend`;
  let currentUser = null;

  const createBackendPanel = () => {
    let panel = document.getElementById("satlifeDynamicPanel");
    if (panel || !backendAvailable) {
      return panel;
    }

    panel = document.createElement("section");
    panel.id = "satlifeDynamicPanel";
    panel.style.padding = "2rem 1rem";
    panel.style.margin = "2rem auto";
    panel.style.maxWidth = "960px";
    panel.style.border = "1px solid rgba(0,0,0,0.08)";
    panel.style.borderRadius = "0.75rem";
    panel.style.background =
      "linear-gradient(135deg, rgba(13,110,253,0.05), rgba(25,135,84,0.08))";
    panel.innerHTML = `
      <h2 class="h4 mb-3">SATLIFE · Panel dinámico (demo local)</h2>
      <p class="small text-muted">
        Estas tarjetas se alimentan de PHP + MySQL cuando ejecutas /backend en XAMPP/LAMP.
      </p>
      <div id="backendFeedback" class="alert small" style="display:none;"></div>
      <div class="row g-3">
        <div class="col-md-4">
          <article class="p-3 bg-white rounded shadow-sm h-100">
            <h3 class="h6">Sesión actual</h3>
            <p id="backendUserSummary" class="small mb-2">Sin sesión.</p>
            <button id="backendLogoutBtn" class="btn btn-sm btn-outline-danger" type="button" style="display:none;">
              Cerrar sesión
            </button>
          </article>
        </div>
        <div class="col-md-4">
          <article class="p-3 bg-white rounded shadow-sm h-100">
            <h3 class="h6">Visitas del sitio</h3>
            <p class="display-6 mb-1" id="backendVisitsCounter">0</p>
            <p class="small text-muted mb-0">Actualiza en tiempo real con api/visits.php</p>
          </article>
        </div>
        <div class="col-md-4">
          <article class="p-3 bg-white rounded shadow-sm h-100">
            <h3 class="h6">Clima</h3>
            <p id="backendWeatherSummary" class="mb-1">Consulta en progreso...</p>
            <p id="backendWeatherDetails" class="small text-muted mb-0"></p>
          </article>
        </div>
      </div>
      <div class="mt-4">
        <h3 class="h6">Mis contactos</h3>
        <ul id="backendContactsList" class="small list-unstyled mb-0"></ul>
      </div>
    `;

    const footer = document.querySelector("footer");
    if (footer) {
      footer.parentNode.insertBefore(panel, footer);
    } else {
      document.body.appendChild(panel);
    }

    return panel;
  };

  const backendPanel = createBackendPanel();
  const backendFeedback = backendPanel?.querySelector("#backendFeedback") ?? null;
  const backendUserSummary = backendPanel?.querySelector("#backendUserSummary") ?? null;
  const backendLogoutBtn = backendPanel?.querySelector("#backendLogoutBtn") ?? null;
  const backendVisitsCounter = backendPanel?.querySelector("#backendVisitsCounter") ?? null;
  const backendContactsList = backendPanel?.querySelector("#backendContactsList") ?? null;
  const backendWeatherSummary = backendPanel?.querySelector("#backendWeatherSummary") ?? null;
  const backendWeatherDetails = backendPanel?.querySelector("#backendWeatherDetails") ?? null;

  const showBackendMessage = (message, type = "info") => {
    if (!backendFeedback) {
      return;
    }
    backendFeedback.textContent = message;
    backendFeedback.style.display = "block";
    backendFeedback.className = `alert alert-${type} small`;
  };

  const callBackend = async (endpoint, options = {}) => {
    if (!backendAvailable) {
      throw new Error("El backend dinámico solo está disponible en entorno local (XAMPP/LAMP).");
    }

    const config = {
      method: options.method || "GET",
      headers: {
        Accept: "application/json",
        ...(options.headers || {}),
      },
      credentials: "include",
      body: options.body ?? undefined,
    };

    if (
      config.body &&
      typeof config.body === "object" &&
      !(config.body instanceof FormData) &&
      !(config.body instanceof URLSearchParams) &&
      !(config.body instanceof Blob)
    ) {
      config.headers["Content-Type"] = config.headers["Content-Type"] || "application/json";
      config.body = JSON.stringify(config.body);
    }

    const url = endpoint.startsWith("http") ? endpoint : `${backendBaseUrl}${endpoint}`;
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = data?.message || "Solicitud rechazada por el servidor.";
      throw new Error(errorMessage);
    }

    if (data && Object.prototype.hasOwnProperty.call(data, "success") && data.success === false) {
      throw new Error(data.message || "Operación no exitosa.");
    }

    return data;
  };

  const updateSessionUI = () => {
    if (!backendUserSummary || !backendLogoutBtn) {
      return;
    }
    if (currentUser) {
      backendUserSummary.textContent = `Hola ${currentUser.name} (${currentUser.email}).`;
      backendLogoutBtn.style.display = "inline-flex";
    } else {
      backendUserSummary.textContent = "Sin sesión.";
      backendLogoutBtn.style.display = "none";
    }
  };

  const renderContacts = (contacts = []) => {
    if (!backendContactsList) {
      return;
    }
    if (!contacts.length) {
      backendContactsList.innerHTML =
        "<li>No hay contactos para mostrar. Regístralos desde el dashboard protegido.</li>";
      return;
    }

    backendContactsList.innerHTML = contacts
      .map(
        (contact) => `
          <li class="py-1 border-bottom">
            <strong>${contact.name}</strong>
            <span class="d-block small text-muted">
              ${contact.email ?? "Sin correo"} · ${contact.phone ?? "Sin teléfono"}
            </span>
          </li>
        `
      )
      .join("");
  };

  const registerUserAjax = async ({ name, email, phone, password }) => {
    const body = new URLSearchParams({ name, email, phone, password });
    const data = await callBackend("/auth/register.php", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    showBackendMessage(data.message ?? "Registro completado.", "success");
    return data;
  };

  const loginUserAjax = async ({ email, password }) => {
    const body = new URLSearchParams({ email, password });
    const data = await callBackend("/auth/login.php", {
      method: "POST",
      body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    currentUser = data.user;
    updateSessionUI();
    showBackendMessage("Sesión iniciada correctamente.", "success");
    await listContactsAjax();
    return data;
  };

  const logoutUserAjax = async () => {
    await callBackend("/auth/logout.php", { method: "POST" });
    currentUser = null;
    updateSessionUI();
    renderContacts([]);
    showBackendMessage("Sesión cerrada.", "info");
  };

  const listContactsAjax = async () => {
    try {
      const data = await callBackend("/api/contacts.php");
      renderContacts(data.data || []);
      if (!data.data?.length) {
        showBackendMessage("No hay contactos cargados todavía.", "warning");
      }
      return data;
    } catch (error) {
      renderContacts([]);
      showBackendMessage(error.message, "warning");
      return null;
    }
  };

  const createContactAjax = async ({ name, email, phone, notes }) => {
    const data = await callBackend("/api/contacts.php", {
      method: "POST",
      body: { name, email, phone, notes },
    });
    showBackendMessage("Contacto creado y sincronizado.", "success");
    await listContactsAjax();
    return data;
  };

  const registerVisitAjax = async (page = "index") =>
    callBackend(`/api/visits.php?action=register&page=${encodeURIComponent(page)}`);

  const fetchVisitCountAjax = async (page = "index") => {
    const data = await callBackend(
      `/api/visits.php?action=count&page=${encodeURIComponent(page)}`
    );
    if (backendVisitsCounter) {
      backendVisitsCounter.textContent = data.total_visits ?? 0;
    }
    return data;
  };

  const fetchWeatherAjax = async (city = "Bogota") => {
    const data = await callBackend(`/api/weather.php?city=${encodeURIComponent(city)}`);
    if (backendWeatherSummary) {
      backendWeatherSummary.textContent = `${data.city}: ${Math.round(
        data.temperature_c ?? 0
      )} °C`;
    }
    if (backendWeatherDetails) {
      backendWeatherDetails.textContent = `${data.description} · Humedad ${
        data.humidity ?? "--"
      }%`;
    }
    return data;
  };

  if (backendLogoutBtn) {
    backendLogoutBtn.addEventListener("click", () => {
      logoutUserAjax().catch((error) => showBackendMessage(error.message, "danger"));
    });
  }

  if (backendAvailable && backendPanel) {
    registerVisitAjax("index").catch((error) => showBackendMessage(error.message, "danger"));
    fetchVisitCountAjax("index").catch((error) => showBackendMessage(error.message, "danger"));
    fetchWeatherAjax("Bogota").catch((error) => showBackendMessage(error.message, "danger"));

    // Exponer helpers para que el dashboard o la consola del navegador puedan invocarlos.
    window.satlifeApi = {
      registerUserAjax,
      loginUserAjax,
      logoutUserAjax,
      listContactsAjax,
      createContactAjax,
      registerVisitAjax,
      fetchVisitCountAjax,
      fetchWeatherAjax,
    };
  }
});
