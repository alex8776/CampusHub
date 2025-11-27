from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker , declarative_base

USER="root"
PASSWORD="Argumento/37"
HOST ="127.0.0.1"
PORT ="3306"
DB_NAME ="campushub"

SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB_NAME}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

