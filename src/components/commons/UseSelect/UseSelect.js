import React from "react";
import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
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
const UseFormSelect = (props) => {
  const dispatch = useDispatch();
  const onChangeHandler = (onChange, val) => {
    console.log(onChange, val);
    if (props.name === "medicin") {
      props.setMedicine({ ...props.medicine, medicin: val.id, name: val.name });
    } else if (props.name === "mnn") {
      props.setMedicine({ ...props.medicine, mnn: val.name });
    }

    onChange(val.name);
  };

  return (
    <Controller
      name={props.name && props.name}
      control={props.control && props.control}
      render={({ field: { onChange, value, ref, name } }) => (
        <Select
          maxMenuHeight={130}
          styles={customStyles}
          inputRef={ref}
          options={props.data}
          placeholder={props.placeholder}
          // value={props.data?.find((c) => c.name === name)}
          value={props.data?.filter((c) => c.name === value)}
          onChange={(val) => onChangeHandler(onChange, val)}
        />
      )}
      options={props.data}
      defaultValue={props.defaultValue}
    />
  );
};

export default UseFormSelect;
