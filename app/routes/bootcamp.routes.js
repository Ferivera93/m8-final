const { authMiddleware } = require("../middleware");
const bootcampController = require("../controllers/bootcamp.controller");
const bootcampRoutes = require('./app/routes/bootcamp.routes');
app.use('/api', bootcampRoutes);



module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/bootcamp", [authMiddleware.verifyToken], bootcampController.createBootcamp);
    app.get("/api/bootcamps", bootcampController.findAll);
    app.get("/api/bootcamp/:id", bootcampController.findById);
    app.post("/api/bootcamp/:bootcampId/user/:userId", [authMiddleware.verifyToken], bootcampController.addUser);
};