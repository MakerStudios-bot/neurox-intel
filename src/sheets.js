import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

let sheetsClient = null;

function getSheetClient() {
  if (sheetsClient) return sheetsClient;

  try {
    const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
    const auth = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    sheetsClient = google.sheets({ version: 'v4', auth });
    return sheetsClient;
  } catch (error) {
    console.error('Error inicializando Google Sheets:', error);
    throw error;
  }
}

export async function getLastWeekData(clientId) {
  try {
    const sheets = getSheetClient();
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;

    // Leer la última fila de cada competidor
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${clientId}!A:F`,
    });

    const rows = response.data.values || [];
    if (rows.length < 2) return [];

    // Retornar última fila (índice -1)
    const lastRow = rows[rows.length - 1];
    return lastRow;
  } catch (error) {
    console.error(`Error leyendo datos para ${clientId}:`, error);
    return [];
  }
}

export async function saveWeeklyData(clientId, datosActuales) {
  try {
    const sheets = getSheetClient();
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;

    // Preparar fila para insertar
    const fecha = new Date().toISOString().split('T')[0];
    const datosJSON = JSON.stringify(datosActuales);

    // Crear hoja si no existe
    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: clientId,
                },
              },
            },
          ],
        },
      });
    } catch (e) {
      // La hoja probablemente ya existe
    }

    // Agregar headers si es primera fila
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${clientId}!1:1`,
    });

    if (!existingData.data.values || existingData.data.values.length === 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `${clientId}!A1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [['Fecha', 'Competidor', 'WebsiteData', 'InstagramData', 'MapsData', 'JSON']],
        },
      });
    }

    // Agregar fila de datos
    for (const dato of datosActuales) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `${clientId}!A:F`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [
            [
              fecha,
              dato.nombre,
              JSON.stringify(dato.website),
              JSON.stringify(dato.instagram),
              JSON.stringify(dato.maps),
              JSON.stringify(dato),
            ],
          ],
        },
      });
    }

    console.log(`    Guardados en Google Sheets: ${datosActuales.length} registros`);
  } catch (error) {
    console.error(`Error guardando en Sheets para ${clientId}:`, error);
    // No lanzar error, continuar sin Google Sheets
  }
}
