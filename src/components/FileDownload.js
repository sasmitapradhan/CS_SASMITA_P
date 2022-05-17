
//This is custom functional component which can be used to render the Grid.
 //You need to provide it with the header element which is an array and table body data which is of array of objects

 import React, { useState, useEffect } from "react";
 import { tableData } from "../helper/helper";
 import FdModal from "./FdModal";
 import InderminantCheckbox from "./InderminatCheckbox";
 import FileDownloadGrid from "./FileDownloadGrid";
 
 const FileDownloadTable = () => {
   const [data, setData] = useState([]);
   const [allSelected, setAllSelected] = useState(false);
   const [showModal,setShowModal] = useState(false);
   const [selected, setSelected] = useState({});
   const [checked, setChecked] = useState(false);
   const selectedCount = Object.values(selected).filter(Boolean).length;
   const isAllSelected = selectedCount === data?.length;
   const theadData = ["Name", "Device", "Path", "Status"];
 
   //indeterminate check box value
 const isIndeterminate =
   selectedCount && selectedCount !== data?.length ;
 
   useEffect(() => {
     fetchData();
   }, []);
 
  
  //In the real time scenario, this data should be loaded
  // using another component com service  which would return the promise and resolve that promise after fetching the data from backend API.
         //But for this example, data will be loaded from helper.js and directly assigned.
   const fetchData = async () => {
     const response = tableData;
     setData(response);
   };
 
   //This method handles the click event for select-all checkbox.
         //It also updates the selectedCount.
 
   const toggleAllSelected = (e) => {
     const { checked } = e.target;
     setAllSelected(checked);
     data &&
       setSelected(
         data.reduce(
           (selected, { name }) => ({
             ...selected,
             [name]: checked
           }),
           {}
         )
       );
   };
 
   //This method handles the click of selected row checkbox which also handles both check/uncheck.
         //It updates the allSelected and selected state variable.
 
         function toggleSelected(name,e) {
          if (!e.target.checked) {
            setAllSelected(false);
          }
      setSelected((selected) => ({
        ...selected,
        [name]: !selected[name]
      }));
        }
 
   
  
 
   /* to filter the data on click on download button to display in modal and sending as a props */
   function selectedData(data, filterObject) {
     let filteredArray=[];
 
     data.forEach(function(element) {
 if(filterObject[element.name] && element.status === 'available')
     filteredArray.push(element)
 });
 return filteredArray;
   }

 
   return (
     <>
       <div className="fileDownloaderContainer">
       <div className="action-button">
       
  {/* Checkbox component  will set the select-all checkbox to indeterminate status when  all the checkbox or none selected. */}
  
       <InderminantCheckbox
         label={selectedCount === 0 ? 'None Selected': 'Selected '+ selectedCount}
         value={isIndeterminate}
         onChange={toggleAllSelected}
       />
     
     </div>
 <div className="action-button" >
 <button className={`download-btn ${(Object.values(selected).filter(Boolean).length<1) ? 'disabled' : ''}`} data-keyboard="false" onClick={() => setShowModal(true)}><i className="fa fa-download"></i> Download Selected</button>
 {/* reusable modal component */}
 <FdModal show={showModal} close={() => setShowModal(false)} data={selectedData(data,selected)}/>
 </div>
{/*  reusable grid component */}
       <FileDownloadGrid theadData={theadData} tbodyData={data} customClass={"filedownloader"}
      selected={selected} allSelected={allSelected} parentCallback={toggleSelected}></FileDownloadGrid>
       </div>
     </>
   );
 };
 
 export default FileDownloadTable;
 