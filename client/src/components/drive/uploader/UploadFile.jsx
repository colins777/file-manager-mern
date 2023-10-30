import React from 'react';
import './uploaderWindow.scss'

const UploadFile = ({file}) => {
    return (
        <div className="upload-file">
            <div className="upload-file__header">
                <div className="upload-file__title">
                    {file.name}
                </div>
                <div className="upload-file__close-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)"
                              fill="currentColor"></rect>
                        <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)"
                              fill="currentColor"></rect>
                    </svg>
                </div>
            </div>

            <div className="upload-file__progress-bar" style={{width: file.progress + '%'}}>
                <div className="upload-file__progress-bar-line"></div>
                <div className="upload-file__progress-percent">{file.progress}%</div>
            </div>

        </div>
    );
};

export default UploadFile;
