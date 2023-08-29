import axios from "axios";

const mlApiUrl = 'http://134.209.203.221/predictCrimeType';

async function getCrimeTypePredictions(inputData:
     { latitude: Number, longitude: Number, population: Number, area: Number}) {

    try {
    const response = await axios.post(mlApiUrl, inputData, {
      timeout: 5000, 
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return false
    }
  } catch (error: any) {
    console.error('Error calling ML API:', error.message);
    return false;
  }
}

export default getCrimeTypePredictions