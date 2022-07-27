"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = __importDefault(require("express"));
const tsoa_1 = require("tsoa");
const UserService_1 = __importDefault(require("../services/UserService"));
const MovieUserStatus_1 = require("../enum/MovieUserStatus");
let UserController = class UserController extends tsoa_1.Controller {
  authenticate(request) {
    return __awaiter(this, void 0, void 0, function* () {
      const { user } = request;
      if (!user) {
        this.setStatus(400);
        return { success: false, message: "Could not authenticate" };
      }
      try {
        const existingUser = yield UserService_1.default.findUserById(
          user === null || user === void 0 ? void 0 : user.id
        );
        if (existingUser) {
          this.setStatus(200);
          return {
            success: true,
            message: "User already exists.",
            body: {
              user: Object.assign(Object.assign({}, user), {
                randomness: existingUser.randomness,
              }),
            },
          };
        }
        const createdUser = yield UserService_1.default.createUser(user);
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
            firstLogin: true,
          };
        }
        throw new Error();
      } catch (err) {
        this.setStatus(500);
        const error = err;
        return {
          success: false,
          message: "Internal server error.",
          details: error.message,
        };
      }
    });
  }
  setUserMovieStatus(requestBody, request) {
    return __awaiter(this, void 0, void 0, function* () {
      //Retorno -> Se tiver um body é porque alguma conquista foi atingida
      const { movie_id, status } = requestBody;
      const { user } = request;
      if (!(movie_id || status)) {
        this.setStatus(400);
        throw new Error("Não foi possivel associar esse filme e usuário");
      }
      try {
        if (user) {
          const user_id = user === null || user === void 0 ? void 0 : user.id;
          let achievements = undefined;
          switch (status) {
            case MovieUserStatus_1.MovieUserStatus.WATCHED_AND_LIKED:
              achievements = yield UserService_1.default.setMovieStatusWatchedLiked(
                movie_id,
                user_id,
                status
              );
              this.setStatus(200);
              if (achievements) {
                return {
                  message: "User and movie associated",
                  success: true,
                  body: {
                    achievements: achievements,
                  },
                };
              } else
                return {
                  message: "User and movie associated",
                  success: true,
                };
            case MovieUserStatus_1.MovieUserStatus.WATCHED_AND_DISLIKED:
              achievements = yield UserService_1.default.setMovieStatusWatchedDisliked(
                movie_id,
                user_id,
                status
              );
              this.setStatus(200);
              if (achievements) {
                return {
                  message: "User and movie associated",
                  success: true,
                  body: {
                    achievements: achievements,
                  },
                };
              } else
                return {
                  message: "User and movie associated",
                  success: true,
                };
            case MovieUserStatus_1.MovieUserStatus.DONT_WANT_TO_WATCH:
              yield UserService_1.default.setMovieStatusDontWantWatch(
                movie_id,
                user_id,
                status
              );
              this.setStatus(200);
              return {
                message: "User and movie associated",
                success: true,
              };
            case MovieUserStatus_1.MovieUserStatus.NONE:
              yield UserService_1.default.deleteUserMovie(movie_id, user_id);
              this.setStatus(200);
              return {
                message: "Status reset successfully",
                success: true,
              };
            case MovieUserStatus_1.MovieUserStatus.WANT_TO_WATCH:
              yield UserService_1.default.setMovieStatusWantToWatch(
                movie_id,
                user_id,
                status
              );
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
      } catch (err) {
        this.setStatus(500);
        const error = err;
        return {
          success: false,
          message: "Internal server error.",
          details: error.message,
        };
      }
    });
  }
  getUserMoviesByStatus(request, status) {
    return __awaiter(this, void 0, void 0, function* () {
      const { user } = request;
      if (!status) {
        this.setStatus(400);
        return { success: false, message: "Status is required." };
      }
      try {
        if (user) {
          const userMovies = yield UserService_1.default.getUserMoviesByStatus(
            status,
            user.id
          );
          return {
            success: true,
            message: `Found ${userMovies.length} movies.`,
            body: {
              userMovies,
            },
          };
        }
        throw new Error("User not found;");
      } catch (err) {
        this.setStatus(500);
        const error = err;
        return {
          success: false,
          message: "Internal server error.",
          details: error.message,
        };
      }
    });
  }
  setUserPreferences(requestBody, request) {
    return __awaiter(this, void 0, void 0, function* () {
      const { tagIds } = requestBody;
      const { user } = request;
      if (!tagIds) {
        this.setStatus(400);
        throw new Error("Could not find tags");
      }
      try {
        if (user) {
          const { id } = user;
          const response = yield UserService_1.default.setSignUpPreferences(
            id,
            tagIds
          );
          if (response) {
            this.setStatus(200);
            return {
              message: "Preferences were set",
              success: true,
            };
          }
        }
        throw new Error();
      } catch (err) {
        this.setStatus(500);
        const error = err;
        return {
          success: false,
          message: "Internal server error.",
          details: error.message,
        };
      }
    });
  }
};
__decorate(
  [
    (0, tsoa_1.Post)("/auth"),
    (0, tsoa_1.SuccessResponse)("200"),
    (0, tsoa_1.Security)("firebaseLogin"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise),
  ],
  UserController.prototype,
  "authenticate",
  null
);
__decorate(
  [
    (0, tsoa_1.Post)("/movie"),
    (0, tsoa_1.SuccessResponse)("200"),
    (0, tsoa_1.Security)("firebase"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise),
  ],
  UserController.prototype,
  "setUserMovieStatus",
  null
);
__decorate(
  [
    (0, tsoa_1.Get)("/movie/{status}"),
    (0, tsoa_1.SuccessResponse)("200"),
    (0, tsoa_1.Security)("firebase"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise),
  ],
  UserController.prototype,
  "getUserMoviesByStatus",
  null
);
__decorate(
  [
    (0, tsoa_1.Post)("/preferences"),
    (0, tsoa_1.SuccessResponse)("200"),
    (0, tsoa_1.Security)("firebase"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise),
  ],
  UserController.prototype,
  "setUserPreferences",
  null
);
UserController = __decorate(
  [(0, tsoa_1.Route)("user"), (0, tsoa_1.Tags)("UserController")],
  UserController
);
exports.UserController = UserController;
