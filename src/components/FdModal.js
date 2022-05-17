import React,{useState,useEffect} from "react";

function FdModal(props) {
  const { show, close,data } = props;
  const [modalData,setModalData] = useState(props.data);
  const renderHeader = () => {
    let headerElement = ["Device", "Path"];

    return headerElement.map((key, index) => {
      return  <th key={index}>{key}</th>;
    });
  };

  useEffect(() => {
    fetchData();
  }, [props]);

  const fetchData = async () => {
    const response = props.data;
    setModalData(response);
  };

  const renderBody = () => {
      
    return (
        modalData &&
        modalData?.filter(item => item.status === 'available').map((item) => {
        return (
            <tr key={item.device}>           
              <td>{item.device}</td>
              <td>{item.path}</td>
              
            </tr>
          );
        
      })
    );
  };

  return (
    <>
      <div className={show ? "modal" : "hide"}>
        <button onClick={close}>X</button>
         {modalData.length > 0 && <p>The following files are available to download.</p>}
         {modalData.length === 0 &&
        <p>
            None of the selected file available to download. Please try again.
        </p>
      }
        
        {modalData.length>0 && 
        <table className="filedownloader">
        <thead>
          <tr>
              {renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>}
      </div>
    </>
  );
}

export default FdModal;