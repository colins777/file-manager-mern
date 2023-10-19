import React from 'react';
import './fileList.scss';
import {useSelector} from "react-redux";
import File from "./file/File";

const FileList = () => {

    const files = useSelector(state => state.file.files).map(file => <File key={file.id} file={file} />);

   /* const files = [{_id: 1, name: 'test', type: 'dir', size: '5Gb', date: '19/10/2023'},
        {_id: 2, name: 'test2', type: 'dir2', size: '6Gb', date: '19/10/2023'}
    ].map(file => <File file={file} key={file.id}/>);*/

    return (
        <div className="file-list">
            <div className="row header">
                <div className="cell name">
                    <span className="cell-content">
                        Name
                    </span>
                </div>

                <div className="cell date">
                    <span className="cell-content">
                        Date
                    </span>
                </div>

                <div className="cell size">
                    <span className="cell-content">
                        Size
                    </span>
                </div>
            </div>
            {files}
        </div>
    );
};

export default FileList;
