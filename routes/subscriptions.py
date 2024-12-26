from fastapi import APIRouter, Depends
    from api.services import subscription_service
    from api.dependencies import get_current_user

    router = APIRouter()

    @router.post("/subscribe")
    async def subscribe(current_user: dict = Depends(get_current_user)):
      subscription_service.subscribe_user(current_user.get("username"))
      return {"message": "Subscribed successfully!"}

    @router.post("/unsubscribe")
    async def unsubscribe(current_user: dict = Depends(get_current_user)):
      subscription_service.unsubscribe_user(current_user.get("username"))
      return {"message": "Unsubscribed successfully!"}
