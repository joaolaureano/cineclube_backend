type UserDetails = {
  id: string;
  name: string;
  email?: string;
  photoPath?: string;
};
type UserMovieStatus = {
  movieId: string;
  userId: string;
  status: string;
};
declare namespace Express {
  interface Request {
    user?: UserDetails;
    userMovieStatus?: UserMovieStatus;
  }
}
