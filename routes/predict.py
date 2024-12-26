from fastapi import APIRouter, Query
    from typing import Optional, List

    from api.services.data_fetcher import fetch_historical_data
    from api.services.data_analyzer import analyze_number_frequencies
    from api.services.ai_service import generate_prediction

    router = APIRouter()

    @router.get("/predict")
    async def get_prediction(
      num_predictions: Optional[int] = Query(default=1, description="Number of predictions to generate"),
      temperature: Optional[float] = Query(default=1.0, description="Temperature for prediction randomness (higher = more random)")
    ):
      historical_data = fetch_historical_data()
      frequency_analysis = analyze_number_frequencies(historical_data)
      predictions = generate_prediction(frequency_analysis, num_predictions, temperature)
      return predictions
