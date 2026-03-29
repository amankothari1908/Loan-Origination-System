from fastapi import HTTPException
from app.models.application import get_application
from app.services.kyc_service import MockKYCService
from app.services.credit_service import MockCibilService
from app.services.eligibility_service import check_eligibility
from app.models.application import get_all_applications
import re
from fastapi import HTTPException
from datetime import datetime

kyc_service = MockKYCService()
credit_service = MockCibilService()

from fastapi import HTTPException

def run_kyc(app_id: str):
    app = get_application(app_id)

    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    if app["status"] != "DRAFT":
        raise HTTPException(status_code=400, detail="Invalid stage")

    result = kyc_service.verify(app["name"])

    app["kyc"] = result

    if result["status"] == "FAILED":
        app["status"] = "NOT_ELIGIBLE"
        return app

    app["status"] = "KYC_COMPLETED"
    return app


def run_credit(app_id: str):
    app = get_application(app_id)

    if app["status"] != "KYC_COMPLETED":
        raise HTTPException(status_code=400, detail="KYC not completed")

    result = credit_service.check()

    app["credit"] = result

    if result["status"] == "REJECTED":
        app["status"] = "NOT_ELIGIBLE"
        return app

    app["status"] = "CREDIT_COMPLETED"
    return app


def run_eligibility(app_id: str):
    app = get_application(app_id)

    if app["status"] != "CREDIT_COMPLETED":
        raise HTTPException(status_code=400, detail="Credit not completed")

    decision = check_eligibility(
        app["income"], app["employment"], app["loan_amount"]
    )

    app["status"] = decision
    return app


def list_applications():
    return get_all_applications()

def validate_application(data):
    # PAN validation
    if not re.match(r'^[A-Z]{5}[0-9]{4}[A-Z]$', data["pan"]):
        raise HTTPException(400, "Invalid PAN format")

    # Age validation
    dob = datetime.strptime(data["dob"], "%Y-%m-%d")
    age = (datetime.now() - dob).days // 365
    if age < 21:
        raise HTTPException(400, "Age must be >= 21")

    # Loan vs Income
    if data["loan_amount"] > data["income"] * 20:
        raise HTTPException(400, "Loan exceeds 20x income")