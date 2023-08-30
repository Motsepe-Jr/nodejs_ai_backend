import PredictionModel from "../models/prediction.model";
import  getCrimeDensityPredictions from '../ai_services/crimeDensity';
import getCrimeFreqPredictions from "../ai_services/crimeFreq";

export async function createCrimeFreq(input: { lat: number; lon: number}) {
  
  try {
    
    const distance_meters = 1000
    const unitValue = 10
    
    const result = await PredictionModel.find({
              location: {
                  $near: {
                      $maxDistance: distance_meters * unitValue, 
                      $geometry: {
                          type: 'Point',
                          coordinates: [input.lon, input.lat]
                      }
                  }
              }
          }).limit(1)


    const ml_result = await getCrimeFreqPredictions(
      {
      'latitude': result.length > 0 ? input.lat:-25.97,
      'longitude': result.length > 0 ? input.lon: 28.12,
      'population': result.length > 0 ? result[0]['population']: 11514.0, 
      'area': result.length > 0 ? result[0]['area']:4.36
      }
)


    return {
      success: true,
      ml_result
    }

  } catch (e) {
    return  {
      success: false,
      message: 'ai service failed to get predictions'
    }
  }
}