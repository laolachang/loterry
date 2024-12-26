from collections import Counter
    from typing import List

    from api.models.lottery import LotteryResult

    def analyze_number_frequencies(historical_data: List[LotteryResult]) -> dict:
      """
      Analyzes the historical lottery data and returns the frequency of each red and blue ball.
      """
      red_balls = []
      blue_balls = []
      for result in historical_data:
        red_balls.extend(result.red_balls)
        blue_balls.append(result.blue_ball)
      return {
          "red_ball_frequencies": Counter(red_balls),
          "blue_ball_frequencies": Counter(blue_balls),
      }
