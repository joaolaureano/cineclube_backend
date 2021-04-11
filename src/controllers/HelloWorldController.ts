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

import { UserDetails } from "../services/UserService";

@Route("HelloWorld") // route name => localhost:xxx/helloWorld
@Tags("HelloWorldController") // => Under HelloWorldController tag
export class HelloWorldController extends Controller {
  @Get() //specify the request type
  hello(): HelloWorldInterface {
    return { message: "Hello World!" };
  }

  @Security("firebase")
  @SuccessResponse("201", "created")
  @Post() //specify the request type
  middlewareTest(@Request() request: express.Request): HelloWorldResponse {
    const { user } = request;
    if (user) {
      this.setStatus(201);
      return { success: true, user };
    }
    return { success: false };
  }
}

export interface HelloWorldInterface {
  message: string;
}

export interface HelloWorldResponse {
  success: boolean;
  user?: UserDetails;
}
