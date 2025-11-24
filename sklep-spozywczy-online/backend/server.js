require('dotenv').config();
const express = require('express');
const { getPool } = require('./db');
const Joi = require('joi');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Validation schemas
const productSchema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    price: Joi.number().precision(2).min(0).required(),
    describtion: Joi.string().allow('', null),
    stock: Joi.number().integer().min(0).required(),
});

// Helpers
async function findAll(){
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    await pool.end();
    return rows;
}

async function findById(id){
    const pool = await getPool();
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    await pool.end();
    return rows[0];
}

// Endpoints
app.get('api/products', async (req, res) => {
    try {
        const products = await findAll();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const { error, value } = productSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details.map(d => d.message) });
        
        const pool = await getPool();
        const [result] = await pool.query(
            'INSERT INTO products (name, price, describtion, stock) VALUES (?, ?, ?, ?)',
            [value.name, value.price, value.describtion, value.stock]
        );
        await pool.end();

        const newId = result.insertId;
        const newProduct = await findById(newId);
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    });

app.put('/api/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) return res.status(400).json({ error.details.map:(d => d.message) });
        
        const pool = await getPool();
        const [result] = await pool.query('UPDATE products SET name = ?, price = ?, describtion = ?, stock = ? WHERE id = ?', 
            [value.name, value.price, value.describtion, value.stock, id]);
        await pool.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
            const updated = await findById(id);
            res.json(updated);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
    }
});    

app.delete('/api/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid product ID' });

        const pool = await getPool();
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
        await pool.end();

        if (result.affectedRows === 0) {
            return res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});