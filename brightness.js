const API_KEY = '4664c8b544a246bb9574a10f793f6e7a3603';
const DEVICE_ID = '60e03916-960b-47f9-883d-68e3e5b628d5'; // Peut être un ID unique ou "all"
const BRIGHTNESS_LEVEL = 3; // Valeur entre 0 et 255

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