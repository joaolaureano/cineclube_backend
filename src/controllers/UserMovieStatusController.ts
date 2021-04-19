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

@Route("userMovieStatus")
@Tags("UserMovieStatusController")
export class UserMovieStatusController extends Controller {
  @Post()
  @SuccessResponse("200")
  // @Security("firebase") For test purposes!
  async setUserMovieStatus(
    @Request() request: express.Request
  ): Promise<UserMovieStatusResponse> {
    const { userMovieStatus } = request;
    if (!userMovieStatus) {
      this.setStatus(400);
      return { success: false, message: "Could not associate user and movie" };
    }
    try {
      console.log(userMovieStatus.movieId);
      console.log(userMovieStatus.status);
      console.log(userMovieStatus.userId);
      /*
                Aqui no TRY coloca uma lógica, tipo um SWITCH CASE 
                pra selecionar o tipo de status pro filme selecionado
                e juntar com o usuário na tabela USER_MOVIE.
                Cada task poderia realizar a sua função em separado
                Sugeri nomes de funções, mas fiquem livre para trocar
                Ex de code final
                switch (ENUM) {
                    case ENUM.javi:
                        setJaVi();
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

  async setJaVi() {
    //TODO
  }

  async setNaoQueroAssistir() {
    //TODO
  }

  async setQueroAssistir() {
    //TODO
  }
}

interface UserMovieStatusResponse extends HttpResponse {
  body?: {
    status?: string;
    message?: string;
  };
}
