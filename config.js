require('dotenv').config()

const mongoRemote = {
        client: 'mongodb',
        cnxStr: process.env.MONGO_URL
    }

module.exports = {mongoRemote}