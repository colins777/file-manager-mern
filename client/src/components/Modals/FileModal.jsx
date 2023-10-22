import React, {useState} from 'react';
import './fileModal.scss'
import {useDispatch, useSelector} from "react-redux";
import {createFolder, showHideFileModal} from "../../redux-toolkit/features/fileSlice";

const FileModal = (props) => {

   // const modalType = props.fileName;
    const currentDirId = useSelector(state => state.file.currentDir);
    const [folderName, setFolderName] = useState('');
    const dispatch = useDispatch();

    const closeModalHandler = function () {
        dispatch(showHideFileModal(false));
    }

    const inputNameHandler = function (e) {
        setFolderName(e.target.value);
    }

    const createFolderHandler = function () {
        dispatch(createFolder({dirId: currentDirId, name: folderName}));
    }

    return (
        <div className="universal-modal" style={{ display: props.showModal ? 'flex' : 'none' }}
            onClick={() => dispatch(showHideFileModal(false))}
        >
            <div className="universal-modal__content"
            onClick={(event => event.stopPropagation())}
            >
                <h2 className="modal-header universal-modal__header">
                    <span className="title">Create new folder</span>
                    <div className="close-btn"
                        onClick={() => {
                            closeModalHandler()
                        }}
                    >

                        <svg width="24" height="24" viewBox="0 0 24 24"
                             fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.5" x="6" y="17.3137" width="16"
                                  height="2" rx="1"
                                  transform="rotate(-45 6 17.3137)"
                                  fill="currentColor"></rect>
                            <rect x="7.41422" y="6" width="16" height="2" rx="1"
                                  transform="rotate(45 7.41422 6)"
                                  fill="currentColor"></rect>
                        </svg>

                    </div>
                </h2>
                <input type="text" placeholder="Add folder name."
                    value={folderName}
                   // setValue={setFolderName}
                    onChange={inputNameHandler}
                />

                <button className="btn btn-primary"
                onClick={(e) => {
                    createFolderHandler(e)
                }}
                >Create</button>
            </div>
        </div>
    );
};

export default FileModal;
