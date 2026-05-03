const API_KEY = process.env.API_KEY;
const DEVICE_ID = process.env.DEVICE_ID;

async function changerLuminosite() {
    if (!API_KEY || !DEVICE_ID) {
        console.error("❌ Secrets manquants.");
        process.exit(1);
    }

    const url = 'https://remote.android-kiosk.com/api/v1/command';
    
    console.log(`Tentative de connexion vers ${url}...`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "device_id": DEVICE_ID,
                "command": "set_setting",
                "settings": { "screen_brightness": 150 }
            }),
            // Ajout d'un signal d'abandon après 10 secondes
            signal: AbortSignal.timeout(10000) 
        });

        if (response.ok) {
            console.log("✅ Commande recue par le serveur !");
        } else {
            const data = await response.json().catch(() => ({}));
            console.error(`❌ Erreur API (${response.status}):`, data.message || response.statusText);
            process.exit(1);
        }
    } catch (error) {
        if (error.name === 'TimeoutError') {
            console.error("❌ Erreur : Le serveur a mis trop de temps à répondre.");
        } else {
            console.error("❌ Erreur de connexion :", error.message);
        }
        process.exit(1);
    }
}

changerLuminosite();
