# 🚀 Setup Guide - Neurox Intel

## Opción 1: Deploy Directo en Railway (RECOMENDADO)

### Paso 1: Conectar Git a Railway

```bash
cd /Users/macbookpro/neurox-intel
git remote add origin <tu-repo-github>
git push -u origin main
```

### Paso 2: Crear Variables de Entorno en Railway

En Railway Dashboard, agregar variables:

```
ANTHROPIC_API_KEY=sk-ant-...
RESEND_API_KEY=re_...
GOOGLE_SHEET_ID=1abc...xyz
GOOGLE_SERVICE_ACCOUNT={"type":"service_account",...}
NODE_ENV=production
```

### Paso 3: Verificar Cron

Railway ejecutará automáticamente:
- **Schedule**: Lunes 11:00 UTC (8:00 AM Chile)
- **Comando**: `node src/index.js`

---

## Opción 2: Testing Local

### Prerequisito: Instalar Node.js 20+

```bash
# Usando Homebrew (macOS)
brew install node@20

# O descargar de https://nodejs.org/
```

### Paso 1: Instalar Dependencias

```bash
cd /Users/macbookpro/neurox-intel
npm install
```

### Paso 2: Crear `.env` Local

Copiar `.env.example` → `.env`:

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
RESEND_API_KEY=re_your-key-here
GOOGLE_SHEET_ID=1abc123xyz456
GOOGLE_SERVICE_ACCOUNT={"type":"service_account","project_id":"neurox-intel",...}
NODE_ENV=development
```

### Paso 3: Ejecutar Pipeline

```bash
npm start
```

Debe mostrar:
```
🚀 Neurox Intel - Sistema de Inteligencia Competitiva
⏰ Ejecución: 2026-04-26T...
📋 Clientes activos: 1
📊 Procesando: Ópticas Queirolo (ópticas y lentes)
  🔍 Descubriendo competidores...
  ✓ Encontrados 5 competidores
  🕷️  Scrappeando datos...
  🤖 Analizando cambios con Claude...
  📧 Enviando reporte...
  📊 Guardando historial...
  ✅ Completado exitosamente
```

---

## 🔐 Obtener Credenciales

### 1. ANTHROPIC_API_KEY

1. Ir a https://console.anthropic.com/
2. Crear API Key
3. Copiar valor: `sk-ant-...`

### 2. RESEND_API_KEY

1. Ir a https://resend.com/
2. Crear cuenta o login
3. API Keys → Crear nueva key
4. Copiar valor: `re_...`

**Nota**: El email del remitente será `intel@neurox.com`. Si quieres cambiar, editar `src/mailer.js` línea 27.

### 3. GOOGLE_SHEET_ID

1. Crear nuevo Google Sheet: https://sheets.google.com
2. Copiar ID de la URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
3. Compartir con el Service Account email (ver paso 4)

### 4. GOOGLE_SERVICE_ACCOUNT

1. Ir a https://console.cloud.google.com/
2. Crear nuevo Project: "neurox-intel"
3. Habilitar API: Google Sheets API
4. Crear Service Account:
   - Ir a IAM & Admin → Service Accounts
   - Create Service Account
   - Nombre: "neurox-intel"
   - Grant role: Editor
   - Crear Key → JSON
5. Copiar el JSON completo
6. En tu `.env`, stringificar sin espacios:

```env
GOOGLE_SERVICE_ACCOUNT={"type":"service_account","project_id":"neurox-intel",...}
```

---

## 📋 Agregar Más Clientes

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
    "rubro": "rubro",
    "pais": "Chile",
    "email": "email@ejemplo.com",
    "activo": true,
    "competidores": [],
    "sheetName": "Cliente2"
  }
]
```

El sistema descubrirá competidores automáticamente en la primera ejecución.

---

## ✅ Checklist Pre-Deploy

- [ ] API Key Anthropic obtenida
- [ ] API Key Resend obtenida
- [ ] Google Sheet creado y compartido
- [ ] Service Account JSON obtenido
- [ ] Variables de entorno configuradas en Railway
- [ ] `clients.json` con tus clientes
- [ ] Repository pusheado a GitHub
- [ ] Railway conectado al repo

---

## 🐛 Debugging

### Error: "ANTHROPIC_API_KEY no definida"
```bash
# Verificar .env existe y tiene ANTHROPIC_API_KEY
cat .env | grep ANTHROPIC
```

### Error: "No se puede conectar a Google Sheets"
```bash
# Verificar JSON de Service Account es válido
# Compartir Google Sheet con email del Service Account
```

### Error: "Email no enviado"
```bash
# Verificar RESEND_API_KEY es válido
# Comprobar que el email destino es correcto
```

---

## 🚀 Ejecución en Railway

Una vez deployado, Railway ejecutará **automáticamente cada lunes a las 8:00 AM Chile**:

1. Lee `clients.json`
2. Descubre competidores (si primera vez)
3. Scrapea datos
4. Analiza cambios
5. Envía reportes por email
6. Guarda historial en Google Sheets

Ver logs en Railway Dashboard → Deployments → Logs.

---

**¿Preguntas?** Revisar `README.md` o los logs en Railway.
