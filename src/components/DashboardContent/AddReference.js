import React from "react";
import { useDispatch } from "react-redux";
import {
  getAddReference,
  getReference,
} from "../../redux/actions/DashboardComponentActions";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddReferenceModal = (props) => {
  const dispatch = useDispatch();

  const onSave = (data) => {
    if (!data.Department) {
      data.Department = "null";
    }
    if (!data.Pho) {
      data.Pho = "null";
    }

    dispatch(
      getAddReference(data, (res) => {
        if (res) {
          dispatch(getReference({}, () => {}));
          props.closeModal(false);
          toast("Added reference successfully");
        } else {
          toast("Adding reference failed");
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
          className="fa fa-times-circle"
          onClick={() => props.closeModal(false)}
        ></i>
      </div>
      <form onSubmit={handleSubmit(onSave)}>
        <label className="m-1 ml-2 mr-2 mt-3">Name</label>
        <input
          className="m-1 ml-2 mr-2 mt-3 d-block"
          type="text"
          {...register("Name", {
            required: true,
            minLength: 1,
            maxLength: 64,
          })}
          onChange={() => clearErrors("Name")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.Name && <span className="valid-alert-span">*Enter name</span>}
        </div>
        <label className="m-1 ml-2 mr-2 mt-3">Department</label>
        <input
          className="m-1 ml-2 mr-2 mt-3 d-block"
          type="text"
          {...register("Department", {
            required: false,
            minLength: 1,
            maxLength: 64,
          })}
          onChange={() => clearErrors("Department")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.Department && (
            <span className="valid-alert-span">*Enter Department</span>
          )}
        </div>
        <label className="m-1 ml-2 mr-2 mt-3">Mobile</label>
        <input
          type="number"
          {...register("Pho", {
            required: false,
            length: 10,
            pattern: { value: /^\d{10}$/ },
          })}
          onChange={() => clearErrors("Pho")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.Pho && (
            <span className="valid-alert-span ml-1">
              *Enter valid mobile number
            </span>
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

export default AddReferenceModal;
