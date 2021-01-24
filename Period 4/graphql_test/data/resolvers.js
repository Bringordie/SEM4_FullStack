import { Friends } from "./dbConnectors";

// resolver map
export const resolvers = {
  Query: {
    getOneFriend: (root, { id }) => {
      return Friends.findById(id);
    },
  },
  Mutation: {
    createFriend: (root, { input }) => {
      const newFriend = new Friends({
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        language: input.language,
        age: input.age,
        email: input.email,
        contacts: input.contacts,
      });

      newFriend.id = newFriend._id;

      return newFriend.save();
    },

    updateFriend: (root, { input }) => {
      return Friends.findOneAndUpdate({ _id: input.id }, input, { new: true });
    },

    //Doesn't work
    // deleteFriend: (root, { id }) => {
    //   try {
    //     Friends.remove({ _id: id });
    //     return "Successfully deleted";
    //   } catch (err) {
    //     return err;
    //   }
    // },
    deleteFriend: (root, { id }) => {
      return Friends.remove({ _id: id });
    },
  },
};
