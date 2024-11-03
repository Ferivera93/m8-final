const { users, bootcamps } = require('../models');
const db = require('../models');
const Bootcamp = db.bootcamps;
const User = db.users;

exports.createBootcamp = async (bootcampData) => {
    try {
        const bootcamp = await Bootcamp.create(bootcampData);
        console.log(`>> Creado el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`);
        return bootcamp;
    } catch (error) {
        console.error(`>> Error al crear el bootcamp: ${error}`);
        throw error; // Lanza el error para manejarlo en la capa superior
    }
};

exports.addUser = async (bootcampId, userId) => {
    try {
        const bootcamp = await Bootcamp.findByPk(bootcampId);
        if (!bootcamp) {
            console.error("No se encontró el Bootcamp!");
            return null;
        }
        const user = await User.findByPk(userId);
        if (!user) {
            console.error("Usuario no encontrado!");
            return null;
        }
        await bootcamp.addUser(user);
        console.log(` Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`);
        return bootcamp;
    } catch (error) {
        console.error(">> Error mientras se estaba agregando Usuario al Bootcamp", err);
        throw error;
    }
};

exports.findById = async (id) => {
    try {
        const bootcamp = await Bootcamp.findByPk(id, {
            include: [{
                model: User,
                as: "users",
                attributes: ["id", "firstName", "lastName"],
                through: {
                    attributes: []
                }
            }],
        });
        return bootcamp;
    } catch (error) {
        console.error(`>> Error mientras se encontraba el bootcamp: ${error}`);
        throw error;
    }
};

exports.findAll = async () => {
    try {
        const bootcampsList = await Bootcamp.findAll({
            include: [{
                model: User,
                as: "users",
                attributes: ["id", "firstName", "lastName"],
                through: {
                    attributes: []
                }
            }],
        });
        return bootcampsList;
    } catch (error) {
        console.error(">> Error Buscando los Bootcamps: ", error);
        throw error;
    }
};