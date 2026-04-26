#!/bin/bash

echo "🔐 Configuración Segura de Variables de Entorno"
echo "=================================================="
echo ""
echo "⚠️  IMPORTANTE: Nunca compartas tus claves por chat o email"
echo ""

# Crear .env si no existe
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "✅ Archivo .env creado desde .env.example"
else
  echo "ℹ️  Archivo .env ya existe"
fi

echo ""
echo "📋 Variables a completar:"
echo ""

echo "1️⃣  ANTHROPIC_API_KEY (sk-ant-...)"
echo "   Obtener en: https://console.anthropic.com/account/api-keys"
echo "   → Copia la nueva clave que creaste"
echo "   → Abre .env en tu editor"
echo "   → Reemplaza el valor de ANTHROPIC_API_KEY"
echo ""

echo "2️⃣  RESEND_API_KEY (re_...)"
echo "   Obtener en: https://resend.com/api-keys"
echo "   → Crea cuenta o inicia sesión"
echo "   → Copia la API key"
echo "   → Pégala en RESEND_API_KEY del .env"
echo ""

echo "3️⃣  GOOGLE_SHEET_ID"
echo "   Pasos:"
echo "   → Ve a https://sheets.google.com"
echo "   → Crea nuevo Google Sheet"
echo "   → Copia el ID de la URL: docs.google.com/spreadsheets/d/{SHEET_ID}/edit"
echo "   → Pégalo en GOOGLE_SHEET_ID del .env"
echo ""

echo "4️⃣  GOOGLE_SERVICE_ACCOUNT (JSON)"
echo "   Pasos complejos - Ver SETUP.md para guía completa"
echo "   → Ve a https://console.cloud.google.com/"
echo "   → Crear proyecto 'neurox-intel'"
echo "   → Habilitar Google Sheets API"
echo "   → Service Account → Create Key → JSON"
echo "   → Copiar JSON completo (sin espacios)"
echo "   → Pegar en GOOGLE_SERVICE_ACCOUNT del .env"
echo ""

echo "==========================================="
echo "Editar .env manualmente:"
echo ""
echo "   nano .env"
echo "   # o"
echo "   open -a TextEdit .env"
echo ""
echo "Luego ejecutar:"
echo "   npm install"
echo "   npm start"
echo "==========================================="
