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
exports.MovieController = void 0;
const express_1 = __importDefault(require("express"));
const tsoa_1 = require("tsoa");
const MovieService_1 = __importDefault(require("../services/MovieService"));
let MovieController = class MovieController extends tsoa_1.Controller {
  getAll(request, tags, platforms) {
    return __awaiter(this, void 0, void 0, function* () {
      const { user } = request;
      try {
        if (user) {
          const filters = {};
          if (tags) {
            const tagsSplit = tags.split(",");
            const tagsListNumber = tagsSplit.map((tagId) => parseInt(tagId));
            filters.tags = tagsListNumber;
          }
          if (platforms) {
            const platformSplit = platforms.split(",");
            const filterListNumber = platformSplit.map((filter) =>
              parseInt(filter)
            );
            filters.platforms = filterListNumber;
          }
          const movies = yield MovieService_1.default.getRecommendedList(
            user.id,
            filters.tags,
            filters.platforms
          );
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
  getById(movie_id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const movie = yield MovieService_1.default.getById(movie_id);
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
    (0, tsoa_1.Get)("/"),
    (0, tsoa_1.SuccessResponse)("200"),
    (0, tsoa_1.Security)("firebase"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise),
  ],
  MovieController.prototype,
  "getAll",
  null
);
__decorate(
  [
    (0, tsoa_1.Get)("/{movie_id}"),
    (0, tsoa_1.SuccessResponse)("200"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise),
  ],
  MovieController.prototype,
  "getById",
  null
);
MovieController = __decorate(
  [(0, tsoa_1.Route)("movies"), (0, tsoa_1.Tags)("MovieController")],
  MovieController
);
exports.MovieController = MovieController;
