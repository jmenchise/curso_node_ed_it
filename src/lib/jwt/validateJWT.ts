import { validateToken } from "../DBmySql";
import { SECRET } from "./commons";
import jwt from 'jsonwebtoken';

export async function validateJWT(token: string) {
   jwt.verify(token, SECRET);
   await validateToken(token);
}