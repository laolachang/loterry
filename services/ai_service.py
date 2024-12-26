from collections import Counter
    import random

    def generate_prediction(frequency_analysis: dict, num_predictions: int = 1, temperature: float = 1.0) -> list:
      """
      Generates a list of lottery predictions based on the frequency analysis and temperature.
      Temperature controls the randomness of the prediction (higher = more random).
      """
      red_ball_frequencies = frequency_analysis["red_ball_frequencies"]
      blue_ball_frequencies = frequency_analysis["blue_ball_frequencies"]

      predictions = []
      for _ in range(num_predictions):
        # Determine how many top red balls to consider based on temperature
        num_top_reds = max(1, int(len(red_ball_frequencies) * (1 / temperature)))
        most_common_reds = [item[0] for item in red_ball_frequencies.most_common(num_top_reds)]
        predicted_reds = sorted(random.sample(most_common_reds, 6))

        # Determine how many top blue balls to consider based on temperature
        num_top_blues = max(1, int(len(blue_ball_frequencies) * (1 / temperature)))
        most_common_blues = [item[0] for item in blue_ball_frequencies.most_common(num_top_blues)]
        predicted_blue = random.choice(most_common_blues)

        predictions.append({"predicted_red_balls": predicted_reds, "predicted_blue_ball": predicted_blue})

      return predictions
