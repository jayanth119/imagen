import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    getUser(uid: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse
    register(email: String!, password: String!): AuthResponse
    logout: MessageResponse
    resetPassword(email: String!): MessageResponse
  }

  type MessageResponse {
    message: String!
  }

  type AuthResponse {
    message: String!
    user: User!
  }

  type User {
    uid: ID!
    email: String!
    emailVerified: Boolean!
    isAnonymous: Boolean!
    providerData: [ProviderData!]!
    stsTokenManager: StsTokenManager!
    createdAt: String!
    lastLoginAt: String!
    apiKey: String!
    appName: String!
  }

  type ProviderData {
    providerId: String!
    uid: String!
    displayName: String
    email: String
    phoneNumber: String
    photoURL: String
  }

  type StsTokenManager {
    refreshToken: String!
    accessToken: String!
    expirationTime: Float!
  }
`;

export default typeDefs;
