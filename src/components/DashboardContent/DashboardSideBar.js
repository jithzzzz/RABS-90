import React, { useState } from "react";
import Modals from "../commons/Modal/Modal";
import AddDiagnosticsModal from "./AddDiagnostics";
import AddMedicineModal from "./AddMedicineModal";
import MedicineDetailsModal from "./MedicineDetailsModal";
import DiagnosticsDetails from "./DiagnosticsDetails";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import AddNewPatient from "./AddNewPatientModal";
import { getMedicineDetails } from "../../redux/actions/MedicineComponentAction";
import { getDiagonosticsDetails } from "../../redux/actions/DiagonosticsComponentAction";
import AddReferenceModal from "./AddReference";
import { Modal } from "react-bootstrap";

const DashboardSideBar = (props) => {
  const [medicineDropdown, setMedicineDropdown] = useState(false);
  const [diognosticsDropdown, setDiognosticsDropdown] = useState(false);
  const [addMedicineModal, setAddMedicineModal] = useState(false);
  const [medicineDetailsModal, setMedicineDetailsModal] = useState(false);
  const [addDiognosticsModal, setAddDiognosticsModal] = useState(false);
  const [newPatientModal, setNewPatientModal] = useState(false);
  const [patientRecordModal, setPatientRecordModal] = useState(false);
  const [diognosticsDetailsModal, setDiognosticsDetailsModal] = useState(false);
  const [addReferenceModal, setaddReferenceModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const blueButtonConfig = [
    {
      id: 1,
      text: "New Patient",
      icon: "fa fa-plus",
      link: "",
      setState: setNewPatientModal,
    },
    {
      id: 2,
      text: "Home",
      icon: "fa fa-home",
      link: "home",
      setState: props.setPatient,
    },
    {
      id: 3,
      text: "Add Reference",
      icon: "fa fa-address-book-o",
      link: "",
      setState: setaddReferenceModal,
    },
    {
      id: 4,
      text: "Medicine",
      icon: "fa fa-medkit",
      link: "",
      dropDown: true,
      state: medicineDropdown,
      sub: [
        {
          id: 1,
          text: "Add",
          icon: "fa fa-plus",
          setState: setAddMedicineModal,
        },
        {
          id: 2,
          text: "Details",
          icon: "fa fa-file-text",
          setState: setMedicineDetailsModal,
          api: getMedicineDetails,
        },
      ],
      setState: setMedicineDropdown,
    },
    {
      id: 5,
      text: "Diagnostics",
      icon: "fa fa-stethoscope",
      link: "",
      dropDown: true,
      state: diognosticsDropdown,
      sub: [
        {
          id: 1,
          text: "Add",
          icon: "fa fa-plus",
          setState: setAddDiognosticsModal,
        },
        {
          id: 2,
          text: "Details",
          icon: "fa fa-file-text",
          setState: setDiognosticsDetailsModal,
          api: getDiagonosticsDetails,
        },
      ],
      setState: setDiognosticsDropdown,
    },
  ];

  const onBlueButtonHandler = (state, setState, dropDown, link) => {
    if (dropDown) {
      setState(!state);
    } else {
      if (link === "home") {
        setState(false);
      } else setState(true);
    }
  };
  return (
    <>
      <div className="dashboard-sidebar d-flex pt-2 position-relative">
        <div className="d-block dashboard-sidebar-logo text-center">
          <img src="/images/logo.png" alt="logo" />
        </div>
        <h4 className="logo-caption m-0 p-0 text-center pt-2">Medical</h4>
        {blueButtonConfig.map((val) => (
          <div key={val.id}>
            <button
              className="blue-button sidebar-button"
              onClick={() =>
                onBlueButtonHandler(
                  val.state,
                  val.setState,
                  val.dropDown,
                  val.link
                )
              }
              style={{ textAlign: props.sidebar ? "left" : "center" }}
            >
              <i className={val.icon} aria-hidden="true"></i>
              {props.sidebar ? val.text : ""}
            </button>
            {val.dropDown && val.state ? (
              <div className="row m-0">
                {val.sub.map((el) => (
                  <button
                    key={el.id}
                    className="col-8 red-button sidebar-button"
                    onClick={() => {
                      el.setState(true);
                      el.api && dispatch(el.api());
                    }}
                    style={{ textAlign: props.sidebar ? "left" : "center" }}
                  >
                    <i className={el.icon} aria-hidden="true"></i>
                    {props.sidebar ? el.text : ""}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        <button
          className="white-button logout sidebar-button"
          style={{ textAlign: "left" }}
          onClick={() => {
            localStorage.removeItem("access-token");
            history.push("/login");
          }}
        >
          <i className="fa fa-sign-out"></i>
          {props.sidebar ? "Logout" : ""}
        </button>
      </div>
      <Modals
        modalIsOpen={addMedicineModal}
        closeModal={setAddMedicineModal}
        width="25%"
        content={<AddMedicineModal closeModal={setAddMedicineModal} />}
      />
      {/* <Modals
        modalIsOpen={medicineDetailsModal}
        closeModal={setMedicineDetailsModal}
        className="details-modal"
        width="80%"
        height="100vh"
        padding="20px 0px"
        marginTop="20px" */}
      <Modal
        show={medicineDetailsModal}
        onRequestClose={() => setMedicineDetailsModal(false)}
        dialogClassName="prescription-modal"
      >
        {/* content={ */}
        <MedicineDetailsModal
          setAddMedicineModal={setAddMedicineModal}
          addMedicineModal={addMedicineModal}
          closeModal={setMedicineDetailsModal}
        />
        {/* } */}
      </Modal>
      {/* <Modals
        modalIsOpen={diognosticsDetailsModal}
        closeModal={setDiognosticsDetailsModal}
        className="details-modal"
        width="80%"
        height="100vh"
        padding="20px 0px"
        marginTop="20px" */}
      <Modal
        show={diognosticsDetailsModal}
        onRequestClose={() => setDiognosticsDetailsModal(false)}
        dialogClassName="prescription-modal"
      >
        {/* content={ */}
        <DiagnosticsDetails
          addDiognosticsModal={addDiognosticsModal}
          setAddDiognosticsModal={setAddDiognosticsModal}
          closeModal={setDiognosticsDetailsModal}
        />
        {/* } */}
      </Modal>
      <Modals
        modalIsOpen={newPatientModal}
        closeModal={setNewPatientModal}
        width="80%"
        height="auto"
        padding="0px 0px"
        radius="20px"
        content={<AddNewPatient closeModal={setNewPatientModal} />}
      />
      <Modals
        modalIsOpen={addDiognosticsModal}
        closeModal={setAddDiognosticsModal}
        width="25%"
        content={<AddDiagnosticsModal closeModal={setAddDiognosticsModal} />}
      />
      <Modals
        modalIsOpen={addReferenceModal}
        closeModal={setaddReferenceModal}
        width="25%"
        content={<AddReferenceModal closeModal={setaddReferenceModal} />}
      />
    </>
  );
};

export default DashboardSideBar;
