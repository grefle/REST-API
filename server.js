const express = require('express');
const mongoose = require('mongoose');

// Підключення до бази даних MongoDB
mongoose.connect('mongodb://localhost/kancelariya', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Створення серверу Express
const app = express();

// Додаткові налаштування Express

// Підключення маршрутів для сутностей
const entity1Routes = require('./routes/entity1Routes');
const entity2Routes = require('./routes/entity2Routes');

// Використання маршрутів для сутностей
app.use('/api/entity1', entity1Routes);
app.use('/api/entity2', entity2Routes);

// Запуск серверу
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const path = require('path');

// Налаштування статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

