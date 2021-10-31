import React, { useState, useEffect } from "react";
import MultiSelect from "../commons/MultiSelect/MultSelect";
import CssBaseline from "@material-ui/core/CssBaseline";
import EnhancedTable from "../commons/Table/EnhancedTable";
import { prescription } from "./MakeData";
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

const PrescriptionModal = (props) => {
  const [selectDiagnosisOption, setselectDiagnosisOption] = useState([]);
  const [diagnosisOption, setDiagnosisOption] = useState([]);
  const [referenceList, setReferenceList] = useState([]);
  const [selectMedOption, setselectMedOption] = useState([]);
  const [selectedMedOption, setselectedMedOption] = useState([]);
  const [beforeOrAfter, setBeforeOrAfter] = useState("");
  const [remark, setRemark] = useState("");
  const [prescriptionref, setprescriptionref] = useState("");
  const [medicalcondition, setMedicalcondition] = useState("");
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
  const [selectLabtestOption, setselectLabtestOption] = useState([]);
  const dispatch = useDispatch();
  const medicineDetails = useSelector(
    (state) => state.MedicineReducer.medicineDetails
  );
  const diagonosticsDetails = useSelector(
    (state) => state.DiagonosticsReducer.diagonosticsDetails
  );
  const reference = useSelector((state) => state.DashboardReducer.reference);
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
    dispatch(getMedicineDetails());
    dispatch(getDiagonosticsDetails());
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
  const onAdd = (data) => {
    console.log(medicine);
    if (
      medicine.medicin !== "" &&
      medicine.mnn !== "" &&
      beforeOrAfter !== ""
    ) {
      let med = medicine;
      med.id = uuidv4();
      med.ba = beforeOrAfter;
      const Meddata = selectedMedOption;
      Meddata.push(med);
      setselectedMedOption(Meddata);
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
      selectLabtestOption?.length !== 0
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

      let payload = {
        patient_id: patientInfo?.patientInfo[0]?.patient_id,
        medical_condition: medicalcondition ? medicalcondition : "--",
        RFId: prescriptionref ? prescriptionref : "--",
        refnote: remark ? remark : "--",
        PRP: meddata,
        PRLAB: ltest,
        PRDIG: digt, //ltest: labtest digt:diag
      };

      dispatch(
        addPrescription(payload, (res, id) => {
          if (res) {
            dispatch(
              getPatientHistory(patientInfo?.patientInfo[0]?.patient_id)
            );
            let print = document.createElement("a");
            print.href = `https://ppd.pythonanywhere.com/pdf_view/${id}`;
            print.target = "_blank";
            print.click();
            toast("Added prescription successfully");
          } else {
            toast("Adding prescription failed");
          }
        })
      );
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
              {`${patientInfo?.patientInfo[0]?.firstName} ${patientInfo?.patientInfo[0]?.lastName}`}
            </label>
            <br />
            <label style={{ flex: "1" }}>
              Phone : {patientInfo?.patientInfo[0]?.phoneNumber}
            </label>{" "}
            <br />
            <label style={{ flex: "1" }}>OpID : {patientInfo?.OPID}</label>
            <br />
            <label style={{ flex: "1" }}>
              Age :{" "}
              {moment().diff(patientInfo?.patientInfo[0]?.dob, "years", false)}{" "}
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
            <label style={{ flex: "1" }}>Diagnosis : </label>
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
          <div className="col-6 pr-0 d-flex align-items-center">
            <label style={{ flex: "1" }}>Lab Test : </label>
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
          <div className="col-6 d-flex align-items-center pr-0">
            <label style={{ flex: "1" }}> Medical Condition : </label>
            <input
              className="text-field"
              type="text"
              placeholder="Enter Medical Condition"
              onChange={(e) => {
                setMedicalcondition(e.target.value);
              }}
            />
          </div>
          <div className="col-6 d-flex align-items-center pr-0">
            <label style={{ flex: "1" }}> Reference : </label>
            <div style={{ flex: "4", marginRight: "15px" }}>
              <ReactSelect
                set={setprescriptionref}
                placeholder="Select Reference"
                data={referenceList}
              />
            </div>
          </div>
        </div>
        <br />
        <form onSubmit={handleSubmit(onAdd)}>
          <label>Medicine Details: </label>
          <br />
          <br />
          <div className="d-flex row">
            <div className="col-6 d-flex align-items-center pr-0">
              <label style={{ flex: "1" }}>Medicine : </label>
              <div style={{ flex: "4" }}>
                <UseFormSelect
                  name="medicin"
                  setMedicine={setMedicine}
                  medicine={medicine}
                  placeholder="Select Medicine"
                  control={control}
                  data={selectMedOption}
                />
              </div>
            </div>
            <div className="col-6 d-flex align-items-center pr-0">
              <label style={{ flex: "1" }}> M-N-N: </label>
              <div style={{ flex: "4", marginRight: "15px" }}>
                <UseFormSelect
                  name="mnn"
                  setMedicine={setMedicine}
                  medicine={medicine}
                  placeholder="Select Period"
                  control={control}
                  data={mnn}
                />
              </div>
            </div>
          </div>
          <div className="d-flex mt-4 mb-4">
            <div className="col-6 d-flex align-items-center pl-0 pr-0">
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
              <div className="d-flex" style={{ height: "16px" }}>
                {errors.time && (
                  <span className="valid-alert-span">*Enter valid time</span>
                )}
              </div>
            </div>
            <div className="col-6 d-flex align-items-center pr-0">
              <label style={{ flex: "1" }}>X-Days</label>
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
                  setMedicine({ ...medicine, days: Number(e.target.value) });
                }}
              />
              <div className="d-flex" style={{ height: "16px" }}>
                {errors.days && (
                  <span className="valid-alert-span">*Enter valid X-Days</span>
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
                onChange={(e) => setBeforeOrAfter(e.target.value)}
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
                onChange={(e) => setBeforeOrAfter(e.target.value)}
                value="After Food"
              />
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
