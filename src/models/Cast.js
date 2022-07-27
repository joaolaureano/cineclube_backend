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
exports.Cast = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Cast = class Cast {};
__decorate(
  [(0, typeorm_1.PrimaryColumn)(), __metadata("design:type", Number)],
  Cast.prototype,
  "actor_id",
  void 0
);
__decorate(
  [(0, typeorm_1.PrimaryColumn)(), __metadata("design:type", Number)],
  Cast.prototype,
  "movie_id",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", Boolean)],
  Cast.prototype,
  "director",
  void 0
);
__decorate(
  [
    (0, typeorm_1.ManyToOne)(
      () => _1.Actor,
      (actor) => actor.cast
    ),
    __metadata("design:type", _1.Actor),
  ],
  Cast.prototype,
  "actor",
  void 0
);
__decorate(
  [
    (0, typeorm_1.ManyToOne)(
      () => _1.Movie,
      (movie) => movie.cast
    ),
    __metadata("design:type", _1.Movie),
  ],
  Cast.prototype,
  "movie",
  void 0
);
__decorate(
  [
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date),
  ],
  Cast.prototype,
  "createdAt",
  void 0
);
__decorate(
  [
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date),
  ],
  Cast.prototype,
  "updatedAt",
  void 0
);
Cast = __decorate([(0, typeorm_1.Entity)("movie_cast")], Cast);
exports.Cast = Cast;
