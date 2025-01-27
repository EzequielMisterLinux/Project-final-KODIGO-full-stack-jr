import React, { useState } from 'react';
import { Package, Users, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ onNavigate, currentView }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const isAdmin = user?.role_id === 1;
  
  const menuItems = [
    {
      id: 'products',
      label: 'Productos',
      icon: <Package className="w-5 h-5" />,
      show: true // Both admin and editor can see this
    },
    {
      id: 'users',
      label: 'Usuarios',
      icon: <Users className="w-5 h-5" />,
      show: isAdmin // Only admin can see this
    }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 btn btn-circle btn-ghost"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen
        transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        z-40
      `}>
        <div className="w-64 min-h-screen bg-base-200 text-base-content shadow-xl">
          {/* Logo area */}
          <div className="p-4 pt-20 lg:pt-4">
            <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
              Mi Dashboard
            </h2>
          </div>

          {/* Navigation */}
          <ul className="menu p-4">
            {menuItems.map(item => item.show && (
              <li key={item.id}>
                <button
                  className={`flex items-center gap-4 ${
                    currentView === item.id ? 'active' : ''
                  }`}
                  onClick={() => {
                    onNavigate(item.id);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;