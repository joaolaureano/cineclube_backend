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
exports.AchievementController = void 0;
const express_1 = __importDefault(require("express"));
const tsoa_1 = require("tsoa");
const AchievementService_1 = __importDefault(
  require("../services/AchievementService")
);
let AchievementController = class AchievementController extends tsoa_1.Controller {
  getAll() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const achievements = yield AchievementService_1.default.getAll();
        if (achievements) {
          this.setStatus(200);
          return {
            success: true,
            message: `Found ${achievements.length} achievements.`,
            body: {
              achievements: achievements,
            },
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
  getUserAchievements(request) {
    return __awaiter(this, void 0, void 0, function* () {
      const { user } = request;
      try {
        if (user) {
          const achievements = yield AchievementService_1.default.getUserAchievements(
            user.id
          );
          if (achievements) {
            this.setStatus(200);
            return {
              success: true,
              message: `Found ${achievements.length} achievements.`,
              body: {
                achievements: achievements,
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
};
__decorate(
  [
    (0, tsoa_1.Get)("/"),
    (0, tsoa_1.SuccessResponse)("200"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise),
  ],
  AchievementController.prototype,
  "getAll",
  null
);
__decorate(
  [
    (0, tsoa_1.Get)("/user"),
    (0, tsoa_1.SuccessResponse)("200"),
    (0, tsoa_1.Security)("firebase"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise),
  ],
  AchievementController.prototype,
  "getUserAchievements",
  null
);
AchievementController = __decorate(
  [
    (0, tsoa_1.Route)("achievements"),
    (0, tsoa_1.Tags)("AchievementController"),
  ],
  AchievementController
);
exports.AchievementController = AchievementController;
