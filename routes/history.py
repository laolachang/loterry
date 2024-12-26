from fastapi import APIRouter
    from typing import List

    from api.services.data_fetcher import fetch_historical_data
    from api.services.data_analyzer import analyze_number_frequencies
    from api.models.lottery import LotteryResult

    router = APIRouter()

    @router.get("/history", response_model=List[LotteryResult])
    async def get_historical_data():
      return fetch_historical_data()

    @router.get("/history/analysis/frequencies")
    async def get_number_frequencies():
      historical_data = fetch_historical_data()
      frequencies = analyze_number_frequencies(historical_data)
      return frequencies
