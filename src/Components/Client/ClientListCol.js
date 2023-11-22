import React from "react";

const toLowerCase1 = (str) => {
  return str === "" || str === undefined ? "" : str.toLowerCase();
};

const Name = (cell) => {
  return cell.value ? cell.value : "";
};
const Store = (cell) => {
  return cell.value ? cell.value : "";
};

const Email = (cell) => {
  return cell.value ? cell.value : "";
};
const Phone = (cell) => {
  return cell.value ? cell.value : "";
};

const Img = (cell) => {
  return (
    <>
      {!cell.value ? (
        <div className='avatar-xs'>
          <span className='avatar-title rounded-circle'>
            {console.log("cell", cell.data[0].name)}
            {cell.data[0].name.charAt(0)}
          </span>
        </div>
      ) : (
        <div>
          <img className='rounded-circle avatar-xs' src={cell.value} alt='' />
        </div>
      )}
    </>
  );
};

export { Name, Email, Phone, Img, Store, toLowerCase1 };
