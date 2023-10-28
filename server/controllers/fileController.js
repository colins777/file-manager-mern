const fileService = require('../services/fileService');
const User = require('../models/User');
const File = require('../models/File');
const config = require('config');
const fs = require('fs');

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
            //console.log('req.query.user', req.user.id);
           // console.log('req.query.parent', req.query.parent);

            const files = await File.find({user: req.user.id, parent: req.query.parent});
           // console.log('files', files);

            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: 'Can not get files'})
        }
    }

    async uploadFile(req, res) {
        try {

            const file = req.files.file;
            //console.log('req.body', req.body);
            //console.log('req.query.parent', req.query.parent);

            //find root directory of user to upload file
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent});

           // const parent = null;

            //find user to check free space on the drive
            const user = await User.findOne({_id: req.user.id});

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: 'Not enough space on the drive.'})
            }

            user.usedSpace = user.usedSpace + file.size;

            let path;
            if (parent) {
                path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`;
            } else {
                path = `${config.get('filePath')}\\${user._id}\\${file.name}`;
            }

            //check if uploaded file already exist
            if (fs.existsSync(path)) {
                return res.status(400).json({message: 'File already exist.'})
            }


            //remove file to created path
            file.mv(path);

            //get file type
            const type = file.name.split('.').pop();
            let filePath = file.name;
            if (parent) {
                filePath = parent.path + '\\' + file.name;
            }

            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent?._id,
                user: user._id,
            })

            await dbFile.save();
            await user.save();

            res.json(dbFile);



        } catch (e) {
            console.log('Upload error', e);
            return res.status(500).json({message: 'Upload error'})
        }
    }

    async downloadFile(req, res) {
        try {

            //get file from DB
            //file _id - get from request
            //req.user.id - get from token using middleware authorization
            const file = await File.findOne({_id: req.query.id, user: req.user.id});
            const path = config.get('filePath') + '\\' + req.user.id + '\\' + file.path + '\\' + file.name;

            if (fs.existsSync(path)) {
                return res.download(path, file.name);
            }

        } catch (e) {
            return res.status(500).json({message: 'Download error'})
        }
    }

    async deleteFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id});

            console.log('file server', file);

            if (!file) {
                return res.status(400).json({message: 'file not found'})
            }

            //physical file deleting
            fileService.deleteFile(file)

                // await file.remove()
            await file.deleteOne({ _id: file._id });

            return res.json({message: 'File was deleted', fileID: file._id})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Delete file error.'})
        }
    }


}

module.exports = new FileController();