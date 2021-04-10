import express from "express";
import { Controller, Route, Get, Tags, SuccessResponse } from "tsoa";

import { HttpResponse } from "../utils/httpResponse";
import MovieService from "../services/MovieService";
import { Movie } from "../models";

@Route("movies")
@Tags("MovieController")
export class MovieController extends Controller {
  @Get("/")
  @SuccessResponse("200")
  async getAll(): Promise<MovieResponse> {
    try {
      const movies = await MovieService.getAll();

      if (movies) {
        this.setStatus(200);
        return {
          success: true,
          message: "Movies found",
          body: {
            movies,
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
}

interface MovieResponse extends HttpResponse {
  body?: {
    movies?: Movie[];
  };
}
