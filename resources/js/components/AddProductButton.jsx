import React from 'react';
import { Plus } from 'lucide-react';

const AddProductButton = ({ onClick }) => {
  return (
    <button 
      className="btn btn-primary mb-4"
      onClick={onClick}
    >
      <Plus className="w-4 h-4" />
      Agregar Producto
    </button>
  );
};

export default AddProductButton;