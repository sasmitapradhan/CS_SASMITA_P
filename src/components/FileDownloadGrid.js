import React, { useCallback } from "react";

/* to render the table header  */
const renderHeader = () => {
    let headerElement = ["Name", "Device", "Path", "Status"];

    return headerElement.map((key, index) => {
      return  <th key={index}>{key}</th>;
    });
  };

  /*  to render the table body */
 
  const renderBody = (props) => {
      const {tbodyData,selected,allSelected,parentCallback} = props;

      function handleChange(name,event) {
        // Here, we invoke the callback with the new value
        props.parentCallback(name,event);
      }

    return (
        tbodyData &&
        tbodyData?.map(({ name, device, path, status }) => {
        return (
          <tr key={name} className={ selected[name] ? 'selected': 'nonselected'}>
              <th scope="row">
                      <input
                        type="checkbox"
                        checked={selected[name] || allSelected}
                        onChange={(event)=> handleChange(name,event)} 
                        className="form-check-input"
                        
                      />
                </th>
            <td>{name}</td>
            <td>{device}</td>
            <td>{path}</td>
           
            <td><span className={ status === 'available' ? 'status-available': 'nonavailable'}></span><span>{status.charAt(0).toUpperCase()+ status.slice(1)}</span></td>
          </tr>
        );
      })
    );
  };



function FileDownloadGrid (props)  {
   const {theadData, tbodyData, customClass,selected,allSelected,parentCallback} = props;
    return (
        <table className="filedownloader">
        <thead>
          <tr>
          <th></th>
          
              {renderHeader(theadData)}</tr>
        </thead>
        <tbody>{renderBody(props)}</tbody>
      </table>
    );
};

export default FileDownloadGrid;