const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    quakes(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): QuakeConnection!
    quake(id: ID!): Quake
    users: [User]
    me: User # Queries for the current user
  }

  type QuakeConnection {
    cursor: String!
    hasMore: Boolean!
    quakes: [Quake]!
  }
  type Quake {
    id: ID
    magnitude: Float
    location: String
    when: String
    cursor: String
  }
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    records: [Quake]
  }

  type Mutation {
    # if false, saving record failed -- check errors
    saveRecord(recordId: ID!, recordWhen: String): RecordUpdateResponse!

    # if false, deleting record failed -- check errors
    deleteRecord(recordId: ID!): RecordUpdateResponse!

    login(email: String): String # login token
  }
  type RecordUpdateResponse {
    success: Boolean!
    message: String
    records: [Quake]
  }
`;

module.exports = typeDefs;
