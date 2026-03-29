from fastapi import APIRouter, HTTPException
from jose import jwt
import os

router = APIRouter()

SECRET = os.getenv("JWT_SECRET") or "fallback_secret"
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

@router.post("/login")
def login(data: dict):
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        raise HTTPException(400, "Invalid credentials")

    token = jwt.encode({"email": email}, SECRET, algorithm=ALGORITHM)

    return {"token": token}