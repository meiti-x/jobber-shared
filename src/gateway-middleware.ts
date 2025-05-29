import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "./error-handler";

const tokens: string[] = ['auth', 'seller', 'gig', 'search', 'buyer', 'message', 'order', 'review']

export function verifyGatewayRequest(req: Request, res: Response, next: NextFunction): void {

  if (!req.headers?.gatewayToken) {
    throw new NotAuthorizedError("Invalid request", "verifyGatewayRequest(): gateway token is missing")
  }

  const token = req.headers?.gatewayToken as string
  if (!token) throw new NotAuthorizedError("Invalid request", "verifyGatewayRequest(): gateway token is empty")


  try {
    const payload: { id: string, iad: number } = JWT.verify(token, '') as { id: string, iad: number }
    if (!tokens.includes(token)) throw new NotAuthorizedError("Invalid request", "verifyGatewayRequest(): request payload is invalid")
  } catch {
    throw new NotAuthorizedError("Invalid request", "verifyGatewayRequest()")
  }
}