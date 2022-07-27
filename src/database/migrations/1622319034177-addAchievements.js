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
exports.addAchievements1622319034177 = void 0;
class addAchievements1622319034177 {
  constructor() {
    this.name = "addAchievements1622319034177";
  }
  up(queryRunner) {
    return __awaiter(this, void 0, void 0, function* () {
      yield queryRunner.query(
        "CREATE TABLE appUser_achievement (user_id varchar NOT NULL, achievement_id int NOT NULL, currentScore int NOT NULL, created_at timestamp NOT NULL DEFAULT NOW(), updated_at timestamp NOT NULL DEFAULT NOW() , PRIMARY KEY (user_id, achievement_id))"
      );
      yield queryRunner.query(
        "CREATE TABLE achievement (id serial, title varchar NOT NULL, description varchar NOT NULL, path_image varchar NOT NULL, targetScore int NOT NULL, created_at timestamp NOT NULL DEFAULT NOW(), updated_at timestamp NOT NULL DEFAULT NOW() , tag_id int NULL, PRIMARY KEY (id))"
      );
      yield queryRunner.query(
        "ALTER TABLE appUser_achievement ADD CONSTRAINT FK_2a418515c335cab7c5ba70c28b3 FOREIGN KEY (user_id) REFERENCES app_user(id) "
      );
      yield queryRunner.query(
        "ALTER TABLE appUser_achievement ADD CONSTRAINT FK_843ecd1965f1aac694875674a18 FOREIGN KEY (achievement_id) REFERENCES achievement(id) "
      );
      yield queryRunner.query(
        "ALTER TABLE achievement ADD CONSTRAINT FK_7efd7420481a4d3cc3ee6649223 FOREIGN KEY (tag_id) REFERENCES tag(id) "
      );
    });
  }
  down(queryRunner) {
    return __awaiter(this, void 0, void 0, function* () {
      yield queryRunner.query(
        "ALTER TABLE achievement DROP FOREIGN KEY FK_7efd7420481a4d3cc3ee6649223"
      );
      yield queryRunner.query(
        "ALTER TABLE appUser_achievement DROP FOREIGN KEY FK_843ecd1965f1aac694875674a18"
      );
      yield queryRunner.query(
        "ALTER TABLE appUser_achievement DROP FOREIGN KEY FK_2a418515c335cab7c5ba70c28b3"
      );
      yield queryRunner.query("DROP TABLE achievement");
      yield queryRunner.query("DROP TABLE appUser_achievement");
    });
  }
}
exports.addAchievements1622319034177 = addAchievements1622319034177;
