import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../commons/BlankProfile/Profile";
import { getPatientHistory } from "../../redux/actions/AddPatientComponentAction";
import {
  getPatients,
  getPatientHistorySearch,
} from "../../redux/actions/DashboardComponentActions";
import { Modal } from "react-bootstrap";
import useOnClickOutside from "../commons/OuterClick/OuterClick";
import LabTestHistory from "./LabTestHistory";
import { useHistory } from "react-router-dom";

const PatientDetails = (props) => {
  const dispatch = useDispatch();
  const patientHistory = useSelector(
    (state) => state.PatientReducer.patientHistory
  );
  const history = useHistory();
  const searchRef = useRef(null);
  const [searchResult, setSearchResult] = useState({});
  const [searchOptn, setSearchOptn] = useState(false);
  const [labtestHistory, setlabtestHistory] = useState([]);
  const [labhistoryModal, setLabhistoryModal] = useState(false);
  const onViewHandler = (id) => {
    //dispatch(getPatientHistory(id));
  };
  const [prep, setPrep] = useState([]);
  useEffect(() => {
    if (patientHistory?.length >= 2) {
      let prepscr = patientHistory?.filter((val, i) => {
        return i !== 0;
      });
      setPrep(prepscr);
    } else {
      setPrep([]);
    }
    if (patientHistory?.length !== 0) {
      let his = [];
      patientHistory.forEach((val) => {
        his.push(...val.labTestdata);
      });
      setlabtestHistory(his);
    }
  }, [patientHistory]);
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
    if (localStorage.getItem("token")) {
      dispatch(
        getPatientHistory(id, (res, data) => {
          if (res) {
            setSearchOptn(false);

            props.setPatientDetails(data);
          }
        })
      );
    } else {
      localStorage.removeItem("token");
      history.push("/login");
    }
  };
  useOnClickOutside(searchRef, () => {
    setSearchOptn(false);
  });
  return (
    <>
      {patientHistory[0]?.patientInfo[0]?.firstName ? (
        <div className="patient-details">
          <div className="search border-hightlight-search-div position-relative">
            <i className="fa fa-search"></i>
            <input
              type="search"
              className="border-hightlight-search"
              placeholder="Search...OP ID, Name or Phone number"
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
                    <button className="ml-5" style={{ background: "#e38d8d" }}>
                      {" "}
                      {searchResult?.OPID}
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <div className="center-div row d-flex">
            <div className="col-5 left">
              <div className="d-flex">
                {/* <div className="img">
              <img
                src={
                  props.patientDetails?.img
                    ? props.patientDetails?.img
                    : profile
                }
                alt=""
              />
            </div> */}
                <div className="ml-3">
                  <h4>
                    {patientHistory[0]?.patientInfo[0]?.firstName}{" "}
                    {patientHistory[0]?.patientInfo[0]?.lastName}
                  </h4>
                  <h6>
                    {moment().diff(
                      patientHistory[0]?.patientInfo[0]?.dob,
                      "years",
                      false
                    ) !== 0
                      ? moment().diff(
                          patientHistory[0]?.patientInfo[0]?.dob,
                          "years",
                          false
                        ) +
                        " " +
                        "years old"
                      : moment().diff(
                          patientHistory[0]?.patientInfo[0]?.dob,
                          "months",
                          false
                        ) +
                        " " +
                        "months old"}{" "}
                  </h6>
                </div>
              </div>
              <div
                className="d-flex justify-content-between"
                style={{ marginTop: "20px" }}
              >
                <div className="">
                  <h6>Height</h6>
                  <h6>{patientHistory[0]?.patientInfo[0]?.heigth}</h6>
                </div>
                <div className="">
                  <h6>Weight</h6>
                  <h6>{patientHistory[0]?.patientInfo[0]?.weigth}</h6>
                </div>
                <div className="">
                  <h6>Blood Type</h6>
                  <h6>{patientHistory[0]?.extr_field}</h6>
                </div>
              </div>
            </div>
            <div className="col-7 d-flex right row">
              <div className="col-6">
                <div className="">
                  <h6>Phone Number</h6>
                  <h6>{patientHistory[0]?.patientInfo[0]?.phoneNumber}</h6>
                </div>
                <div className="mt-5">
                  <h6>OP ID</h6>
                  <h6>{patientHistory[0]?.OPID}</h6>
                </div>
              </div>
              <div className="col-6">
                <div className="">
                  <h6>Email Address</h6>
                  <h6>{patientHistory[0]?.patientInfo[0]?.emailAddress}</h6>
                </div>
                <div className="mt-5">
                  <h6>Medical Condition</h6>
                  <h6>
                    {
                      patientHistory[patientHistory?.length - 1]?.basicData
                        ?.medical_condition
                    }
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="lower-div row">
            <div className="col-6 left">
              {patientHistory?.length !== 0 ? (
                <div className="row" style={{ height: "100%" }}>
                  <div className="col-10">
                    {patientHistory[patientHistory?.length - 1]?.basicData
                      ?.Update && (
                      <h6>
                        {moment(
                          patientHistory[patientHistory?.length - 1]?.basicData
                            ?.Update
                        ).format("DD/MM/YYYY")}
                      </h6>
                    )}
                    <h6>{`${
                      patientHistory[patientHistory?.length - 1]?.basicData
                        ?.medical_condition !== null &&
                      `Medical Condition: ${
                        patientHistory[patientHistory?.length - 1]?.basicData
                          ?.medical_condition
                          ? patientHistory[patientHistory?.length - 1]
                              ?.basicData?.medical_condition
                          : ""
                      }`
                    }`}</h6>
                    <p>
                      {patientHistory[patientHistory?.length - 1]?.basicData
                        ?.refnote !== "null"
                        ? patientHistory[patientHistory?.length - 1]?.basicData
                            ?.refnote
                        : ""}
                    </p>
                  </div>
                  <div className="col-2 edit-section">
                    {/* <button
                    className="d-block"
                    style={{ marginTop: "26px", marginBottom: "10px" }}
                    onClick={() =>
                      onViewHandler(patientHistory?.patientInfo[0]?.patient_id)
                    }
                  >
                    <i className="fas fa-expand"></i>
                  </button>
                  <button className="d-block">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button> */}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="col-6">
              <div className="d-flex">
                <button
                  className="lab-test-history mr-3"
                  disabled={labtestHistory?.length ? false : true}
                  onClick={() => setLabhistoryModal(true)}
                >
                  Lab Test History
                </button>
                <Calendar
                  value={
                    new Date(
                      patientHistory?.length !== 0 &&
                      patientHistory[patientHistory?.length - 1]?.basicData
                        ?.Update
                        ? patientHistory[patientHistory?.length - 1]?.basicData
                            ?.Update
                        : new Date()
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="lower-div down row">
            {prep?.map((val, i) => {
              return (
                <div key={i} className="col-6 left" style={{ height: "250px" }}>
                  <div className="row" style={{ height: "100%" }}>
                    <div className="col-10">
                      <h6>
                        {moment(val?.basicData?.Update).format("DD/MM/YYYY")}
                      </h6>
                      <h6>{`${
                        val?.basicData?.medical_condition !== null &&
                        `Medical Condition: ${val?.basicData?.medical_condition}`
                      }`}</h6>
                      <p>
                        {val?.basicData?.refnote === "null"
                          ? ""
                          : val?.basicData?.refnote}
                      </p>
                    </div>
                    <div className="col-2 edit-section">
                      {/* <button
                          className="d-block"
                          style={{ marginTop: "26px", marginBottom: "10px" }}
                          onClick={() =>
                            onViewHandler(patientHistory?.patientInfo[0]?.patient_id)
                          }
                        >
                          <i className="fas fa-expand"></i>
                        </button>
                        <button className="d-block">
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      <Modal
        show={labhistoryModal}
        onRequestClose={() => setLabhistoryModal(false)}
        dialogClassName="lab-result prescription-modal"
        // style={{
        //   marginTop:
        //     document?.querySelector(".lab-result.prescription-modal")
        //       ?.offsetHeight *
        //     (10 / 100),
        // }}
      >
        {/* content={ */}
        <LabTestHistory
          labTestHistory={labtestHistory}
          closeModal={setLabhistoryModal}
        />
        {/* } */}
      </Modal>
    </>
  );
};

export default PatientDetails;
