import React, { useEffect } from "react";
import { Tabledata } from "./MakeData";
import CssBaseline from "@material-ui/core/CssBaseline";
import EnhancedTable from "../commons/Table/EnhancedTable";
import Modals from "../commons/Modal/Modal";
import AddDiagnosticsModal from "./AddDiagnostics";
import { useSelector } from "react-redux";
const LabtestHistory = (props) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "LAB TEST",
        accessor: "LabTestName",
      },
      {
        Header: "RESULT",
        accessor: "LabTestResult",
      },
      // {
      //   Header: "AB NAME",
      //   accessor: "DAB",
      // },
      {
        Header: "DATE",
        accessor: "LabTestDate",
      },
    ],
    []
  );

  const [data, setData] = React.useState([]);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  useEffect(() => {
    if (props.labTestHistory !== 0) {
      setData(props.labTestHistory);
    }
  }, [props.labTestHistory]);

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
            className="fa fa-times-circle"
            style={{ cursor: "pointer" }}
            onClick={() => props.closeModal(false)}
          ></i>
        </div>
        <CssBaseline />
        {data?.length ? (
          <EnhancedTable
            columns={columns}
            data={data}
            setData={setData}
            // updateMyData={updateMyData}
            skipPageReset={skipPageReset}
          />
        ) : (
          <div className="lab-test-nothing">Nothing here yet</div>
        )}
      </div>
    </>
  );
};

export default LabtestHistory;
