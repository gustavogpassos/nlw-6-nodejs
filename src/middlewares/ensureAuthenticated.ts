import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  //receber o token
  const authToken = req.headers.authorization;
  //ver se o token está preenchido
  if (!authToken) {
    return res.status(401).end();
  }
  //separar a string do token pra tirar o bearer
  const [, token] = authToken.split(" ");
  try {
    //ver se o token é valido com JWT
    //função verify do jwt
    const { sub } = verify(token, "481d13d84cda1681e3519438862d03f1") as IPayload;
    //recuperar infos do user logado usando o sub do token verificado
    req.user_id = sub;
    return next();
  } catch (err) {
    res.status(401).end();
  }
}