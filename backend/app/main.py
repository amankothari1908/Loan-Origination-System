from fastapi import FastAPI
from app.api.routes import loan, application

app = FastAPI()

app.include_router(loan.router, prefix="/api")
app.include_router(application.router, prefix="/applications")

@app.get("/")
def root():
    return {"message": "LOS Backend Running"}