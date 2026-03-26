# PLAN-01 — Portfolio Angular: Plan de Implementación

## Visión General

Portfolio personal de una sola página (SPA con SSR) construido con Angular en su última versión estable. El objetivo es una web ultrarrápida, con arquitectura limpia y mantenible, que muestre información personal y proyectos de forma atractiva.

---

## Stack Tecnológico

| Área            | Tecnología              | Versión objetivo  |
| --------------- | ----------------------- | ----------------- |
| Framework       | Angular                 | 20.x (latest)     |
| Lenguaje        | TypeScript              | 5.x (strict mode) |
| Testing         | Vitest                  | 3.x               |
| Estilos         | Tailwind CSS            | 4.x               |
| Renderizado     | Angular SSR (Universal) | 20.x              |
| Package manager | pnpm                    | 9.x               |
| Linter          | ESLint + angular-eslint | latest            |
| Formatter       | Prettier                | latest            |
| CI/CD           | GitHub Actions          | —                 |
| Hosting         | Vercel / Netlify (SSR)  | —                 |

---

## Arquitectura: Clean Architecture

El proyecto se organiza en cuatro capas concéntricas con dependencias unidireccionales (de exterior a interior):

```
Presentation → Application → Domain ← Infrastructure
```

### Capas

#### 1. Domain (núcleo)

- Entidades puras de negocio (clases/interfaces TypeScript sin dependencias externas).
- Interfaces de repositorios (contratos abstractos).
- Value objects y tipos compartidos del dominio.
- **Sin dependencias de Angular ni de ninguna librería externa.**

#### 2. Application

- Casos de uso (use cases): orquestan la lógica de negocio usando los repositorios del dominio.
- Interfaces de servicios de aplicación.
- DTOs (Data Transfer Objects) de entrada/salida de los casos de uso.
- **Solo depende del Domain.**

#### 3. Infrastructure

- Implementaciones concretas de los repositorios del dominio.
- Fuentes de datos: archivos JSON estáticos, APIs externas (GitHub API, etc.).
- Adaptadores y mapeadores de datos externos a entidades del dominio.
- **Depende del Domain. Registrada en Angular DI como providers.**

#### 4. Presentation

- Componentes Angular standalone.
- Páginas (smart components) que inyectan casos de uso vía DI.
- Estado reactivo con Angular Signals.
- Routing y lazy loading.
- **Solo llama a la capa Application. Nunca accede a Infrastructure directamente.**

### Estructura de directorios objetivo

```
src/
├── app/
│   ├── core/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── project.entity.ts
│   │   │   │   └── profile.entity.ts
│   │   │   └── repositories/
│   │   │       ├── project.repository.ts      ← interfaz
│   │   │       └── profile.repository.ts      ← interfaz
│   │   ├── application/
│   │   │   └── use-cases/
│   │   │       ├── get-all-projects.use-case.ts
│   │   │       ├── get-project-by-id.use-case.ts
│   │   │       └── get-profile.use-case.ts
│   │   └── infrastructure/
│   │       ├── repositories/
│   │       │   ├── json-project.repository.ts  ← implementación
│   │       │   └── json-profile.repository.ts  ← implementación
│   │       └── data/
│   │           ├── projects.json
│   │           └── profile.json
│   ├── features/
│   │   ├── home/
│   │   │   ├── home.component.ts
│   │   │   └── home.component.html
│   │   ├── about/
│   │   │   ├── about.component.ts
│   │   │   └── about.component.html
│   │   ├── projects/
│   │   │   ├── projects.component.ts
│   │   │   ├── projects.component.html
│   │   │   └── components/
│   │   │       └── project-card/
│   │   └── contact/
│   │       ├── contact.component.ts
│   │       └── contact.component.html
│   ├── shared/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   └── footer/
│   │   └── ui/
│   │       └── (componentes UI reutilizables)
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
│   └── images/
├── styles/
│   └── global.css
└── environments/
    ├── environment.ts
    └── environment.prod.ts
```

---

## Secciones del Portfolio

| Sección  | Ruta                | Descripción                                  |
| -------- | ------------------- | -------------------------------------------- |
| Hero     | `/` (ancla)         | Presentación breve, nombre, rol, CTA         |
| About    | `/about` (ancla)    | Bio, habilidades, experiencia, tecnologías   |
| Projects | `/projects` (ancla) | Grid de proyectos con filtrado por categoría |
| Contact  | `/contact` (ancla)  | Links a redes sociales, email, formulario    |

La navegación será dentro de una Single Page con scroll suave entre secciones y rutas opcionales para detalle de proyecto (`/projects/:id`).

---

## Fases de Implementación

---

### FASE 0 — Setup del Proyecto

**Objetivo:** Repositorio inicializado con todas las herramientas configuradas y listo para desarrollar.

**Tareas:**

- [ ] Crear nuevo proyecto Angular con `ng new` usando SSR y standalone components
- [ ] Configurar pnpm como package manager
- [ ] Activar TypeScript strict mode en `tsconfig.json`
- [ ] Instalar y configurar Tailwind CSS v4
- [ ] Reemplazar Karma/Jasmine por Vitest
  - Instalar `vitest`, `@vitest/coverage-v8`, `@analogjs/vitest-angular`
  - Crear `vitest.config.ts`
  - Actualizar scripts en `package.json`
- [ ] Instalar y configurar ESLint con `angular-eslint`
- [ ] Instalar y configurar Prettier
- [ ] Configurar `.editorconfig`
- [ ] Configurar `husky` + `lint-staged` para pre-commit hooks
- [ ] Verificar que `ng build`, `ng serve --ssr` y `vitest` funcionan correctamente

---

### FASE 1 — Domain Layer

**Objetivo:** Definir el núcleo del negocio sin ninguna dependencia de framework.

**Tareas:**

- [ ] Definir entidad `Project` con sus propiedades (id, título, descripción, tecnologías, URL, imagen, categoría, destacado, fecha)
- [ ] Definir entidad `Profile` (nombre, rol, bio, habilidades, experiencia, redes sociales)
- [ ] Definir interfaz `ProjectRepository` con métodos: `getAll()`, `getById(id)`
- [ ] Definir interfaz `ProfileRepository` con método: `get()`
- [ ] Tests unitarios de entidades con Vitest

---

### FASE 2 — Application Layer

**Objetivo:** Implementar los casos de uso que orquestan la lógica.

**Tareas:**

- [ ] Implementar `GetAllProjectsUseCase`
- [ ] Implementar `GetProjectByIdUseCase`
- [ ] Implementar `GetFeaturedProjectsUseCase`
- [ ] Implementar `GetProfileUseCase`
- [ ] Tests unitarios de cada use case con mocks de repositorios (Vitest)

---

### FASE 3 — Infrastructure Layer

**Objetivo:** Implementar las fuentes de datos y registrar los providers de Angular.

**Tareas:**

- [ ] Crear `projects.json` con datos de proyectos reales
- [ ] Crear `profile.json` con datos de perfil personal
- [ ] Implementar `JsonProjectRepository` que carga desde JSON
- [ ] Implementar `JsonProfileRepository` que carga desde JSON
- [ ] Registrar repositorios en `app.config.ts` via tokens de inyección (`InjectionToken`)
- [ ] Tests de integración de repositorios con Vitest
- [ ] (Opcional) Implementar `GitHubProjectRepository` que consume la GitHub API

---

### FASE 4 — Presentation Layer: Estructura Base

**Objetivo:** Routing, layout y componentes de shell configurados.

**Tareas:**

- [ ] Configurar `app.routes.ts` con lazy loading por feature
- [ ] Crear `AppComponent` como shell (solo router-outlet)
- [ ] Crear componente `Navbar` (sticky, con links de ancla y toggle mobile)
- [ ] Crear componente `Footer`
- [ ] Configurar scroll suave entre secciones
- [ ] Crear página base para cada feature (home, about, projects, contact)

---

### FASE 5 — Features: Implementación de Secciones

**Objetivo:** Cada sección funcional con datos reales.

**Tareas:**

- [ ] **Hero**: animación de entrada, nombre, rol, foto, botones CTA (CV, contacto)
- [ ] **About**: bio, grid de habilidades con iconos, timeline de experiencia
- [ ] **Projects**:
  - Grid responsivo de tarjetas de proyecto
  - Filtrado por categoría/tecnología usando Signals
  - Página de detalle de proyecto (`/projects/:id`)
  - Indicadores de tecnologías, links a GitHub/demo
- [ ] **Contact**: links a redes, email copiable, formulario de contacto (opcional con EmailJS o similar)
- [ ] Tests de componentes con Vitest + Testing Library

---

### FASE 6 — Rendimiento y SEO

**Objetivo:** Core Web Vitals excelentes y buena indexación.

**Tareas:**

- [ ] Verificar que SSR está funcionando (Angular Universal)
- [ ] Configurar `TransferState` para no duplicar peticiones en hidratación
- [ ] Usar `NgOptimizedImage` para todas las imágenes
- [ ] Implementar lazy loading de imágenes y componentes
- [ ] Añadir `meta` tags (título, descripción, Open Graph) con `Meta` y `Title` services
- [ ] Generar `sitemap.xml`
- [ ] Configurar `robots.txt`
- [ ] Auditar con Lighthouse (objetivo: 95+ en todas las métricas)

---

### FASE 7 — Accesibilidad

**Objetivo:** Cumplir WCAG 2.1 AA mínimo.

**Tareas:**

- [ ] Verificar contraste de colores
- [ ] Añadir atributos `aria-label` y roles semánticos
- [ ] Asegurar navegación completa por teclado
- [ ] Verificar con axe DevTools o Lighthouse accessibility audit

---

### FASE 8 — CI/CD y Despliegue

**Objetivo:** Pipeline automático y sitio publicado.

**Tareas:**

- [ ] Crear workflow de GitHub Actions: lint + test + build en cada PR
- [ ] Configurar despliegue automático a Vercel o Netlify en merge a `main`
- [ ] Configurar dominio personalizado
- [ ] Configurar variables de entorno para producción
- [ ] Verificar rendimiento en producción con Lighthouse CI

---

## Requisitos del Proyecto

### Requisitos Funcionales

| ID    | Requisito                                                                        |
| ----- | -------------------------------------------------------------------------------- |
| RF-01 | El sitio muestra información personal: nombre, rol, bio, foto                    |
| RF-02 | El sitio lista todos los proyectos con título, descripción, tecnologías e imagen |
| RF-03 | El sitio permite filtrar proyectos por tecnología o categoría                    |
| RF-04 | Cada proyecto tiene una página de detalle accesible por URL directa              |
| RF-05 | El sitio muestra las habilidades técnicas y experiencia profesional              |
| RF-06 | El sitio incluye links a redes sociales (GitHub, LinkedIn, etc.)                 |
| RF-07 | El sitio incluye una vía de contacto (email o formulario)                        |
| RF-08 | El CV es descargable en PDF desde el sitio                                       |
| RF-09 | La navegación entre secciones usa scroll suave                                   |
| RF-10 | El sitio es completamente responsivo (mobile, tablet, desktop)                   |

### Requisitos No Funcionales

| ID     | Requisito                                                                                |
| ------ | ---------------------------------------------------------------------------------------- |
| RNF-01 | Puntuación Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO           |
| RNF-02 | First Contentful Paint (FCP) < 1.5s                                                      |
| RNF-03 | Time to Interactive (TTI) < 3s en conexión 3G                                            |
| RNF-04 | Cobertura de tests ≥ 80% en lógica de dominio y aplicación                               |
| RNF-05 | TypeScript en modo strict sin ningún `any` explícito                                     |
| RNF-06 | Sin errores ni warnings de ESLint en el código fuente                                    |
| RNF-07 | El sitio es indexable por motores de búsqueda (SSR)                                      |
| RNF-08 | El sitio incluye meta tags Open Graph para preview en redes sociales                     |
| RNF-09 | El sitio funciona sin JavaScript habilitado (contenido base visible con SSR)             |
| RNF-10 | La arquitectura respeta la regla de dependencia de Clean Architecture en todas sus capas |

### Requisitos Técnicos

| ID    | Requisito                                                              |
| ----- | ---------------------------------------------------------------------- |
| RT-01 | Angular 20+ con componentes standalone (sin NgModules)                 |
| RT-02 | Estado reactivo implementado exclusivamente con Angular Signals        |
| RT-03 | Vitest como test runner (sin Karma ni Jest)                            |
| RT-04 | Inyección de dependencias vía `InjectionToken` para desacoplar capas   |
| RT-05 | Routing con lazy loading en cada feature                               |
| RT-06 | SSR habilitado con hidratación incremental                             |
| RT-07 | pnpm como gestor de paquetes                                           |
| RT-08 | Pre-commit hooks que ejecutan lint y tests antes de cada commit        |
| RT-09 | Pipeline CI/CD con GitHub Actions                                      |
| RT-10 | Datos de proyectos y perfil almacenados en archivos JSON (sin backend) |

---

## Dependencias Principales (lista provisional)

```
# Core
@angular/core@20
@angular/platform-server@20   ← SSR

# Estilos
tailwindcss@4

# Testing
vitest@3
@vitest/coverage-v8
@analogjs/vitest-angular
@testing-library/angular

# Linting / Formato
eslint
angular-eslint
prettier
husky
lint-staged

# Utilidades opcionales
@angular/google-maps          ← si se añade mapa de ubicación
emailjs-com                   ← si se añade formulario de contacto
```

---

## Decisiones de Diseño Clave

1. **Sin NgModules**: Se usan exclusivamente componentes, directivas y pipes standalone para reducir boilerplate y facilitar tree-shaking.
2. **Signals sobre RxJS para estado local**: RxJS se reserva para streams asíncronos genuinos (HTTP). El estado de UI se gestiona con Signals.
3. **JSON estático como fuente de datos**: No hay backend. Los datos se sirven como assets, permitiendo hosting estático con SSR.
4. **InjectionToken para repositorios**: Las capas de presentación y aplicación nunca importan directamente las implementaciones de infraestructura; solo dependen del token/interfaz.
5. **SSR + Hydration**: Garantiza FCP rápido, SEO e indexabilidad sin sacrificar la interactividad de SPA.

---

_Documento interno — no subir a git._
