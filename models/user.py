from pydantic import BaseModel
    from typing import Optional

    class User(BaseModel):
      id: int
      username: str
      hashed_password: str
      preferences: Optional[dict] = {}
      is_premium: bool = False

    class UserCreate(BaseModel):
      username: str
      password: str

    class Token(BaseModel):
      access_token: str
      token_type: str

    class Preferences(BaseModel):
      num_predictions: int = 5
      temperature: float = 1.0
