const express = require('express');
const router = express.Router();
const Entity1 = require('../models/entity1');
const Entity2 = require('../models/entity2');

// Отримати всі сутності 1
router.get('/', async (req, res) => {
    try {
        const entities1 = await Entity1.find().populate('entities2');
        res.json(entities1);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Створити нову сутність 1
router.post('/', async (req, res) => {
    const entity1 = new Entity1({
        name: req.body.name
    });

    try {
        const newEntity1 = await entity1.save();
        res.status(201).json(newEntity1);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Видалити сутність 1
router.delete('/:id', async (req, res) => {
    try {
        const deletedEntity1 = await Entity1.findByIdAndDelete(req.params.id);
        res.json(deletedEntity1);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Додати зв'язок many-to-many між сутністю 1 і сутністю 2
router.post('/:entity1Id/entity2/:entity2Id', async (req, res) => {
    try {
        const entity1 = await Entity1.findById(req.params.entity1Id);
        const entity2 = await Entity2.findById(req.params.entity2Id);

        entity1.entities2.push(entity2._id);
        entity2.entities1.push(entity1._id);

        await entity1.save();
        await entity2.save();

        res.json({ message: 'Зв\'язок успішно додано' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
