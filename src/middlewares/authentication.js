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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = void 0;
const services_1 = require("../services");
const AuthService_1 = __importDefault(require("../services/AuthService"));
function expressAuthentication(request, securityName, scopes) {
  return __awaiter(this, void 0, void 0, function* () {
    if (securityName == "firebase") {
      const token = request.headers["authorization"];
      if (token) {
        const user = yield getUserDataFromToken(token);
        const existingUser = yield services_1.UserService.findUserById(user.id);
        if (!existingUser)
          return Promise.reject(new Error("User does not exist in database."));
        return Promise.resolve(user);
      }
      return Promise.reject(new Error("No token provided"));
    }
    if (securityName == "firebaseLogin") {
      const token = request.headers["authorization"];
      if (token) {
        const user = yield getUserDataFromToken(token);
        return Promise.resolve(user);
      }
      return Promise.reject(new Error("No token provided"));
    }
  });
}
exports.expressAuthentication = expressAuthentication;
function getUserDataFromToken(token) {
  return __awaiter(this, void 0, void 0, function* () {
    const parsedToken = token.startsWith("Bearer ")
      ? token.split("Bearer ")[1]
      : token;
    const user = yield AuthService_1.default.authenticateUser(parsedToken);
    return user;
  });
}
