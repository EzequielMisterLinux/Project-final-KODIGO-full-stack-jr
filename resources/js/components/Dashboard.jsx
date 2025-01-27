import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { AxiosRouter } from '../services/utils/Axios.utis';
import Loader from './Loader';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [error, setError] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await AxiosRouter.get('/api/products');
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Error cargando productos');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-base-200">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-lg fixed top-0 w-full z-50">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Mi Dashboard</a>
          </div>
          <div className="flex-none gap-4">
            {/* Botón para abrir el modal */}
            <button 
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setShowUserModal(true)}
            >
              <div className="w-10 rounded-full">
                <img 
                  alt="User avatar" 
                  src={user?.profile_picture}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Modal de información del usuario */}
        <div className={`modal ${showUserModal ? 'modal-open' : ''}`} onClick={() => setShowUserModal(false)}>
          <div className="modal-box relative" onClick={(e) => e.stopPropagation()}>
            <button 
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setShowUserModal(false)}
            >
              ✕
            </button>
            
            <div className="flex flex-col items-center gap-4 p-6">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img 
                    src={user?.profile_picture} 
                    alt="User avatar"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-bold">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <div className="w-full flex flex-col gap-2">
                <button className="btn btn-ghost btn-block">
                  Configuración
                </button>
                <button 
                  className="btn btn-error btn-block"
                  onClick={() => {
                    logout();
                    setShowUserModal(false);
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resto del contenido del dashboard */}


        {/* Main Content */}
        <div className="p-8 pt-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Bienvenido, {user?.name}</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="stats bg-base-100 shadow">
                <div className="stat">
                  <div className="stat-title">Productos totales</div>
                  <div className="stat-value">{products.length}</div>
                  <div className="stat-desc">Disponibles en inventario</div>
                </div>
              </div>
              
              <div className="stats bg-base-100 shadow">
                <div className="stat">
                  <div className="stat-title">Valor total</div>
                  <div className="stat-value">
                    ${products.reduce((acc, product) => acc + parseFloat(product.price), 0).toFixed(2)}
                  </div>
                  <div className="stat-desc">En inventario</div>
                </div>
              </div>
              
              <div className="stats bg-base-100 shadow">
                <div className="stat">
                  <div className="stat-title">Stock total</div>
                  <div className="stat-value">
                    {products.reduce((acc, product) => acc + parseInt(product.stock), 0)}
                  </div>
                  <div className="stat-desc">Unidades disponibles</div>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Inventario de Productos</h2>
                {isLoadingProducts ? (
                  <Loader />
                ) : error ? (
                  <div className="alert alert-error">{error}</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Producto</th>
                          <th>Precio</th>
                          <th>Stock</th>
                          <th>Imagen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <img 
                                      src={product.image} 
                                      alt={product.name} 
                                      onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/50';
                                      }}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">{product.name}</div>
                                  <div className="text-sm opacity-50">
                                    {product.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>${parseFloat(product.price).toFixed(2)}</td>
                            <td>{product.stock} unidades</td>
                            <td>
                              <button 
                                className="btn btn-ghost btn-xs"
                                onClick={() => window.open(product.image, '_blank')}
                              >
                                Ver imagen
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}