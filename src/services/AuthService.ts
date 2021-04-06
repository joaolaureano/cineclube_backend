import firebase from "../config/firebase";

const authenticateUser = async (authToken: string) => {
  const userInfo = await firebase.auth().verifyIdToken(authToken);

  return {
    id: userInfo.user_id,
    name: userInfo.name,
    email: userInfo.email,
    photoPath: userInfo.picture,
  };
};

export default { authenticateUser };