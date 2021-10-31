import React, { useEffect, useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const MultiSelect = (props) => {
  const ref1 = useRef();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (name, id) => {
    let temp = [];
    let selectedIds = [];

    if (selectedOptions.includes(name)) {
      temp = selectedOptions.filter((ele) => {
        if (ele !== name) {
          return ele;
        }
      });
      selectedIds = selectedId.filter((ele) => {
        return ele !== id;
      });
      setSelectedOptions(temp);
      setSelectedId(selectedIds);
    } else {
      temp = [...selectedOptions, name];
      selectedIds = [...selectedId, id];
      setSelectedOptions(temp);
      setSelectedId(selectedIds);
    }
    props.setState(selectedIds);
  };
  return (
    <div ref={ref1} className="position-relative row">
      <InputGroup
        className="col-lg-12 d-flex p-0 justify-content-between multi-select-criteria-type-input-group"
        onClick={() => setShowOptions(!showOptions)}
      >
        <Form.Label className="m-0 pl-2 pt-2 pb-2 multi-select  multi-select-type-criteria">
          {selectedOptions?.length !== 0
            ? selectedOptions?.length > 2
              ? `${selectedOptions.length} items selected`
              : selectedOptions?.map((val, i) => {
                  return i > 0 ? "," + val : val;
                })
            : "Select"}
        </Form.Label>
        <InputGroup.Append>
          <button
            className=" d-flex justify-content-center"
            style={{ border: "none", background: "none", alignItems: "center" }}
          >
            <i
              class="fa fa-angle-down"
              style={{ color: "#72c4a7", fontSize: "22px" }}
              aria-hidden="true"
            ></i>
          </button>
        </InputGroup.Append>
      </InputGroup>
      {showOptions ? (
        <div
          className="m-0 multi-select-type-criteria-options"
          style={{
            maxHeight: "230px",
            overflow: "auto",
            width: "100%",
            left: "0px",
          }}
        >
          {props.options?.map((data, i) => {
            return (
              <div
                key={i}
                className="d-flex flex-row justify-content-between p-1"
                style={{ cursor: "pointer", height: "30px", fontSize: "14px" }}
                onClick={() => handleChange(data.value, data.id)}
              >
                <option key={data.name + i}>{data.value}</option>
                {selectedOptions?.includes(data.value) ? (
                  <i
                    class="fa fa-check"
                    aria-hidden="true"
                    style={{ padding: "0px 20px" }}
                  ></i>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default MultiSelect;
