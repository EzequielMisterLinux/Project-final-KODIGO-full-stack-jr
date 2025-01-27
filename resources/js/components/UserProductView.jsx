import React from 'react';
import Loader from './Loader';

const UserProductView = ({ products, isLoading, error }) => {
  if (isLoading) return <Loader />;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="card bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-xl h-48 object-cover"
              onError={(e) => {
                e.target.src = 'https://api.placeholder.com/150';
              }}
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{product.name}</h2>
            <p className="text-sm opacity-70">{product.description}</p>
            <div className="flex justify-between w-full">
              <span className="text-pink-500 font-bold">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              <span className="text-blue-500">
                Stock: {product.stock}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProductView;