import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import Loader from './Loader';
import ProductModal from './ProductModal';

const ProductsTable = ({ products, isLoading, error, onProductUpdate }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleModalSuccess = (updatedProduct, action) => {
    if (action === 'delete') {
      onProductUpdate(products.filter(p => p.id !== selectedProduct.id));
    } else if (updatedProduct) {
      const newProducts = products.map(p => 
        p.id === updatedProduct.id ? updatedProduct : p
      );
      onProductUpdate(newProducts);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Acciones</th>
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
                            e.target.src = 'https://api.placeholder.com/50';
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
                <td className="text-pink-500 font-semibold">
                  ${parseFloat(product.price).toFixed(2)}
                </td>
                <td className="text-blue-500 font-semibold">
                  {product.stock} unidades
                </td>
                <td>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => window.open(product.image, '_blank')}
                  >
                    Ver imagen
                  </button>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button 
                      className="btn btn-info btn-sm"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowModal(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSuccess={handleModalSuccess}
      />
    </>
  );
};

export default ProductsTable;