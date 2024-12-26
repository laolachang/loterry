from fastapi import APIRouter, Depends, HTTPException
    from api.models.user import Preferences
    from api.services import preference_service
    from api.dependencies import get_current_user

    router = APIRouter()

    @router.get("/preferences", response_model=Preferences)
    async def read_preferences(current_user: dict = Depends(get_current_user)):
      return preference_service.get_user_preferences(current_user.get("username"))

    @router.put("/preferences", response_model=Preferences)
    async def update_preferences(preferences: Preferences, current_user: dict = Depends(get_current_user)):
      preference_service.update_user_preferences(current_user.get("username"), preferences)
      return preferences
