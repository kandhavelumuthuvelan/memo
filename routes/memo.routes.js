const { authJwt } = require("../middlewares");
const controller = require("../controller/memo.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
 
      app.post("/api/memo/create",  [authJwt.verifyToken, authJwt.isAdmin],controller.create);
      app.get("/api/memo/list",  [authJwt.verifyToken],controller.read);
      app.get("/api/memo/delete/:id",[authJwt.verifyToken],controller.delete)

      app.post("/api/memo/update/:id",[authJwt.verifyToken],controller.update)

      
}