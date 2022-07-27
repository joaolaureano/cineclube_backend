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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let User = class User {};
__decorate(
  [(0, typeorm_1.PrimaryColumn)(), __metadata("design:type", String)],
  User.prototype,
  "id",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  User.prototype,
  "name",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  User.prototype,
  "photoPath",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", Number)],
  User.prototype,
  "randomness",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => _1.UserMovie,
      (userMovie) => userMovie.user
    ),
    (0, typeorm_1.JoinColumn)({
      name: "user_id",
    }),
    __metadata("design:type", Array),
  ],
  User.prototype,
  "movies",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => _1.UserTag,
      (userTag) => userTag.user
    ),
    (0, typeorm_1.JoinColumn)({
      name: "user_id",
    }),
    __metadata("design:type", Array),
  ],
  User.prototype,
  "userTags",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => _1.UserAchievement,
      (userAchievemnt) => userAchievemnt.user
    ),
    (0, typeorm_1.JoinColumn)({
      name: "user_id",
    }),
    __metadata("design:type", Array),
  ],
  User.prototype,
  "achievements",
  void 0
);
__decorate(
  [
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date),
  ],
  User.prototype,
  "createdAt",
  void 0
);
__decorate(
  [
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date),
  ],
  User.prototype,
  "updatedAt",
  void 0
);
User = __decorate([(0, typeorm_1.Entity)({ name: "app_user" })], User);
exports.User = User;
