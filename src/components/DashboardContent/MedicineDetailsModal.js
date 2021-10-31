import React, { useEffect } from "react";
import { Tabledata } from "./MakeData";
import CssBaseline from "@material-ui/core/CssBaseline";
import EnhancedTable from "../commons/Table/EnhancedTable";
import Modals from "../commons/Modal/Modal";
import AddMedicineModal from "./AddMedicineModal";
import { useSelector } from "react-redux";

const App = (props) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "MName",
      },
      {
        Header: "REMARKS",
        accessor: "Remarks",
      },
      {
        Header: "GENERIC",
        accessor: "MAB",
      },
      {
        Header: "COMPANY",
        accessor: "MComapnyName",
      },
    ],
    []
  );

  const [data, setData] = React.useState([]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const medicineDetails = useSelector(
    (state) => state.MedicineReducer.medicineDetails
  );
  useEffect(() => {
    if (medicineDetails.length !== 0) {
      setData(medicineDetails);
    }
  }, [medicineDetails]);
  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
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

  return (
    <>
      <div>
        <div className="d-block close mr-3 mt-2">
          <i
            className="fas fa-times-circle"
            style={{ cursor: "pointer" }}
            onClick={() => props.closeModal(false)}
          ></i>
        </div>
        <div className="d-flex details-table-nav">
          <div className="d-flex">
            <div className="nav-search d-flex">
              <i className="fa fa-search"></i>
              <input className="search" type="search" placeholder="Search..." />
            </div>
          </div>
          <button
            onClick={() => {
              props.setAddMedicineModal(true);
              props.closeModal(false);
            }}
          >
            <i className="fa fa-plus-circle mr-2"></i>Add medicine
          </button>
        </div>
        <CssBaseline />
        <EnhancedTable
          columns={columns}
          data={data}
          setData={setData}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
      </div>
      <Modals
        modalIsOpen={props.addMedicineModal}
        closeModal={props.setAddMedicineModal}
        width="25%"
        content={<AddMedicineModal closeModal={props.setAddMedicineModal} />}
      />
    </>
  );
};

export default App;
