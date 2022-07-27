"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const repositories_1 = require("../repositories");
const mainTags = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Documentary",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];
const getMainTags = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const tagRepository = (0, typeorm_1.getCustomRepository)(
      repositories_1.TagRepository
    );
    const tags = yield tagRepository
      .createQueryBuilder("tag")
      .where(`tag.name IN (:...tags)`, { tags: mainTags })
      .getMany();
    return tags;
  });
exports.default = {
  getMainTags,
};
