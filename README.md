# Neurox Intel - Sistema de Inteligencia Competitiva Automática

Sistema SaaS multi-cliente que monitorea competidores automáticamente cada lunes a las 8am hora Chile.

## Características

✅ **Descubrimiento automático** - Claude identifica 5 competidores directos
✅ **Monitoreo semanal** - Precios, promociones, productos, redes sociales
✅ **Análisis inteligente** - Claude genera reporte ejecutivo en español
✅ **Multi-cliente** - Agregar clientes sin tocar el código
✅ **Email automático** - Reporte ejecutivo vía Resend
✅ **Historial** - Google Sheets con datos de cada semana

## Stack

- Node.js 20
- Claude API (Haiku 4.5)
- Resend (Email)
- Google Sheets API (Historial)
- Cheerio + node-fetch (Scraping)
- Railway (Deploy + Cron)

## Instalación Local

```bash
git clone <repo>
cd neurox-intel
npm install
```

## Configuración

1. Copiar `.env.example` a `.env`
2. Completar variables de entorno:
   - `ANTHROPIC_API_KEY` - De Claude API
   - `RESEND_API_KEY` - De Resend
   - `GOOGLE_SHEET_ID` - ID del Google Sheet
   - `GOOGLE_SERVICE_ACCOUNT` - JSON stringificado de Google Cloud

## Agregar Cliente

Editar `src/config/clients.json`:

```json
[
  {
    "id": "queirolo",
    "nombre": "Ópticas Queirolo",
    "rubro": "ópticas y lentes",
    "pais": "Chile",
    "email": "joaquinrqueirolo@gmail.com",
    "activo": true,
    "competidores": [],
    "sheetName": "Queirolo"
  },
  {
    "id": "cliente2",
    "nombre": "Mi Negocio",
    "rubro": "rubro específico",
    "pais": "Chile",
    "email": "email@ejemplo.com",
    "activo": true,
    "competidores": [],
    "sheetName": "Cliente2"
  }
]
```

## Ejecución

### Local
```bash
npm start
```

### Railway (Automático)
Cron job configurado: **Lunes 11:00 UTC (8:00 AM Chile)**

## Flujo Completo

1. **Cron ejecuta index.js** cada lunes 8am
2. **Descubre competidores** - Claude lista 5 competidores directos
3. **Scrapea datos** - Precios, Instagram, Google Maps
4. **Compara semanas** - Detecta cambios vs. semana anterior
5. **Genera reporte** - Claude analiza y escribe reporte ejecutivo
6. **Envía email** - Reporte HTML vía Resend
7. **Guarda historial** - Datos en Google Sheets

## Variables de Entorno

```env
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
GOOGLE_SHEET_ID=1abc...xyz
GOOGLE_SERVICE_ACCOUNT={"type":"service_account","project_id":"..."}
NODE_ENV=production
```

## Google Sheets Setup

1. Crear Google Cloud Project
2. Crear Service Account
3. Compartir Google Sheet con el email del Service Account
4. Guardar JSON de credenciales en `GOOGLE_SERVICE_ACCOUNT`

## Deploy en Railway

```bash
railway link
railway up
```

Railway ejecutará el cron automáticamente cada lunes.

## Estructura de Datos

### clients.json
- `id` - Identificador único
- `nombre` - Nombre de la empresa
- `rubro` - Categoría de negocio
- `pais` - País de operación
- `email` - Email para reportes
- `activo` - Activar/desactivar cliente
- `competidores` - Array de competidores descubiertos
- `sheetName` - Nombre de hoja en Google Sheets

### Google Sheets
Columnas por cliente:
- Fecha
- Competidor
- WebsiteData (JSON)
- InstagramData (JSON)
- MapsData (JSON)
- JSON completo

## Logs

Railway mostrará logs de cada ejecución:
- Clientes procesados
- Competidores descubiertos
- Datos scrapeados
- Emails enviados
- Errores

## Soporte

Para agregar más rubros, editar `discover.js` con instrucciones específicas por industria.

---

**Versión**: 1.0.0
**Mantenedor**: Neurox
