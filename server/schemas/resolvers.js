const { User, Thought } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
 
// resolver serves the response from the query

const resolvers = {
  Query: { 
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },

    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    // get ALL users
    users: async () => {
      return User.find() 
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
  },
  Mutation: {
    addUser: async (parent, args)  => {
      const  user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credtionals');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credtenials');
      }

      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;