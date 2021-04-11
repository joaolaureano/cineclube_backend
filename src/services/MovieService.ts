import { getCustomRepository } from "typeorm";
import { Movie } from "../models/Movie";
import { MovieRepository } from "../repositories";

export interface userDetails {
  id: string;
  name: string;
  email?: string;
  photoPath?: string;
}

const getAll = async (): Promise<Movie[] | undefined> => {
  const movieRepository = getCustomRepository(MovieRepository);

  const movies = await movieRepository.find({
    relations: ["moviesTags", "moviesTags.tag", "platforms"],
  });

  return movies;
};

export default { getAll };
