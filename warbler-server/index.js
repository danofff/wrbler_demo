require('dotenv').config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const {loginRequired, ensureCorrectUser} = require('./middleware/auth');
const db = require('./models');

const PORT = 3001;

const app =express();

app.use(bodyParser.json());
app.use(cors());



app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages',
        loginRequired,
        ensureCorrectUser,
        messagesRoutes
);

app.get('/api/messages', loginRequired, async function(req, res, next){
    try {
        const messages = await db.Message.find()
        .sort({createdAt: 'desc'}).populate('user', {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
});

app.use((req,res,next)=>{
    let error = new Error("NOT FOUND!!!");
    error.status = 404;
    next(error);
});

app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is starting on port ${PORT}`);
})