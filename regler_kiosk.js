const API_KEY = process.env.API_KEY;
const DEVICE_ID = process.env.DEVICE_ID;

async function changerLuminosite() {
    // Vérification des secrets
    if (!API_KEY || !DEVICE_ID) {
        console.error("❌ ERREUR : API_KEY ou DEVICE_ID est vide. Verifiez vos 'Secrets' GitHub.");
        process.exit(1);
    }

    const url = 'https://remote.android-kiosk.com/api/v1/command';[cite: 1]
    const payload = {
        "device_id": DEVICE_ID,
        "command": "set_setting",
        "settings": { "screen_brightness": 150 }
    };[cite: 1]

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,[cite: 1]
                'Content-Type': 'application/json'[cite: 1]
            },
            body: JSON.stringify(payload)
        });[cite: 1]

        if (response.ok) {
            console.log("✅ Succes : Commande envoyee a la tablette.");
        } else {
            const errData = await response.json();
            console.error("❌ Erreur API :", errData.message || response.statusText);
            process.exit(1);
        }
    } catch (error) {
        console.error("❌ Erreur Reseau :", error.message);
        process.exit(1);
    }
}

changerLuminosite();
