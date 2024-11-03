const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No se ha detectado ningún token" });
    }

    jwt.verify(token, config.secret, (error, decoded) => {
        if (error) {
            return res.status(401).send({ message: "Acceso denegado. Token no autorizado" });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) return res.status(404).send({ message: "Usuario no encontrado" });
        if (user.role !== "admin") {
            return res.status(403).send({ message: "Permisos de administrador requeridos" });
        }
        next();
    } catch (error) {
        res.status(500).send({ message: "Error al verificar permisos de administrador: " + error.message });
    }
};

module.exports = { verifyToken, isAdmin };