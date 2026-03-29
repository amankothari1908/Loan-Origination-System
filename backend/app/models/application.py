import uuid

applications_db = {
    "1": {
        "id": "1",
        "name": "Aman Kothari",
        "income": 50000,
        "employment": "Salaried",
        "loan_amount": 500000,
        "status": "ELIGIBLE",
        "kyc": {"status": "VERIFIED", "score": 90},
        "credit": {"status": "APPROVED", "score": 720, "active_loans": 1},
    },
    "2": {
        "id": "2",
        "name": "Rahul Sharma",
        "income": 30000,
        "employment": "Self-Employed",
        "loan_amount": 800000,
        "status": "NOT_ELIGIBLE",
        "kyc": {"status": "VERIFIED", "score": 85},
        "credit": {"status": "REJECTED", "score": 600, "active_loans": 6},
    },
    "3": {
        "id": "3",
        "name": "Priya Verma",
        "income": 70000,
        "employment": "Salaried",
        "loan_amount": 300000,
        "status": "KYC_COMPLETED",
        "kyc": {"status": "VERIFIED", "score": 88},
        "credit": None,
    },
    "4": {
        "id": "4",
        "name": "Rohit Gupta",
        "income": 40000,
        "employment": "Salaried",
        "loan_amount": 200000,
        "status": "DRAFT",
        "kyc": None,
        "credit": None,
    },
}

def create_application(data):
    # validate_application(data)  
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