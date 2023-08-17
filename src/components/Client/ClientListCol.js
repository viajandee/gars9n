import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { size, map } from "lodash";

function formatDate(date, format) {
  const dateFormat = format ? format : "MM DD YYYY";
  const formattedDate = moment(date).format(dateFormat);
  return formattedDate;
}

const toLowerCase1 = (str) => {
  if (!str) {
    return "";
  } else {
    return str.toLowerCase();
  }
};

const Name = (cell) => {
  return cell.value || "";
};

const Email = (cell) => {
  return cell.value || "";
};

const Tags = (cell) => {
  return (
    <>
      {map(
        cell.value,
        (tag, index) =>
          index < 2 && (
            <Link
              to='#'
              className='badge badge-soft-primary font-size-11 m-1'
              key={"_skill_" + cell.value + index}>
              {tag}
            </Link>
          )
      )}
      {size(cell.value) > 2 && (
        <Link
          to='#'
          className='badge badge-soft-primary font-size-11 m-1'
          key={"_skill_" + cell.value}>
          {size(cell.value) - 1} + more
        </Link>
      )}
    </>
  );
};

const Projects = (cell) => {
  return cell.value || "";
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

export { Name, Email, Tags, Projects, Img, formatDate, toLowerCase1 };
