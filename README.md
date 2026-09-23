# SismoAlerta

**Alertas de sismos en tiempo real con cuenta regresiva, sirena, vibración y notificaciones.**

SismoAlerta es una Progressive Web App (PWA) que monitorea sismos mundiales con datos públicos de USGS, calcula la distancia a tu ubicación y te alerta cuando un sismo está cerca.

**Autor:** Luis Garcia  
© Luis Garcia. Todos los derechos reservados.  
Prohibida la reproducción, copia o redistribución sin autorización.

---

## Qué hace

- Último sismo + historial internacional
- Bandeja filtrada por tu país
- Mapa satelital interactivo (Leaflet + Esri)
- Gráfico de magnitudes por país
- Alertas por distancia (crítica ≤50 km → baja ≤200 km)
- Alcance extendido para sismos fuertes (M≥6.5 hasta 1000 km)
- Simulacros de prueba
- Multidioma (ES, EN, PT, FR, DE, IT, ZH, JA)
- Instalable como PWA

---

## Sistema de alertas

| Distancia | Nivel    |
|-----------|----------|
| ≤ 50 km   | Crítica  |
| ≤ 75 km   | Alta     |
| ≤ 100 km  | Media    |
| ≤ 200 km  | Baja     |

**Sismos fuertes:** M≥6.5 → 400 km · M≥7.0 → 600 km · M≥7.5 → 800 km · M≥8.0 → 1000 km

Al activarse: overlay + cuenta regresiva + sirena + vibración + notificación.

La estimación de llegada es aproximada. **No sustituye sistemas oficiales de emergencia.**

---

## Datos y privacidad

- **USGS** (sismos) · **Nominatim** (ciudades) · **Esri** (mapa)
- Todo se guarda solo en el dispositivo (`localStorage`)
- Credenciales con hash **PBKDF2-SHA256** (100k iteraciones); nunca en texto plano
- Sin backend propio

---

## Tecnologías

HTML5 · CSS3 · JavaScript (vanilla) · Leaflet · Web Audio API · Notification API · Service Worker · Web Push

Sin frameworks. Un solo archivo HTML autocontenido: `SismoAlerta.html`

---

## Uso local

```bash
python -m http.server 8080
# Abrir: http://localhost:8080/SismoAlerta.html
```

Navegador moderno. Mejor en HTTPS o `localhost`.

---

## Licencia

```
SismoAlerta — Autor: Luis Garcia
© Luis Garcia. Todos los derechos reservados.
Prohibida la copia o redistribución sin autorización.
```

**Aviso:** No afiliada a USGS, OpenStreetMap ni Esri. No sustituye alertas oficiales.

**Luis Garcia** · *Tu seguridad, nuestra prioridad.*
