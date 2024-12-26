from fastapi import HTTPException, Depends
    from fastapi.security import OAuth2PasswordBearer
    from api.services import user_service

    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

    async def get_current_user(token: str = Depends(oauth2_scheme)):
      if token != "test_token":
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
      user = user_service.get_user("testuser") # For simplicity, always return the test user
      if user:
        return {"username": user.username, "is_premium": user.is_premium}
      raise HTTPException(status_code=404, detail="User not found")
