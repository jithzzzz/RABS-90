import React, { useState } from "react";
import DashboardSideBar from "./DashboardSideBar";
import Navbar from "../commons/Navbar/Navbar";
import Content from "./Content";
import PatientDetails from "./PatientDetails";

const DashboardContent = () => {
  const [sidebar, setSideBar] = useState(false);
  const [patient, setPatient] = useState(false);
  const [patientDetails, setPatientDetails] = useState({});
  return (
    <div className="dashboard">
      <div className="row m-0 d-flex">
        <div
          className={sidebar ? "sidebar-full sidebar" : "sidebar-half sidebar"}
        >
          <DashboardSideBar setPatient={setPatient} sidebar={sidebar} />
        </div>
        <div
          className={
            sidebar ? "content-full m-content" : "content-half m-content"
          }
        >
          <Navbar
            patientDetails={patientDetails}
            patient={patient}
            sidebar={sidebar}
            setPatient={setPatient}
            setSideBar={setSideBar}
            setPatientDetails={setPatientDetails}
          />
          {patient ? (
            <PatientDetails
              patientDetails={patientDetails}
              setPatientDetails={setPatientDetails}
            />
          ) : (
            <Content
              setPatient={setPatient}
              setPatientDetails={setPatientDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
