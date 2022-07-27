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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Movie = class Movie {};
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata("design:type", Number)],
  Movie.prototype,
  "id",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Movie.prototype,
  "title",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Movie.prototype,
  "original_title",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({
      type: "text",
    }),
    __metadata("design:type", String),
  ],
  Movie.prototype,
  "synopsis",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({
      type: "text",
    }),
    __metadata("design:type", String),
  ],
  Movie.prototype,
  "critic",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Movie.prototype,
  "curator",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({
      length: 4,
      type: "varchar",
    }),
    __metadata("design:type", Number),
  ],
  Movie.prototype,
  "year",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({
      type: "text",
    }),
    __metadata("design:type", String),
  ],
  Movie.prototype,
  "path_banner",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", Number)],
  Movie.prototype,
  "duration",
  void 0
);
__decorate(
  [
    (0, typeorm_1.ManyToMany)(
      () => _1.Platform,
      (platform) => platform.movies,
      {
        cascade: true,
      }
    ),
    __metadata("design:type", Array),
  ],
  Movie.prototype,
  "platforms",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => _1.UserMovie,
      (userMovie) => userMovie.movie
    ),
    (0, typeorm_1.JoinColumn)({
      name: "movie_id",
    }),
    __metadata("design:type", Array),
  ],
  Movie.prototype,
  "users",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => _1.MovieTag,
      (movieTag) => movieTag.movie
    ),
    (0, typeorm_1.JoinColumn)({
      name: "movie_id",
    }),
    __metadata("design:type", Array),
  ],
  Movie.prototype,
  "moviesTags",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => _1.Cast,
      (cast) => cast.movie
    ),
    (0, typeorm_1.JoinColumn)({
      name: "movie_id",
    }),
    __metadata("design:type", Array),
  ],
  Movie.prototype,
  "cast",
  void 0
);
__decorate(
  [
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date),
  ],
  Movie.prototype,
  "createdAt",
  void 0
);
__decorate(
  [
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date),
  ],
  Movie.prototype,
  "updatedAt",
  void 0
);
Movie = __decorate([(0, typeorm_1.Entity)({ name: "movie" })], Movie);
exports.Movie = Movie;
