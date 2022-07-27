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
exports.TagController = void 0;
const tsoa_1 = require("tsoa");
const TagService_1 = __importDefault(require("../services/TagService"));
let TagController = class TagController extends tsoa_1.Controller {
  getMainTags() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const mainTags = yield TagService_1.default.getMainTags();
        if (mainTags) {
          this.setStatus(200);
          return {
            success: true,
            message: `Found ${mainTags.length} tags.`,
            body: {
              tags: mainTags,
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
};
__decorate(
  [
    (0, tsoa_1.Get)("/"),
    (0, tsoa_1.SuccessResponse)("200"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise),
  ],
  TagController.prototype,
  "getMainTags",
  null
);
TagController = __decorate(
  [(0, tsoa_1.Route)("tags"), (0, tsoa_1.Tags)("TagController")],
  TagController
);
exports.TagController = TagController;
