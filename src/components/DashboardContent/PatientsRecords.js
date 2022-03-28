import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profile } from "../commons/BlankProfile/Profile";
import { getPatientHistory } from "../../redux/actions/AddPatientComponentAction";
import moment from "moment";
import {
  getPatients,
  getPatientSearch,
} from "../../redux/actions/DashboardComponentActions";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";

const PatientsRecords = (props) => {
  let i = 0;
  const dispatch = useDispatch();
  const patientsRecord = useSelector(
    (state) => state.DashboardReducer.patientRecord
  );
  const history = useHistory();
  const [offset, setOffset] = useState(1);
  const [data, setData] = useState([]);
  const [perPage] = useState(7);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };
  useEffect(() => {
    if (Array.isArray(patientsRecord)) {
      if (patientsRecord?.length > 7) {
        getData();
      } else setData(patientsRecord);
    }
  }, [offset, patientsRecord]);

  const getData = () => {
    const slice = patientsRecord?.slice(offset * perPage - 7, offset * perPage);
    setData(slice);
    setPageCount(Math.ceil(patientsRecord?.length / perPage));
  };
  const onPatientHandler = (id, val) => {
    props.setPatientDetails(val);
    if (localStorage.getItem("token")) {
      dispatch(
        getPatientHistory(id, (res) => {
          if (res) {
            props.setPatient(true);
          }
        })
      );
    } else {
      localStorage.removeItem("token");
      history.push("/login");
    }
  };
  const searchHandler = (e) => {
    if (e.target.value) {
      if (localStorage.getItem("token")) {
        dispatch(
          getPatientSearch(
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
            () => {}
          )
        );
      } else {
        localStorage.removeItem("token");
        history.push("/login");
      }
    } else {
      if (localStorage.getItem("token")) {
        dispatch(getPatients({}, () => {}));
      } else {
        localStorage.removeItem("token");
        history.push("/login");
      }
    }
  };
  return (
    <div className="patients-records">
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <div className="d-flex">
          <h4 className="mr-3"> Patient Record</h4>
          <div className="nav-search d-flex border-hightlight-search-div">
            <i className="fa fa-search"></i>
            <input
              type="search"
              placeholder="Search..."
              className="border-hightlight-search"
              onChange={(e) => searchHandler(e)}
            />
          </div>
        </div>
        <div>
          {/* <span className="glyphicon glyphicon-option-vertical"></span> */}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>OP ID</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((val, j) => {
            if (i === 3) {
              i = 0;
            }
            i++;
            return (
              <tr
                key={j}
                className="mt-3"
                onClick={() => onPatientHandler(val.patient_id, val)}
                style={{ cursor: "pointer" }}
              >
                <th className="d-flex patient-table-th">
                  {/* <div className="img">
                    <img src={val?.img ? val.img : profile} alt="" />
                  </div> */}
                  <h6 className="ml-3 name">
                    {val?.firstName} {val?.lastName}
                  </h6>
                </th>
                <th className="patient-table-th">
                  <h6>{moment(val?.Update).format("DD/MM/YYYY")}</h6>
                </th>
                <th className="patient-table-th">
                  <button
                    style={{
                      background:
                        i === 1 ? "#e38d8d" : i === 2 ? "#4a91de" : "#48bd63",
                    }}
                  >
                    {val?.OPID_filed}
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      {patientsRecord?.length > 7 ? (
        <div className="d-block text-center">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PatientsRecords;
