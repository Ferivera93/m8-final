const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "El correo ingresado se encuentra en uso" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ firstName, lastName, email, password: hashedPassword });

        res.status(201).json({ message: "Se ha creado el usuario", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const [updated] = await User.update(req.body, { where: { id } });
        if (updated) {
            const updatedUser = await User.findByPk(id);
            res.status(200).json({ message: "El usuario ha sido actualizado de forma exitosa", user: updatedUser });
        } else {
            res.status(404).json({ message: `Fallo al actualizar usuario con id=${id}.` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const num = await User.destroy({ where: { id } });
        if (num === 1) {
            res.status(200).json({ message: "El usuario ha sido eliminado de forma exitosa" });
        } else {
            res.status(404).json({ message: `Fallo al eliminar usuario con id=${id}.` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};