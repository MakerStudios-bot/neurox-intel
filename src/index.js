import 'dotenv/config.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { discover } from './discovery.js';
import { scrapeCompetitors } from './scraper.js';
import { analyzeChanges } from './analyzer.js';
import { getLastWeekData, saveWeeklyData } from './sheets.js';
import { sendReport } from './mailer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientsPath = path.join(__dirname, 'config', 'clients.json');

console.log('🚀 Neurox Intel - Sistema de Inteligencia Competitiva (v2)');
console.log(`⏰ Ejecución: ${new Date().toISOString()}`);
console.log('');

async function loadClients() {
  const data = await fs.readFile(clientsPath, 'utf-8');
  return JSON.parse(data);
}

async function saveClients(clients) {
  await fs.writeFile(clientsPath, JSON.stringify(clients, null, 2));
}

async function processClient(client) {
  console.log(`\n📊 Procesando: ${client.nombre} (${client.rubro})`);

  try {
    // 1. Descubrir competidores si no los tiene
    let competidores = client.competidores || [];
    if (competidores.length === 0) {
      console.log('  🔍 Descubriendo competidores...');
      competidores = await discover(client.nombre, client.rubro, client.pais);
      client.competidores = competidores;
      await saveClients(await loadClients().then(cs => {
        const updated = cs.find(c => c.id === client.id);
        if (updated) updated.competidores = competidores;
        return cs;
      }));
      console.log(`  ✓ Encontrados ${competidores.length} competidores`);
    }

    // 2. Scrapear competidores
    console.log('  🕷️  Scrappeando datos...');
    const datosActuales = await scrapeCompetitors(competidores);

    // 3. Leer datos de la semana anterior
    const datosAnterior = await getLastWeekData(client.id);

    // 4. Analizar cambios
    console.log('  🤖 Analizando cambios con Claude...');
    const reporte = await analyzeChanges(
      client.nombre,
      competidores,
      datosActuales,
      datosAnterior
    );

    // 5. Enviar email
    console.log('  📧 Enviando reporte...');
    await sendReport(client.email, client.nombre, reporte);

    // 6. Guardar en Google Sheets
    console.log('  📊 Guardando historial...');
    await saveWeeklyData(client.id, datosActuales);

    console.log('  ✅ Completado exitosamente');
    return true;
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  try {
    const clients = await loadClients();
    const clientesActivos = clients.filter(c => c.activo);

    console.log(`📋 Clientes activos: ${clientesActivos.length}`);

    for (const client of clientesActivos) {
      await processClient(client);
    }

    console.log('\n✨ Pipeline completado\n');
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
