import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";
import { createUser, findUser } from "../service/user.service";
import logger from "../utils/logger";
import { createSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import { ObjectId } from "mongoose";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);

    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "")

    // create an access token

    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("accessTokenTtl")},

    );
    

    // create refresh token
    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get("refreshTokenTtl")},

    );

    // return access and refresh token
    return res.send({
        accessToken, refreshToken
    })


  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUserHandler(
  req: Request,
  res: Response
) {

  const userId = res.locals.user._id;

  const user = await findUser(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send(omit(user.toJSON(), 'password'));
}