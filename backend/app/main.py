from fastapi import FastAPI
from app.api.routes import loan, application
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(loan.router, prefix="/api")
app.include_router(application.router, prefix="/applications")

@app.get("/")
def root():
    return {"message": "LOS Backend Running"}