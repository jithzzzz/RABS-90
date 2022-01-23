import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAddDiagonostics,
  getDiagonosticsDetails,
} from "../../redux/actions/DiagonosticsComponentAction";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ReactSelect from "../commons/ReactSelect/ReactSelect";
import { useHistory } from "react-router-dom";

const AddDiagnosticsModal = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [category, setCategory] = useState(null);
  const [categoryError, setCategoryError] = useState(false);
  const onSave = (data) => {
    if (category) {
      data.DCty = category;
    } else data.DCty = "null";
    if (!data.DAB) {
      data.DAB = "null";
    }
    if (!data.Desicription) {
      data.Desicription = "null";
    }
    if (localStorage.getItem("token")) {
      dispatch(
        getAddDiagonostics(data, (res) => {
          if (res) {
            dispatch(
              getDiagonosticsDetails((res) => {
                if (res) {
                }
              })
            );
            props.closeModal(false);
            toast("Added diagonostics successfully");
          } else {
            toast("Adding diagonostics failed");
          }
        })
      );
    } else {
      localStorage.removeItem("token");
      history.push("/login");
    }
  };
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
  } = useForm();
  const onChangeCategory = (e) => {
    setCategory(e.target.options[e.target.selectedIndex].value);
    setCategoryError(false);
  };
  const onSub = () => {
    if (!category) {
      setCategoryError(true);
    }
  };
  // const categoryOptn = ["Lungs", "Kidney"];
  const categoryOptn = [
    { id: "Gastro", name: "Gastro", label: "Gastro" },
    { id: "Respiratory", name: "Respiratory", label: "Respiratory" },
    { id: "CVS", name: "CVS", label: "CVS" },
    { id: "Lungs", name: "Lungs", label: "Lungs" },
    { id: "Heart", name: "Heart", label: "Heart" },
    { id: "Kidney", name: "Kidney", label: "Kidney" },
    { id: "Liver", name: "Liver", label: "Liver" },
    { id: "Eye", name: "Eye", label: "Eye" },
    { id: "ENT", name: "ENT", label: "ENT" },
  ];
  return (
    <div className="add-modal">
      <div className="d-block close">
        <i
          className="fa fa-times-circle"
          onClick={() => props.closeModal(false)}
        ></i>
      </div>
      <form onSubmit={handleSubmit(onSave)}>
        <label className=" mt-3">Diagnostics Name</label>
        <input
          className=" mt-3 d-block"
          type="text"
          {...register("DName", {
            required: true,
            minLength: 1,
            maxLength: 64,
          })}
          onChange={() => clearErrors("DName")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.DName && (
            <span className="valid-alert-span">*Enter diagnostics name</span>
          )}
        </div>
        {/* <label className=" mt-3">Diagnostics AB</label>
        <input
          className=" mt-3 d-block"
          type="text"
          {...register("DAB", {
            required: true,
            minLength: 1,
            maxLength: 64,
          })}
          onChange={() => clearErrors("DAB")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.DAB && (
            <span className="valid-alert-span">*Enter diagnostics AB</span>
          )}
        </div> */}
        <label className=" mt-3">Diagnostics Category</label>
        {/* <select
          className=" mt-3 d-block add-diagnostics-select"
          onChange={(e) => onChangeCategory(e)}
          placeholder="Select Category"
          name="DCty"
        >
          <option value="default" disabled selected>
            Select Category
          </option>
          {categoryOptn?.map((val) => (
            <option value={`${val}`}>{val}</option>
          ))}
        </select> */}
        <div className="mt-3 d-block">
          <ReactSelect
            set={setCategory}
            type="name"
            placeholder="Select Category"
            data={categoryOptn}
          />
        </div>
        {/* <span className="valid-alert-span ml-4">
          {categoryError ? "*Select category" : null}
        </span> */}
        <label className=" mt-3">Remark</label>
        <textarea
          className=" mt-3  d-block"
          rows="5"
          {...register("Desicription", {
            required: false,
          })}
          onChange={() => clearErrors("Remarks")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.Desicription && (
            <span className="valid-alert-span">*Enter Remark</span>
          )}
        </div>
        <button className="save  mt-3  d-block" type="submit" onClick={onSub}>
          Save Record
        </button>
        <button
          className="cancel   mt-3  d-block"
          onClick={() => props.closeModal(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddDiagnosticsModal;
