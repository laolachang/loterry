import json
    import os
    from typing import List

    from api.models.lottery import LotteryResult

    def fetch_historical_data() -> List[LotteryResult]:
      """
      Fetches historical Chinese lottery data from a local JSON file.
      """
      file_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'china_lottery_data.json')
      with open(file_path, 'r') as f:
        data = json.load(f)
      return [LotteryResult(**item) for item in data]
