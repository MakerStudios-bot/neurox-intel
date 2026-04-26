# ⚡ Quick Start - Neurox Intel

## 3 Pasos para empezar

### 1️⃣ Clonar y Configurar

```bash
cd /Users/macbookpro/neurox-intel
cp .env.example .env
# Editar .env con tus credenciales
```

### 2️⃣ Instalar y Ejecutar

```bash
npm install
npm start
```

### 3️⃣ Deploy en Railway

```bash
railway link
railway up
```

---

## ¿Qué hace el sistema?

```
Lunes 8am Chile
    ↓
    Lee clientes desde clients.json
    ↓
    Para cada cliente:
      1. Descubre 5 competidores (Claude)
      2. Scrapea web + Instagram + Google Maps
      3. Compara con datos de semana anterior
      4. Analiza cambios (Claude)
      5. Genera reporte ejecutivo
      6. Envía por email (Resend)
      7. Guarda en Google Sheets
    ↓
    Cliente recibe email con inteligencia competitiva
```

---

## Credenciales Necesarias

| Variable | Donde Obtenerla | Tipo |
|----------|-----------------|------|
| `ANTHROPIC_API_KEY` | console.anthropic.com | sk-ant-... |
| `RESEND_API_KEY` | resend.com/api-keys | re_... |
| `GOOGLE_SHEET_ID` | docs.google.com/spreadsheets | 1abc...xyz |
| `GOOGLE_SERVICE_ACCOUNT` | console.cloud.google.com | JSON |

---

## Agregar Cliente

Editar `src/config/clients.json`:

```json
{
  "id": "nuevo_cliente",
  "nombre": "Mi Empresa",
  "rubro": "mi rubro",
  "pais": "Chile",
  "email": "cliente@email.com",
  "activo": true,
  "competidores": [],
  "sheetName": "MiEmpresa"
}
```

**Listo.** El sistema descubrirá competidores automáticamente.

---

## Estructura del Proyecto

```
neurox-intel/
├── src/
│   ├── index.js           ← Pipeline principal
│   ├── discovery.js       ← Claude descubre competidores
│   ├── scraper.js         ← Extrae datos de web + IG + Maps
│   ├── analyzer.js        ← Claude analiza cambios
│   ├── sheets.js          ← Guarda en Google Sheets
│   ├── mailer.js          ← Envía reportes
│   └── config/
│       └── clients.json   ← Clientes (editar aquí)
├── package.json           ← Dependencias Node.js
├── railway.toml           ← Cron automático cada lunes 8am
├── .env.example           ← Variables de entorno
└── SETUP.md              ← Guía completa
```

---

## Ejemplo: Ejecución

```
🚀 Neurox Intel - Sistema de Inteligencia Competitiva
⏰ Ejecución: 2026-04-26T12:00:00.000Z

📋 Clientes activos: 1

📊 Procesando: Ópticas Queirolo (ópticas y lentes)
  🔍 Descubriendo competidores...
  ✓ Encontrados 5 competidores
  🕷️  Scrappeando datos...
    • Óptica Los Andes
    • Óptica San Isidro
    • Óptica Austral
    • Óptica Metropolitana
    • Óptica Visión 2020
  🤖 Analizando cambios con Claude...
  📧 Enviando reporte...
    Email enviado a: joaquinrqueirolo@gmail.com
  📊 Guardando historial...
    Guardados en Google Sheets: 5 registros
  ✅ Completado exitosamente

✨ Pipeline completado
```

---

## Troubleshooting

**Error: ANTHROPIC_API_KEY no definida**
→ Verificar que `.env` existe y tiene la clave

**Error: Email no enviado**
→ Verificar RESEND_API_KEY es válida

**Error: No se conecta a Google Sheets**
→ Compartir Google Sheet con email del Service Account

---

## Soporte

Ver `SETUP.md` para guía completa.
Ver `README.md` para documentación detallada.

---

**¡Listo! Tu sistema de inteligencia competitiva está funcionando.**
