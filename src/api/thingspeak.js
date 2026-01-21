import axios from 'axios';

const CHANNEL_ID = '2680584';
const READ_API_KEY = 'DBRTF4Q4PPMYYZ7O';

export const fetchBioData = async () => {
    try {
        const response = await axios.get(
            `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds/last.json`,
            {
                params: {
                    timezone: 'Asia/Jakarta',
                    api_key: READ_API_KEY
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching ThingSpeak data:", error);
        return null;
    }
};
