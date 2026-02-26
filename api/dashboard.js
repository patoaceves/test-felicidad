const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const BASE_ID = 'appGpHtfRJqefTEbh';
const TABLE_ID = 'tblPISPaN0lPJIekJ';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const { recordId } = req.query;

    if (!recordId) {
        return res.status(400).json({ error: 'recordId requerido' });
    }

    try {
        const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}/${recordId}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error Airtable: ${response.status}`);
        }

        const data = await response.json();
        const f = data.fields;

        return res.status(200).json({
            nombre: f.Nombre || '',
            apellidos: f.Apellidos || '',
            scores: {
                autoconocimiento:    f['Autoconocimiento'] || 0,
                bienestarEmocional:  f['Bienestar Emocional'] || 0,
                bienestarFisico:     f['Bienestar Físico'] || 0,
                presenciaConsciente: f['Presencia Consciente'] || 0,
                vinculosVitales:     f['Vínculos Vitales'] || 0,
                trabajoPropósito:    f['Trabajo con Propósito'] || 0,
                esteticaExistencial: f['Estética Existencial'] || 0,
                feFilosofia:         f['Fe y Filosofía de Vida'] || 0
            },
            analisis: {
                autoconocimiento:    f['Autoconocimiento (txt)'] || '',
                bienestarEmocional:  f['Bienestar Emocional (txt)'] || '',
                bienestarFisico:     f['Bienestar Físico (txt)'] || '',
                presenciaConsciente: f['Presencia Consciente (txt)'] || '',
                vinculosVitales:     f['Vínculos Vitales (txt)'] || '',
                trabajoPropósito:    f['Trabajo con Propósito (txt)'] || '',
                esteticaExistencial: f['Estética Existencial (txt)'] || '',
                feFilosofia:         f['Fe y Filosofía de Vida (txt)'] || ''
            }
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
