const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://santhojuadithya:t6OB0C3yM65bo9hl@cluster0.etti5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection error:', error));


const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    address: String,
    gender: String
});

const User = mongoose.model('User', userSchema); 



app.get('/users', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(error => res.status(500).json({ message: 'Error fetching users' }));
});




app.post('/users', (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(user => res.status(201).json(user))
        .catch(error => res.status(400).json({ message: 'Error adding user' }));
});



app.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedUser => res.json(updatedUser))
        .catch(error => res.status(400).json({ message: 'Error updating user' }));
});




app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(error => res.status(400).json({ message: 'Error deleting user' }));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
