const db = require("../models");
const User = db.users;

const validateEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(400).send({ message: "El correo ingresado se encuentra en uso" });
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { validateEmail };