def check_eligibility(income: float, employment: str, loan_amount: float):
    if employment == "Salaried":
        max_emi = income * 0.5
    else:
        max_emi = income * 0.4

    # simple EMI logic
    emi = loan_amount / 36

    if emi <= max_emi:
        return "ELIGIBLE"

    return "NOT_ELIGIBLE"