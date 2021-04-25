import express from "express";
import {
  Controller,
  Route,
  Post,
  Tags,
  Request,
  Security,
  SuccessResponse,
  Body,
} from "tsoa";

import { HttpResponse } from "../utils/httpResponse";
import UserService from "../services/UserService";
import { MovieUserStatus } from "../enum/MovieUserStatus";

@Route("user")
@Tags("UserController")
export class UserController extends Controller {
  @Post("/auth")
  @SuccessResponse("200")
  @Security("firebase")
  async authenticate(
    @Request() request: express.Request
  ): Promise<UserAuthenticationResponse> {
    const { user } = request;
    if (!user) {
      this.setStatus(400);
      return { success: false, message: "Could not authenticate" };
    }

    try {
      const existingUser = await UserService.findUserById(user?.id);

      if (existingUser) {
        this.setStatus(200);
        return {
          success: true,
          message: "User already exists.",
          body: {
            user: {
              ...user,
              randomness: existingUser.randomness,
            },
          },
        };
      }

      const createdUser = await UserService.createUser(user);
      if (createdUser) {
        this.setStatus(200);
        return {
          success: true,
          message: "New user successfully created.",
          body: {
            user: {
              photoPath: createdUser.photoPath,
              id: createdUser.id,
              name: createdUser.name,
              randomness: createdUser.randomness,
            },
          },
        };
      }

      throw new Error();
    } catch (error) {
      this.setStatus(500);

      return {
        success: false,
        message: "Internal server error.",
        details: error.message,
      };
    }
  }

  @Post("/movie")
  @SuccessResponse("200")
  @Security("firebase")
  async setUserMovieStatus(
    @Body() requestBody: { movieId: string; status: MovieUserStatus },
    @Request() request: express.Request
  ): Promise<UserMovieStatusResponse> {
    const { movieId, status } = requestBody;
    const { user } = request;
    if (!(movieId || status)) {
      this.setStatus(400);
      throw new Error("Não foi possivel associar esse filme e usuário");
    }
    try {
      if (user) {
        const userId = user?.id;
        switch (status) {
          case MovieUserStatus.WATCHED_AND_LIKED:
            UserService.setMovieStatusWatchedLiked(movieId, userId, status);
            this.setStatus(200);
            return {
              message: "User and movie associated",
              success: true,
            };
          case MovieUserStatus.WATCHED_AND_DISLIKED:
            UserService.setMovieStatusWatchedDisliked(movieId, userId, status);
            this.setStatus(200);
            return {
              message: "User and movie associated",
              success: true,
            };
          default:
            return {
              message: "Status does not exists",
              success: false,
            };
        }
      }
      throw new Error();
    } catch (error) {
      this.setStatus(500);

      return {
        success: false,
        message: "Internal server error.",
        details: error.message,
      };
    }
  }
}

interface UserAuthenticationResponse extends HttpResponse {
  body?: {
    user?: {
      photoPath?: string;
      id: string;
      name: string;
      randomness: number;
    };
  };
}
interface UserMovieStatusResponse extends HttpResponse {}
