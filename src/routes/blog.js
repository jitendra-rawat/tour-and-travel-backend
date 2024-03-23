import express from 'express';

import Blog from '../models/blogs.js'


const router = express.Router();

// Create a new blog
router.post('/post-blog', async (req, res) => {
    try {
        const { title, description,image } = req.body;
        const newBlog = new Blog({ title, description,image });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all blogs
router.get('/get-blog', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single blog by ID
router.get('/get-blog/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a blog by ID
router.put('/update/:id', async (req, res) => {
    try {
        const { title, description,image } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, description,image }, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a blog by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json({ message: "Blog deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router
