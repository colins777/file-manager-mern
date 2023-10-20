//module for working with file system
const fs = require('fs');
const File = require('../models/File');
const config = require('config');

class FileService {

    //file is not physical file but object file for DB
    createDir(file) {
        //for every user folder will create and will get user id name - ${file.user}
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`;
        return new Promise((resolve, reject) => {
            try {
                //check if file not exist in this path
                if (!fs.existsSync(filePath)) {
                    //if not exist create file
                    fs.mkdirSync(filePath);
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: 'File already exist'})
                }

            } catch (e) {
                return reject({message: 'File error'})
            }
        })
    }
}

module.exports = new FileService();