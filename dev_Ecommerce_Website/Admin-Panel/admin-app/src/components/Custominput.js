import React from 'react';


const Custominput = (props) => {
    const {type  , label, i_id, i_className,name , value,onChange,onBlur} = props
  return (
    <div className="form-floating mt-3">
  <input type={type} className={`form-control ${i_className}`}
   id={i_id}
   placeholder={label}
   name={name}
   value={value}
   onChange={onChange}
   onBlur={onBlur}
   />
  <label  htmlFor={label}> {label} </label>
</div>
  )
}

export default Custominput