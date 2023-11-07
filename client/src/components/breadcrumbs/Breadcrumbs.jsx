import React from 'react';

const Breadcrumbs = ({breadcrumbs}) => {

    console.log('breadcrumbs', breadcrumbs)

    return (
        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
            {/*<li className="breadcrumb-item text-muted">
                <a href="" className="text-muted text-hover-primary">Home</a>
            </li>
            <li className="breadcrumb-item">
                <span className="bullet bg-gray-400 w-5px h-2px"></span>
            </li>
            <li className="breadcrumb-item text-muted">
                <a href="" className="text-muted text-hover-primary">test folder</a>
            </li>*/}

            <li className="breadcrumb-item text-muted">
                <a href="" className="text-muted text-hover-primary">Home</a>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6343 12.5657L8.45001 16.75C8.0358 17.1642 8.0358 17.8358 8.45001 18.25C8.86423 18.6642 9.5358 18.6642 9.95001 18.25L15.4929 12.7071C15.8834 12.3166 15.8834 11.6834 15.4929 11.2929L9.95001 5.75C9.5358 5.33579 8.86423 5.33579 8.45001 5.75C8.0358 6.16421 8.0358 6.83579 8.45001 7.25L12.6343 11.4343C12.9467 11.7467 12.9467 12.2533 12.6343 12.5657Z" fill="currentColor"></path></svg>

            </li>
            {breadcrumbs && breadcrumbs.map(breadcrumb =>
                <li className="breadcrumb-item text-muted" key={breadcrumb._id}>
                    <span className="text-muted text-hover-primary">{breadcrumb.folderName}</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6343 12.5657L8.45001 16.75C8.0358 17.1642 8.0358 17.8358 8.45001 18.25C8.86423 18.6642 9.5358 18.6642 9.95001 18.25L15.4929 12.7071C15.8834 12.3166 15.8834 11.6834 15.4929 11.2929L9.95001 5.75C9.5358 5.33579 8.86423 5.33579 8.45001 5.75C8.0358 6.16421 8.0358 6.83579 8.45001 7.25L12.6343 11.4343C12.9467 11.7467 12.9467 12.2533 12.6343 12.5657Z" fill="currentColor"></path></svg>
                </li>
            )}
        </ul>
    );
};

export default Breadcrumbs;
