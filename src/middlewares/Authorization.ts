import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";

import AppError from "../utils/AppError";

interface IPayload {
  iat: number;
  exp: number;
  sub: string;
  deliveryman: boolean;
}

export default class Authorization {
  public allAuthorization(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const authHeaders = request.headers.authorization;
    if (!authHeaders) throw new AppError("JWT token is missing");

    const [, token] = authHeaders.split(" ");

    const verifyToken = verify(token, authConfig.jwt.secret);
    if (!verifyToken) throw new AppError("Ivalid JWT token");

    const { sub } = verifyToken as IPayload;

    request.user = {
      id: sub,
    };


    return next();
  }

  public deleverymanAuthorization(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const authHeaders = request.headers.authorization;
    if (!authHeaders) throw new AppError("JWT token is missing");

    const [, token] = authHeaders.split(" ");

    const verifyToken = verify(token, authConfig.jwt.secret);
    if (!verifyToken) throw new AppError("Ivalid JWT token");

    const { sub, deliveryman } = verifyToken as IPayload;

    request.user = {
      id: sub,
    };


    if (!deliveryman) throw new AppError("Only couriers can use it");

    return next();
  }

  public clientAuthorization(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const authHeaders = request.headers.authorization;
    if (!authHeaders) throw new AppError("JWT token is missing");

    const [, token] = authHeaders.split(" ");

    const verifyToken = verify(token, authConfig.jwt.secret);
    if (!verifyToken) throw new AppError("Ivalid JWT token");

    const { sub, deliveryman } = verifyToken as IPayload;

    request.user = {
      id: sub,
    };

    if (deliveryman) throw new AppError("Only clients can use it");

    return next();
  }
}
