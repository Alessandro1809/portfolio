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
            title: "Hey, I'm Alessandro, a software developer with over 3 years of experience.",
            subtitle:
                "Continuously creating, improving, and solving new challenges through innovation and curiosity.",
            downloadCv: "Download CV",
            downloadCvAria: "Download my CV",
        },
        socialLinks: {
            scheduleMeeting: "Schedule a 15 minute meeting",
            scheduleMeetingAria: "Schedule a meeting with me",
        },
        featuredProjects: {
            heading: "Some Projects that I'm proud of",
            description:
                "A collection of things I've built, broken, and rebuilt — always learning along the way.",
            viewAll: "View All",
            repoAria: "View GitHub repository",
        },
        projectsPage: {
            heading: "All Projects",
            description:
                "The full list of projects, from large-scale builds to focused experiments.",
        },
        about: {
            heading: "Here's a bit about who I am",
            intro:
                "I see coding as both art and problem-solving — a way to turn ideas into something people can use and enjoy. I believe good work comes from passion and collaboration.",
            paragraph1:
                "I'm a Full-Stack Developer with over three years of experience building management systems, custom CMS platforms, end-to-end web applications, and AI-powered modules. I specialize in creating scalable backends, clean and modular frontends, and automation solutions that simplify complex business processes.",
            paragraph2:
                "My main stack includes TypeScript, React, Astro, Tailwind CSS, Next.js, Node.js, MongoDB, PostgreSQL, and SQLite. Whether it's architecting a flexible system, integrating external services, optimizing performance, or designing efficient data flows, I aim to deliver solutions that are both robust and elegant.",
            paragraph3:
                "Every project I take on is an opportunity to learn, refine my craft, and build something that truly makes a difference.",
            projectsLink: "Projects",
            downloadCv: "Download CV",
            downloadCvAria: "Download my CV",
        },
        featuredInfo: {
            heading: "By the Numbers",
            finishedProjects: "Finished Projects",
            yearsExperience: "Years of Experience",
            happyClients: "Happy Clients",
        },
        techStack: {
            title: "My Tech Stack",
            closing: "Everything is possible with code!",
        },
        blogSection: {
            heading: "Some Thoughts, Grab a coffee and read along",
            viewAll: "View all",
            description:
                "Welcome to my little corner of thoughts and experiments. Here, I share what I learn along the way — from code and design to personal insights and side projects.",
        },
        contactSection: {
            heading: "I'm always open to new collaborations — say hi!",
            description:
                "Always excited to meet new people, share ideas, and create something meaningful. Don't hesitate to reach out!",
        },
        contactForm: {
            nameLabel: "Name",
            emailLabel: "Email",
            messageLabel: "Message",
            nameExample: "Ex: John Doe",
            emailExample: "Ex: example@domain.com",
            messageExample: "Ex: Your message here...",
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
            interestLinks: "Interest links",
            projects: "Projects",
            blog: "Blog",
            knowInitiative: "Know my initiative",
            contactMe: "Contact me",
            visitNousAria: "Visit Nous.cr website",
            contactAria: "Go to hire page",
            madeIn: "Made in",
            tagline:
                "Evolving through code, bring freedom through innovation.",
            copyright:
                "Copyright © {year} Alessandro Diaz. All rights reserved.",
            builtWith:
                "This web was designed in Figma, and developed with Astro, React, Tailwind CSS v4, TypeScript and love 🤍",
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
                    year: "2023 - 2024",
                    title: "Fullstack Developer",
                    company: "Sellside Spa.",
                    description:
                        "Built responsive web applications using Angular, Node.js, Firebase, G-pay, Flutter, and Dart. Collaborated with senior developers on major product features.",
                },
                {
                    year: "2024 - present",
                    title: "Software Developer",
                    company: "Global Professional Group S.A.",
                    description:
                        "Led development of microservices architecture. Implemented CI/CD pipelines and improved application performance by 40%.",
                },
                {
                    year: "2023",
                    title: "Freelance Developer",
                    company: "Self-employed",
                    description:
                        "Architected scalable cloud solutions. Mentored junior developers and established best practices for the engineering team.",
                },
                {
                    year: "2025 - present",
                    title: "CTO & Fullstack Developer",
                    company: "NOUS",
                    description:
                        "Leading a team of 8 engineers. Driving technical vision and delivering enterprise-level applications for Fortune 500 clients.",
                },
            ],
        },
        projects: {
            nous: {
                description:
                    "This project is a modern, high-performance web platform built with a fully customized CMS designed specifically around the company's operational needs. It includes integrated AI modules that deliver real-time analytics, actionable insights, and intelligent automation to improve decision-making across the business. Beyond its technical execution, this project also represents the foundation of my entrepreneurial initiative — a scalable, client-focused solution built to demonstrate how tailored software and AI can transform everyday workflows.",
            },
            cms: {
                description:
                    "This project is a custom headless CMS built from scratch, focused on flexible content management and a decoupled architecture. It provides a complete editorial workflow for creating and publishing blog content, along with content monitoring and seamless integration with Astro-based websites, prioritizing performance, SEO, and full control over the data. The system is designed to serve as a content backend for multiple projects, adapting to different deployments through environment configuration rather than code duplication. This makes it a solid solution for portfolios, corporate websites, and digital products that require speed, scalability, and long-term maintainability.",
            },
            apvFrontend: {
                description:
                    "This project is a responsive MERN-based veterinary patient manager that streamlines appointment tracking, patient records, and clinical workflows in a clean, intuitive interface. It delivers fast CRUD operations, secure authentication flows, and a focused dashboard that keeps veterinarians organized while highlighting efficiency and usability for real-world practice.",
            },
            erlingNails: {
                description:
                    "This project is a modern, elegant website designed for a professional manicurist, featuring a fast and seamless gallery experience optimized for high-quality images. It includes an integrated content management service that allows effortless uploading, organizing, and updating of work samples, ensuring the portfolio stays fresh and visually engaging. The result is a refined, user-friendly platform that highlights the artist's craft while providing a smooth, high-performance browsing experience.",
            },
            apvApi: {
                description:
                    "This project is a robust veterinary patient management API designed to support the core operations of a veterinary clinic in a secure, scalable, and well-structured way. It exposes a complete CRUD for managing patients, medical records, and related entities, along with endpoints for profile creation and editing. The API implements a fully custom authentication and authorization flow built with Express.js, including user registration, login, protected routes, and role-based access control. It integrates EmailJS to handle transactional emails such as account verification and user notifications. The result is a clean, reliable backend service that centralizes veterinary data, enforces security best practices, and serves as a solid foundation for web or mobile client applications.",
            },
            blogApi: {
                description:
                    "This project is a fast, strongly-typed Blog API built for real-world delivery, designed to keep the request path lean, predictable, and easy to extend. It follows a clear architecture (routes → controllers → services → database) and uses Fastify with Zod type providers to enforce consistent input/output contracts at every boundary. The API is backed by Turso (libSQL/SQLite) and Drizzle ORM for an edge-friendly, type-safe data layer that remains simple to evolve over time. Authentication is handled in a stateless way via Clerk JWT verification, enabling public read access while protecting all write operations without storing passwords. The result is a clean, production-oriented backend that supports a complete posts workflow (list, fetch by slug/id, create, update, delete), categories, view statistics, and a dedicated health-check endpoint—supported by end-to-end testing with Vitest + Supertest for reliability and confidence in deployments.",
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
            title: "Hola, soy Alessandro, desarrollador de software con más de 3 años de experiencia.",
            subtitle:
                "Creando, mejorando y resolviendo nuevos retos de forma continua a través de la innovación y la curiosidad.",
            downloadCv: "Descargar CV",
            downloadCvAria: "Descargar mi CV",
        },
        socialLinks: {
            scheduleMeeting: "Agenda una reunión de 15 minutos",
            scheduleMeetingAria: "Agenda una reunión conmigo",
        },
        featuredProjects: {
            heading: "Algunos proyectos de los que estoy orgulloso",
            description:
                "Una colección de cosas que he construido, roto y reconstruido — siempre aprendiendo en el camino.",
            viewAll: "Ver todos",
            repoAria: "Ver repositorio en GitHub",
        },
        projectsPage: {
            heading: "Todos los proyectos",
            description:
                "La lista completa de proyectos, desde grandes construcciones hasta experimentos puntuales.",
        },
        about: {
            heading: "Aquí tienes un poco sobre mí",
            intro:
                "Veo la programación como arte y resolución de problemas — una forma de convertir ideas en algo que la gente pueda usar y disfrutar. Creo que el buen trabajo nace de la pasión y la colaboración.",
            paragraph1:
                "Soy un desarrollador Full-Stack con más de tres años de experiencia creando sistemas de gestión, plataformas CMS personalizadas, aplicaciones web end-to-end y módulos impulsados por IA. Me especializo en construir backends escalables, frontends limpios y modulares, y soluciones de automatización que simplifican procesos complejos.",
            paragraph2:
                "Mi stack principal incluye TypeScript, React, Astro, Tailwind CSS, Next.js, Node.js, MongoDB, PostgreSQL y SQLite. Ya sea arquitectando un sistema flexible, integrando servicios externos, optimizando rendimiento o diseñando flujos de datos eficientes, busco entregar soluciones robustas y elegantes.",
            paragraph3:
                "Cada proyecto que tomo es una oportunidad para aprender, pulir mi oficio y crear algo que realmente marque la diferencia.",
            projectsLink: "Proyectos",
            downloadCv: "Descargar CV",
            downloadCvAria: "Descargar mi CV",
        },
        featuredInfo: {
            heading: "En números",
            finishedProjects: "Proyectos finalizados",
            yearsExperience: "Años de experiencia",
            happyClients: "Clientes satisfechos",
        },
        techStack: {
            title: "Mi stack tecnológico",
            closing: "¡Todo es posible con código!",
        },
        blogSection: {
            heading: "Algunos pensamientos, toma un café y acompáñame",
            viewAll: "Ver todo",
            description:
                "Bienvenido a mi pequeño rincón de ideas y experimentos. Aquí comparto lo que aprendo en el camino — desde código y diseño hasta reflexiones personales y proyectos paralelos.",
        },
        contactSection: {
            heading: "Siempre estoy abierto a nuevas colaboraciones — ¡di hola!",
            description:
                "Siempre emocionado por conocer nuevas personas, compartir ideas y crear algo con significado. ¡No dudes en escribirme!",
        },
        contactForm: {
            nameLabel: "Nombre",
            emailLabel: "Correo",
            messageLabel: "Mensaje",
            nameExample: "Ej: Juan Pérez",
            emailExample: "Ej: ejemplo@dominio.com",
            messageExample: "Ej: Tu mensaje aquí...",
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
            interestLinks: "Enlaces de interés",
            projects: "Proyectos",
            blog: "Blog",
            knowInitiative: "Conoce mi iniciativa",
            contactMe: "Contáctame",
            visitNousAria: "Visitar sitio de Nous.cr",
            contactAria: "Ir a la página de contratación",
            madeIn: "Hecho en",
            tagline:
                "Evolucionando con código, llevando libertad a través de la innovación.",
            copyright:
                "Copyright © {year} Alessandro Diaz. Todos los derechos reservados.",
            builtWith:
                "Este sitio web fue diseñado en Figma y desarrollado con Astro, React, Tailwind CSS v4, TypeScript y amor 🤍",
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
                    year: "2023 - 2024",
                    title: "Desarrollador Fullstack",
                    company: "Sellside Spa.",
                    description:
                        "Construí aplicaciones web responsivas usando Angular, Node.js, Firebase, G-pay, Flutter y Dart. Colaboré con desarrolladores senior en funciones clave del producto.",
                },
                {
                    year: "2024 - presente",
                    title: "Desarrollador de software",
                    company: "Global Professional Group S.A.",
                    description:
                        "Lideré el desarrollo de una arquitectura de microservicios. Implementé pipelines CI/CD y mejoré el rendimiento de la aplicación en un 40%.",
                },
                {
                    year: "2023",
                    title: "Desarrollador freelance",
                    company: "Autónomo",
                    description:
                        "Diseñé soluciones cloud escalables. Mentoré a desarrolladores junior y establecí buenas prácticas para el equipo de ingeniería.",
                },
                {
                    year: "2025 - presente",
                    title: "CTO y Desarrollador Fullstack",
                    company: "NOUS",
                    description:
                        "Lidero un equipo de 8 ingenieros. Impulso la visión técnica y entrego aplicaciones empresariales para clientes Fortune 500.",
                },
            ],
        },
        projects: {
            nous: {
                description:
                    "Este proyecto es una plataforma web moderna y de alto rendimiento construida con un CMS totalmente personalizado, diseñado en torno a las necesidades operativas de la empresa. Incluye módulos de IA integrados que entregan analítica en tiempo real, insights accionables y automatización inteligente para mejorar la toma de decisiones. Más allá de su ejecución técnica, este proyecto también representa la base de mi iniciativa emprendedora: una solución escalable y centrada en el cliente para demostrar cómo el software a medida y la IA pueden transformar los flujos de trabajo cotidianos.",
            },
            cms: {
                description:
                    "Este proyecto es un CMS headless personalizado construido desde cero, enfocado en una gestión de contenidos flexible y una arquitectura desacoplada. Proporciona un flujo editorial completo para crear y publicar contenido de blogs, junto con monitoreo y una integración fluida con sitios en Astro, priorizando rendimiento, SEO y control total sobre los datos. El sistema está diseñado para servir como backend de contenido para múltiples proyectos, adaptándose a distintos despliegues mediante configuración de entorno en lugar de duplicación de código. Esto lo convierte en una solución sólida para portafolios, sitios corporativos y productos digitales que requieren velocidad, escalabilidad y mantenibilidad a largo plazo.",
            },
            apvFrontend: {
                description:
                    "Este proyecto es un gestor de pacientes veterinarios basado en MERN y responsivo que optimiza el seguimiento de citas, registros y flujos clínicos con una interfaz limpia e intuitiva. Ofrece operaciones CRUD rápidas, flujos de autenticación seguros y un dashboard enfocado que mantiene a los veterinarios organizados, destacando eficiencia y usabilidad en la práctica real.",
            },
            erlingNails: {
                description:
                    "Este proyecto es un sitio web moderno y elegante diseñado para una manicurista profesional, con una galería rápida y fluida optimizada para imágenes de alta calidad. Incluye un servicio de gestión de contenido integrado que permite subir, organizar y actualizar muestras de trabajo con facilidad, asegurando que el portafolio se mantenga fresco y visualmente atractivo. El resultado es una plataforma refinada y fácil de usar que resalta el trabajo de la artista con una experiencia de navegación suave y de alto rendimiento.",
            },
            apvApi: {
                description:
                    "Este proyecto es una API robusta para gestión de pacientes veterinarios, diseñada para soportar las operaciones principales de una clínica de forma segura, escalable y bien estructurada. Expone un CRUD completo para administrar pacientes, historiales médicos y entidades relacionadas, además de endpoints para creación y edición de perfiles. La API implementa un flujo de autenticación y autorización totalmente personalizado con Express.js, incluyendo registro, login, rutas protegidas y control de acceso por roles. Integra EmailJS para manejar correos transaccionales como verificación de cuentas y notificaciones a usuarios. El resultado es un servicio backend limpio y confiable que centraliza los datos veterinarios, aplica buenas prácticas de seguridad y sirve como base sólida para clientes web o móviles.",
            },
            blogApi: {
                description:
                    "Este proyecto es una API de blog rápida y fuertemente tipada, creada para un uso real en producción, diseñada para mantener el flujo de requests simple, predecible y fácil de extender. Sigue una arquitectura clara (rutas → controladores → servicios → base de datos) y utiliza Fastify con type providers de Zod para asegurar contratos consistentes de entrada y salida en cada frontera. La API está respaldada por Turso (libSQL/SQLite) y Drizzle ORM para una capa de datos edge-friendly y type-safe que sigue siendo fácil de evolucionar con el tiempo. La autenticación se maneja de forma stateless mediante verificación de JWT de Clerk, permitiendo lectura pública y protegiendo todas las operaciones de escritura sin almacenar contraseñas. El resultado es un backend limpio y orientado a producción que soporta un flujo completo de posts (listar, obtener por slug/id, crear, actualizar, eliminar), categorías, estadísticas de vistas y un health-check dedicado—respaldado por pruebas end-to-end con Vitest + Supertest para confiabilidad y seguridad en despliegues.",
            },
        },
    },
} as const;
