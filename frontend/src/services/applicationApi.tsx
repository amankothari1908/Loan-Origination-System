import type { ApplicationForm, LoginRequest } from "../types";
import { api } from "./api";

export const createApplication = (data: ApplicationForm) =>
  api.post("/applications", data);

export const runKYC = (id: string) => api.post(`/applications/${id}/kyc`);

export const runCredit = (id: string) => api.post(`/applications/${id}/credit`);

export const runDecision = (id: string) =>
  api.post(`/applications/${id}/decision`);

export const getApplications = () => api.get("/applications");

export const loginApi = (data: LoginRequest) => {
  return api.post("/auth/login", data);
};
