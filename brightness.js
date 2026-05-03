const API_KEY = process.env.API_KEY; 
const DEVICE_ID = process.env.DEVICE_ID;
const BRIGHTNESS_LEVEL = 2; // Ajustez ici

async function changerLuminosite() {
    const url = 'https://remote.android-kiosk.com/api/v1/command';
    
    const payload = {
        "device_id": DEVICE_ID,
        "command": "set_setting",
        "settings": {
            "screen_brightness": BRIGHTNESS_LEVEL
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ Commande envoyée avec succès !");
            console.log("Réponse du serveur :", data);
        } else {
            console.error("❌ Erreur lors de l'envoi :", data.message || response.statusText);
        }
    } catch (error) {
        console.error("❌ Erreur réseau :", error);
    }
}

// Exécuter la fonction
changerLuminosite();
