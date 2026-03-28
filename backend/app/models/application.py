import uuid
from backend.app.controllers.application_controller import validate_application

applications_db = {}

def create_application(data):
    validate_application(data)  
    app_id = str(uuid.uuid4())

    application = {
        "id": app_id,
        "name": data["name"],
        "income": data["income"],
        "employment": data["employment"],
        "loan_amount": data["loan_amount"],
        "status": "DRAFT",
        "kyc": None,
        "credit": None,
    }

    applications_db[app_id] = application
    return application


def get_application(app_id):
    return applications_db.get(app_id)

def get_all_applications():
    return list(applications_db.values())