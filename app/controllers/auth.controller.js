const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({ message: "No se pudo encontrar el usuario" });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 });
        res.status(200).send({ id: user.id, email: user.email, accessToken: token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};