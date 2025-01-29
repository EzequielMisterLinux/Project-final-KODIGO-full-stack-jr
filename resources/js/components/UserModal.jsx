import React from 'react';
import { Settings, LogOut, Sun, Moon, Cake, Building2, Ghost } from 'lucide-react';

const UserModal = ({ isOpen, onClose, user, logout, themes }) => {
  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box relative bg-base-100">
        <button 
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-purple-200">
              <img 
                src={user?.profile_picture} 
                alt="User avatar"
                onError={(e) => {
                  e.target.src = 'https://api.placeholder.com/150';
                }}
              />
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-bold">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <div className="w-full space-y-4">
            <div className="dropdown w-full">
              <label tabIndex={0} className="btn btn-ghost btn-block justify-between">
                <span className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Tema
                </span>
              </label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {themes.map((theme) => (
                  <li key={theme.value}>
                    <button 
                      className="flex items-center gap-2"
                      onClick={() => document.documentElement.setAttribute('data-theme', theme.value)}
                    >
                      {theme.icon}
                      {theme.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              className="btn btn-error btn-block"
              onClick={() => {
                logout();
                onClose();
              }}
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;