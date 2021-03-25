import express from 'express';
import mssql from 'mssql';
import config from './config.json';

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {

    mssql.connect(config,  (err) => {
        if (err) {
            console.log(err);
        }

        const request = new mssql.Request();

        request.query('SELECT * FROM ')
    })
})

app.use('/familymember', familyMemberRoutes);

app.use((req, res) => {
    res.status(404).send("404");
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});