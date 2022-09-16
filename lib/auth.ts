import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";
// handel authentication of routes

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { NOTIFY_ACCESS_TOKEN: token } = req.cookies;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) throw new Error("No user found");
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorized" });
        return;
      }
      return handler(req, res, user);
    }
    // no token, no entry
    res.status(401);
    res.json({ error: "Not Authorized" });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, process.env.JWT_SECRET);
  return user;
};
