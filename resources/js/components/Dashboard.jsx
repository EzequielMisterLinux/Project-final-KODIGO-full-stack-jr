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
            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img 
                    alt="User avatar" 
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                  />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li className="menu-title">
                  <span>{user?.name}</span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </li>
                <li><a>Configuración</a></li>
                <li><button onClick={logout}>Cerrar Sesión</button></li>
              </ul>
            </div>
          </div>
        </div>

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