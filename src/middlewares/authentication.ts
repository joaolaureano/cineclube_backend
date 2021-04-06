import express from "express";

import AuthService from "../services/AuthService";

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName == "firebase") {
    const token = request.headers["authorization"];
    if (token) {
      const parsedToken = token.startsWith("Bearer ")
        ? token.split("Bearer ")[1]
        : token;
      const user = await AuthService.authenticateUser(parsedToken);
      return Promise.resolve(user);
    }
    return Promise.reject(new Error("No token provided"));
  }
  return Promise.reject(new Error("Authentication Error"));
}
