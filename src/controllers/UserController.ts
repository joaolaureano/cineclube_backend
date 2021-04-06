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

@Route("User")
@Tags("UserController")
export class UserController extends Controller {
  @Post()
  @Security("firebase")
  create(@Request() request: express.Request): any {
    try {
      const { user } = request;
      if (user !== undefined) {
        const userEntity = new User();
        userEntity.photoPath = user.photoPath as string;
        userEntity.id = user.id as string;
        userEntity.name = user.name as string;
        userEntity.randomness = 0;
      }
    } catch (err) {}
  }
}
