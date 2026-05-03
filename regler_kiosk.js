const API_KEY = process.env.API_KEY;
const DEVICE_ID = process.env.DEVICE_ID;

const hour = new Date().getUTCHours();
const BRIGHTNESS_LEVEL = (hour >= 18 || hour < 6) ? 50 : 255; 

async function changerLuminosite() {
    if (!API_KEY || !DEVICE_ID) {
        console.error("❌ Erreur : API_KEY ou DEVICE_ID manquant dans les Secrets GitHub.");
        process.exit(1);
    }

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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log(`✅ Succes ! Luminosite reglee sur ${BRIGHTNESS_LEVEL}.`);
        } else {
            const data = await response.json();
            console.error("❌ Erreur API :", data.message || response.statusText);
            process.exit(1);
        }
    } catch (error) {
        console.error("❌ Erreur Reseau :", error.message);
        process.exit(1);
    }
}

changerLuminosite();
