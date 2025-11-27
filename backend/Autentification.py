from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from Model import Etudiants 
from db import SessionLocal
import bcrypt
from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from typing import Optional

router = APIRouter(tags=["user"])

# ----- Config JWT -----
SECRET_KEY = "Argumento/37"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 20

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/autentification")

# ----- Schemas -----
class userAutent(BaseModel):
    idEtudiant: str
    passw: str

class Token(BaseModel):
    access_token: str
    token_type: str

# ----- DB Session -----
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----- Créer un token -----
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ----- Route login -----
@router.post("/autentification")
def autentification(user: userAutent, db: Session = Depends(get_db)):
    user_existe = db.query(Etudiants).filter(Etudiants.idEtudiant == user.idEtudiant).first()
    if not user_existe:
        raise HTTPException(status_code=400, detail="Utilisateur non trouvé(e) !")

    #pw = user.passw.encode('utf-8')
    #dbpw = user_existe.passw.encode('utf-8')

    #if not bcrypt.checkpw(pw, dbpw):
       # raise HTTPException(status_code=401, detail="Mot de passe incorrecte !")
    

    access_token = create_access_token(data={"sub": user_existe.idEtudiant})
    

    return {
        "message": f"Bienvenue {user_existe.noms} ✅",
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get("/users/me")
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")  # sub = ID de l'utilisateur

        if not user_id:
            raise HTTPException(status_code=401, detail="Token invalide")

        # Récupérer l'utilisateur complet
        user = db.query(Etudiants).filter(Etudiants.idEtudiant == user_id).first()

        if not user:
            raise HTTPException(status_code=404, detail="Utilisateur introuvable")

        return {
            "id": user.idEtudiant,
            "nom": user.noms,
        }

    except JWTError:
        raise HTTPException(status_code=401, detail="Token invalide ou expiré")




