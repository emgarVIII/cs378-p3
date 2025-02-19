import React, { useState } from 'react';

const MenuItem = ({ title, description, imageName, price, quantity, addToCart, removeFromCart }) => {
  return (
    <div className="row align-items-center mb-3">
      <div className="col-4 d-flex justify-content-center">
        <img
          src={`https://emgarviii.github.io/cs378-p2/images/${imageName}`}
          alt={title}
          className="item_pictures"
        />
      </div>
      <div className="col-8 d-flex flex-column justify-content-between">
        <div>
          <h5>{title}</h5>
          <p className="description">{description}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-muted mb-0">${price.toFixed(2)}</p>
          <div className="d-flex align-items-center ms-auto">
            <button className="btn d-flex align-items-center justify-content-center"
              style={{ width: '30px', height: '30px', fontSize: '1.4rem', lineHeight: '1' }}
              onClick={removeFromCart}
            >
              ⊖
            </button>
            <span className="mx-2">{quantity}</span>
            <button className="btn d-flex align-items-center justify-content-center"
              style={{ width: '30px', height: '30px', fontSize: '1.4rem', lineHeight: '1' }}
              onClick={addToCart}
            >
              ⊕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;