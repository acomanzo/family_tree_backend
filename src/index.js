const express = require('express');
const familyMemberRoutes = require('./routes/familyMemberRoutes.js');
const ancestorDescendantRoutes = require('./routes/ancestorDescendantRoutes.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/familymember', familyMemberRoutes);

app.use('/ancestordescendant', ancestorDescendantRoutes);

app.use((req, res) => {
    res.status(404).send("404");
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});