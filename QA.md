# Informe QA

## Fuente

Leídas pp. 9–11 del Gimnasio 4, texto e imágenes manuscritas. Se mantiene max/≤/x≥0 frente a min/≥/y≥0, y la correspondencia w = g.

## Matemáticas — aprobado por comprobaciones automáticas

- 15 escenarios, cinco tipos; tres variantes por tipo.
- Valores objetivo y factibilidades contrastados contra resultados esperados explícitos.
- Transpuesta Aᵀ y correspondencias b/c verificadas para cada par.
- Todos los retos de coincidencia tienen una solución factible con igualdad alcanzable.
- Cada reto de cota tiene exactamente un vector candidato factible.
- Cada reto de error tiene z > w y al menos un vector no factible; se identifica una restricción incumplida.
- Malla independiente de vectores enteros: sin contradicciones de dualidad débil para pares factibles.
- Regresión: igualdad sin factibilidad no certifica optimalidad; vectores negativos rechazados.
- Cuatro pruebas Node aprobadas con `npm test`.

## Navegador — Chromium con emulación

`node tests/browser.mjs` con servidor local en 4287. Cinco partidas completas, una por viewport, cinco rondas cada una. En conjunto se recorrieron los 15 escenarios del banco.

| Viewport | Duración simulada | JavaScript | axe |
|---|---:|---|---|
| 375 × 812 | 62 s | 0 errores | 0 infracciones |
| 390 × 844 | 62 s | 0 errores | 0 infracciones |
| 820 × 1180 | 62 s | 0 errores | 0 infracciones |
| 1180 × 820 | 62 s | 0 errores | 0 infracciones |
| 1440 × 900 | 62 s | 0 errores | 0 infracciones |

Se programaron 12 s de lectura/reflexión por ronda: **estos tiempos no son mediciones con personas** ni una garantía de duración pedagógica. El cronómetro real no fuerza pausas ni impone límite. Pendiente pilotaje con alumnos para confirmar 60–110 s.

Comprobado en cada ronda: ausencia de scroll horizontal, controles visibles ≥44 × 44, verificación correcta, siguiente ronda y certificado visual sólo en coincidencia factible. Replay vuelve a ronda 1 y limpia estado. Audio activable/desactivable sin errores, apagado inicialmente; emisión sintetizada, sin música. Entrada por teclado probada al iniciar; controles nativos utilizables con Tab/Enter/flechas. Un contexto con movimiento reducido. Revisión visual de captura móvil completa de 390 × 844.

Prueba adicional de fichas numéricas iguales pero incorrectas: rechazada, sin avanzar ni mostrar certificado.

## Pendientes de validación humana

- Duración con alumnos y comprensión de instrucciones.
- Safari/iPad y iPhone físicos: los tamaños se emularon en Chromium; no se probó hardware Apple.
- Escucha física del sonido y revisión con VoiceOver. axe y comprobación del código no sustituyen estas pruebas.
