import './drive.scss';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles} from "../../redux-toolkit/features/fileSlice";

const Drive = () => {
    const dispatch = useDispatch();
    let currentDirId = useSelector(state => state.file.currentDir);
   // const currentDir = '652ede5513ffaf4a79d8b813';
        //652fe669110ed35eea8097b3
  //  const userId = localStorage.getItem('token');
    //@TODO need get user id from auth.middleware, but it is not work
    const userId = '652fe669110ed35eea8097b3';

    if (!currentDirId) {
        //get from field parent in DB
        currentDirId = '652ede5513ffaf4a79d8b813';
    }


    //if change currentDir will be activated dispatch()
    useEffect(() => {
        dispatch(getFiles({currentDirId, userId}))
    }, [currentDirId])

    return (
        <div className="grey-bg app-container container-fluid d-flex align-items-stretch justify-content-between p-4">
            <div className="file-list">
                <div className="tools-line">
                    <input type="text" data-kt-filemanager-table-filter="search"
                           className="form-control form-control-solid w-250px ps-15"
                           placeholder="Search Files &amp; Folders"
                    />

                    <button type="button" className="btn btn-light-primary me-3" id="kt_file_manager_new_folder">
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
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
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
                    </button>

                    <button type="button" className="btn-back btn btn-light-primary me-3">
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
                </div>
            </div>

        </div>
    );
};

export default Drive;
