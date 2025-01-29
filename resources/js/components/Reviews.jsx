import React, { useState, useEffect } from "react";

const Comentario = ({ usuario, fecha, contenido, onSend }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(contenido);
    const [isEdited, setIsEdited] = useState(false);
    const [editedDate, setEditedDate] = useState(fecha);
  
    useEffect(() => {
      setEditedContent(contenido);
    }, [contenido]);
  
    const handleEdit = () => {
      setIsEditing(true);
    };
  
    const handleSave = () => {
      setIsEditing(false);
      setIsEdited(true);
      setEditedDate(new Date().toLocaleString()); // Actualiza la fecha al momento de guardar
    };
  
    return (
      <div className="border p-4 rounded-lg w-full max-w-md shadow-md">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 border rounded-full bg-gray-300"></div>
            <span className="font-semibold text-lg">{usuario}</span>
          </div>
          <span className="text-sm text-gray-500">{editedDate}{isEdited}</span>

        </div>

        {isEditing ? (
          <textarea
            className="w-full p-2 border rounded-lg "
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p className="mb-4 text-base leading-relaxed">
            {editedContent} {isEdited && <span className="text-xs text-gray-700 ">(editado)</span>}
          </p>
        )}
        <div className="flex justify-between text-sm">
          {isEditing ? (
            <button 
              onClick={handleSave} 
              className="bg-gray-600 text-white px-3 py-1 rounded-full hover:bg-gray-300 hover:text-blue-900 transition-colors"
            >
              Guardar
            </button>
          ) : (
            <button 
              onClick={handleEdit} 
              className="bg-gray-600 text-white px-3 py-1 rounded-full hover:bg-gray-300 hover:text-blue-900 transition-colors"
            >
              Editar
            </button>
          )}
          <button 
            onClick={onSend} 
            className="bg-gray-600 text-white px-3 py-1 rounded-full hover:bg-gray-300 hover:text-blue-900 transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    );
};

export default Comentario;