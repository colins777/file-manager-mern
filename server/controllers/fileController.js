const fileService = require('../services/fileService');
const User = require('../models/User');
const File = require('../models/File');

class FileController {
    async createDir (req, res) {
        try {
            const {name, type, parent} = req.body;

            //user is is getting from decoded token in auth middleware
            // const file = new File({name, type, parent, user: req.user.id});
            const file = new File({name, type, parent, user: req.user.id});
           // const file = new File({name, type, parent, user: '652e8cf27a86a5f32c8e4d95'});
            const parentFile = await File.findOne({_id: parent})

            //if was not found parent file - new file will be added in root directory with user ID name
            if (!parentFile) {
                file.path = name;
                //create directory
                await fileService.createDir(file);

                //if parent id sends https://prnt.sc/tSnqRkPJSL-f - new folder will create in parent folder
            } else {
                file.path = `${parentFile.path}\\${file.name}`;
                await fileService.createDir(file);
                parentFile.childs.push(file._id);
                await parentFile.save();
            }

            console.log('file', file)
            await file.save();
            return res.json(file);

        } catch (e) {
            console.log(e)
            return res.status(400).json(e);
        }
    }

    //method to get all user files
    async getFiles(req, res) {

        try {
            //find by user id and parent folder id https://prnt.sc/aIEx537QtO-0
            //req.user.id - this is from token in auth.middleware
            //req.query.parent - from request
            console.log('req.query.user', req.user.id);
            console.log('req.query.parent', req.query.parent);

            const files = await File.find({user: req.user.id, parent: req.query.parent});
            console.log('files', files);

            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: 'Can not get files'})
        }
    }

}

module.exports = new FileController();