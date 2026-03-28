# 🏦 Loan Origination System (LOS) – Mini Platform

A full-stack Loan Origination System that handles customer onboarding, KYC verification, credit check, and loan eligibility decisioning using a workflow-driven architecture.

---

## 🚀 Features

### 👤 Customer Onboarding

- Capture user details (Name, PAN, DOB, Income, etc.)
- Backend validations:
  - PAN format validation
  - Age ≥ 21
  - Loan amount ≤ 20x income

---

### 🔄 Workflow Engine (Core Feature)

Implements strict step-based workflow:

```
DRAFT → KYC_PENDING → KYC_COMPLETED → CREDIT_COMPLETED → ELIGIBLE / NOT_ELIGIBLE
```

- Each step is enforced via backend APIs
- No step can be executed out of order

---

### 🪪 KYC Verification (Mock Service)

- Service abstraction implemented
- Rule-based logic:
  - nameMatchScore < 80 → KYC_FAILED

- Result stored in application state

---

### 💳 Credit Check (Mock CIBIL API)

- Mock credit bureau service
- Rules:
  - Credit Score < 650 → REJECTED
  - Active loans > 5 → REJECTED

---

### 🧠 Eligibility Engine

Decision based on:

- Income
- Employment Type

Logic:

- Salaried → Max EMI = 50% of income
- Self-Employed → Max EMI = 40% of income
- Tenure: 36 months
- Interest Rate: 12%

---

### 📊 Admin Panel

- View all loan applications
- Filter by:
  - Status
  - Eligible / Not Eligible

- View full journey:
  - KYC result
  - Credit result
  - Final decision

---

## 🛠 Tech Stack

### Frontend

- React + TypeScript
- Tailwind CSS
- Axios

### Backend

- FastAPI (Python)
- REST APIs

### Database

- In-memory (can be extended to PostgreSQL)

---

## 🧱 Architecture

```
Frontend (React)
    ↓
API Layer (FastAPI Routes)
    ↓
Controllers (Workflow Orchestration)
    ↓
Services (KYC, Credit, Eligibility)
    ↓
(Mock External APIs)
```

---

## 📡 API Endpoints

### Create Application

```
POST /applications
```

### Run KYC

```
POST /applications/{id}/kyc
```

### Run Credit Check

```
POST /applications/{id}/credit
```

### Final Decision

```
POST /applications/{id}/decision
```

### Get All Applications (Admin)

```
GET /applications
```

---

## ⚙️ Setup Instructions

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Demo Flow

1. Login to the application
2. Create a customer application
3. Run KYC step
4. Run Credit Check
5. View final eligibility decision
6. Check Admin panel for full application journey

---

## ⚠️ Error Handling

- Invalid workflow transitions are blocked
- API-level validations implemented
- Basic error handling in frontend & backend

---

## 🔮 Future Improvements

- PostgreSQL integration
- JWT Authentication
- Retry mechanism for failed APIs
- Real credit bureau integration
- Docker deployment

---

## 👨‍💻 Author

**Aman Kothari**

- Full Stack Developer
- [LinkedIn](https://www.linkedin.com/in/aman-kothari-2310841a8/)
- [GitHub](https://github.com/amankothari1908)

---

## ⭐ Key Highlights

- Workflow-driven system design
- Clean architecture (Controllers + Services)
- Mock external API integration
- End-to-end frontend-backend integration
- Admin monitoring panel

---

## 🧠 Interview Talking Points

- Implemented state-driven workflow engine
- Enforced strict step transitions via backend
- Designed service abstraction for external integrations
- Built full-stack system with clean separation of concerns

---
