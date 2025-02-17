import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CharacterCreationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "50px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        zIndex: 10,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <h2>Create a Character</h2>
      <input type="text" placeholder="Character Name" />
      <button onClick={onClose}>Create</button>
    </div>
  );
};

export default CharacterCreationModal;
