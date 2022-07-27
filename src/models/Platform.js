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
exports.Platform = void 0;
const typeorm_1 = require("typeorm");
const Movie_1 = require("./Movie");
let Platform = class Platform {};
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata("design:type", Number)],
  Platform.prototype,
  "id",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Platform.prototype,
  "name",
  void 0
);
__decorate(
  [
    (0, typeorm_1.ManyToMany)(
      () => Movie_1.Movie,
      (movie) => movie.platforms
    ),
    (0, typeorm_1.JoinTable)({
      name: "movie_platform",
      joinColumn: {
        name: "platform",
        referencedColumnName: "id",
      },
      inverseJoinColumn: {
        name: "movie",
        referencedColumnName: "id",
      },
    }),
    __metadata("design:type", Array),
  ],
  Platform.prototype,
  "movies",
  void 0
);
__decorate(
  [
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date),
  ],
  Platform.prototype,
  "createdAt",
  void 0
);
__decorate(
  [
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date),
  ],
  Platform.prototype,
  "updatedAt",
  void 0
);
Platform = __decorate([(0, typeorm_1.Entity)({ name: "platform" })], Platform);
exports.Platform = Platform;
