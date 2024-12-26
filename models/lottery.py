from typing import List, Optional
    from pydantic import BaseModel

    class LotteryResult(BaseModel):
      date: str
      red_balls: List[int]
      blue_ball: int
