#!/bin/bash

echo "🔍 Verificando setup de Neurox Intel..."
echo ""

# Verificar archivos
echo "📁 Estructura de archivos:"
files=(
  "package.json"
  ".env.example"
  "railway.toml"
  "README.md"
  "SETUP.md"
  "src/index.js"
  "src/discovery.js"
  "src/scraper.js"
  "src/analyzer.js"
  "src/sheets.js"
  "src/mailer.js"
  "src/config/clients.json"
)

all_good=true
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ✗ $file (FALTA)"
    all_good=false
  fi
done

echo ""
echo "🔑 Configuración:"

# Verificar .env
if [ -f ".env" ]; then
  echo "  ✓ .env existe"
  if grep -q "ANTHROPIC_API_KEY" .env; then
    echo "  ✓ ANTHROPIC_API_KEY configurada"
  else
    echo "  ⚠ ANTHROPIC_API_KEY no configurada"
  fi
  if grep -q "RESEND_API_KEY" .env; then
    echo "  ✓ RESEND_API_KEY configurada"
  else
    echo "  ⚠ RESEND_API_KEY no configurada"
  fi
else
  echo "  ⚠ .env no existe (copiar desde .env.example)"
fi

echo ""
echo "📦 Cliente de prueba:"
if grep -q "queirolo" src/config/clients.json; then
  echo "  ✓ Ópticas Queirolo configurada"
else
  echo "  ✗ Cliente no encontrado"
  all_good=false
fi

echo ""
if [ "$all_good" = true ]; then
  echo "✅ Setup verificado exitosamente"
  echo ""
  echo "Próximos pasos:"
  echo "1. Completar variables en .env (ANTHROPIC_API_KEY, RESEND_API_KEY, GOOGLE_*)"
  echo "2. Ejecutar: npm install"
  echo "3. Ejecutar: npm start"
  echo "4. Deploy en Railway"
else
  echo "❌ Hay problemas con el setup"
fi
