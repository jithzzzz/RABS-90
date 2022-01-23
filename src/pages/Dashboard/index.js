import React, { useEffect } from "react";
import DashboardContent from "../../components/DashboardContent/DashboardContent";
import { useDispatch } from "react-redux";
import {
  getPatients,
  getReference,
} from "../../redux/actions/DashboardComponentActions";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getPatients({}, () => {}));
      dispatch(getReference({}, () => {}));
    } else {
      localStorage.removeItem("token");
      history.push("/login");
    }
  }, []);
  return <DashboardContent />;
};

export default Dashboard;
