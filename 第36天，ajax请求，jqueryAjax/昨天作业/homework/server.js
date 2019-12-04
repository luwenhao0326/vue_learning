const app = require("./bin/app.js");

const userRouter = require("./routers/user-router.js");

app.use(userRouter.routes());

