import React from 'react';

const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-800 p-6 rounded-lg w-11/12 md:w-1/3">
        <h3 className="text-lg text-gray-100 font-bold mb-4">{title}</h3>
        <p className="mb-6">{content}</p>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-3xl hover:bg-orange-400"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
