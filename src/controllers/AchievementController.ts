import express from "express";
import { Controller, Route, Get, Tags, SuccessResponse, Path } from "tsoa";
import { Achievement } from "../models";
import AchievementService from "../services/AchievementService";

import { HttpResponse } from "../utils/httpResponse";

@Route("achievements")
@Tags("AchievementController")
export class AchievementController extends Controller {
  @Get("/")
  @SuccessResponse("200")
  async getAll(): Promise<AchievementResponse> {
    try {
      const achievements = await AchievementService.getAll();

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
    } catch (error) {
      this.setStatus(500);

      return {
        success: false,
        message: "Internal server error.",
        details: error.message,
      };
    }
  }
}
interface AchievementResponse extends HttpResponse {
  body?: {
    achievements?: Achievement[];
  };
}
