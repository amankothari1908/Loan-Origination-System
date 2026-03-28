class CreditBureauService:
    def check(self):
        raise NotImplementedError


class MockCibilService(CreditBureauService):
    def check(self):
        import random
        score = random.randint(500, 800)
        active_loans = random.randint(0, 6)

        if score < 650 or active_loans > 5:
            return {
                "status": "REJECTED",
                "score": score,
                "active_loans": active_loans,
            }

        return {
            "status": "APPROVED",
            "score": score,
            "active_loans": active_loans,
        }