import React from "react";

import Select from "react-select";
const customStyles = {
  input: (styles) => {
    return {
      ...styles,
      height: "1.8em",
      fontSize: "22px",
    };
  },
  option: (provided) => ({
    ...provided,
    color: "black",
    background: "none",
  }),
  control: (base) => ({
    ...base,
    border: "none",
    boxShadow: "none",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6c757d",
    fontSize: "14px",
  }),
};
const ReactSelect = (props) => {
  const onChangeHandler = (val) => {
    if (props.type === "name") {
      props.set(val.name);
    } else {
      props.set(val.id);
    }
    if (props.subSet) {
      props.subSet(false);
    }
  };

  return (
    <Select
      maxMenuHeight={props.height ? props.height : 130}
      styles={customStyles}
      options={props.data}
      placeholder={props.placeholder}
      // value={props.data?.find((c) => c.name === name)}
      // value={props.data?.filter((c) => c.name === value)}
      onChange={(val) => onChangeHandler(val)}
    />
  );
};

export default ReactSelect;
