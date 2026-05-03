const API_KEY = process.env.API_KEY;
const DEVICE_ID = process.env.DEVICE_ID;

async function diagnostiqueReseau() {
    console.log("--- Debut du Diagnostic ---");
    
    // Test 1 : Google (pour voir si GitHub a Internet)
    try {
        const testGoogle = await fetch('https://www.google.com', { signal: AbortSignal.timeout(5000) });
        console.log(`✅ Test Internet (Google): OK (Statut ${testGoogle.status})`);
    } catch (e) {
        console.error("❌ Erreur Internet Generale:", e.message);
    }

    // Test 2 : Tentative de connexion brute vers Android-Kiosk
    const url = 'https://remote.android-kiosk.com/api/v1/command';[cite: 1]
    console.log(`Tentative de connexion vers ${url}...`);[cite: 1]

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,[cite: 1]
                'Content-Type': 'application/json'[cite: 1]
            },
            body: JSON.stringify({
                "device_id": DEVICE_ID,[cite: 1]
                "command": "get_settings" // On demande juste les réglages pour tester
            }),
            signal: AbortSignal.timeout(10000)
        });

        console.log(`Réponse reçue ! Statut: ${response.status}`);
        const text = await response.text();
        console.log("Contenu de la réponse:", text);
    } catch (error) {
        console.error("❌ Erreur de connexion specifique:", error.message);
        if (error.cause) console.error("Cause technique:", error.cause);
    }
}

diagnostiqueReseau();
