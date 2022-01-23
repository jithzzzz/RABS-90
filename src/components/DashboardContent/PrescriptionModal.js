import React, { useState, useEffect } from "react";
import MultiSelect from "../commons/MultiSelect/MultSelect";
import CssBaseline from "@material-ui/core/CssBaseline";
import EnhancedTable from "../commons/Table/EnhancedTable";
import { prescription } from "./MakeData";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import UseFormSelect from "../commons/UseSelect/UseSelect";
import { useForm } from "react-hook-form";
import { getMedicineDetails } from "../../redux/actions/MedicineComponentAction";
import { toast } from "react-toastify";
import { preMed } from "../../redux/actions/prescriptionComponentAction";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import Multiselect from "multiselect-react-dropdown";
import { getDiagonosticsDetails } from "../../redux/actions/DiagonosticsComponentAction";
import ReactSelect from "../commons/ReactSelect/ReactSelect";
import { addPrescription } from "../../redux/actions/prescriptionComponentAction";
import moment from "moment";
import { getPatientHistory } from "../../redux/actions/AddPatientComponentAction";
import { useHistory } from "react-router-dom";

const PrescriptionModal = (props) => {
  const [selectDiagnosisOption, setselectDiagnosisOption] = useState([]);
  const [diagnosisOption, setDiagnosisOption] = useState([]);
  const [referenceList, setReferenceList] = useState([]);
  const [selectMedOption, setselectMedOption] = useState([]);
  const [selectedMedOption, setselectedMedOption] = useState([]);
  const [beforeOrAfter, setBeforeOrAfter] = useState("");
  const [remark, setRemark] = useState("");
  const [medicineErr, setMedicineErr] = useState(false);
  const [mnnErr, setmnnErr] = useState(false);
  const [medicineBAErr, setMedicineBAErr] = useState(false);
  const [prescriptionref, setprescriptionref] = useState("");
  const [medicalcondition, setMedicalcondition] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [labtestnote, setlabtestnote] = useState("");
  const [selectedLabTest, setSelectedLabTest] = useState([]);
  const [labTestOptn, setLabTestOptn] = useState([
    "Blood sugar",
    "Urine analysis",
    "Blood chemistry",
    "Haematology",
    "Cholesterol",
    "Liver panel",
  ]);
  const [medicine, setMedicine] = useState({
    medicin: "",
    mnn: "",
    time: "",
    days: 0,
    ba: "",
    remarks: "",
  });
  const [labtest, setLabtest] = useState({
    labtest: "",
    // category: "",
    result: "",
    date: new Date(),
  });
  const [selectLabtestOption, setselectLabtestOption] = useState([]);
  const dispatch = useDispatch();
  const medicineDetails = useSelector(
    (state) => state.MedicineReducer.medicineDetails
  );
  const diagonosticsDetails = useSelector(
    (state) => state.DiagonosticsReducer.diagonosticsDetails
  );
  const reference = useSelector((state) => state.DashboardReducer.reference);
  const history = useHistory();
  useEffect(() => {
    if (diagonosticsDetails?.length !== 0) {
      const optn = diagonosticsDetails?.map((val) => {
        return val.DName;
      });
      setDiagnosisOption(optn);
    }
  }, [diagonosticsDetails]);
  const preMeds = useSelector((state) => state.PrescriptionReducer.preMed);
  const patientInfo = useSelector(
    (state) => state.PatientReducer.patientHistory
  );
  const [data, setData] = React.useState(prescription);
  const defaultValues = {
    activitiesbefore: "",
  };
  const {
    register,
    handleSubmit,
    control,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getMedicineDetails());
      dispatch(getDiagonosticsDetails());
    } else {
      localStorage.removeItem("token");
      history.push("/login");
    }
  }, []);
  useEffect(() => {
    if (medicineDetails?.length !== 0) {
      let list = medicineDetails?.map((val) => {
        return { id: val.MId, name: val.MName, label: val.MName };
      });
      setselectMedOption(list);
    }
  }, [medicineDetails]);
  useEffect(() => {
    if (reference?.length !== 0) {
      let list = reference?.map((val) => {
        return {
          id: val.RFId,
          name: val.Name,
          label: `${val.Name}, ${val.Department && val.Department}`,
        };
      });
      setReferenceList(list);
    }
  }, [reference]);
  const onAddLabTest = () => {
    if (labtest.labtest !== "" && labtest.result !== "") {
      let lab = labtest;
      lab.id = uuidv4();
      if (!lab.date) {
        lab.date = "null";
      }

      const labData = selectedLabTest;
      labData.push(lab);
      setSelectedLabTest(labData);
      // reset(defaultValues);
      setLabtest({
        labtest: "",
        // category: "",
        result: "",
        date: new Date(),
      });

      //dispatch(preMed(Meddata));
    } else {
      toast("Add lab test details first");
    }
  };
  const onAdd = (data, e) => {
    if (!medicine.medicin.trim()) {
      setMedicineErr(true);
    } else setMedicineErr(false);
    if (!beforeOrAfter.trim()) {
      setMedicineBAErr(true);
    } else setMedicineBAErr(false);
    if (!data.mnn.trim()) {
      setmnnErr(true);
    } else setmnnErr(false);
    if (medicine.medicin !== "" && data.mnn !== "" && beforeOrAfter !== "") {
      let med = medicine;
      med.id = uuidv4();
      med.ba = beforeOrAfter;
      med.mnn = data.mnn;
      med.time = data.time;
      const Meddata = selectedMedOption;
      Meddata.push(med);
      setselectedMedOption(Meddata);
      e.target.reset();
      reset(defaultValues);
      setMedicine({
        medicin: "",
        mnn: "",
        time: "",
        days: 0,
        ba: "",
        remarks: "",
      });

      setBeforeOrAfter("");
      //dispatch(preMed(Meddata));
    } else {
      toast("Add medicine details first");
    }

    // dispatch(
    //   getAddDiagonostics(data, (res) => {
    //     if (res) {
    //       dispatch(
    //         getDiagonosticsDetails((res) => {
    //           if (res) {
    //           }
    //         })
    //       );
    //       props.closeModal(false);
    //       toast("Added diagonostics successfully");
    //     } else {
    //       toast("Adding diagonostics failed");
    //     }
    //   })
    // );
  };
  const Save = () => {
    if (
      selectedMedOption?.length !== 0 ||
      selectDiagnosisOption?.length !== 0 ||
      selectedLabTest?.length !== 0
    ) {
      let ltest = selectLabtestOption?.map((val) => {
        return {
          labtest: val,
        };
      });
      let digt = selectDiagnosisOption?.map((val) => {
        return {
          did: val,
        };
      });
      let meddata = selectedMedOption?.map((val) => {
        return {
          medicin: val.medicin ? val.medicin : "--",
          time: val.time ? val.time : "--",
          days: val.days ? val.days : 0,
          remarks: `${val.mnn ? val.mnn : `--`}@${val.ba ? val.ba : `--`}`,
        };
      });
      let labdata = selectedLabTest?.map((val) => {
        return {
          labtest: val.labtest ? val.labtest : "--",
          result: val.result ? val.result : "--",
          date: val.date
            ? moment(val.date).format("YYYY-MM-DD")
            : moment(new Date()).format("YYYY-MM-DD"),
        };
      });
      let payload = {
        patient_id: patientInfo[0]?.patientInfo[0]?.patient_id,
        medical_condition: medicalcondition ? medicalcondition : "--",
        RFId: prescriptionref ? prescriptionref : "--",
        refnote: remark ? remark : "--",
        diagnosis: diagnosis ? diagnosis : "--",
        PRP: meddata,
        PRLAB: ltest,
        PRLABTest: labdata,
        PRDIG: digt, //ltest: labtest digt:diag
      };
      if (localStorage.getItem("token")) {
        dispatch(
          addPrescription(payload, (res, id) => {
            if (res) {
              dispatch(
                getPatientHistory(patientInfo[0]?.patientInfo[0]?.patient_id)
              );

              let print = document.createElement("a");
              print.href = `https://ppd.pythonanywhere.com/pdf_view_new/${id}`;
              print.target = "_blank";
              print.click();
              toast("Added prescription successfully");
            } else {
              toast("Adding prescription failed");
            }
          })
        );
      } else {
        localStorage.removeItem("token");
        history.push("/login");
      }

      // props.closeModal(false);
    } else {
      toast("Add prescription First");
    }
  };
  const onMedDel = (id) => {
    let medoptn = selectedMedOption?.filter((val) => {
      return val.id !== id;
    });
    setselectedMedOption(medoptn);
  };
  const onLabDel = (id) => {
    let laboptn = selectedLabTest?.filter((val) => {
      return val.id !== id;
    });
    setSelectedLabTest(laboptn);
  };
  return (
    <>
      <div className="prnav pl-4 pr-4" style={{ fontSize: "14px" }}>
        <div className="d-block" style={{ fontSize: "25px", textAlign: "end" }}>
          <i
            className="fa fa-times-circle"
            style={{ cursor: "pointer" }}
            onClick={() => props.closeModal(false)}
          ></i>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <label style={{ flex: "1" }}>
              Name :{" "}
              {`${patientInfo[0]?.patientInfo[0]?.firstName} ${patientInfo[0]?.patientInfo[0]?.lastName}`}
            </label>
            <br />
            <label style={{ flex: "1" }}>
              Phone : {patientInfo[0]?.patientInfo[0]?.phoneNumber}
            </label>{" "}
            <br />
            <label style={{ flex: "1" }}>OpID : {patientInfo[0]?.OPID}</label>
            <br />
            <label style={{ flex: "1" }}>
              Age :{" "}
              {moment().diff(
                patientInfo[0]?.patientInfo[0]?.dob,
                "years",
                false
              )}{" "}
            </label>
          </div>
          <div className="docd">
            <b>Dr. S Suresh Kumar</b>
            <h4>
              Email:sureshpallium@gmail.com <br />
              Contact : +91 9446469351
            </h4>
          </div>
        </div>
      </div>
      <br />

      <div className="pl-4 pr-4" style={{ fontSize: "14px" }}>
        <div className="d-block mb-4" style={{ textAlign: "end" }}>
          <span className="btn btn-success" id="pr" onClick={Save}>
            {`Add & Print`}
          </span>
        </div>
        <div className="row">
          <div className="col-6 d-flex pr-0 align-items-center">
            <label style={{ flex: "1" }}>Existing Diagnosis : </label>
            <div style={{ flex: "4" }}>
              {/* <MultiSelect
                  options={DiagnosisOption}
                  setState={setselectDiagnosisOption}
                /> */}
              <Multiselect
                displayValue="DName"
                onRemove={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={(e, b) => {
                  setselectDiagnosisOption(e.map((val) => val.DId));
                }}
                options={diagonosticsDetails}
              />
            </div>
          </div>
          <div className="col-6 d-flex align-items-center pr-0">
            <label style={{ flex: "1" }}>Provisional Diagnosis :</label>
            <input
              className="text-field"
              type="text"
              placeholder="Enter Provision Diagnosis"
              style={{ marginRight: "15px" }}
              onChange={(e) => {
                setDiagnosis(e.target.value);
              }}
            />
            {/* <div className="d-flex" style={{ height: "16px" }}>
                {errors.days && (
                  <span className="valid-alert-span mt-1">*Enter Diagnosis</span>
                )}
              </div> */}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-6 d-flex align-items-center pr-0">
            <label style={{ flex: "1" }}> Reference : </label>
            <div style={{ flex: "4" }}>
              <ReactSelect
                set={setprescriptionref}
                placeholder="Select Reference"
                data={referenceList}
              />
            </div>
          </div>
          <div className="col-6 pr-0 d-flex align-items-center">
            <label style={{ flex: "1" }}>Suggested Lab Test : </label>
            <div style={{ flex: "4", marginRight: "15px" }}>
              {/* <MultiSelect
                  options={LabtestOption}
                  setState={setselectLabtestOption}
                /> */}
              <Multiselect
                isObject={false}
                onRemove={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={(e, b) => {
                  setselectLabtestOption(e.map((val) => val));
                }}
                options={labTestOptn}
              />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 d-flex align-items-center pr-0">
            <label style={{ flex: "0.5" }}> Medical Condition : </label>
            <textarea
              className="text-field ml-3"
              style={{ marginRight: "15px", flex: "5" }}
              placeholder="Enter Medical Condition"
              onChange={(e) => {
                setMedicalcondition(e.target.value);
              }}
            />
          </div>
        </div>
        {/* <form onSubmit={handleSubmit(onAddLabTest)}> */}
        <br />
        <label>Lab test Details: </label>
        <br />
        <div className="row mt-4">
          <div className="col-6 pr-0 d-flex align-items-center">
            <label style={{ flex: "1" }}>Lab Test : </label>
            <input
              className="text-field"
              type="text"
              placeholder="Enter Lab Test"
              value={labtest.labtest}
              // {...register("labtest", {
              //   required: true,
              // })}
              onChange={(e) => {
                setLabtest({ ...labtest, labtest: e.target.value });
              }}
            />
            {/* <div className="d-block" style={{ height: "16px" }}>
                {errors.labtest && (
                  <span className="valid-alert-span mt-1">*Enter Lab test</span>
                )}
              </div> */}
            {/* <div style={{ flex: "4" }}>
              {/* <MultiSelect
                  options={LabtestOption}
                  setState={setselectLabtestOption}
                /> */}
            {/* <Multiselect
                isObject={false}
                onRemove={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
                onSelect={(e, b) => {
                  setselectLabtestOption(e.map((val) => val));
                }}
                options={labTestOptn}
              />
            </div>  */}
          </div>
          <div className="col-6 d-flex align-items-center pr-0">
            <label style={{ flex: "1" }}>Lab Test Result :</label>
            <input
              className="text-field"
              type="text"
              style={{ marginRight: "15px" }}
              placeholder="Enter Lab Test Result"
              // {...register("labtestresult", {
              //   required: true,
              // })}
              value={labtest.result}
              onChange={(e) => {
                setLabtest({ ...labtest, result: e.target.value });
              }}
            />
            {/* <div className="d-block" style={{ height: "16px" }}>
                {errors.labtestresult && (
                  <span className="valid-alert-span mt-1">
                    *Enter Lab test result
                  </span>
                )}
              </div> */}
          </div>
          {/* <div className="col-6 d-flex align-items-center pr-0">
            <label style={{ flex: "1" }}>Lab Test Category :</label>
            <input
              className="text-field"
              type="text"
              placeholder="Enter Lab Test Category"
              style={{ marginRight: "15px" }}
              // {...register("labtestresult", {
              //   required: true,
              // })}
              value={labtest.category}
              onChange={(e) => {
                setLabtest({ ...labtest, category: e.target.value });
              }}
            />
            {/* <div className="d-block" style={{ height: "16px" }}>
                {errors.labtestresult && (
                  <span className="valid-alert-span mt-1">
                    *Enter Lab test result
                  </span>
                )}
              </div> */}
          {/* </div> */}
        </div>
        <div className="row mt-4">
          <div className="col-6 d-flex align-items-center pr-0">
            <label style={{ flex: "1" }}> Test Date : </label>
            <DatePicker
              selected={labtest.date}
              onChange={(date) => setLabtest({ ...labtest, date: date })}
            />
          </div>
        </div>
        <div className="d-block mb-4 mt-4" style={{ textAlign: "end" }}>
          <button onClick={onAddLabTest} className="btn btn-success" id="pr">
            {`Add Lab Test`}
          </button>
        </div>
        <table className="pre-med">
          <thead>
            <tr>
              <th>LAB TEST</th>
              {/* <th>CATEGORY</th> */}
              <th>RESULT</th>
              <th>DATE</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {selectedLabTest?.map((val, i) => {
              return (
                <tr key={i}>
                  <th>{val.labtest !== "" && val.labtest}</th>
                  {/* <th>{val.labtest !== "" && val.category}</th> */}
                  <th>{val.result !== "" && val.result}</th>
                  <th>
                    {val.date !== "null"
                      ? moment(val.date).format("DD/MM/YYYY")
                      : ""}
                  </th>
                  <th className="pointer">
                    <span
                      className="pre-med-delete"
                      onClick={() => onLabDel(val.id)}
                    >
                      Delete
                    </span>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* </form> */}
        <br />
        <form onSubmit={handleSubmit(onAdd)}>
          <label>Medicine Details: </label>
          <br />
          <br />
          <div className="d-flex row">
            <div
              className="col-6 d-flex align-items-center pr-0"
              style={{ flexDirection: "column" }}
            >
              <div className="d-flex" style={{ width: "100%" }}>
                <label style={{ flex: "1" }}>Medicine : </label>
                <div style={{ flex: "4" }}>
                  <UseFormSelect
                    name="medicin"
                    setMedicine={setMedicine}
                    medicine={medicine}
                    setErr={setMedicineErr}
                    placeholder="Select Medicine"
                    control={control}
                    data={selectMedOption}
                  />
                </div>
              </div>
              <div className="d-flex" style={{ height: "16px" }}>
                {medicineErr && (
                  <span className="valid-alert-span mt-1">
                    *Select Medicine
                  </span>
                )}
              </div>
            </div>
            <div
              className="col-6 d-flex align-items-center pr-0"
              style={{ flexDirection: "column" }}
            >
              <div className="d-flex" style={{ width: "100%" }}>
                <label style={{ flex: "1" }}> M-N-N: </label>
                <input
                  className="text-field"
                  type="text"
                  name="mnn"
                  placeholder="Enter Medicine Time Period"
                  style={{ marginRight: "15px" }}
                  {...register("mnn", {
                    required: false,
                  })}
                  onChange={(e) => {
                    setmnnErr(false);
                    setMedicine({ ...medicine, mnn: e.target.value });
                  }}
                />
              </div>
              <div className="d-block" style={{ height: "16px" }}>
                {mnnErr && (
                  <span className="valid-alert-span mt-1">
                    *Enter Medicine Time Period
                  </span>
                )}
              </div>
              {/* <div style={{ flex: "4", marginRight: "15px" }}>
                <UseFormSelect
                  name="mnn"
                  setMedicine={setMedicine}
                  medicine={medicine}
                  placeholder="Select Period"
                  control={control}
                  data={mnn}
                />
              </div> */}
            </div>
          </div>
          <div className="d-flex mt-4 mb-4">
            <div
              className="col-6 d-flex align-items-center pl-0 pr-0"
              style={{ flexDirection: "column" }}
            >
              <div className="d-flex" style={{ width: "100%" }}>
                <label style={{ flex: "1" }}> Time: </label>
                <input
                  className="text-field"
                  type="text"
                  placeholder="Enter time"
                  {...register("time", {
                    required: false,
                  })}
                  onChange={(e) => {
                    setMedicine({ ...medicine, time: e.target.value });
                  }}
                />
              </div>
              <div className="d-flex" style={{ height: "16px" }}>
                {errors.time && (
                  <span className="valid-alert-span mt-1">
                    *Enter valid time
                  </span>
                )}
              </div>
            </div>
            <div
              className="col-6 d-flex align-items-center pr-0"
              style={{ flexDirection: "column" }}
            >
              <div className="d-flex" style={{ width: "100%" }}>
                <label style={{ flex: "1" }}>X-Days:</label>
                <input
                  className="text-field"
                  type="number"
                  placeholder="Enter Days"
                  {...register("days", {
                    required: false,
                    minLength: 1,
                    maxLength: 10,
                  })}
                  onChange={(e) => {
                    clearErrors("days");
                    setMedicine({
                      ...medicine,
                      days: Number(e.target.value),
                    });
                  }}
                />
              </div>
              <div className="d-flex" style={{ height: "16px" }}>
                {errors.days && (
                  <span className="valid-alert-span mt-1">
                    *Enter valid X-Days
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="col-6 pr-0 pl-0">
              <label className="mr-2"> Before Food: </label>
              <input
                type="checkbox"
                id="ti"
                name="before"
                checked={beforeOrAfter === "Before Food"}
                value="Before Food"
                {...register("ba", {
                  required: false,
                })}
                onChange={(e) => {
                  setMedicineBAErr(false);
                  setBeforeOrAfter(e.target.value);
                }}
              />
              &nbsp;&nbsp; &nbsp;&nbsp;
              <label className="mr-2"> After Food: </label>
              <input
                type="checkbox"
                id="ti"
                checked={beforeOrAfter === "After Food"}
                name="after"
                {...register("ba", {
                  required: false,
                })}
                onChange={(e) => {
                  setMedicineBAErr(false);
                  setBeforeOrAfter(e.target.value);
                }}
                value="After Food"
              />
              <div className="d-flex" style={{ height: "16px" }}>
                {medicineBAErr && (
                  <span className="valid-alert-span mt-1">
                    *After food or Before food
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="d-block mb-4 mt-4" style={{ textAlign: "end" }}>
            <button type="submit" className="btn btn-success" id="pr">
              {`Add Medicine`}
            </button>
          </div>
          <table className="pre-med">
            <thead>
              <tr>
                <th>MEDICINE</th>
                <th>M-N-N</th>
                <th>TIME</th>
                <th>X-DAYS</th>
                <th>BEFORE/AFTER</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {selectedMedOption?.map((val, i) => {
                return (
                  <tr key={i}>
                    <th>{val.medicin !== "" && val.name}</th>
                    <th>{val.mnn !== "" && val.mnn}</th>
                    <th>{val.time !== "" && val.time}</th>
                    <th>{val.days !== 0 && val.days}</th>
                    <th>{val.ba !== "" && val.ba}</th>
                    <th className="pointer">
                      <span
                        className="pre-med-delete"
                        onClick={() => onMedDel(val.id)}
                      >
                        Delete
                      </span>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
        <label style={{ flex: "1" }}> Remarks : </label>&nbsp;&nbsp;
        <br />
        <br />
        <textarea
          style={{ width: "100%", marginBottom: "15px" }}
          rows="4"
          onChange={(e) => setRemark(e.target.value)}
        ></textarea>
      </div>
    </>
  );
};

export default PrescriptionModal;

const mnn = [
  { id: 1, name: "1-0-0", label: "1-0-0" },
  { id: 2, name: "0-1-0", label: "0-1-0" },
  { id: 3, name: "0-0-1", label: "0-0-1" },
  { id: 4, name: "1-1-0", label: "1-1-0" },
  { id: 5, name: "1-0-1", label: "1-0-1" },
  { id: 6, name: "0-1-1", label: "0-1-1" },
  { id: 7, name: "1-1-1", label: "1-1-1" },
];
