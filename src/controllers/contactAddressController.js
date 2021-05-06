const sql = require('mssql');
const config = require('../../config.json');

const contact_address_index = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM ContactAddress');
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const contact_address_create = async (req, res) => {
    const streetName = req.query.streetName;
    const houseNumber = req.query.houseNumber;
    const extra = req.query.extra;
    // const cityId = req.query.cityId;
    // const stateId = req.query.stateId;
    // const zipcodeId = req.query.zipcodeId;
    const city = req.query.city;
    const state = req.query.state;
    const zipcode = req.query.zipcode;
    const contactInformationId = req.query.contactInformationId;

    try {
        let pool = await sql.connect(config);
        // const result = await pool.request()
        //     .input('street_name', sql.VarChar, streetName)
        //     .input('house_number', sql.Int, houseNumber)
        //     .input('extra', sql.VarChar, extra)
        //     .input('city_id', sql.Int, cityId)
        //     .input('state_id', sql.Int, stateId)
        //     .input('zipcode_id', sql.Int, zipcodeId)
        //     .input('contact_information_id', sql.Int, contactInformationId)
        //     .query('INSERT INTO ContactAddress (StreetName, HouseNumber, Extra, CityId, StateId, ZipcodeId, ContactInformationId) VALUES (@street_name, @house_number, @extra, @city_id, @state_id, @zipcode_id, @contact_information_id); SELECT SCOPE_IDENTITY() AS ContactAddressId');
        const result = await pool.request()
        .input('street_name', sql.VarChar, streetName)
        .input('house_number', sql.Int, houseNumber)
        .input('extra', sql.VarChar, extra)
        .input('city', sql.VarChar, city)
        .input('state', sql.VarChar, state)
        .input('zipcode', sql.VarChar, zipcode)
        .input('contact_information_id', sql.Int, contactInformationId)
        .query('INSERT INTO ContactAddress (StreetName, HouseNumber, Extra, City, State, Zipcode, ContactInformationId) VALUES (@street_name, @house_number, @extra, @city, @state, @zipcode, @contact_information_id); SELECT SCOPE_IDENTITY() AS ContactAddressId');
        
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const contact_address_delete = async (req, res) => {
    const contactAddressId = req.params.id;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input('contact_address_id', sql.Int, contactAddressId)
            .query('DELETE FROM ContactAddress WHERE ContactAddressId = @contact_address_id');
        
        console.log(result);
        res.send(result);
    } catch (err) {
        // error checks
    }
};

const contact_address_update = async (req, res) => {
    const contactAddressId = req.params.id; 

    const streetName = req.query.streetName;
    const houseNumber = req.query.houseNumber;
    const extra = req.query.extra;
    const cityId = req.query.cityId;
    const stateId = req.query.stateId;
    const zipcodeId = req.query.zipcodeId;
    const contactInformationId = req.query.contactInformationId;

    sql.connect(config).then(() => {
        return sql.query`UPDATE ContactAddress SET StreetName = ${streetName}, HouseNumber = ${houseNumber}, Extra = ${extra}, CityId = ${cityId}, StateId = ${stateId}, ZipcodeId = ${zipcodeId}, ContactInformationId = ${contactInformationId} WHERE ContactAddressId = ${contactAddressId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

const contact_address_update_street_name = async (req, res) => {
    const contactAddressId = req.params.id; 

    const streetName = req.query.streetName;

    sql.connect(config).then(() => {
        return sql.query`UPDATE ContactAddress SET StreetName = ${streetName} WHERE ContactAddressId = ${contactAddressId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

const contact_address_update_house_number = async (req, res) => {
    const contactAddressId = req.params.id; 

    const houseNumber = req.query.houseNumber;

    sql.connect(config).then(() => {
        return sql.query`UPDATE ContactAddress SET HouseNumber = ${houseNumber} WHERE ContactAddressId = ${contactAddressId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

const contact_address_update_extra = async (req, res) => {
    const contactAddressId = req.params.id; 

    const extra = req.query.extra;

    sql.connect(config).then(() => {
        return sql.query`UPDATE ContactAddress SET Extra = ${extra} WHERE ContactAddressId = ${contactAddressId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

const contact_address_update_city_id = async (req, res) => {
    const contactAddressId = req.params.id; 

    const cityId = req.query.cityId;

    sql.connect(config).then(() => {
        return sql.query`UPDATE ContactAddress SET CityId = ${cityId} WHERE ContactAddressId = ${contactAddressId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

const contact_address_update_state_id = async (req, res) => {
    const contactAddressId = req.params.id; 

    const stateId = req.query.stateId;

    sql.connect(config).then(() => {
        return sql.query`UPDATE ContactAddress SET StateId = ${stateId} WHERE ContactAddressId = ${contactAddressId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

const contact_address_update_zipcodeId = async (req, res) => {
    const contactAddressId = req.params.id; 

    const streetName = req.query.streetName;

    sql.connect(config).then(() => {
        return sql.query`UPDATE ContactAddress SET StreetName = ${streetName} WHERE ContactAddressId = ${contactAddressId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

const contact_address_update_zipcode_id = async (req, res) => {
    const contactAddressId = req.params.id; 

    const zipcodeId = req.query.zipcodeId;

    sql.connect(config).then(() => {
        return sql.query`UPDATE ContactAddress SET ZipcodeId = ${zipcodeId} WHERE ContactAddressId = ${contactAddressId}`;
    }).then(result => {
        console.log(result);
        res.send(result);
    }).catch(err => {
        // error checks
    });
}

module.exports = {
    contact_address_index, 
    contact_address_create, 
    contact_address_delete,
    contact_address_update,
    contact_address_update_street_name,
    contact_address_update_house_number,
    contact_address_update_extra,
    contact_address_update_city_id,
    contact_address_update_state_id, 
    contact_address_update_zipcode_id
}