import React, { useEffect } from "react";
import DashboardContent from "../../components/DashboardContent/DashboardContent";
import { useDispatch } from "react-redux";
import {
  getPatients,
  getReference,
} from "../../redux/actions/DashboardComponentActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatients({}, () => {}));
    dispatch(getReference({}, () => {}));
  }, []);
  return <DashboardContent />;
};

export default Dashboard;
