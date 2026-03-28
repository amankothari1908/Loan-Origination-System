from fastapi import APIRouter
from app.models.application import create_application
from app.controllers.application_controller import list_applications
from app.controllers.application_controller import (
    run_kyc,
    run_credit,
    run_eligibility,
)

router = APIRouter()

# Create Application
@router.post("/")
def create(data: dict):
    return create_application(data)


# Run KYC
@router.post("/{app_id}/kyc")
def kyc(app_id: str):
    return run_kyc(app_id)


# Run Credit
@router.post("/{app_id}/credit")
def credit(app_id: str):
    return run_credit(app_id)


# Final Decision
@router.post("/{app_id}/decision")
def decision(app_id: str):
    return run_eligibility(app_id)


@router.get("/")
def get_all(status: str = None):
    apps = list_applications()

    if status:
        apps = [a for a in apps if a["status"] == status]

    return apps