import React from "react";
import Modal from "react-modal";

const Modals = (props) => {
  const customStyles = {
    content: {
      top: props.top ? props.top : "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      marginTop: props.marginTop && props.marginTop,
      width: props.width && props.width,
      height: props.height && props.height,
      borderRadius: props.radius ? props.radius : "2px",
      padding: props.padding ? props.padding : "20px",
    },
  };
  const closeModal = () => {
    props.closeModal(false);
  };
  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {props.content}
    </Modal>
  );
};

export default Modals;
