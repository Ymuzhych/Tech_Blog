const { User } = require("../models");

const userData = [
  {
    username: "Soniy",
    email: "soniy@gmail.com",
    password: "password1234",
  },
  {
    username: "lin",
    email: "lin@gmail.com",
    password: "password1234",
  },
  {
    username: "boy",
    email: "boy@gmail.com",
    password: "password1234",
  },
  {
    username: "hero",
    email: "hero@gmail.com",
    password: "password1234",
  },
  {
    username: "Fabien",
    email: "fabien@gmail.com",
    password: "password1234",
  },
];

const seedUsers = () => User.bulkCreate(userData);


module.exports = seedUsers;
