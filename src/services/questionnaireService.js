import axios from 'axios';

export const getQuestionnaires = async () => {
    try {
        const response = await axios.get('http://localhost:3000/questionnaires/1');
        return  {success: true, data: response.data};
    } catch (error) {
        return {success: false, errorDescription: 'Error when fetching data'};
    }
};