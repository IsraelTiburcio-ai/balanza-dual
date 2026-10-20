# Balanza Dual

Encuentra los límites del óptimo. Microjuego táctil de Optimización I en HTML, CSS, JavaScript y SVG.

## Jugar

Cinco rondas por partida, una de cada mecánica, seleccionadas de 15 escenarios. Ajusta fichas numéricas, coloca sellos de factibilidad, explora vectores duales, iguala objetivos o marca restricciones incumplidas. Los errores permiten reintentar sin límite. El cronómetro mide tiempo real, sin penalizar la lectura.

`npm ci` · `npm test` · `npm run serve` (http://localhost:4173).

## Fuente y convenciones

Se revisó `GYM 4_251208_083217 (1).pdf`, páginas 9–11, incluido el contenido manuscrito. Primal: max z = cx, Ax ≤ b, x ≥ 0. Dual: min w = bᵀy, Aᵀy ≥ cᵀ, y ≥ 0. La profesora denomina g al objetivo dual: w = g en el juego. Se incluye el modelo de la p. 10 con x = (1,1), y = (1,1): z = 5 ≤ 18 = w.

Dualidad débil exige ambos vectores factibles. Igualdad más factibilidad certifica optimalidad. Un vector no factible no prueba que el modelo sea infactible. El resumen del Teorema Fundamental distingue los casos: óptimos iguales; uno no acotado y el otro infactible; ambos infactibles. No se usa la implicación incorrecta «infactible implica dual no acotado» de forma universal.

`bank.js` separa datos y resultados esperados; `math.js` calcula restricciones y objetivos. `app.js` controla interacción y visualización. Los valores mostrados durante ajustes son provisionales hasta verificar. Los escenarios se validan al iniciar y en CI antes de publicar.

## Accesibilidad

Controles nativos, botones ≥44 px, foco visible, estados `aria-pressed`, feedback anunciado, SVG con título y lectura textual equivalente, soporte de movimiento reducido. Audio sintetizado opcional, apagado por defecto. Fuentes web con fallback local. No se requieren gestos de arrastre ni hover.

## Publicación

GitHub Actions valida matemáticas y despliega únicamente archivos del sitio a Pages desde main.
