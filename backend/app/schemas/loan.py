from pydantic import BaseModel

class LoanRequest(BaseModel):
    name: str
    income: float
    employment: str
    loan_amount: float