import React from "react";
import { useDispatch } from "react-redux";
import {
  getAddMedicine,
  getMedicineDetails,
} from "../../redux/actions/MedicineComponentAction";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddMedicineModal = (props) => {
  const dispatch = useDispatch();

  const onSave = (data) => {
    if (!data.MAB) {
      data.MAB = "null";
    }
    if (!data.Remarks) {
      data.Remarks = "null";
    }
    if (!data.MComapnyName) {
      data.MComapnyName = "null";
    }
    dispatch(
      getAddMedicine(data, (res) => {
        if (res) {
          dispatch(getMedicineDetails(() => {}));
          props.closeModal(false);
          toast("Added medicine successfully");
        } else {
          toast("Adding medicine failed");
        }
      })
    );
  };
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
  } = useForm();
  return (
    <div className="add-modal">
      <div className="d-block close">
        <i
          class="fa fa-times-circle"
          onClick={() => props.closeModal(false)}
        ></i>
      </div>
      <form onSubmit={handleSubmit(onSave)}>
        <label className="m-1 ml-2 mr-2 mt-3">Medicine Name</label>
        <input
          className="m-1 ml-2 mr-2 mt-3 d-block"
          type="text"
          {...register("MName", {
            required: true,
            minLength: 1,
            maxLength: 64,
          })}
          onChange={() => clearErrors("MName")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.MName && (
            <span className="valid-alert-span">*Enter medicine name</span>
          )}
        </div>
        <label className="m-1 ml-2 mr-2 mt-3">Generic</label>
        <input
          className="m-1 ml-2 mr-2 mt-3 d-block"
          type="text"
          {...register("MAB", {
            required: false,
            minLength: 1,
            maxLength: 64,
          })}
          onChange={() => clearErrors("MAB")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.MAB && (
            <span className="valid-alert-span">*Enter medicine AB</span>
          )}
        </div>
        <label className="m-1 ml-2 mr-2 mt-3">Remark</label>
        <textarea
          className="m-1 mt-3 ml-2 mr-2 d-block"
          rows="5"
          {...register("Remarks", {
            required: false,
          })}
          onChange={() => clearErrors("Remarks")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.Remarks && (
            <span className="valid-alert-span">*Enter Remark</span>
          )}
        </div>
        <label className="m-1 ml-2 mt-3 mr-2">Company Name</label>
        <input
          className="m-1 mt-3 ml-2 mr-2 d-block"
          type="text"
          {...register("MComapnyName", {
            required: false,
            minLength: 1,
            maxLength: 64,
          })}
          onChange={() => clearErrors("MComapnyName")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.MAB && (
            <span className="valid-alert-span">*Enter Company Name</span>
          )}
        </div>
        <button type="submit" className="save m-1 ml-2 mr-2 mt-3 d-block">
          Save Record
        </button>
        <button
          className="cancel m-1 ml-2 mr-2 mt-3 d-block"
          onClick={() => props.closeModal(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddMedicineModal;
