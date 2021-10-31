import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import moment from "moment";
import UseFormSelect from "../commons/UseSelect/UseSelect";
import { getAddPatient } from "../../redux/actions/AddPatientComponentAction";
import { getPatients } from "../../redux/actions/DashboardComponentActions";
import { toast } from "react-toastify";
import ReactSelect from "../commons/ReactSelect/ReactSelect";

const AddNewPatient = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [age, setAge] = useState(null);
  const [blood, setBlood] = useState(null);
  const [bloodoptn, setBloodOptn] = useState([]);
  const [ageError, setAgeError] = useState(false);
  const [bloodError, setBloodError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const bloodType = useSelector((state) => state.LoginReducer.bloodType);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setAge(
      moment().diff(startDate, "years", false) !== 0
        ? moment().diff(startDate, "years", false)
        : null
    );
    if (startDate !== new Date()) {
      setAgeError(false);
    }
  }, [startDate]);
  useEffect(() => {
    const bloodList = bloodType?.map((val) => {
      return { id: val.BloodTypeId, name: val.bloodType, label: val.bloodType };
    });
    setBloodOptn(bloodList);
  }, [bloodType]);
  const onMaleHandler = () => {
    setMale(true);
    setFemale(false);
    setGenderError(false);
  };
  const onFemaleHandler = () => {
    setMale(false);
    setFemale(true);
    setGenderError(false);
  };
  const onSubmit = (data) => {
    if (age && blood && (male || female)) {
      var date = new Date(startDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      data.dob = [date.getFullYear(), mnth, day].join("-");
      if (!data.heigth) {
        data.heigth = "null";
      }
      if (!data.weigth) {
        data.weigth = "null";
      }
      if (!data.phoneNumber) {
        data.phoneNumber = "null";
      }
      if (!data.emailAddress) {
        data.emailAddress = "null";
      }
      if (male) {
        data.gender = "male";
      } else data.gender = "female";
      data.bloodType = blood;
      dispatch(
        getAddPatient(data, (res) => {
          if (res) {
            dispatch(getPatients({}, () => {}));
            props.closeModal(false);
            toast("Added patient successfully");
          } else {
            toast("Adding patient failed");
          }
        })
      );
    }
  };
  const onSub = () => {
    if (!age) {
      setAgeError(true);
    }
    if (!blood) {
      setBloodError(true);
    }
    if (!male && !female) {
      setGenderError(true);
    }
  };
  const onChangeBlood = (e) => {
    setBlood(e.target.options[e.target.selectedIndex].id);
    setBloodError(false);
  };
  return (
    <div className="add-patient">
      <div className="banner d-flex justify-content-between">
        <h4>ADD NEW PATIENT DETAILS</h4>
        <i
          className="fa fa-times-circle"
          style={{ cursor: "pointer" }}
          onClick={() => props.closeModal(false)}
        ></i>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 mb-4" style={{ padding: "0px 31px" }}>
          <div className="d-flex name-div row">
            <div className="col-6">
              <p>First Name</p>
              <input
                type="text"
                {...register("firstName", {
                  required: true,
                  minLength: 1,
                  maxLength: 64,
                })}
                onChange={() => clearErrors("firstName")}
              />
              <div className="d-flex" style={{ height: "16px" }}>
                {errors.firstName && (
                  <span className="valid-alert-span">*Enter first name</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <p>Last Name</p>
              <input
                type="text"
                {...register("lastName", {
                  required: true,
                  minLength: 1,
                  maxLength: 64,
                })}
                onChange={() => clearErrors("lastName")}
              />
              <div className="d-flex" style={{ height: "16px" }}>
                {errors.lastName && (
                  <span className="valid-alert-span ml-1">
                    *Enter last name
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex mt-4 row">
            <div className="dob col-5 m-0">
              <p>Patient DOB</p>
              <Calendar onChange={setStartDate} value={startDate} />
              {ageError && (
                <span className="valid-alert-span ml-1">*Select DOB</span>
              )}
            </div>
            <div className="col-7">
              <div className="row mb-3 d-flex" style={{ height: "100%" }}>
                <div className="col-6  position-relative">
                  <p>Patient Gender</p>
                  <div className="d-flex justify-content-between">
                    <div
                      className="gender pointer"
                      onClick={onMaleHandler}
                      style={{
                        background: male ? "#72c4a7" : "#fff",
                        color: male ? "#fff" : "#72c4a7",
                      }}
                    >
                      <i className="fa fa-male"></i>
                      <p className="m-0">Male</p>
                    </div>
                    <div
                      className="gender pointer"
                      onClick={onFemaleHandler}
                      style={{
                        background: female ? "#72c4a7" : "#fff",
                        color: female ? "#fff" : "#72c4a7",
                      }}
                    >
                      <i className="fa fa-female"></i>
                      <p className="m-0">Female</p>
                    </div>
                  </div>

                  <span className="valid-alert-span ml-1">
                    {genderError && "*Select Gender"}
                  </span>

                  <div className="bgrp">
                    <p>Blood Group</p>
                    {/* <UseFormSelect
                      name="bloodType"
                      placeholder="Select Blood Group"
                      control={control}
                      data={blood}
                    /> 
                     {errors.bloodType && (
                      <span className="valid-alert-span">
                        *Select blood group
                      </span>
                    )} */}
                    {/* <select
                      onChange={(e) => onChangeBlood(e)}
                      placeholder="Select Blood Group"
                      name="bloodType"
                      //defaultValue={value}
                    >
                      <option value="default" disabled selected>
                        Select Blood Group
                      </option>
                      {bloodType?.map((val) => (
                        <option id={`${val.BloodTypeId}`}>
                          {val.bloodType}
                        </option>
                      ))}
                    </select> */}
                    <div className="">
                      <ReactSelect
                        set={setBlood}
                        subSet={setBloodError}
                        height={100}
                        placeholder="Select Blood Group"
                        data={bloodoptn}
                      />
                    </div>
                    <span className="valid-alert-span ml-1">
                      {bloodError ? "*Select blood group" : null}
                    </span>
                  </div>
                  <div className="add-patient-age">
                    <p>Age: {age}</p>
                  </div>

                  <button
                    className="d-block save-patient btn-success"
                    type="submit"
                    id="save"
                    onClick={onSub}
                  >
                    Save Patient Record
                  </button>
                </div>
                <div className="col-6 phw  mr-0 position-relative">
                  <div className="d-flex justify-content-between">
                    <div className="mr-1">
                      <p>Height(cm)</p>
                      <input
                        type="text"
                        {...register("heigth", {
                          required: false,
                          minLength: 1,
                          maxLength: 3,
                          pattern: { value: /[+-]?[0-9]+/ },
                        })}
                        onChange={() => clearErrors("heigth")}
                      />
                      <div className="d-flex" style={{ height: "16px" }}>
                        {errors.heigth && (
                          <span className="valid-alert-span ml-1">
                            *Enter valid height
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="ml-1">
                      <p>Weight(kg)</p>
                      <input
                        type="text"
                        {...register("weigth", {
                          required: false,
                          minLength: 1,
                          maxLength: 3,
                          pattern: { value: /[+-]?[0-9]+/ },
                        })}
                        onChange={() => clearErrors("weigth")}
                      />
                      <div className="d-flex" style={{ height: "16px" }}>
                        {errors.weigth && (
                          <span className="valid-alert-span ml-1">
                            *Enter valid weight
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <br />
                  <p>Phone Number</p>
                  <input
                    type="number"
                    {...register("phoneNumber", {
                      required: true,
                      length: 10,
                      pattern: { value: /^\d{10}$/ },
                    })}
                    onChange={() => clearErrors("phoneNumber")}
                  />
                  <div className="d-flex" style={{ height: "16px" }}>
                    {errors.phoneNumber && (
                      <span className="valid-alert-span ml-1">
                        *Enter valid phone number
                      </span>
                    )}
                  </div>
                  <div className="ema">
                    <p>Email Address</p>
                    <input
                      type="email"
                      {...register("emailAddress", {
                        required: false,

                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        },
                      })}
                      onChange={() => clearErrors("emailAddress")}
                    />
                    <div className="d-flex" style={{ height: "16px" }}>
                      {errors.emailAddress && (
                        <span className="valid-alert-span ml-1">
                          *Enter valid email address
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    id="close"
                    className="d-block close-patient btn-danger"
                    onClick={() => props.closeModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewPatient;
