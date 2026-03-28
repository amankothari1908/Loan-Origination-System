from fastapi import APIRouter
from app.controllers.loan_controller import process_loan_application
from app.schemas.loan import LoanRequest

router = APIRouter()

@router.post("/process-loan")
def process_loan(data: LoanRequest):
    return process_loan_application(data.dict())