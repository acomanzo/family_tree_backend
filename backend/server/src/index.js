const express = require('express');
const familyMemberRoutes = require('./routes/familyMemberRoutes.js');
const ancestorDescendantRoutes = require('./routes/ancestorDescendantRoutes.js');
const contactAddressRoutes = require('./routes/contactAddressRoutes.js');
const cityRoutes = require('./routes/cityRoutes.js');
const stateRoutes = require('./routes/stateRoutes.js');
const zipcodeRoutes = require('./routes/zipcodeRoutes.js');
const diagnosisRoutes = require('./routes/diagnosisRoutes.js');
const medicalHistoryRoutes = require('./routes/medicalHistoryRoutes.js');
const emailRoutes = require('./routes/emailRoutes.js');
const contactInformationRoutes = require('./routes/contactInformationRoutes.js');
const phoneNumberRoutes = require('./routes/phoneNumberRoutes.js');
const familyTreeRoutes = require('./routes/familyTreeRoutes');
const appUserRoutes = require('./routes/appUserRoutes.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/familymember', familyMemberRoutes);

app.use('/ancestordescendant', ancestorDescendantRoutes);

app.use('/contactaddress', contactAddressRoutes);

app.use('/city', cityRoutes);

app.use ('/state', stateRoutes);

app.use('/zipcode', zipcodeRoutes);

app.use('/diagnosis', diagnosisRoutes);

app.use('/medicalhistory', medicalHistoryRoutes);

app.use('/email', emailRoutes);

app.use('/contactinformation', contactInformationRoutes);

app.use('/phonenumber', phoneNumberRoutes);

app.use('/familytree', familyTreeRoutes);

app.use('/appuser', appUserRoutes);

app.use((req, res) => {
    res.status(404).send("404");
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});