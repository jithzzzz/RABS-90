import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer/LoginReducer";
import DashboardReducer from "./DashboardReducer/DashboardReducer";
import PatientReducer from "./PatientReducer/PatientReducer";
import MedicineReducer from "./MedicineReducer/MedicineReducer";
import DiagonosticsReducer from "./DiagonosticsReducer/DiagonosticsReducer";
import PrescriptionReducer from "./PrescriptionReducer/PrescriptionReducer";

export default combineReducers({
  LoginReducer,
  DashboardReducer,
  PatientReducer,
  MedicineReducer,
  DiagonosticsReducer,
  PrescriptionReducer,
});
