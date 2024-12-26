from api.models.user import Preferences
    from api.services import user_service

    # In-memory preference storage (replace with database in real application)
    def get_user_preferences(username: str) -> Preferences:
      user = user_service.get_user(username)
      if user and user.preferences:
        return Preferences(**user.preferences)
      return Preferences()

    def update_user_preferences(username: str, preferences: Preferences):
      user = user_service.get_user(username)
      if user:
        user.preferences = preferences.dict()
