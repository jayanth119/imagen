import {
  loginUser,
  registerUser,
  logoutUser,
  resetPassword,
} from '../controller/authController.js';

import { admin } from '../setup/firebase.js';

const resolvers = {
  Mutation: {
    login: async (_, { email, password }, { res }) =>
      await loginUser({ body: { email, password } }, res),

    register: async (_, { email, password }, { res }) =>
      await registerUser({ body: { email, password } }, res),

    logout: async (_, __, { res }) => await logoutUser({}, res),

    resetPassword: async (_, { email }, { res }) =>
      await resetPassword({ body: { email } }, res),
  },

  Query: {
    getUser: async (_, { uid }) => {
      const user = await admin.auth().getUser(uid);
      return {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        isAnonymous: user.providerData.length === 0,
        providerData: user.providerData,
        createdAt: user.metadata.creationTime,
        lastLoginAt: user.metadata.lastSignInTime,
        apiKey: "", // Optional
        appName: "", // Optional
        stsTokenManager: {
          refreshToken: "",
          accessToken: "",
          expirationTime: 0,
        },
      };
    },
  },
};

export default resolvers;
