# TODO-LIST — Portfolio Angular

Lista de tareas derivada de [PLAN-01.md](./PLAN-01.md).
Estado: `[ ]` pendiente · `[x]` completado · `[-]` descartado / no aplica

---

## FASE 0 — Setup del Proyecto

- [x] **T-00-01** Crear nuevo proyecto Angular con `ng new` usando SSR y standalone components
- [x] **T-00-02** Configurar pnpm como package manager
- [x] **T-00-03** Activar TypeScript strict mode en `tsconfig.json`
- [x] **T-00-04** Instalar y configurar Tailwind CSS v4
- [x] **T-00-05** Instalar `vitest`, `@vitest/coverage-v8` y `@analogjs/vitest-angular`
- [x] **T-00-06** Crear `vitest.config.ts`
- [x] **T-00-07** Actualizar scripts de test en `package.json` (eliminar Karma/Jasmine)
- [x] **T-00-08** Instalar y configurar ESLint con `angular-eslint`
- [x] **T-00-09** Instalar y configurar Prettier
- [x] **T-00-10** Configurar `.editorconfig`
- [x] **T-00-11** Configurar `husky` + `lint-staged` para pre-commit hooks
- [x] **T-00-12** Verificar que `ng build` finaliza sin errores
- [x] **T-00-13** Verificar que `ng serve --ssr` arranca correctamente
- [x] **T-00-14** Verificar que `vitest` ejecuta la suite sin errores

---

## FASE 1 — Domain Layer

- [ ] **T-01-01** Definir entidad `Project` (id, título, descripción, tecnologías, URL, imagen, categoría, destacado, fecha)
- [ ] **T-01-02** Definir entidad `Profile` (nombre, rol, bio, habilidades, experiencia, redes sociales)
- [ ] **T-01-03** Definir interfaz `ProjectRepository` con métodos `getAll()` y `getById(id)`
- [ ] **T-01-04** Definir interfaz `ProfileRepository` con método `get()`
- [ ] **T-01-05** Escribir tests unitarios de la entidad `Project` con Vitest
- [ ] **T-01-06** Escribir tests unitarios de la entidad `Profile` con Vitest

---

## FASE 2 — Application Layer

- [ ] **T-02-01** Implementar `GetAllProjectsUseCase`
- [ ] **T-02-02** Implementar `GetProjectByIdUseCase`
- [ ] **T-02-03** Implementar `GetFeaturedProjectsUseCase`
- [ ] **T-02-04** Implementar `GetProfileUseCase`
- [ ] **T-02-05** Tests unitarios de `GetAllProjectsUseCase` con mock de repositorio
- [ ] **T-02-06** Tests unitarios de `GetProjectByIdUseCase` con mock de repositorio
- [ ] **T-02-07** Tests unitarios de `GetFeaturedProjectsUseCase` con mock de repositorio
- [ ] **T-02-08** Tests unitarios de `GetProfileUseCase` con mock de repositorio

---

## FASE 3 — Infrastructure Layer

- [ ] **T-03-01** Crear `projects.json` con datos de proyectos reales
- [ ] **T-03-02** Crear `profile.json` con datos del perfil personal
- [ ] **T-03-03** Implementar `JsonProjectRepository`
- [ ] **T-03-04** Implementar `JsonProfileRepository`
- [ ] **T-03-05** Registrar repositorios en `app.config.ts` mediante `InjectionToken`
- [ ] **T-03-06** Tests de integración de `JsonProjectRepository`
- [ ] **T-03-07** Tests de integración de `JsonProfileRepository`
- [ ] **T-03-08** _(Opcional)_ Implementar `GitHubProjectRepository` consumiendo la GitHub API

---

## FASE 4 — Presentation Layer: Estructura Base

- [ ] **T-04-01** Configurar `app.routes.ts` con lazy loading por feature
- [ ] **T-04-02** Crear `AppComponent` como shell (solo `<router-outlet>`)
- [ ] **T-04-03** Crear componente `Navbar` (sticky, links de ancla, toggle mobile)
- [ ] **T-04-04** Crear componente `Footer`
- [ ] **T-04-05** Configurar scroll suave entre secciones
- [ ] **T-04-06** Crear página base `HomeComponent`
- [ ] **T-04-07** Crear página base `AboutComponent`
- [ ] **T-04-08** Crear página base `ProjectsComponent`
- [ ] **T-04-09** Crear página base `ContactComponent`

---

## FASE 5 — Features: Implementación de Secciones

### Hero

- [ ] **T-05-01** Maquetación de la sección Hero (nombre, rol, foto)
- [ ] **T-05-02** Animación de entrada
- [ ] **T-05-03** Botón CTA descarga de CV (PDF)
- [ ] **T-05-04** Botón CTA enlace a sección Contacto

### About

- [ ] **T-05-05** Sección de bio personal
- [ ] **T-05-06** Grid de habilidades con iconos de tecnologías
- [ ] **T-05-07** Timeline de experiencia profesional

### Projects

- [ ] **T-05-08** Grid responsivo de tarjetas de proyecto
- [ ] **T-05-09** Componente `ProjectCardComponent`
- [ ] **T-05-10** Filtrado por categoría / tecnología con Signals
- [ ] **T-05-11** Página de detalle de proyecto (`/projects/:id`)
- [ ] **T-05-12** Links a GitHub y demo en cada tarjeta

### Contact

- [ ] **T-05-13** Links a redes sociales
- [ ] **T-05-14** Email copiable al portapapeles
- [ ] **T-05-15** _(Opcional)_ Formulario de contacto con EmailJS

### Tests

- [ ] **T-05-16** Tests de componente `ProjectCardComponent` con Vitest + Testing Library
- [ ] **T-05-17** Tests de componente `ProjectsComponent` (filtrado)
- [ ] **T-05-18** Tests de componente `NavbarComponent`

---

## FASE 6 — Rendimiento y SEO

- [ ] **T-06-01** Verificar SSR funcionando y contenido renderizado en servidor
- [ ] **T-06-02** Configurar `TransferState` para evitar doble petición al hidratar
- [ ] **T-06-03** Reemplazar `<img>` por `NgOptimizedImage` en todos los componentes
- [ ] **T-06-04** Implementar lazy loading de imágenes
- [ ] **T-06-05** Añadir meta tags dinámicos (título, descripción) con `Title` y `Meta` services
- [ ] **T-06-06** Añadir meta tags Open Graph
- [ ] **T-06-07** Generar `sitemap.xml`
- [ ] **T-06-08** Configurar `robots.txt`
- [ ] **T-06-09** Auditar con Lighthouse y alcanzar ≥ 95 en todas las métricas

---

## FASE 7 — Accesibilidad

- [ ] **T-07-01** Verificar contraste de colores (WCAG AA)
- [ ] **T-07-02** Añadir `aria-label` y roles semánticos en componentes interactivos
- [ ] **T-07-03** Verificar navegación completa por teclado (foco visible)
- [ ] **T-07-04** Auditar con axe DevTools o Lighthouse Accessibility

---

## FASE 8 — CI/CD y Despliegue

- [ ] **T-08-01** Crear workflow de GitHub Actions: lint + test + build en cada PR
- [ ] **T-08-02** Configurar despliegue automático a Vercel o Netlify en merge a `main`
- [ ] **T-08-03** Configurar dominio personalizado
- [ ] **T-08-04** Configurar variables de entorno para producción
- [ ] **T-08-05** Configurar Lighthouse CI en el pipeline
- [ ] **T-08-06** Verificar rendimiento en producción

---

## Documentación Interna

- [x] **T-DOC-01** Crear `docs/PLAN-01.md` con el plan de implementación completo
- [x] **T-DOC-02** Crear `docs/TODO-LIST.md` (este fichero)
- [x] **T-DOC-03** Crear `docs/backlog.md` con el registro de cambios

---

_Documento interno — no subir a git._
