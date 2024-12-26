from api.services import user_service

    def subscribe_user(username: str):
      user = user_service.get_user(username)
      if user:
        user.is_premium = True

    def unsubscribe_user(username: str):
      user = user_service.get_user(username)
      if user:
        user.is_premium = False
