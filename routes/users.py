from fastapi import APIRouter, Depends, HTTPException
    from fastapi.security import OAuth2PasswordRequestForm
    from api.models.user import UserCreate, Token, Preferences
    from api.services import user_service, preference_service

    router = APIRouter()

    @router.post("/register", response_model=Token)
    async def register_user(user: UserCreate):
      db_user = user_service.get_user(username=user.username)
      if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
      user_service.create_user(user)
      # Initialize default preferences for the new user
      preference_service.update_user_preferences(user.username, Preferences())
      return {"access_token": "test_token", "token_type": "bearer"}

    @router.post("/token", response_model=Token)
    async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
      user = user_service.get_user(form_data.username)
      if not user or not user_service.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
      return {"access_token": "test_token", "token_type": "bearer"}
