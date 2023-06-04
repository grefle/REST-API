const express = require('express');
const router = express.Router();

const Entity2 = require('../models/entity2');

// Отримання всіх сутностей
router.get('/', (req, res) => {
    Entity2.find()
        .then((entities) => {
            res.json(entities);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

// Отримання однієї сутності за ідентифікатором
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Entity2.findById(id)
        .then((entity) => {
            if (entity) {
                res.json(entity);
            } else {
                res.status(404).json({ error: 'Entity not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

// Створення нової сутності
router.post('/', (req, res) => {
    const entityData = req.body;
    const entity = new Entity2(entityData);
    entity.save()
        .then((createdEntity) => {
            res.status(201).json(createdEntity);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

// Оновлення сутності
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const entityData = req.body;
    Entity2.findByIdAndUpdate(id, entityData, { new: true })
        .then((updatedEntity) => {
            if (updatedEntity) {
                res.json(updatedEntity);
            } else {
                res.status(404).json({ error: 'Entity not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

// Видалення сутності
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Entity1.findByIdAndRemove(id)
        .then(() => {
            res.json({ message: 'Entity deleted' });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;
