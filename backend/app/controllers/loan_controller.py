from app.services.kyc_service import MockKYCService
from app.services.credit_service import MockCibilService
from app.services.eligibility_service import check_eligibility

kyc_service = MockKYCService()
credit_service = MockCibilService()

def process_loan_application(data):
    name = data["name"]
    income = data["income"]
    employment = data["employment"]
    loan_amount = data["loan_amount"]

    # Step 1: KYC
    kyc = kyc_service.verify(name)
    if kyc["status"] == "FAILED":
        return {
            "stage": "KYC_FAILED",
            "kyc": kyc
        }

    # Step 2: Credit
    credit = credit_service.check()
    if credit["status"] == "REJECTED":
        return {
            "stage": "CREDIT_REJECTED",
            "credit": credit
        }

    # Step 3: Eligibility
    decision = check_eligibility(income, employment, loan_amount)

    return {
        "stage": decision,
        "kyc": kyc,
        "credit": credit
    }