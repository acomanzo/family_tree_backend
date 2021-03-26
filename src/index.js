const express = require('express');
const familyMemberRoutes = require('./routes/familyMemberRoutes.js');
const ancestorDescendantRoutes = require('./routes/ancestorDescendantRoutes.js');
const contactAddressRoutes = require('./routes/contactAddressRoutes.js');
const cityRoutes = require('./routes/cityRoutes.js');
const stateRoutes = require('./routes/stateRoutes.js');
const zipcodeRoutes = require('./routes/zipcodeRoutes.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/familymember', familyMemberRoutes);

app.use('/ancestordescendant', ancestorDescendantRoutes);

app.use('/contactaddress', contactAddressRoutes);

app.use('/city', cityRoutes);

app.use ('/state', stateRoutes);

app.use('/zipcode', zipcodeRoutes);

app.use((req, res) => {
    res.status(404).send("404");
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});