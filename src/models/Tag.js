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
exports.Tag = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Tag = class Tag {};
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata("design:type", Number)],
  Tag.prototype,
  "id",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Tag.prototype,
  "name",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => _1.MovieTag,
      (movieTag) => movieTag.tag
    ),
    (0, typeorm_1.JoinColumn)({
      name: "tagId",
    }),
    __metadata("design:type", Array),
  ],
  Tag.prototype,
  "moviesTags",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => _1.UserTag,
      (userTag) => userTag.tag
    ),
    (0, typeorm_1.JoinColumn)({
      name: "tagId",
    }),
    __metadata("design:type", Array),
  ],
  Tag.prototype,
  "userTags",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => _1.Achievement,
      (achievement) => achievement.tag
    ),
    __metadata("design:type", Array),
  ],
  Tag.prototype,
  "achievements",
  void 0
);
__decorate(
  [
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date),
  ],
  Tag.prototype,
  "createdAt",
  void 0
);
__decorate(
  [
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date),
  ],
  Tag.prototype,
  "updatedAt",
  void 0
);
Tag = __decorate([(0, typeorm_1.Entity)({ name: "tag" })], Tag);
exports.Tag = Tag;
