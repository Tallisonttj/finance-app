import passport from "passport";
import dotenv from "dotenv";
import { ExtractJwt, Strategy as JWTStragy } from "passport-jwt";
import { userRepository } from "../repository/userRepository.js";
import AppError from "../error/AppError.js";
import JWT from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import type { User } from "../generated/prisma/client.js";

dotenv.config(); 

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  console.error("AVISO: O JWT_SECRET não está definido ou é muito curto!");
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JWTStragy(options, async (payload, done) => {
    const user = await userRepository.findById(payload.id);
    if (user) {
      return done(null, user);
    } else {
    return done(new AppError("Não autorizado", 403), false);
    }
  }),
);

export const generatedToken = (data: object) => {
  return JWT.sign(data, JWT_SECRET, { expiresIn: "30d" });
};

export const privateRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate("jwt", (err: Error, user:User) => {
    req.user = user.id ? user : undefined;
    return user ? next() : next(new AppError("Não autorizado", 403));
  })(req, res, next);
};
export default passport;
