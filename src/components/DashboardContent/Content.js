import React, { useState } from "react";
import PatientsRecords from "./PatientsRecords";
import ReferenceContacts from "./ReferenceContacts";
import Calendar from "react-calendar";
import Modals from "../commons/Modal/Modal";

const Content = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [datepicker, setDatepicker] = useState(false);
  return (
    <div className="content-div">
      <div className="content">
        {/* <div className="d-flex row">
          {topSection?.map((val) => {
            return (
              <div key={val.id} className="top-small-div">
                <span
                  className="glyphicon glyphicon-option-horizontal"
                  onClick={() => setDatepicker(!datepicker)}
                  style={{ cursor: "pointer" }}
                ></span>
                <div
                  className="top-small-icon-div d-inline-block"
                  style={{ background: val.iconbgd }}
                >
                  <i className={val.icon} aria-hidden="true"></i>
                </div>
                <h6 className="d-inline-block m-0 ml-3">{val.text}</h6>
              </div>
            );
          })}
        </div> */}
        <div className="row mt-5">
          <div className="col-7">
            <PatientsRecords {...props} />
          </div>
          <div className="col-5">
            <ReferenceContacts />
          </div>
        </div>
      </div>
      <Modals
        modalIsOpen={datepicker}
        closeModal={setDatepicker}
        width="25%"
        content={
          <div className="calendar-modal">
            {" "}
            <div
              className="d-block close position-relative"
              style={{ top: "-14px" }}
            >
              <i
                className="fa fa-times-circle"
                style={{ cursor: "pointer" }}
                onClick={() => setDatepicker(false)}
              ></i>
            </div>
            <Calendar onChange={setStartDate} value={startDate} />
          </div>
        }
      />
    </div>
  );
};

export default Content;

const topSection = [
  {
    id: 1,
    text: "New Patients",
    icon: "fa fa-wheelchair-alt",
    iconbgd: "#7E3FE5",
  },
  { id: 1, text: "Appointments", icon: "fa fa-bookmark", iconbgd: "#E872EA" },
  { id: 1, text: "Events", icon: "fa fa-address-book", iconbgd: "#3FBDE5" },
];
