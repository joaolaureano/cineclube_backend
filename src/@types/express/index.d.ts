type UserDetails = {
  id: string;
  name: string;
  email?: string;
  photoPath?: string;
};
declare namespace Express {
  interface Request {
    user?: UserDetails;
  }
}
