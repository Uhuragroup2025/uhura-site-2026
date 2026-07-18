# Ambient Field Expressive — intervención pre-QA

## Alcance

Optimización aislada del runtime compartido de Ambient Field Expressive. No modifica el Home heredado, navegación, arquitectura, componentes de contenido, copy, paleta ni composición de masas.

## Cambios

- Campo interno adaptativo: `250px` en capacidad alta, `240px` en capacidad media y `180px` estático en capacidad baja o fallback; la altura interna se limita a `260px` en pantallas angostas.
- DPR interno limitado a `1.25` en capacidad alta/media y `1` en baja.
- Ruido por píxel simplificado y reutilización de coordenadas/grano precalculados; se eliminaron cálculos de ruido repetidos por blob.
- Respuesta del puntero ajustada a `0.22` para posición y `0.11` para influencia, conservando inercia corta.
- El gobernador conserva el último nivel estable entre ráfagas y expone calidad, DPR, resolución, FPS, objetivo, tiempo de render y estado mediante atributos `data-ambient-*` para QA.
- Pausa explícita al ocultar la pestaña, fuera del viewport y en reposo; mobile/touch, reduced motion y equipos de baja capacidad usan salida estática.

## Comparación local

- Antes: aproximadamente `107–137 ms` por render y `~11 FPS` en interacción.
- Después: rango estable observado de `20–32 ms` por render, objetivo adaptativo de `30–45 FPS` y `0 FPS` en reposo.

Las cifras dependen del dispositivo y del navegador; los atributos de diagnóstico no crean UI visible ni logging de producción.
