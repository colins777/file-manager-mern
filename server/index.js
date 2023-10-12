const express = require('express')
//for working with MongoDB
const mongoose = require('mongoose')
const config = require('config')

const app = express();

//this get from config.json
const PORT = config.get('serverPort');

//func for connect to DB and start server
const start = async () => {
    try {

        //get URL from mongoDB https://prnt.sc/vkawJeyYddKq
        mongoose.connect(config.get('dbUrl'))

        app.listen(PORT, () => {
            //func thats call after server started
            console.log('Server started on', PORT)
        })
    } catch(e) {

    }
}

start()