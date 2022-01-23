import React, { useState, useRef } from "react";
// import Modals from "../Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import PrescriptionModal from "../../DashboardContent/PrescriptionModal";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useOnClickOutside from "../OuterClick/OuterClick";
import ChangePassword from "../../DashboardContent/ChangePassword";
import {
  getPatients,
  getPatientHistorySearch,
} from "../../../redux/actions/DashboardComponentActions";
import { getPatientHistory } from "../../../redux/actions/AddPatientComponentAction";
import { Logout } from "../../../redux/actions/LoginComponentActions";

const Navbar = (props) => {
  const dropdownRef = useRef(null);
  const history = useHistory();
  const [PrescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [searchOptn, setSearchOptn] = useState(false);
  const [searchResult, setSearchResult] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.LoginReducer.user);
  const searchRef = useRef(null);
  const closeModal = () => {
    setPrescriptionModalOpen(false);
  };
  const closeChangePassModal = () => {
    setChangePasswordModal(false);
  };
  useOnClickOutside(dropdownRef, () => {
    setDropDown(false);
  });
  useOnClickOutside(searchRef, () => {
    setSearchOptn(false);
  });
  const searchHandler = (e) => {
    if (e.target.value) {
      if (localStorage.getItem("token")) {
        dispatch(
          getPatientHistorySearch(
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
            (res) => {
              setSearchOptn(true);
              if (res.status) {
                setSearchResult(res.data);
              } else {
                setSearchResult({ text: "No data found" });
              }
            }
          )
        );
      } else {
        localStorage.removeItem("token");
        history.push("/login");
      }
    } else {
      setSearchResult({});
    }
  };
  const onPatientHandler = (id) => {
    props.setPatient(true);
    if (localStorage.getItem("token")) {
      dispatch(
        getPatientHistory(id, (res, data) => {
          if (res) {
            props.setPatientDetails(data);
          }
        })
      );
    } else {
      localStorage.removeItem("token");
      history.push("/login");
    }
  };
  return (
    <>
      <div className="d-flex nav-bar">
        <div
          className="hamburger"
          onClick={() => props.setSideBar(!props.sidebar)}
        >
          <i className="fa fa-align-justify"></i>
        </div>
        <div className="nav-bar-right d-flex">
          {props.patient ? (
            <button
              className="mr-5"
              onClick={() => setPrescriptionModalOpen(true)}
            >
              <i className="fa fa-plus mr-2" aria-hidden="true"></i>
              Prescription
            </button>
          ) : (
            <div className="nav-search d-flex border-hightlight-search-div mr-5 position-relative">
              <i className="fa fa-search"></i>
              <input
                type="search"
                className="border-hightlight-search"
                placeholder="Search..."
                onChange={(e) => searchHandler(e)}
              />
              {searchOptn ? (
                <div
                  ref={searchRef}
                  className="position-absolute search-history-result-div"
                >
                  <div
                    className="search-history-result cursor-pointer"
                    onClick={() =>
                      onPatientHandler(searchResult?.patientInfo[0]?.patient_id)
                    }
                  >
                    {searchResult?.OPID ? (
                      <div className="d-flex" style={{ alignItems: "center" }}>
                        {searchResult?.patientInfo[0]?.firstName}{" "}
                        {searchResult?.patientInfo[0]?.lastName}
                      </div>
                    ) : searchResult?.text ? (
                      searchResult.text
                    ) : null}
                    {searchResult?.OPID ? (
                      <button
                        className="ml-5"
                        style={{ background: "#e38d8d" }}
                      >
                        {" "}
                        {searchResult?.OPID}
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          )}
          {/* <div className="notification">
            <i className="fas fa-bell"></i>
          </div> */}
          <div
            className="position-relative"
            style={{ marginRight: "36px" }}
            ref={dropdownRef}
          >
            <div
              className="user-div d-flex"
              style={{ cursor: "pointer", height: "100%" }}
              onClick={() => setDropDown(!dropDown)}
            >
              {/* <div className="user-pic">
                <img src="/images/user.jfif" alt="user" />
              </div> */}
              <h5>{user?.Name}</h5>
              <i className="fa fa-chevron-down"></i>
            </div>
            {dropDown ? (
              <div className="nav-dropDown">
                <div
                  className="dropDown-box pointer"
                  onClick={() => setChangePasswordModal(true)}
                >
                  Change password
                </div>
                <div
                  className="dropDown-box pointer"
                  onClick={() => {
                    if (localStorage.getItem("token")) {
                      dispatch(
                        Logout({ UserName: user.UserName }, (res) => {
                          if (res) {
                            localStorage.removeItem("token");
                            history.push("/login");
                          }
                        })
                      );
                    } else {
                      localStorage.removeItem("token");
                      history.push("/login");
                    }
                  }}
                >
                  Logout
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Modal
        show={PrescriptionModalOpen}
        onRequestClose={closeModal}
        dialogClassName="prescription-modal"
        // style={{
        //   marginTop:
        //     document?.querySelector(".prescription-modal")?.offsetHeight *
        //     (27 / 100),
        // }}
      >
        <PrescriptionModal {...props} closeModal={setPrescriptionModalOpen} />
      </Modal>
      <Modal
        show={changePasswordModal}
        onRequestClose={closeChangePassModal}
        dialogClassName="change-pass-modal"
      >
        <ChangePassword closeModal={setChangePasswordModal} />
      </Modal>
    </>
  );
};

export default Navbar;
