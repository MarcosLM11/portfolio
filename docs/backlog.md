# Backlog de Cambios — Portfolio Angular

Registro cronológico de todas las acciones realizadas sobre el proyecto: ficheros creados, modificados, eliminados, documentos de especificación generados y decisiones tomadas.

Tipos: `CREADO` · `MODIFICADO` · `ELIMINADO` · `DECISIÓN` · `SPEC`

---

## [2026-03-26] — Inicialización del repositorio

| Tipo     | Ruta / Nombre | Descripción                                                                                                        |
| -------- | ------------- | ------------------------------------------------------------------------------------------------------------------ |
| `CREADO` | `.gitignore`  | Fichero de exclusiones de git generado en el commit inicial. Incluye patrones para Angular, Node, entornos y logs. |
| `CREADO` | `LICENSE`     | Licencia del proyecto añadida en el commit inicial.                                                                |
| `CREADO` | `README.md`   | Fichero README inicial (placeholder).                                                                              |

---

## [2026-03-26] — Configuración de exclusiones y estructura de documentación

| Tipo         | Ruta / Nombre | Descripción                                                                                                 |
| ------------ | ------------- | ----------------------------------------------------------------------------------------------------------- |
| `MODIFICADO` | `.gitignore`  | Añadida exclusión del directorio `docs/` completo para que ningún documento interno se suba al repositorio. |
| `CREADO`     | `docs/`       | Directorio de documentación interna del proyecto (ignorado por git).                                        |

---

## [2026-03-26] — Plan de implementación PLAN-01

| Tipo   | Ruta / Nombre     | Descripción                                                                                                                                                                                                                                                                                                      |
| ------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SPEC` | `docs/PLAN-01.md` | Plan de implementación completo. Incluye visión general, stack tecnológico, arquitectura Clean Architecture (4 capas), estructura de directorios objetivo, 8 fases de implementación, 30 requisitos (10 funcionales, 10 no funcionales, 10 técnicos), dependencias provisionales y 5 decisiones de diseño clave. |

---

## [2026-03-26] — Lista de tareas TODO-LIST

| Tipo     | Ruta / Nombre       | Descripción                                                                                                                                                            |
| -------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CREADO` | `docs/TODO-LIST.md` | Lista de 62 tareas con ID único (T-00-xx … T-08-xx) y checkboxes, organizadas en 8 fases derivadas de PLAN-01.md. Incluye sección de documentación interna (T-DOC-xx). |

---

## [2026-03-26] — Backlog de cambios

| Tipo     | Ruta / Nombre     | Descripción                                                                     |
| -------- | ----------------- | ------------------------------------------------------------------------------- |
| `CREADO` | `docs/backlog.md` | Este fichero. Registro cronológico de cambios del proyecto en formato de tabla. |

---

## [2026-03-26] — FASE 0: Setup del Proyecto (T-00-01 a T-00-14)

| Tipo         | Ruta / Nombre                                | Descripción                                                                                                                         |
| ------------ | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `CREADO`     | `src/`, `angular.json`, `package.json`, etc. | Proyecto Angular 21 generado con `ng new` usando SSR, standalone components y pnpm.                                                 |
| `MODIFICADO` | `.npmrc`                                     | Añadida opción `shamefully-hoist=true` para compatibilidad con Node.js v25.8.0 (no LTS).                                            |
| `CREADO`     | `postcss.config.mjs`                         | Configuración PostCSS para Tailwind CSS v4 (`@tailwindcss/postcss`).                                                                |
| `MODIFICADO` | `src/styles.css`                             | Añadido `@import "tailwindcss"` para activar Tailwind v4.                                                                           |
| `CREADO`     | `vitest.config.ts`                           | Configuración de Vitest usando `@analogjs/vite-plugin-angular` (no el builder Angular CLI).                                         |
| `CREADO`     | `src/test-setup.ts`                          | Setup de tests: inicialización de Zone.js y TestBed con `BrowserTestingModule`.                                                     |
| `MODIFICADO` | `angular.json`                               | Configurado `@angular/build:unit-test` con `runner: vitest` para tests nativos de Angular 21.                                       |
| `CREADO`     | `eslint.config.mjs`                          | Configuración ESLint flat config con `angular-eslint` y `typescript-eslint`.                                                        |
| `MODIFICADO` | `package.json`                               | Scripts actualizados: `test` → `ng test`, añadidos `test:watch`, `test:coverage`, `lint`. Configuración `lint-staged`.              |
| `CREADO`     | `.husky/pre-commit`                          | Hook pre-commit ejecuta `lint-staged` (ESLint + Prettier sobre archivos staged).                                                    |
| `DECISIÓN`   | —                                            | `ng test` con `@angular/build:unit-test` + `runner: vitest` es el enfoque correcto para Angular 21, no invocar Vitest directamente. |
| `DECISIÓN`   | —                                            | Node.js v25.8.0 (no LTS) requiere `shamefully-hoist=true` en pnpm para resolver `lru-cache` correctamente en workers de esbuild.    |

---

_Documento interno — no subir a git._
