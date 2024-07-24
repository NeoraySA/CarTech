const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

// Get menu categories
router.get('/categories', authenticateToken, async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM categories');
    const [items] = await pool.query('SELECT * FROM menu_items');

    console.log('Fetched categories:', categories); // Log categories
    console.log('Fetched items:', items); // Log items

    const categoriesWithItems = categories.map(category => {
      const categoryItems = items.filter(item => item.category_id === category.id);
      return {
        ...category,
        items: categoryItems
      };
    });

    console.log('Categories with items:', categoriesWithItems); // Log combined data

    res.json(categoriesWithItems);
  } catch (error) {
    console.error('Error fetching menu categories:', error);
    res.status(500).json({ error: 'Server error fetching menu categories' });
  }
});

// Add a new menu category
router.post('/categories', authenticateToken, async (req, res) => {
  const { name, icon, permissions } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO categories (name, icon, permissions) VALUES (?, ?, ?)', [name, icon, permissions]);
    const newCategory = { id: result.insertId, name, icon, permissions };
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error adding menu category:', error);
    res.status(500).json({ error: 'Server error adding menu category' });
  }
});

// Update an existing menu category
router.put('/categories/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, icon, permissions } = req.body;
  try {
    await pool.query('UPDATE categories SET name = ?, icon = ?, permissions = ? WHERE id = ?', [name, icon, permissions, id]);
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating menu category:', error);
    res.status(500).json({ error: 'Server error updating menu category' });
  }
});

// Delete a menu category
router.delete('/categories/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu category:', error);
    res.status(500).json({ error: 'Server error deleting menu category' });
  }
});

// Add a new menu item
router.post('/items', authenticateToken, async (req, res) => {
  const { category_id, name, path, permissions } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO menu_items (category_id, name, path, permissions) VALUES (?, ?, ?, ?)', [category_id, name, path, permissions]);
    const newItem = { id: result.insertId, category_id, name, path, permissions };
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ error: 'Server error adding menu item' });
  }
});

// Update an existing menu item
router.put('/items/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { category_id, name, path, permissions } = req.body;
  try {
    await pool.query('UPDATE menu_items SET category_id = ?, name = ?, path = ?, permissions = ? WHERE id = ?', [category_id, name, path, permissions, id]);
    res.status(200).json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Server error updating menu item' });
  }
});

// Delete a menu item
router.delete('/items/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM menu_items WHERE id = ?', [id]);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'Server error deleting menu item' });
  }
});

module.exports = router;
