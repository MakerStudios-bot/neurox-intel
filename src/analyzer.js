import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyzeChanges(
  nombreCliente,
  competidores,
  datosActuales,
  datosAnterior
) {
  const competidoresInfo = competidores.map(c => c.nombre).join(', ');
  const datosJSON = {
    cliente: nombreCliente,
    competidoresMonitoreados: competidoresInfo,
    datosActuales,
    datosAnterior: datosAnterior || [],
  };

  const prompt = `Eres un analista experto en inteligencia competitiva para ${nombreCliente}.

Aquí están los datos scrapeados esta semana de sus competidores:

${JSON.stringify(datosJSON, null, 2)}

Genera un REPORTE EJECUTIVO en español que incluya:

1. **Resumen Ejecutivo** (3-4 puntos clave)
2. **Cambios en Precios** (si hay)
3. **Nuevas Promociones Detectadas** (si hay)
4. **Actividad en Redes Sociales** (movimientos en Instagram)
5. **Reputación y Reseñas** (cambios de rating si aplica)
6. **Recomendaciones** (acciones sugeridas para ${nombreCliente})

Sé específico, cuantificable y accionable. Usa números cuando sea posible.`;

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const reporte = message.content[0].type === 'text' ? message.content[0].text : '';
    return reporte;
  } catch (error) {
    console.error('Error analizando cambios:', error);
    throw error;
  }
}
