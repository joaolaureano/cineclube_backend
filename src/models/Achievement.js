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
exports.Achievement = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Achievement = class Achievement {};
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata("design:type", Number)],
  Achievement.prototype,
  "id",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Achievement.prototype,
  "title",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Achievement.prototype,
  "description",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", String)],
  Achievement.prototype,
  "pathImage",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata("design:type", Number)],
  Achievement.prototype,
  "targetScore",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => _1.UserAchievement,
      (userAchievemnt) => userAchievemnt.achievement
    ),
    (0, typeorm_1.JoinColumn)({
      name: "achievementId",
    }),
    __metadata("design:type", Array),
  ],
  Achievement.prototype,
  "users",
  void 0
);
__decorate(
  [
    (0, typeorm_1.ManyToOne)(
      () => _1.Tag,
      (tag) => tag.achievements,
      {
        cascade: true,
      }
    ),
    (0, typeorm_1.JoinTable)({
      name: "achievement_tag",
      joinColumn: {
        name: "achievement",
        referencedColumnName: "id",
      },
      inverseJoinColumn: {
        name: "tag",
        referencedColumnName: "id",
      },
    }),
    __metadata("design:type", _1.Tag),
  ],
  Achievement.prototype,
  "tag",
  void 0
);
__decorate(
  [
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date),
  ],
  Achievement.prototype,
  "createdAt",
  void 0
);
__decorate(
  [
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date),
  ],
  Achievement.prototype,
  "updatedAt",
  void 0
);
Achievement = __decorate(
  [(0, typeorm_1.Entity)({ name: "achievement" })],
  Achievement
);
exports.Achievement = Achievement;
