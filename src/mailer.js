import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function htmlTemplate(nombreCliente, reporte) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; border-radius: 8px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .header p { margin: 10px 0 0 0; font-size: 14px; opacity: 0.9; }
    .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { margin: 20px 0; }
    .section h2 { color: #667eea; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
    .section p { margin: 10px 0; white-space: pre-wrap; font-size: 14px; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #666; }
    .badge { display: inline-block; background: #667eea; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin: 5px 5px 5px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Inteligencia Competitiva</h1>
      <p>Reporte Semanal para ${nombreCliente}</p>
    </div>
    <div class="content">
      <p>Hola,</p>
      <p>Te adjuntamos el reporte ejecutivo de inteligencia competitiva de esta semana:</p>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
        ${reporte.split('\n').map(line => `<p style="margin: 5px 0;">${line}</p>`).join('')}
      </div>

      <div class="section">
        <p style="color: #666; font-size: 13px;">Este reporte fue generado automáticamente el ${new Date().toLocaleDateString('es-CL')} por el sistema de inteligencia competitiva Neurox Intel.</p>
      </div>
    </div>
    <div class="footer">
      <p>© 2026 Neurox Intelligence System<br/>Monitoreo automático de competencia</p>
    </div>
  </div>
</body>
</html>
  `;
}

export async function sendReport(email, nombreCliente, reporte) {
  try {
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: `📊 Inteligencia Competitiva - ${nombreCliente} (Semana ${new Date().toISOString().split('T')[0]})`,
      html: htmlTemplate(nombreCliente, reporte),
    });

    if (response.error) {
      console.error('Error enviando email:', response.error);
      throw new Error(response.error);
    }

    console.log(`    Email enviado a: ${email}`);
    return response;
  } catch (error) {
    console.error('Error en sendReport:', error);
    throw error;
  }
}
