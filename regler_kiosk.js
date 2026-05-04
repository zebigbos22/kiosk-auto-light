const API_KEY = process.env.API_KEY;
const DEVICE_ID = process.env.DEVICE_ID;

async function diagnostiqueReseau() {
    console.log("--- Debut du Diagnostic ---");
    
    // Test 1 : Verifier la connexion Internet generale
    try {
        const testGoogle = await fetch('https://www.google.com', { signal: AbortSignal.timeout(5000) });
        console.log(`✅ Internet (Google): OK (Statut ${testGoogle.status})`);
    } catch (e) {
        console.error("❌ Erreur Internet Generale:", e.message);
    }

    // Test 2 : Connexion au serveur Android-Kiosk
    const url = 'https://kioskapi.azure-api.net/klr/api/';
    console.log(`Tentative de connexion vers ${url}...`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "device_id": DEVICE_ID,
                "command": "get_settings" 
            }),
            signal: AbortSignal.timeout(10000)
        });

        console.log(`Reponse recue ! Statut: ${response.status}`);
        const text = await response.text();
        console.log("Contenu de la reponse:", text);
    } catch (error) {
        console.error("❌ Erreur de connexion specifique:", error.message);
        if (error.cause) {
            console.error("Cause technique:", error.cause);
        }
    }
}

diagnostiqueReseau();
