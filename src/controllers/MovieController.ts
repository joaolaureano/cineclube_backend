import express from "express";
import {
  Controller,
  Route,
  Get,
  Tags,
  SuccessResponse,
  Path,
  Security,
  Request,
  Body,
  Query,
} from "tsoa";

import { HttpResponse } from "../utils/httpResponse";
import MovieService from "../services/MovieService";
import { Movie } from "../models";

@Route("movies")
@Tags("MovieController")
export class MovieController extends Controller {
  @Get("/")
  @SuccessResponse("200")
  @Security("firebase")
  async getAll(
    @Request() request: express.Request,
    @Query() filterList: string
  ): Promise<MovieResponse> {
    const { user } = request;
    try {
      if (user) {
        let movies;
        if (filterList) {
          const filterListSplit = filterList.split(",");
          const filterListNumber = filterListSplit.map((filter) =>
            parseInt(filter)
          );
          movies = await MovieService.getRecommendedList(
            user.id,
            filterListNumber
          );
        } else {
          movies = await MovieService.getRecommendedList(user.id);
        }
        if (movies) {
          this.setStatus(200);
          return {
            success: true,
            message: `Found ${movies.length} movies.`,
            body: {
              movies,
            },
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

  @Get("/{movieId}")
  @SuccessResponse("200")
  async getById(@Path() movieId: number): Promise<MovieResponse> {
    try {
      const movie = await MovieService.getById(movieId);

      if (movie) {
        this.setStatus(200);
        return {
          success: true,
          message: `Movie found`,
          body: {
            movies: [movie],
          },
        };
      }

      this.setStatus(404);
      return {
        success: false,
        message: `Movie not found`,
      };
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
