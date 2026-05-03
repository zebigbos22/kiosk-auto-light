// Recuperation des secrets GitHub
const API_KEY = process.env.API_KEY;
const DEVICE_ID = process.env.DEVICE_ID;

// On determine la luminosite selon l'heure (UTC)
const hour = new Date().getUTCHours();
const BRIGHTNESS_LEVEL = (hour >= 18 || hour < 6) ? 50 : 255; 

async function changerLuminosite() {
    if (!API_KEY || !DEVICE_ID) {
        console.error("❌ Erreur : API_KEY ou DEVICE_ID manquant dans les Secrets GitHub.");
        process.exit(1); // Force l'erreur visible sur GitHub
    }

    const url = 'https://remote.android-kiosk.com/api/v1/command';[cite: 1]
    
    const payload = {
        "device_id": DEVICE_ID,
        "command": "set_setting",
        "settings": {
            "screen_brightness": BRIGHTNESS_LEVEL
        }
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

        const data = await response.json();

        if (response.ok) {
            console.log(`✅ Succes ! Luminosite reglee sur ${BRIGHTNESS_LEVEL}.`);
            console.log("Reponse du serveur :", data);
        } else {
            console.error("❌ Erreur API :", data.message || response.statusText);
            process.exit(1);
        }
    } catch (error) {
        console.error("❌ Erreur Reseau :", error.message);
        process.exit(1);
    }
}

changerLuminosite();
