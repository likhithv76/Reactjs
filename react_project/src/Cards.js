import React, { useState } from "react";
import Records from "./records.json";
import { MdDeleteOutline } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { SlUserFollow } from "react-icons/sl";
import { SlUserUnfollow } from "react-icons/sl";
  

export default function Cards() {
  const [records, setRecords] = useState(Records);

  // Follow Button Handling
  const handleFollow = (id) => {
    setRecords(
      records.map((record) => {
        if (record.id === id) {

          const followed = !record.followed;
          const buttonColor = followed ? "#ffffff" : "#1c7ed6";
          const buttonTextColor = followed ? "black" : "#ffffff";
          return { ...record, followed, buttonColor, buttonTextColor };
        }
        return record;
      })
    );
  };

  const handleDelete = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  const getDefaultImage = (name) => {
    const words = name.split(" ");
    const initials = words
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();

    let color;
    if (initials.charCodeAt(0) % 5 === 0) {
      color = "#f44336";
    } else if (initials.charCodeAt(0) % 5 === 1) {
      color = "#e91e63";
    } else if (initials.charCodeAt(0) % 5 === 2) {
      color = "#9c27b0";
    } else if (initials.charCodeAt(0) % 5 === 3) {
      color = "#673ab7";
    } else {
      color = "#3f51b5";
    }

    return (
      <div
        style={{
          backgroundColor: color,
          color: "#ffffff",
          borderRadius: "50%",
          width: "150px",
          height: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
          margin: "0 auto",
          textDecoration: "none",
        }}
      >
        {initials}
      </div>
    );
  };


  return (
    <div className="whole">
      {records.map((record) => (
        <div key={record.id} className="card-container">
          <div className="cards">
            <div className="img-name">
              <a href="">
                <div className="image">{getDefaultImage(record.name)}</div>{" "}
              </a>
              <h2>
                {record.name} {record.followed && <CiStar />}
              </h2>
            </div>
            <div className="card-links">
              <a href="">{record.email}</a>
              <a href="">{record.phone}</a>
              <a href="">{record.website}</a>
            </div>
            <div className="card-buttons">
              <button
                className="flwButton"
                onClick={() => handleFollow(record.id)}
                style={{
                  backgroundColor: record.buttonColor,
                  color: record.buttonTextColor,
                }}
              >
                {record.followed ? <SlUserUnfollow /> : <SlUserFollow />}
                {record.followed ? "Unfollow" : "Follow"}
              </button>

              <button
                className="delButton"
                style={{
                  borderColor: "#1c7ed6",
                  color: "#1c7ed6",
                  backgroundColor: "white",
                  
                }}
                onClick={() => handleDelete(record.id)}
              >
            <MdDeleteOutline/>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
