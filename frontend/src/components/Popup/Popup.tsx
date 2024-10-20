import React from "react";
import Modal from "react-modal";

interface PopupProps {
  isOpen: boolean;
  onRequestClose?: () => void;
  children: React.ReactNode;
  width?: string;
}

let customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "600px",
    padding: "0",
  },
};

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onRequestClose,
  children,
  width,
}) => {
  if (width) {
    customStyles.content.width = width;
  }

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
