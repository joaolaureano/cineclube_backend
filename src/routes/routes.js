"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const AchievementController_1 = require("./../controllers/AchievementController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const HelloWorldController_1 = require("./../controllers/HelloWorldController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const MovieController_1 = require("./../controllers/MovieController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const PlatformController_1 = require("./../controllers/PlatformController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const TagController_1 = require("./../controllers/TagController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const UserController_1 = require("./../controllers/UserController");
const authentication_1 = require("./../middlewares/authentication");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
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
      achievements: {
        dataType: "array",
        array: { ref: "UserAchievement" },
        required: true,
      },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Movie: {
    dataType: "refObject",
    properties: {
      id: { dataType: "double", required: true },
      title: { dataType: "string", required: true },
      original_title: { dataType: "string", required: true },
      synopsis: { dataType: "string", required: true },
      critic: { dataType: "string", required: true },
      curator: { dataType: "string", required: true },
      year: { dataType: "double", required: true },
      path_banner: { dataType: "string", required: true },
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
      user_id: { dataType: "string", required: true },
      movie_id: { dataType: "double", required: true },
      status: { dataType: "string", required: true },
      user: { ref: "User", required: true },
      movie: { ref: "Movie", required: true },
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
      movie_id: { dataType: "double", required: true },
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
      achievements: {
        dataType: "array",
        array: { ref: "Achievement" },
        required: true,
      },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserTag: {
    dataType: "refObject",
    properties: {
      user_id: { dataType: "string", required: true },
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
  Achievement: {
    dataType: "refObject",
    properties: {
      id: { dataType: "double", required: true },
      title: { dataType: "string", required: true },
      description: { dataType: "string", required: true },
      pathImage: { dataType: "string", required: true },
      targetScore: { dataType: "double", required: true },
      users: {
        dataType: "array",
        array: { ref: "UserAchievement" },
        required: true,
      },
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
      actor_id: { dataType: "double", required: true },
      movie_id: { dataType: "double", required: true },
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
  UserAchievement: {
    dataType: "refObject",
    properties: {
      user_id: { dataType: "string", required: true },
      achievementId: { dataType: "double", required: true },
      currentScore: { dataType: "double", required: true },
      user: { ref: "User", required: true },
      achievement: { ref: "Achievement", required: true },
      createdAt: { dataType: "datetime", required: true },
      updatedAt: { dataType: "datetime", required: true },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AchievementResponse: {
    dataType: "refObject",
    properties: {
      success: { dataType: "boolean", required: true },
      message: { dataType: "string", required: true },
      body: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          achievements: { dataType: "array", array: { ref: "Achievement" } },
        },
      },
      details: { dataType: "string" },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  HelloWorldInterface: {
    dataType: "refObject",
    properties: {
      message: { dataType: "string", required: true },
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
  PlatformResponse: {
    dataType: "refObject",
    properties: {
      success: { dataType: "boolean", required: true },
      message: { dataType: "string", required: true },
      body: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          platforms: { dataType: "array", array: { ref: "Platform" } },
        },
      },
      details: { dataType: "string" },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  TagResponse: {
    dataType: "refObject",
    properties: {
      success: { dataType: "boolean", required: true },
      message: { dataType: "string", required: true },
      body: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          tags: { dataType: "array", array: { ref: "Tag" } },
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
      firstLogin: { dataType: "boolean" },
    },
    additionalProperties: true,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  MovieStatusResponse: {
    dataType: "refObject",
    properties: {
      success: { dataType: "boolean", required: true },
      message: { dataType: "string", required: true },
      body: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          achievements: {
            dataType: "array",
            array: { ref: "Achievement" },
            required: true,
          },
        },
      },
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
};
const validationService = new runtime_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.get(
    "/api/v1/achievements",
    function AchievementController_getAll(request, response, next) {
      const args = {};
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
      let validatedArgs = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }
      const controller = new AchievementController_1.AchievementController();
      const promise = controller.getAll.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/achievements/user",
    authenticateMiddleware([{ firebase: [] }]),
    function AchievementController_getUserAchievements(
      request,
      response,
      next
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
      let validatedArgs = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }
      const controller = new AchievementController_1.AchievementController();
      const promise = controller.getUserAchievements.apply(
        controller,
        validatedArgs
      );
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/HelloWorld",
    function HelloWorldController_hello(request, response, next) {
      const args = {};
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
      let validatedArgs = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }
      const controller = new HelloWorldController_1.HelloWorldController();
      const promise = controller.hello.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/movies",
    authenticateMiddleware([{ firebase: [] }]),
    function MovieController_getAll(request, response, next) {
      const args = {
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
        tags: { in: "query", name: "tags", dataType: "string" },
        platforms: { in: "query", name: "platforms", dataType: "string" },
      };
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
      let validatedArgs = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }
      const controller = new MovieController_1.MovieController();
      const promise = controller.getAll.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/movies/:movie_id",
    function MovieController_getById(request, response, next) {
      const args = {
        movie_id: {
          in: "path",
          name: "movie_id",
          required: true,
          dataType: "double",
        },
      };
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
      let validatedArgs = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }
      const controller = new MovieController_1.MovieController();
      const promise = controller.getById.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/platforms",
    function PlatformController_getPlatforms(request, response, next) {
      const args = {};
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
      let validatedArgs = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }
      const controller = new PlatformController_1.PlatformController();
      const promise = controller.getPlatforms.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/tags",
    function TagController_getMainTags(request, response, next) {
      const args = {};
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
      let validatedArgs = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }
      const controller = new TagController_1.TagController();
      const promise = controller.getMainTags.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/user/auth",
    authenticateMiddleware([{ firebaseLogin: [] }]),
    function UserController_authenticate(request, response, next) {
      const args = {
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
      };
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
      let validatedArgs = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }
      const controller = new UserController_1.UserController();
      const promise = controller.authenticate.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/user/movie",
    authenticateMiddleware([{ firebase: [] }]),
    function UserController_setUserMovieStatus(request, response, next) {
      const args = {
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            status: { ref: "MovieUserStatus", required: true },
            movie_id: { dataType: "string", required: true },
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
      let validatedArgs = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }
      const controller = new UserController_1.UserController();
      const promise = controller.setUserMovieStatus.apply(
        controller,
        validatedArgs
      );
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/user/movie/:status",
    authenticateMiddleware([{ firebase: [] }]),
    function UserController_getUserMoviesByStatus(request, response, next) {
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
      let validatedArgs = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }
      const controller = new UserController_1.UserController();
      const promise = controller.getUserMoviesByStatus.apply(
        controller,
        validatedArgs
      );
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/user/preferences",
    authenticateMiddleware([{ firebase: [] }]),
    function UserController_setUserPreferences(request, response, next) {
      const args = {
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          dataType: "nestedObjectLiteral",
          nestedProperties: {
            tagIds: {
              dataType: "array",
              array: { dataType: "double" },
              required: true,
            },
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
      let validatedArgs = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);
      } catch (err) {
        return next(err);
      }
      const controller = new UserController_1.UserController();
      const promise = controller.setUserPreferences.apply(
        controller,
        validatedArgs
      );
      promiseHandler(controller, promise, response, undefined, next);
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  function authenticateMiddleware(security = []) {
    return function runAuthenticationMiddleware(request, _response, next) {
      let responded = 0;
      let success = false;
      const succeed = function (user) {
        if (!success) {
          success = true;
          responded++;
          request["user"] = user;
          next();
        }
      };
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
      const fail = function (error) {
        responded++;
        if (responded == security.length && !success) {
          error.status = error.status || 401;
          next(error);
        }
      };
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          let promises = [];
          for (const name in secMethod) {
            promises.push(
              (0, authentication_1.expressAuthentication)(
                request,
                name,
                secMethod[name]
              )
            );
          }
          Promise.all(promises)
            .then((users) => {
              succeed(users[0]);
            })
            .catch(fail);
        } else {
          for (const name in secMethod) {
            (0, authentication_1.expressAuthentication)(
              request,
              name,
              secMethod[name]
            )
              .then(succeed)
              .catch(fail);
          }
        }
      }
    };
  }
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  function isController(object) {
    return (
      "getHeaders" in object && "getStatus" in object && "setStatus" in object
    );
  }
  function promiseHandler(
    controllerObj,
    promise,
    response,
    successStatus,
    next
  ) {
    return Promise.resolve(promise)
      .then((data) => {
        let statusCode = successStatus;
        let headers;
        if (isController(controllerObj)) {
          headers = controllerObj.getHeaders();
          statusCode = controllerObj.getStatus() || statusCode;
        }
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        returnHandler(response, statusCode, data, headers);
      })
      .catch((error) => next(error));
  }
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  function returnHandler(response, statusCode, data, headers = {}) {
    if (response.headersSent) {
      return;
    }
    Object.keys(headers).forEach((name) => {
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
  function responder(response) {
    return function (status, data, headers) {
      returnHandler(response, status, data, headers);
    };
  }
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  function getValidatedArgs(args, request, response) {
    const fieldErrors = {};
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
      throw new runtime_1.ValidateError(fieldErrors, "");
    }
    return values;
  }
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
