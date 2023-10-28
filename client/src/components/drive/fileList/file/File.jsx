import React from 'react';
import './file.scss'
import {useDispatch} from "react-redux";
import {addFolderToStack, getFiles, setCurrentDir, downloadFile, deleteFile} from "../../../../redux-toolkit/features/fileSlice";

const ImgTable = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<path opacity="0.3" d="M10 4H21C21.6 4 22 4.4 22 5V7H10V4Z" fill="currentColor"></path>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<path d="M9.2 3H3C2.4 3 2 3.4 2 4V19C2 19.6 2.4 20 3 20H21C21.6 20 22 19.6 22 19V7C22 6.4 21.6 6 21 6H12L10.4 3.60001C10.2 3.20001 9.7 3 9.2 3Z" fill="currentColor"></path>\n' +
    '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</svg>);

const FileIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22Z" fill="currentColor"></path>
        <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor"></path>
    </svg>
);

const File = ({file}) => {
    const dispatch = useDispatch();

    //console.log('file!!!!!!!!', file);
    const openFolderHandler = function () {

        if (file.type === 'dir') {
            dispatch (addFolderToStack({currentDirId: file._id}));
            dispatch(setCurrentDir({currentDirId: file._id}));
            dispatch(getFiles({currentDirId: file._id, userId: file.user}));
        }

    }

    function downloadClickHandler(e) {
        e.stopPropagation();
        dispatch(downloadFile({file}));
    }

    const deleteFileHandler = function() {
        console.log('file', file)
        dispatch(deleteFile(file))
    }

    return (
        <div className="file" onClick={() => openFolderHandler(file)}>
            <div className="file-image">
                {
                    file.type === 'dir'
                        ?
                        <ImgTable/>
                        :
                        <FileIcon/>
                }

            </div>
            <div className="file-name">
                <span className="text">{file.name}</span>
            </div>

            <div className="file-date">
                <span className="text">{file.date ? file.date.slice(0, 10) : file.date}</span>
            </div>

            <div className="file-size">
                <span className="text">{file.size}</span>
            </div>

            <div className="file-download-btn ">
                {file.type !== 'dir' && <button className="badge badge-lg badge-primary"
                onClick={e => downloadClickHandler(e)}
                >
                    Download
                </button>}
            </div>

            <div className="file-delete-btn ">
                <div className="download-btn badge badge-lg badge-primary"
                onClick={() => deleteFileHandler()}
                >Delete</div>
            </div>
        </div>
    );
};

export default File;
