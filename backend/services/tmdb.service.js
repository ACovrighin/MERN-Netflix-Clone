import axios from 'axios';
import { ENV_VARS } from '../config/envVars.js';

// Fetch data from TMDB API
export const fetchFromTMDB = async (url) => {
    console.log(`Fetching from TMDB API: ${url}`); // Log the URL being requested
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
        }
    };

    try {
        const response = await axios.get(url, options);
        console.log('TMDB API Response:', response.data); // Log the response data

        if (response.status !== 200) {
            throw new Error('Failed to fetch data from TMDB API' + response.statusText);
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching from TMDB API:', error.message); // Log any errors
        throw error;
    }
};