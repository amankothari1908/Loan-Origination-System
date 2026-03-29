class KYCService:
    def verify(self, name: str):
        raise NotImplementedError


class MockKYCService(KYCService):
    def verify(self, name: str):
        import random
        score = random.randint(50, 100)

        if score < 80:
            return {"status": "FAILED", "score": score}

        return {"status": "VERIFIED", "score": score}