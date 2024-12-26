from api.models.user import User, UserCreate
    from typing import Optional
    from passlib.context import CryptContext

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    # In-memory user storage for simplicity (replace with database in real application)
    users = []
    next_user_id = 1

    def get_user(username: str) -> Optional[User]:
      for user in users:
        if user.username == username:
          return user
      return None

    def create_user(user: UserCreate) -> User:
      global next_user_id
      hashed_password = pwd_context.hash(user.password)
      new_user = User(id=next_user_id, username=user.username, hashed_password=hashed_password)
      users.append(new_user)
      next_user_id += 1
      return new_user

    def verify_password(plain_password: str, hashed_password: str) -> bool:
      return pwd_context.verify(plain_password, hashed_password)
