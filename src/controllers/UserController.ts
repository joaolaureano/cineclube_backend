import { Request, Response } from "express";
import { Get } from "tsoa";

import { UserService } from "../services";

const createUserExample = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const response = await UserService.createUserExample({
      email,
    });

    return res.status(201).json(response);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", code: err.code });
  }
};

export default { createUserExample };
