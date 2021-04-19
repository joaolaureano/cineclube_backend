import express from "express";
import {
  Controller,
  Route,
  Post,
  Tags,
  Request,
  Security,
  SuccessResponse,
} from "tsoa";

import { HttpResponse } from "../utils/httpResponse";
import UserService from "../services/UserService";

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
  // @Security("firebase") For test purposes!
  async setUserMovieStatus(
    @Request() request: express.Request
  ): Promise<UserMovieStatusResponse> {
    const { movieId, status, userId } = request.body;
    if (!movieId || status || userId) {
      this.setStatus(400);
      return { success: false, message: "Could not associate user and movie" };
    }
    try {
      console.log(movieId);
      console.log(status);
      console.log(userId);

      switch (status) {
        case true:
          UserService.setMovieStatusWatched(movieId, userId, status);
          break;
      }
      /*
                Aqui no TRY coloca uma lógica, tipo um SWITCH CASE 
                pra selecionar o tipo de status pro filme selecionado
                e juntar com o usuário na tabela USER_MOVIE.
                Cada task poderia realizar a sua função em separado
                Sugeri nomes de funções, mas fiquem livre para trocar
                O que eu pensei era isso aqui
                Ex de code final
                    switch (ENUM) {
                        case ENUM.javi:
                          UserService.FUNCTION();
                            break;
                    ....
                        default:
                            break;
                    }
        */
      throw new Error("Not implemented yet.");
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
interface UserMovieStatusResponse extends HttpResponse {
  body?: {
    status?: string;
    message?: string;
  };
}
