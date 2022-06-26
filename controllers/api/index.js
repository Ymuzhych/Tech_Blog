//collection of APi routs and export them
//dependencies and server connection
const router = require("express").Router();
//userRoutes
const userRoutes = require("./user-routes.js");
//postRoutes
const postRoutes = require("./post-routes.js");
//commentRoutes
const commentRoutes = require("./comment-routes.js");
//// Define route path for the API to use
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
//Export the router
module.exports = router;
