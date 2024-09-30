import React from "react";
import Modal from "react-modal";

interface PopupProps {
  isOpen: boolean;
  onRequestClose?: () => void;
  children: React.ReactNode;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "600px",
  },
};

const Popup: React.FC<PopupProps> = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};

export default Popup;
