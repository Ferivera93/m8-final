const express = require('express');
const dbConfig = require('./app/config/db.config.js');
const db = require('./app/models');
const userController = require('./app/controllers/user.controller');
const bootcampController = require('./app/controllers/bootcamp.controller');

const authMiddleware = require('./app/middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./app/routes/user.routes');
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Bienvenido!');
});

db.sequelize.sync({ force: true }).then(() => {
    console.log('Eliminando y resincronizando la base de datos.');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
});