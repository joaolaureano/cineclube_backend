import { Response } from "express";
import express from "express";
import {
  Controller,
  Route,
  Get,
  Post,
  Tags,
  Body,
  Request,
  Security,
  SuccessResponse,
} from "tsoa";
import { User } from "../models/User";
import createUser from "../services/UserService";

@Route("User")
@Tags("UserController")
export class UserController extends Controller {
  @Post()
  @SuccessResponse("201", "created")
  @Security("firebase")
  create(@Request() request: express.Request) {
    try {
      const { user } = request;
      if (user !== undefined) {
        const userEntity = new User();
        userEntity.photoPath = user.photoPath as string;
        userEntity.id = user.id as string;
        userEntity.name = user.name as string;
        userEntity.randomness = 0;
        if (createUser(userEntity)) {
          this.setStatus(201);
          return { success: true, message: "New user successfully created." };
        } else {
          this.setStatus(500);
          return { success: false, message: "Could not create new user." };
        }
      }
    } catch (error) {
      this.setStatus(400);
      return { success: false, message: "Could not create new user." };
    }
  }
}
