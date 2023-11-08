//@TODO 1 fix auth error, need to get user Id from token, not from localstorage!!!
//@TODO 2 fix f-ty of back btn - not correct back folder
//@TODO 3 add breadcrumbs



import './drive.scss';
// import './../../assets/img/icons/drive/cube-svgrepo-com.svg'
// import './../../assets/img/icons/drive/list-svgrepo-com.svg'

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    clearBreadCrumbsStack,
    getFiles, removeFolderFromBreadcrumbs,
    removeFolderFromStack,
    searchFile, setFoldersView,
    showHideFileModal,
    uploadFile
} from "../../redux-toolkit/features/fileSlice";
import FileList from "./fileList/FileList";
import FileModal from "../Modals/FileModal";
import UploaderWindow from "./uploader/UploaderWindow";
import {showUploader} from "../../redux-toolkit/features/uploadWindowSlice";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

const Drive = () => {
    const dispatch = useDispatch();
    const currentDirId = useSelector(state => state.file.currentDir);
    const fileUploaded = useSelector(state => state.file.fileUploaded);
    const fileModalStatus = useSelector(state => state.file.modalDisplay);
    const foldersStack = useSelector(state => state.file.dirStack);

    const loaderStatus = useSelector(state => state.helpers.loader);

    const [prevFolderId, setPrevFolderId] = useState(null);
    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState('date');

    //Search field
    const [searchRequest, setSearchRequest] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);

    //Breadcrumbs
    const breadCrumbsStack = useSelector(state => state.file.breadCrumbsStack);

    function changeSearchHandler(e) {

        const searchInputVal = e.target.value;
        //console.log('searchInputVal', searchInputVal);
        setSearchRequest(searchInputVal);

        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }

        if (searchInputVal) {
            setSearchTimeout(setTimeout(() => {
                dispatch(searchFile({name: searchInputVal}));
            }, 500, searchInputVal))
        } else {
            dispatch(getFiles({currentDirId, sort}))
        }
    }

    //if change currentDir will be activated dispatch()
    useEffect(() => {
        dispatch(getFiles({currentDirId, sort}))
      //  dispatch(getFiles({currentDirId, userId, sort}))
   // }, [currentDirId, fileUploaded, sort]);
    }, [fileUploaded, sort]);

    //@TODO fix bug with back btn if no user Id Back not works
    //const userId = '652fe669110ed35eea8097b3';
    const userId = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null;

    const createFolderHandler = () => {

        let modalShow = fileModalStatus;

        if (!modalShow) {
            modalShow = true;
        }

        dispatch(showHideFileModal(modalShow));
    };

    const backClickHandler = function () {

        //last folder ID in stack
        const lastFolder = foldersStack[foldersStack.length - 1];

        dispatch(removeFolderFromStack({currentDirId: lastFolder}));
        //console.log('foldersStack', foldersStack);

        dispatch(removeFolderFromBreadcrumbs());
        console.log('breadCrumbsStack', breadCrumbsStack);


       //root folder
        if (foldersStack.length < 2) {
            setPrevFolderId(null)
            dispatch(clearBreadCrumbsStack());
        } else {
            setPrevFolderId(foldersStack[foldersStack.length - 2]);
        }
        dispatch(getFiles({ userId: userId }));
    };

    useEffect(() => {
        if (prevFolderId) {
           // console.log('prevFolderId changed', prevFolderId)
         //   dispatch(getFiles({ currentDirId: prevFolderId, userId: userId }));
            dispatch(getFiles({ currentDirId: prevFolderId}));
        } else {
            //console.log('prevFolderId changed', prevFolderId)
           // dispatch(getFiles({userId: userId }));
            dispatch(getFiles());
        }
    }, [prevFolderId]);


    //this for upload button
    const fileUploadHandler = function (event) {
        const files = [...event.target.files];

        console.log('fileUploadHandler files', files);

        //files.forEach(file => dispatch(uploadFile({file, dirId: currentDirId})))

        files.forEach((file) => {
            //Show window with uploaded files
            dispatch(showUploader({file}));

            //upload file on server
            dispatch(uploadFile({file, dirId: currentDirId}));

        })

    };

    function dragEnterHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(true);
    }

    function dragLeaveHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(false);
    }

    //this for upload by dragndrop
    function dragHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        //convert object spec to files array with file objects
        let files = [...e.dataTransfer.files];

        console.log('files drag', files);
       // files.forEach(file => dispatch(uploadFile({file, dirId: currentDirId})));
        files.forEach((file) => {

            //Show window with uploaded files
            dispatch(showUploader({file}));

            //upload file on server
            dispatch(uploadFile({file, dirId: currentDirId}));

        })

        setDragEnter(false);
    }

    return ( !dragEnter ?
        <div className="grey-bg app-container container-fluid d-flex align-items-stretch justify-content-between p-4">

            {/*Preloader*/}
            {loaderStatus && <div className="lds-roller">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
            }

            <div className="list-wrapper"
                 onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}
            >
                <div className="tools-line">
                    <input type="text"
                            onChange={(e) => changeSearchHandler(e)}
                           className="form-control form-control-solid w-250px ps-15"
                           placeholder="Search Files &amp; Folders"
                           value={searchRequest}
                    />

                    <select value={sort}
                            className="drive-select"
                    onChange={(e) => {setSort(e.target.value)}}
                    >
                        <option value="name">Sort by name</option>
                        <option value="type">Sort by type</option>
                        <option value="date">Sort by date</option>
                    </select>

                    <button type="button" className="btn btn-light-primary me-3"
                        onClick={() => createFolderHandler() }
                    >
                        <span className="svg-icon svg-icon-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.3" d="M10 4H21C21.6 4 22 4.4 22 5V7H10V4Z"
                                      fill="currentColor"></path>
                                <path
                                    d="M10.4 3.60001L12 6H21C21.6 6 22 6.4 22 7V19C22 19.6 21.6 20 21 20H3C2.4 20 2 19.6 2 19V4C2 3.4 2.4 3 3 3H9.2C9.7 3 10.2 3.20001 10.4 3.60001ZM16 12H13V9C13 8.4 12.6 8 12 8C11.4 8 11 8.4 11 9V12H8C7.4 12 7 12.4 7 13C7 13.6 7.4 14 8 14H11V17C11 17.6 11.4 18 12 18C12.6 18 13 17.6 13 17V14H16C16.6 14 17 13.6 17 13C17 12.4 16.6 12 16 12Z"
                                    fill="currentColor"></path>
                                <path opacity="0.3"
                                      d="M11 14H8C7.4 14 7 13.6 7 13C7 12.4 7.4 12 8 12H11V14ZM16 12H13V14H16C16.6 14 17 13.6 17 13C17 12.4 16.6 12 16 12Z"
                                      fill="currentColor"></path>
                            </svg>
                        </span>
                       New Folder
                    </button>

                    <label htmlFor="upload_file_field" type="button" className="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#kt_modal_upload">
                        <span className="svg-icon svg-icon-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.3" d="M10 4H21C21.6 4 22 4.4 22 5V7H10V4Z"
                                      fill="currentColor"></path>
                                <path
                                    d="M10.4 3.60001L12 6H21C21.6 6 22 6.4 22 7V19C22 19.6 21.6 20 21 20H3C2.4 20 2 19.6 2 19V4C2 3.4 2.4 3 3 3H9.20001C9.70001 3 10.2 3.20001 10.4 3.60001ZM16 11.6L12.7 8.29999C12.3 7.89999 11.7 7.89999 11.3 8.29999L8 11.6H11V17C11 17.6 11.4 18 12 18C12.6 18 13 17.6 13 17V11.6H16Z"
                                    fill="currentColor"></path>
                                <path opacity="0.3"
                                      d="M11 11.6V17C11 17.6 11.4 18 12 18C12.6 18 13 17.6 13 17V11.6H11Z"
                                      fill="currentColor"></path>
                            </svg>
                        </span>
                        Upload Files
                    </label>
                    
                    <input id="upload_file_field" type="file" multiple={true} className="btn btn-primary" data-bs-toggle="modal"
                        onChange={(event) => fileUploadHandler(event)}
                    />


                    {foldersStack.length > 0
                        ?
                        <button type="button" className="btn-back btn btn-light-primary me-3"
                                onClick={() => backClickHandler()}
                        >
                        <span className="svg-icon svg-icon-2 svg-icon-primary mx-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.6343 12.5657L8.45001 16.75C8.0358 17.1642 8.0358 17.8358 8.45001 18.25C8.86423 18.6642 9.5358 18.6642 9.95001 18.25L15.4929 12.7071C15.8834 12.3166 15.8834 11.6834 15.4929 11.2929L9.95001 5.75C9.5358 5.33579 8.86423 5.33579 8.45001 5.75C8.0358 6.16421 8.0358 6.83579 8.45001 7.25L12.6343 11.4343C12.9467 11.7467 12.9467 12.2533 12.6343 12.5657Z"
                                    fill="currentColor"></path>
                            </svg>
                        </span>
                            Back
                        </button>
                        : ''
                    }
                </div>

                <div className="tools-line">

                    <Breadcrumbs breadcrumbs={breadCrumbsStack} />

                    <div className="view-buttons">
                        <div className="view-buttons__list"
                            onClick={() => dispatch(setFoldersView('list'))}
                        >
                            <svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1"
                                 viewBox="0 0 487.3 487.3" >
                                <g>
                                    <g>
                                        <path d="M487.2,69.7c0,12.9-10.5,23.4-23.4,23.4h-322c-12.9,0-23.4-10.5-23.4-23.4s10.5-23.4,23.4-23.4h322.1
                                    C476.8,46.4,487.2,56.8,487.2,69.7z M463.9,162.3H141.8c-12.9,0-23.4,10.5-23.4,23.4s10.5,23.4,23.4,23.4h322.1
                                    c12.9,0,23.4-10.5,23.4-23.4C487.2,172.8,476.8,162.3,463.9,162.3z M463.9,278.3H141.8c-12.9,0-23.4,10.5-23.4,23.4
                                    s10.5,23.4,23.4,23.4h322.1c12.9,0,23.4-10.5,23.4-23.4C487.2,288.8,476.8,278.3,463.9,278.3z M463.9,394.3H141.8
                                    c-12.9,0-23.4,10.5-23.4,23.4s10.5,23.4,23.4,23.4h322.1c12.9,0,23.4-10.5,23.4-23.4C487.2,404.8,476.8,394.3,463.9,394.3z
                                     M38.9,30.8C17.4,30.8,0,48.2,0,69.7s17.4,39,38.9,39s38.9-17.5,38.9-39S60.4,30.8,38.9,30.8z M38.9,146.8
                                    C17.4,146.8,0,164.2,0,185.7s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9S60.4,146.8,38.9,146.8z M38.9,262.8
                                    C17.4,262.8,0,280.2,0,301.7s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9S60.4,262.8,38.9,262.8z M38.9,378.7
                                    C17.4,378.7,0,396.1,0,417.6s17.4,38.9,38.9,38.9s38.9-17.4,38.9-38.9C77.8,396.2,60.4,378.7,38.9,378.7z"/>
                                    </g>
                                </g>
                            </svg>
                        </div>

                        <div className="view-buttons__plates"
                             onClick={() => dispatch(setFoldersView('box'))}
                        >
                            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 10.2308L3.08495 7.02346M12 10.2308L20.9178 7.03406M12 10.2308V20.8791M5.13498 18.5771L10.935 20.6242C11.3297 20.7635 11.527 20.8331 11.7294 20.8608C11.909 20.8853 12.091 20.8853 12.2706 20.8608C12.473 20.8331 12.6703 20.7635 13.065 20.6242L18.865 18.5771C19.6337 18.3058 20.018 18.1702 20.3018 17.9269C20.5523 17.7121 20.7459 17.4386 20.8651 17.1308C21 16.7823 21 16.3747 21 15.5595V8.44058C21 7.62542 21 7.21785 20.8651 6.86935C20.7459 6.56155 20.5523 6.28804 20.3018 6.0732C20.018 5.82996 19.6337 5.69431 18.865 5.42301L13.065 3.37595C12.6703 3.23665 12.473 3.167 12.2706 3.13936C12.091 3.11484 11.909 3.11484 11.7294 3.13936C11.527 3.167 11.3297 3.23665 10.935 3.37595L5.13498 5.42301C4.36629 5.69431 3.98195 5.82996 3.69824 6.0732C3.44766 6.28804 3.25414 6.56155 3.13495 6.86935C3 7.21785 3 7.62542 3 8.44058V15.5595C3 16.3747 3 16.7823 3.13495 17.1308C3.25414 17.4386 3.44766 17.7121 3.69824 17.9269C3.98195 18.1702 4.36629 18.3058 5.13498 18.5771Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>

                    </div>
                </div>


                <FileList/>

            </div> {/*End list-wrapper*/}

            <FileModal showModal={fileModalStatus} />

            <UploaderWindow />
        </div>
            :
            <div className="grey-bg app-container container-fluid d-flex align-items-stretch justify-content-between p-4">
                <div className="drag-files"
                     onDragEnter={dragEnterHandler}
                     onDragLeave={dragLeaveHandler}
                     onDragOver={dragEnterHandler}
                        onDrop={dragHandler}
                >
                    <div className="fs-1 fw-bolder text-dark mb-4">No items found.</div>
                    <div className="fs-6">Start creating new folders or drag a new file here!</div>
                </div>
            </div>
    );
};

export default Drive;
