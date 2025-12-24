from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from Model import Postes
from db import SessionLocal
import bcrypt
from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from Autentification import get_current_user
from sqlalchemy import func
import unidecode 
from datetime import date
from sqlalchemy import desc

class postSend(BaseModel):
    libele : str
    idSender : str
    nomsSender : str
    


router = APIRouter(tags=["post"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/postSend")
def Wafaso1(post: postSend, db: Session = Depends(get_db)):

    user_message = Postes(libele = post.libele, idSender = post.idSender, nomsSender = post.nomsSender)

    db.add(user_message)
    db.commit()
    db.refresh(user_message)
    return { "message": "Post envoyé !"}


@router.get("/getPosts")
def getPosts(db: Session = Depends(get_db)):
    return db.query(Postes).order_by(Postes.idPost.desc()).all()