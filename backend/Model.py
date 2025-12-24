from sqlalchemy import Column, Integer, String, LargeBinary, Text, DateTime,ForeignKey,Boolean
from db import Base 

class Etudiants(Base):
    __tablename__="Etudiants"
    idEtudiant = Column(String(12),primary_key=True, index=True, unique=True)
    noms = Column(String(30))
    prenoms = Column(String(30))
    filiere = Column(String(10))
    annee = Column(String(10))
    roles = Column(String(30))
    passw = Column(String(255))
    sexe = Column(String(10), index=True)
    payement = Column(Boolean, default=False)

class Postes(Base):
    __tablename__="Postes"
    idPost = Column(Integer,primary_key=True, index=True, unique=True, autoincrement=True)
    libele = Column(String(30))
    idSender = Column(String(12))
    nomsSender = Column(String(30))
    dateSende = Column(DateTime)
    roleSender = Column(String(30))
   