import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const onChange = (data) => {
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
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
  } = useForm();
  return (
    <div className="change-password">
      <div className="d-block close">
        <i
          className="fas fa-times-circle"
          onClick={() => props.closeModal(false)}
        ></i>
      </div>
      <form onSubmit={handleSubmit(onChange)}>
        <label className=" mt-3">Old Password</label>
        <input
          className=" mt-3 d-block"
          type="text"
          {...register("old", {
            required: true,
            minLength: 5,
            maxLength: 64,
          })}
          onChange={() => clearErrors("old")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.old && (
            <span className="valid-alert-span">*Enter old password</span>
          )}
        </div>
        <label className=" mt-3">New Password</label>
        <input
          className=" mt-3 d-block"
          type="text"
          {...register("new", {
            required: true,
            minLength: 4,
            maxLength: 64,
          })}
          onChange={() => clearErrors("new")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.new && (
            <span className="valid-alert-span">*Enter new password</span>
          )}
        </div>
        <div className="d-flex">
          <button
            className="save  mt-3  d-block"
            style={{ flex: "1", marginRight: "10px" }}
            type="submit"
          >
            Change Password
          </button>
          <button
            className="cancel   mt-3  d-block"
            style={{ flex: "1" }}
            onClick={() => props.closeModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
