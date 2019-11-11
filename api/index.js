const router = require("express").Router();
const hotelRouter = require("./handlers/hotelHandlers.js");
const userRouter = require("./handlers/userHandlers.js");
const { apiErrorHandler } = require("../middlewares/error-handler");

router.use("/user", userRouter);
router.use("/hotel", hotelRouter);
router.use(apiErrorHandler);

module.exports = router;
