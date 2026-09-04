import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { flyToCart } from '../utils/flyToCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    addToCart(product);
    flyToCart(e, product.images && product.images.length > 0 ? product.images[0] : '');
  };

  return (
    <div className="bg-[#FAF6F0] rounded-t-[100px] rounded-b-[30px] shadow-sm flex flex-col font-poppins pb-6 h-full product-container">
      <Link to={`/products/${product._id}`}>
        <img 
          src={product.images && product.images.length > 0 ? product.images[0] : ''} 
          alt={product.name} 
          className="w-full h-[360px] object-cover rounded-t-[100px] rounded-b-[20px]" 
        />
      </Link>
      <div className="px-4 mt-5 flex-grow flex flex-col justify-between">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-[13px] font-bold text-gray-900 mb-4 whitespace-pre-wrap leading-tight">{product.name.replace('(', '\n(')}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-red-600 font-bold text-sm">BTD : {product.price}</span>
          <div className="flex gap-2">
            <button className="bg-[#004D3D] text-white text-[10px] px-3 py-1.5 rounded-lg hover:bg-opacity-90 font-bold tracking-wide shadow-sm">
              Order now
            </button>
            <button 
              onClick={handleAddToCart}
              className="bg-[#AA8F56] text-white text-[10px] px-3 py-1.5 rounded-lg hover:bg-opacity-90 font-bold tracking-wide shadow-sm">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
