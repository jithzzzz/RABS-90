import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { ChangePassword } from "../../redux/actions/LoginComponentActions";
import { useHistory } from "react-router-dom";

const ChangePasswordModal = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.LoginReducer.user);
  const history = useHistory();
  const onChange = (data) => {
    data.email = user.Email;
    if (localStorage.getItem("token")) {
    } else {
      localStorage.removeItem("token");
      history.push("/login");
    }
    dispatch(
      ChangePassword(data, (res) => {
        if (res) {
          props.closeModal(false);
          toast("Password changed successfully");
        } else {
          toast("Changing password failed");
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
    <div className="change-password">
      <div className="d-block close">
        <i
          className="fa fa-times-circle"
          onClick={() => props.closeModal(false)}
        ></i>
      </div>
      <form onSubmit={handleSubmit(onChange)}>
        <label className=" mt-3">Old Password</label>
        <input
          className=" mt-3 d-block"
          type="text"
          {...register("expassword", {
            required: true,
            // minLength: 5,
            // maxLength: 64,
          })}
          onChange={() => clearErrors("old")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.expassword && (
            <span className="valid-alert-span">*Enter old password</span>
          )}
        </div>
        <label className=" mt-3">New Password</label>
        <input
          className=" mt-3 d-block"
          type="text"
          {...register("Newpassword", {
            required: true,
            minLength: 4,
            maxLength: 64,
          })}
          onChange={() => clearErrors("new")}
        />
        <div className="d-flex" style={{ height: "16px" }}>
          {errors.Newpassword && (
            <span className="valid-alert-span">
              *Enter a valid new password
            </span>
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

export default ChangePasswordModal;
