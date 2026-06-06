import type { AstroCookies } from "astro";

export const languages = ["en", "es"] as const;
export type Language = (typeof languages)[number];

export const defaultLang: Language = "en";

export const localeByLang: Record<Language, string> = {
    en: "en-US",
    es: "es-ES",
};

const normalizeLang = (value?: string | null): Language | null => {
    if (!value) return null;
    const lower = value.toLowerCase();
    if (lower.startsWith("es")) return "es";
    if (lower.startsWith("en")) return "en";
    return null;
};

export const resolveLanguage = (
    cookies: AstroCookies,
    acceptLanguage?: string | null,
): Language => {
    const cookieLang = normalizeLang(cookies.get("lang")?.value);
    if (cookieLang) return cookieLang;

    const headerLang = acceptLanguage?.split(",")[0]?.trim();
    const normalizedHeader = normalizeLang(headerLang);
    return normalizedHeader ?? defaultLang;
};

export const translations = {
    en: {
        languageToggle: {
            switchToEs: "Switch to Spanish",
            switchToEn: "Switch to English",
        },
        seo: {
            siteName: "Alessandro Diaz",
            defaultTitle: "Alessandro Diaz | Full Stack Developer",
            defaultDescription:
                "Portfolio of Alessandro Diaz, a full-stack developer building modern web apps, scalable backends, and thoughtful user experiences.",
            defaultOgAlt: "Alessandro Diaz portfolio cover",
            pages: {
                homeTitle: "Full Stack Developer Portfolio",
                homeDescription:
                    "Explore projects, experience, and writing by Alessandro Diaz.",
                blogTitle: "Blog",
                blogDescription:
                    "Articles on web development, architecture, and product building.",
                projectsTitle: "Projects",
                projectsDescription:
                    "Selected web apps, APIs, and product builds by Alessandro Diaz.",
                hireTitle: "Hire Me",
                hireDescription:
                    "Work with Alessandro Diaz on full-stack web apps and product engineering.",
                unsubscribeTitle: "Unsubscribe",
                unsubscribeDescription:
                    "Manage your email subscription for blog updates.",
                blogPostDescriptionFallback:
                    "Read the latest articles from Alessandro Diaz.",
            },
        },
        nav: {
            home: "Home",
            projects: "Projects",
            blog: "Blog",
            hireMe: "Hire Me",
            profileAlt: "Profile avatar",
            toggleMenu: "Toggle menu",
        },
        hero: {
            title: "I build systems that hold.",
            subtitle:
                "Full-Stack Developer & CTO based in Costa Rica. Building NOUS and consulting on AI-driven process automation for enterprise clients.",
            downloadCv: "Download CV",
            downloadCvAria: "Download my CV",
        },
        socialLinks: {
            scheduleMeeting: "Schedule a 15 minute meeting",
            scheduleMeetingAria: "Schedule a meeting with me",
        },
        featuredProjects: {
            heading: "Selected work",
            description:
                "Production work, internal systems, and focused builds where architecture, UI, and delivery had to line up.",
            viewAll: "See all projects",
            repoAria: "View GitHub repository",
        },
        projectsPage: {
            heading: "All Projects",
            description:
                "The full list of projects, from large-scale builds to focused experiments.",
        },
        about: {
            heading: "The person behind the code",
            intro:
                "I write code like something someone else will have to maintain: clear boundaries, explicit trade-offs, and no mystery layers.",
            paragraph1:
                "I'm a Full-Stack Developer with experience building management systems, custom CMS platforms, end-to-end web applications, and AI-assisted automation modules.",
            paragraph2:
                "My main stack includes TypeScript, React, Astro, Tailwind CSS, Next.js, Node.js, MongoDB, PostgreSQL, and SQLite. I care about data flow, performance, integration points, and maintainable interfaces.",
            paragraph3:
                "The goal is simple: ship software that can be understood, changed, and trusted after the first release.",
            projectsLink: "Projects",
            downloadCv: "Download CV",
            downloadCvAria: "Download my CV",
        },
        featuredInfo: {
            heading: "Operating range",
            finishedProjects: "Finished Projects",
            yearsExperience: "Years of Experience",
            happyClients: "Happy Clients",
        },
        techStack: {
            title: "Tools I use",
            closing: "Tools I reach for when the system needs to stay fast, clear, and maintainable.",
        },
        blogSection: {
            heading: "Writing about decisions, not tips.",
            viewAll: "View all",
            description:
                "Notes on architecture, product trade-offs, implementation details, and lessons from systems I have worked on.",
        },
        contactSection: {
            heading: "Let's build something worth shipping.",
            description:
                "Send the context, constraints, and what needs to move. I will reply with a clear next step.",
        },
        contactForm: {
            nameLabel: "Name",
            emailLabel: "Email",
            messageLabel: "Message",
            nameExample: "Ex: Daniel Rojas",
            emailExample: "Ex: hello@yourdomain.com",
            messageExample: "Ex: I need a CMS, an API, or automation support for an existing workflow.",
            send: "Send",
            sending: "Sending...",
            success:
                "Message sent successfully! I'll get back to you soon.",
            errorGeneric: "An error occurred. Please try again later.",
            errorPrefix: "✗",
            successPrefix: "✓",
        },
        blogIndex: {
            badge: "Blog / Articles",
            titleLeading: "Exploring the",
            titleHighlight: "Digital World",
            description:
                "This blog is a space where I document technical decisions, architectural trade-offs, and lessons learned while working on real-world software systems. I focus on practical problem-solving, performance, and maintainability, sharing insights gained from building, breaking, and refining products over time. The goal is not to provide quick tips, but to reflect on the reasoning behind solutions and the impact of those decisions in production environments.",
            thumbnailAlt: "Hero video",
            playLabel: "Play video",
            playerTitle: "Hero video player",
        },
        blogSubscribe: {
            kicker: "Newsletter",
            heading: "Get new posts in your inbox",
            description:
                "Subscribe to receive new articles and occasional updates, written in a concise and professional format.",
            privacyNote: "You can unsubscribe at any time.",
            privacyNotePrefix: "You can",
            privacyNoteLink: "unsubscribe",
            privacyNoteSuffix: " at any time.",
            emailLabel: "Email",
            emailPlaceholder: "you@example.com",
            submit: "Subscribe",
            sending: "Subscribing...",
            success: "Subscription confirmed. Please check your inbox.",
            already: "You're already subscribed.",
            errorGeneric: "We couldn't process your subscription. Please try again.",
            errorPrefix: "✗",
            successPrefix: "✓",
        },
        unsubscribe: {
            kicker: "Subscriptions",
            title: "Unsubscribe",
            description:
                "Enter your email to stop receiving blog updates. You can also use the link included in any email.",
            emailLabel: "Email",
            emailPlaceholder: "you@example.com",
            submit: "Unsubscribe",
            sending: "Processing...",
            success: "Your subscription has been cancelled.",
            already: "This address is already unsubscribed.",
            notFound: "If the address was subscribed, it has been removed.",
            errorGeneric: "We couldn't process your request. Please try again.",
            errorPrefix: "✗",
            successPrefix: "✓",
        },
        blog: {
            backToBlog: "Back to Blog",
            home: "Home",
            blog: "Blog",
            categoryFallback: "Article",
            featuredBadge: "Featured",
            minLabel: "min",
            minRead: "min read",
            youLikedIt: "You liked it?",
            keepExploring: "Keep exploring recent articles.",
            seeAllArticles: "See all articles",
            readMore: "Read more",
            noContent: "No content available",
        },
        share: {
            label: "Share",
            shareOnX: "Share on X (Twitter)",
            shareOnLinkedIn: "Share on LinkedIn",
            copyLink: "Copy Link",
            copied: "COPIED!",
        },
        footer: {
            getInTouch: "Get in touch",
            interestLinks: "Navigation",
            projects: "Projects",
            blog: "Blog",
            knowInitiative: "Visit NOUS",
            contactMe: "Hire me",
            visitNousAria: "Visit Nous.cr website",
            contactAria: "Go to hire page",
            madeIn: "Made in",
            tagline:
                "Good software is invisible. You only notice it when it's gone.",
            copyright:
                "© {year} Alessandro Diaz",
            builtWith:
                "Designed in Figma. Built with Astro, React, Tailwind CSS v4, TypeScript.",
        },
        profile: {
            title: "Full Stack Developer",
        },
        hireMe: {
            downloadMyCv: "Download my CV",
        },
        timeline: {
            heading: "Work Experience",
            subheading: "3 Years of Professional Growth",
            journeyContinues: "Journey Continues...",
            experiences: [
                {
                    year: "2023",
                    title: "Freelance Developer",
                    company: "Self-employed",
                    description:
                        "Architected scalable cloud solutions. Mentored junior developers and established best practices for the engineering team.",
                },
                {
                    year: "2023 - 2024",
                    title: "Fullstack Developer",
                    company: "Sellside Spa.",
                    description:
                        "Built responsive web applications using Angular, Node.js, Firebase, G-pay, Flutter, and Dart. Collaborated with senior developers on major product features.",
                },
                {
                    year: "2024 - 2026",
                    title: "Software Developer",
                    company: "Global Professional Group S.A.",
                    description:
                        "Led development of microservices architecture. Implemented CI/CD pipelines and developed enterprise automation systems.",
                },
                {
                    year: "2025 - present",
                    title: "CTO & Fullstack Developer",
                    company: "NOUS",
                    description:
                        "Driving technical vision, making decisions and delivering enterprise-level applications for clients.",
                },
                {
                    year: "2026 - present",
                    title: "Technical Consultant | AI & Process Automation",
                    company: "AuraQuantic",
                    description:
                        "Technical consultant focused on the analysis, design, and implementation of process automation solutions. Responsible for translating business needs into technology solutions through process modeling, platform configuration, integrations with corporate systems, and technical support, ensuring efficiency and continuous process improvement.",
                },
            ],
        },
        projects: {
            nous: {
                description:
                    "A web platform and custom CMS for NOUS, built around client operations, content control, and AI-assisted workflow visibility.",
            },
            cms: {
                description:
                    "A headless CMS built from scratch with editorial workflows, content monitoring, and Astro-ready delivery.",
            },
            apvFrontend: {
                description:
                    "A responsive MERN app for managing veterinary patients, appointments, and clinical records, with secure auth and a focused dashboard.",
            },
            erlingNails: {
                description:
                    "A fast portfolio site for a professional nail artist, with a managed gallery and image-first browsing.",
            },
            apvApi: {
                description:
                    "A veterinary clinic API with full CRUD, role-based access control, and transactional email — built on Express.js as a reliable backend for web or mobile clients.",
            },
            blogApi: {
                description:
                    "A typed Fastify API for posts, categories, views, auth-protected writes, and test-backed content operations.",
            },
        },
    },
    es: {
        languageToggle: {
            switchToEs: "Cambiar a español",
            switchToEn: "Cambiar a inglés",
        },
        seo: {
            siteName: "Alessandro Diaz",
            defaultTitle: "Alessandro Diaz | Desarrollador Full Stack",
            defaultDescription:
                "Portafolio de Alessandro Diaz, desarrollador full stack enfocado en aplicaciones web modernas, backends escalables y experiencias cuidadas.",
            defaultOgAlt: "Portada del portafolio de Alessandro Diaz",
            pages: {
                homeTitle: "Portafolio de Desarrollador Full Stack",
                homeDescription:
                    "Explora proyectos, experiencia y artículos de Alessandro Diaz.",
                blogTitle: "Blog",
                blogDescription:
                    "Artículos sobre desarrollo web, arquitectura y creación de productos.",
                projectsTitle: "Proyectos",
                projectsDescription:
                    "Selección de aplicaciones web, APIs y productos creados por Alessandro Diaz.",
                hireTitle: "Contrátame",
                hireDescription:
                    "Trabaja con Alessandro Diaz en aplicaciones web full stack y desarrollo de producto.",
                unsubscribeTitle: "Cancelar suscripción",
                unsubscribeDescription:
                    "Administra tu suscripción por correo a las novedades del blog.",
                blogPostDescriptionFallback:
                    "Lee los últimos artículos de Alessandro Diaz.",
            },
        },
        nav: {
            home: "Inicio",
            projects: "Proyectos",
            blog: "Blog",
            hireMe: "Contrátame",
            profileAlt: "Avatar de perfil",
            toggleMenu: "Abrir menú",
        },
        hero: {
            title: "Construyo sistemas que perduran.",
            subtitle:
                "Desarrollador Full-Stack y CTO en Costa Rica. Construyendo NOUS y consultando automatización de procesos con IA para clientes empresariales.",
            downloadCv: "Descargar CV",
            downloadCvAria: "Descargar mi CV",
        },
        socialLinks: {
            scheduleMeeting: "Agenda una reunión de 15 minutos",
            scheduleMeetingAria: "Agenda una reunión conmigo",
        },
        featuredProjects: {
            heading: "Trabajo seleccionado",
            description:
                "Trabajo en producción, sistemas internos y builds enfocados donde arquitectura, UI y entrega tenían que alinearse.",
            viewAll: "Ver todos los proyectos",
            repoAria: "Ver repositorio en GitHub",
        },
        projectsPage: {
            heading: "Todos los proyectos",
            description:
                "La lista completa de proyectos, desde grandes construcciones hasta experimentos puntuales.",
        },
        about: {
            heading: "La persona detrás del código",
            intro:
                "Escribo código como algo que otra persona tendrá que mantener: límites claros, decisiones explícitas y nada de capas misteriosas.",
            paragraph1:
                "Soy desarrollador Full-Stack con experiencia creando sistemas de gestión, CMS personalizados, aplicaciones web end-to-end y módulos de automatización asistidos por IA.",
            paragraph2:
                "Mi stack principal incluye TypeScript, React, Astro, Tailwind CSS, Next.js, Node.js, MongoDB, PostgreSQL y SQLite. Me importan el flujo de datos, rendimiento, puntos de integración e interfaces mantenibles.",
            paragraph3:
                "El objetivo es simple: entregar software que se pueda entender, cambiar y confiar después del primer release.",
            projectsLink: "Proyectos",
            downloadCv: "Descargar CV",
            downloadCvAria: "Descargar mi CV",
        },
        featuredInfo: {
            heading: "Rango operativo",
            finishedProjects: "Proyectos finalizados",
            yearsExperience: "Años de experiencia",
            happyClients: "Clientes satisfechos",
        },
        techStack: {
            title: "Herramientas que uso",
            closing: "Herramientas que uso cuando el sistema necesita mantenerse rápido, claro y mantenible.",
        },
        blogSection: {
            heading: "Escritura sobre decisiones, no tips.",
            viewAll: "Ver todo",
            description:
                "Notas sobre arquitectura, trade-offs de producto, detalles de implementación y lecciones de sistemas en los que he trabajado.",
        },
        contactSection: {
            heading: "Construyamos algo que valga la pena lanzar.",
            description:
                "Envíame el contexto, las restricciones y lo que necesita avanzar. Te respondo con un siguiente paso claro.",
        },
        contactForm: {
            nameLabel: "Nombre",
            emailLabel: "Correo",
            messageLabel: "Mensaje",
            nameExample: "Ej: Juan Pérez",
            emailExample: "Ej: hola@tudominio.com",
            messageExample: "Ej: Necesito un CMS, una API o apoyo de automatización para un flujo existente.",
            send: "Enviar",
            sending: "Enviando...",
            success: "¡Mensaje enviado con éxito! Te responderé pronto.",
            errorGeneric: "Ocurrió un error. Inténtalo de nuevo más tarde.",
            errorPrefix: "✗",
            successPrefix: "✓",
        },
        blogIndex: {
            badge: "Blog / Artículos",
            titleLeading: "Explorando el",
            titleHighlight: "Mundo Digital",
            description:
                "Este blog es un espacio donde documento decisiones técnicas, trade-offs arquitectónicos y lecciones aprendidas trabajando en sistemas de software reales. Me enfoco en la resolución práctica de problemas, rendimiento y mantenibilidad, compartiendo aprendizajes de construir, romper y refinar productos con el tiempo. El objetivo no es dar tips rápidos, sino reflexionar sobre el razonamiento detrás de las soluciones y el impacto de esas decisiones en entornos de producción.",
            thumbnailAlt: "Video principal",
            playLabel: "Reproducir video",
            playerTitle: "Reproductor de video principal",
        },
        blogSubscribe: {
            kicker: "Actualizaciones",
            heading: "Recibe nuevos artículos en tu correo",
            description:
                "Suscríbete para recibir nuevos artículos y novedades ocasionales con un formato claro y profesional.",
            privacyNote: "Puedes darte de baja en cualquier momento.",
            privacyNotePrefix: "Puedes",
            privacyNoteLink: "darte de baja",
            privacyNoteSuffix: " en cualquier momento.",
            emailLabel: "Correo",
            emailPlaceholder: "tu@correo.com",
            submit: "Suscribirme",
            sending: "Suscribiendo...",
            success: "Suscripción confirmada. Revisa tu correo.",
            already: "Ya estás suscrito.",
            errorGeneric: "No pudimos procesar tu suscripción. Intenta más tarde.",
            errorPrefix: "✗",
            successPrefix: "✓",
        },
        unsubscribe: {
            kicker: "Suscripciones",
            title: "Cancelar suscripción",
            description:
                "Ingresa tu correo para dejar de recibir actualizaciones del blog. También puedes usar el enlace incluido en cualquier email.",
            emailLabel: "Correo",
            emailPlaceholder: "tu@correo.com",
            submit: "Cancelar",
            sending: "Procesando...",
            success: "Tu suscripción ha sido cancelada.",
            already: "Este correo ya estaba dado de baja.",
            notFound: "Si el correo estaba suscrito, ya fue eliminado.",
            errorGeneric: "No pudimos procesar tu solicitud. Intenta más tarde.",
            errorPrefix: "✗",
            successPrefix: "✓",
        },
        blog: {
            backToBlog: "Volver al blog",
            home: "Inicio",
            blog: "Blog",
            categoryFallback: "Artículo",
            featuredBadge: "Destacado",
            minLabel: "min",
            minRead: "min de lectura",
            youLikedIt: "¿Te gustó?",
            keepExploring: "Sigue explorando artículos recientes.",
            seeAllArticles: "Ver todos los artículos",
            readMore: "Leer más",
            noContent: "No hay contenido disponible",
        },
        share: {
            label: "Compartir",
            shareOnX: "Compartir en X (Twitter)",
            shareOnLinkedIn: "Compartir en LinkedIn",
            copyLink: "Copiar enlace",
            copied: "¡COPIADO!",
        },
        footer: {
            getInTouch: "Hablemos",
            interestLinks: "Navegación",
            projects: "Proyectos",
            blog: "Blog",
            knowInitiative: "Visitar NOUS",
            contactMe: "Contrátame",
            visitNousAria: "Visitar sitio de Nous.cr",
            contactAria: "Ir a la página de contratación",
            madeIn: "Hecho en",
            tagline:
                "El buen software es invisible. Solo lo notas cuando ya no está.",
            copyright:
                "© {year} Alessandro Diaz",
            builtWith:
                "Diseñado en Figma. Construido con Astro, React, Tailwind CSS v4, TypeScript.",
        },
        profile: {
            title: "Desarrollador Full Stack",
        },
        hireMe: {
            downloadMyCv: "Descargar mi CV",
        },
        timeline: {
            heading: "Experiencia laboral",
            subheading: "3 años de crecimiento profesional",
            journeyContinues: "El viaje continúa...",
            experiences: [
                {
                    year: "2023",
                    title: "Desarrollador freelance",
                    company: "Autónomo",
                    description:
                        "Diseñé soluciones cloud escalables. Mentoré a desarrolladores junior y establecí buenas prácticas para el equipo de ingeniería.",
                },
                {
                    year: "2023 - 2024",
                    title: "Desarrollador Fullstack",
                    company: "Sellside Spa.",
                    description:
                        "Construí aplicaciones web responsivas usando Angular, Node.js, Firebase, G-pay, Flutter y Dart. Colaboré con desarrolladores senior en funciones clave del producto.",
                },
                {
                    year: "2024 - 2026",
                    title: "Desarrollador de software",
                    company: "Global Professional Group S.A.",
                    description:
                        "Lideré el desarrollo de una arquitectura de microservicios. Implementé pipelines de CI/CD y desarrollé sistemas de automatización empresarial.",
                },
                {
                    year: "2025 - presente",
                    title: "CTO y Desarrollador Fullstack",
                    company: "NOUS",
                    description:
                        "Impulso la visión técnica, tomo decisiones y entrego aplicaciones empresariales para clientes.",
                },
                {
                    year: "2026 - presente",
                    title: "Technical Consultant | AI & Process Automation",
                    company: "AuraQuantic",
                    description:
                        "Consultor técnico enfocado en el análisis, diseño e implementación de soluciones de automatización de procesos. Responsable de traducir necesidades de negocio en soluciones tecnológicas mediante modelado de procesos, configuración de plataformas, integraciones con sistemas corporativos y soporte técnico, asegurando la eficiencia y mejora continua de los procesos.",
                },
            ],
        },
        projects: {
            nous: {
                description:
                    "Una plataforma web y CMS personalizado para NOUS, construido alrededor de operación de clientes, control de contenido y visibilidad asistida por IA.",
            },
            cms: {
                description:
                    "Un CMS headless construido desde cero con flujo editorial, monitoreo de contenido y entrega lista para Astro.",
            },
            apvFrontend: {
                description:
                    "Aplicación MERN responsiva para gestionar pacientes, citas y registros clínicos veterinarios, con autenticación segura y un dashboard enfocado.",
            },
            erlingNails: {
                description:
                    "Un sitio rápido para una artista de uñas profesional, con galería administrable y navegación centrada en imagen.",
            },
            apvApi: {
                description:
                    "API de clínica veterinaria con CRUD completo, control de acceso por roles y correo transaccional — construida en Express.js como backend confiable para clientes web o móviles.",
            },
            blogApi: {
                description:
                    "Una API Fastify tipada para posts, categorías, vistas, escrituras protegidas por auth y operaciones probadas.",
            },
        },
    },
} as const;
