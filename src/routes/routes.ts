/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
  HttpStatusCodeLiteral,
  TsoaResponse,
} from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HelloWorldController } from "./../controllers/HelloWorldController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MovieController } from "./../controllers/MovieController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from "./../controllers/UserController";
import { expressAuthentication } from "./../middlewares/authentication";
import * as express from "express";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  HelloWorldInterface: {
    dataType: "refObject",
    properties: {
      message: { dataType: "string", required: true },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Movie: {
    dataType: "refObject",
    properties: {
      id: { dataType: "double", required: true },
      title: { dataType: "string", required: true },
      originalTitle: { dataType: "string", required: true },
      synopsis: { dataType: "string", required: true },
      critic: { dataType: "string", required: true },
      curator: { dataType: "string", required: true },
      year: { dataType: "double", required: true },
      pathBanner: { dataType: "string", required: true },
      duration: { dataType: "double", required: true },
      platforms: {
        dataType: "array",
        array: { ref: "Platform" },
        required: true,
      },
      users: { dataType: "array", array: { ref: "UserMovie" }, required: true },
      moviesTags: {
        dataType: "array",
        array: { ref: "MovieTag" },
        required: true,
      },
      cast: { dataType: "array", array: { ref: "Cast" }, required: true },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Platform: {
    dataType: "refObject",
    properties: {
      id: { dataType: "double", required: true },
      name: { dataType: "string", required: true },
      movies: { dataType: "array", array: { ref: "Movie" }, required: true },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserMovie: {
    dataType: "refObject",
    properties: {
      userId: { dataType: "string", required: true },
      movieId: { dataType: "double", required: true },
      status: { dataType: "string", required: true },
      user: { ref: "User", required: true },
      movie: { ref: "Movie", required: true },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  User: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
      photoPath: { dataType: "string", required: true },
      randomness: { dataType: "double", required: true },
      movies: {
        dataType: "array",
        array: { ref: "UserMovie" },
        required: true,
      },
      userTags: {
        dataType: "array",
        array: { ref: "UserTag" },
        required: true,
      },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Tag: {
    dataType: "refObject",
    properties: {
      id: { dataType: "double", required: true },
      name: { dataType: "string", required: true },
      moviesTags: {
        dataType: "array",
        array: { ref: "MovieTag" },
        required: true,
      },
      userTags: {
        dataType: "array",
        array: { ref: "UserTag" },
        required: true,
      },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  MovieTag: {
    dataType: "refObject",
    properties: {
      tagId: { dataType: "double", required: true },
      movieId: { dataType: "double", required: true },
      super: { dataType: "boolean", required: true },
      weight: { dataType: "double", required: true },
      tag: { ref: "Tag", required: true },
      movie: { ref: "Movie", required: true },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserTag: {
    dataType: "refObject",
    properties: {
      userId: { dataType: "string", required: true },
      tagId: { dataType: "double", required: true },
      totalPoint: { dataType: "double", required: true },
      user: { ref: "User", required: true },
      tag: { ref: "Tag", required: true },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Cast: {
    dataType: "refObject",
    properties: {
      actorId: { dataType: "double", required: true },
      movieId: { dataType: "double", required: true },
      director: { dataType: "boolean", required: true },
      actor: { ref: "Actor", required: true },
      movie: { ref: "Movie", required: true },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Actor: {
    dataType: "refObject",
    properties: {
      id: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
      cast: { dataType: "array", array: { ref: "Cast" }, required: true },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  MovieResponse: {
    dataType: "refObject",
    properties: {
      success: { dataType: "boolean", required: true },
      message: { dataType: "string", required: true },
      body: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          movies: { dataType: "array", array: { ref: "Movie" } },
        },
      },
      details: { dataType: "string" },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserAuthenticationResponse: {
    dataType: "refObject",
    properties: {
      success: { dataType: "boolean", required: true },
      message: { dataType: "string", required: true },
      body: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          user: {
            dataType: "nestedObjectLiteral",
            nestedProperties: {
              randomness: { dataType: "double", required: true },
              name: { dataType: "string", required: true },
              id: { dataType: "string", required: true },
              photoPath: { dataType: "string" },
            },
          },
        },
      },
      details: { dataType: "string" },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  HttpResponse: {
    dataType: "refObject",
    properties: {
      success: { dataType: "boolean", required: true },
      message: { dataType: "string", required: true },
      body: { dataType: "any" },
      details: { dataType: "string" },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  MovieUserStatus: {
    dataType: "refEnum",
    enums: [
      "already_watched",
      "want_to_watch",
      "dont_want_to_watch",
      "watched_and_liked",
      "watched_and_disliked",
      "none",
    ],
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserMoviesStatusListResponse: {
    dataType: "refObject",
    properties: {
      success: { dataType: "boolean", required: true },
      message: { dataType: "string", required: true },
      body: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          userMovies: { dataType: "array", array: { ref: "UserMovie" } },
        },
      },
      details: { dataType: "string" },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.get(
    "/api/v1/HelloWorld",
    function HelloWorldController_hello(
      request: any,
      response: any,
      next: any
    ) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }

      const controller = new HelloWorldController();

      const promise = controller.hello.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/movies",
    authenticateMiddleware([{ firebase: [] }]),
    function MovieController_getAll(request: any, response: any, next: any) {
      const args = {
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }

      const controller = new MovieController();

      const promise = controller.getAll.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/movies/:movieId",
    function MovieController_getById(request: any, response: any, next: any) {
      const args = {
        movieId: {
          in: "path",
          name: "movieId",
          required: true,
          dataType: "double",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }

      const controller = new MovieController();

      const promise = controller.getById.apply(
        controller,
        validatedArgs as any
      );
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/user/auth",
    authenticateMiddleware([{ firebaseLogin: [] }]),
    function UserController_authenticate(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }

      const controller = new UserController();

      const promise = controller.authenticate.apply(
        controller,
        validatedArgs as any
      );
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/user/movie",
    authenticateMiddleware([{ firebase: [] }]),
    function UserController_setUserMovieStatus(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            status: { ref: "MovieUserStatus", required: true },
            movieId: { dataType: "string", required: true },
          },
        },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }

      const controller = new UserController();

      const promise = controller.setUserMovieStatus.apply(
        controller,
        validatedArgs as any
      );
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/user/movie/:status",
    authenticateMiddleware([{ firebase: [] }]),
    function UserController_getUserMoviesByStatus(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
        status: {
          in: "path",
          name: "status",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }

      const controller = new UserController();

      const promise = controller.getUserMoviesByStatus.apply(
        controller,
        validatedArgs as any
      );
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return function runAuthenticationMiddleware(
      request: any,
      _response: any,
      next: any
    ) {
      let responded = 0;
      let success = false;

      const succeed = function (user: any) {
        if (!success) {
          success = true;
          responded++;
          request["user"] = user;
          next();
        }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      const fail = function (error: any) {
        responded++;
        if (responded == security.length && !success) {
          error.status = error.status || 401;
          next(error);
        }
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          let promises: Promise<any>[] = [];

          for (const name in secMethod) {
            promises.push(
              expressAuthentication(request, name, secMethod[name])
            );
          }

          Promise.all(promises)
            .then((users) => {
              succeed(users[0]);
            })
            .catch(fail);
        } else {
          for (const name in secMethod) {
            expressAuthentication(request, name, secMethod[name])
              .then(succeed)
              .catch(fail);
          }
        }
      }
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return (
      "getHeaders" in object && "getStatus" in object && "setStatus" in object
    );
  }

  function promiseHandler(
    controllerObj: any,
    promise: any,
    response: any,
    successStatus: any,
    next: any
  ) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode = successStatus;
        let headers;
        if (isController(controllerObj)) {
          headers = controllerObj.getHeaders();
          statusCode = controllerObj.getStatus() || statusCode;
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        returnHandler(response, statusCode, data, headers);
      })
      .catch((error: any) => next(error));
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function returnHandler(
    response: any,
    statusCode?: number,
    data?: any,
    headers: any = {}
  ) {
    if (response.headersSent) {
      return;
    }
    Object.keys(headers).forEach((name: string) => {
      response.set(name, headers[name]);
    });
    if (
      data &&
      typeof data.pipe === "function" &&
      data.readable &&
      typeof data._read === "function"
    ) {
      data.pipe(response);
    } else if (data !== null && data !== undefined) {
      response.status(statusCode || 200).json(data);
    } else {
      response.status(statusCode || 204).end();
    }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function responder(
    response: any
  ): TsoaResponse<HttpStatusCodeLiteral, unknown> {
    return function (status, data, headers) {
      returnHandler(response, status, data, headers);
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, request: any, response: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case "request":
          return request;
        case "query":
          return validationService.ValidateParam(
            args[key],
            request.query[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "ignore" }
          );
        case "path":
          return validationService.ValidateParam(
            args[key],
            request.params[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "ignore" }
          );
        case "header":
          return validationService.ValidateParam(
            args[key],
            request.header(name),
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "ignore" }
          );
        case "body":
          return validationService.ValidateParam(
            args[key],
            request.body,
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "ignore" }
          );
        case "body-prop":
          return validationService.ValidateParam(
            args[key],
            request.body[name],
            name,
            fieldErrors,
            "body.",
            { noImplicitAdditionalProperties: "ignore" }
          );
        case "formData":
          if (args[key].dataType === "file") {
            return validationService.ValidateParam(
              args[key],
              request.file,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: "ignore" }
            );
          } else if (
            args[key].dataType === "array" &&
            args[key].array.dataType === "file"
          ) {
            return validationService.ValidateParam(
              args[key],
              request.files,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: "ignore" }
            );
          } else {
            return validationService.ValidateParam(
              args[key],
              request.body[name],
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: "ignore" }
            );
          }
        case "res":
          return responder(response);
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, "");
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
