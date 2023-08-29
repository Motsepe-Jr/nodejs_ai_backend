import PredictionModel from "../models/prediction.model";
import  getCrimeDensityPredictions from '../ai_services/crimeDensity';
import getCrimeTypePredictions from "../ai_services/crimeType";

export async function createCrimeType(input: { lat: number; lon: number}) {
  
  try {
    
    const distance_meters = 1000
    const unitValue = 25
    
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

    if (result.length == 0) return {
      success: false,
      message: "Our model's accuracy is optimized for predictions within a specific region"
    }

    const ml_result = await getCrimeTypePredictions({'latitude':input.lat,'longitude':input.lon,
                                     'population': result[0]['population'], 
                                      'area': result[0]['area']})

    if (!ml_result) return  {
      success: false,
      message: 'ai service failed to get predictions'
    }

    // return the result to the users
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