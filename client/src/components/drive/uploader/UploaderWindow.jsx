import React from 'react';
import './uploaderWindow.scss';
import UploadFile from "./UploadFile";

const UploaderWindow = () => {

    const files = [
        {id: 1, name: 'file', progress: 0},
        {id: 2, name: 'file 2', progress: 100}
    ]

    return (
        <div className="uploader">
            <div className="uploader-top__line">
                <h3 className="title">Upload files</h3>
                <div className="close-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)"
                              fill="currentColor"></rect>
                        <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)"
                              fill="currentColor"></rect>
                    </svg>
                </div>
            </div>

            <div className="uploader-files">
                {
                    files.map((file) => {
                      return  <UploadFile key={file.id} file={file} />
                    })
                }
            </div>


        </div>
    );
};

export default UploaderWindow;
