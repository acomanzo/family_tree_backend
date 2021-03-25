//import express from 'express';
//import familyMemberRoutes from './routes/familyMemberRoutes.js';
const express = require('express');
const familyMemberRoutes = require('./routes/familyMemberRoutes.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/familymember', familyMemberRoutes);

app.use((req, res) => {
    res.status(404).send("404");
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});