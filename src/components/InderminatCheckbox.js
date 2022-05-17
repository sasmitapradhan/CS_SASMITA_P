/* Reusable Checkbox component  */

import React from "react";

   const InderminantCheckbox = ({ label, value, onChange }) => {
    const checkboxRef = React.useRef();
  
    React.useEffect(() => {
      if (value === false) {
        checkboxRef.current.checked = true;
        checkboxRef.current.indeterminate = false;
      }
      if (value === 0) {
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = false;
      }
      else if (value !== 0 && value === true) {
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = true;
      }
    }, [value]);
  
    return (
      <label className="container-check">
        <input ref={checkboxRef} type="checkbox" onChange={onChange} />
        
        <span className="checkmark"></span>{label}
      </label>
    );
  };

  export default InderminantCheckbox;