import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function discover(nombreEmpresa, rubro, pais) {
  const prompt = `Eres un experto en mercado de ${pais}.

La empresa "${nombreEmpresa}" opera en el rubro "${rubro}" en ${pais}.

Por favor, identifica los 5 competidores directos principales en este rubro.

Para cada competidor proporciona EXACTAMENTE en este formato JSON:
[
  {
    "nombre": "Nombre de la Competencia",
    "website": "www.ejemplo.com",
    "instagram": "@handle_instagram",
    "google_maps_query": "Nombre óptica Santiago Chile"
  }
]

Asegúrate de que sean competidores directos, operando en el mismo rubro en ${pais}. Solo retorna el JSON, sin explicaciones adicionales.`;

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    // Extraer JSON de la respuesta
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('No se pudo extraer JSON:', responseText);
      return [];
    }

    const competidores = JSON.parse(jsonMatch[0]);
    return competidores;
  } catch (error) {
    console.error('Error descubriendo competidores:', error);
    throw error;
  }
}
