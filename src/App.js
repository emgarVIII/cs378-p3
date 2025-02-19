import React, { useState } from 'react';
import './App.css';
import MenuItem from './components/MenuItem';

// import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.

// Menu data. An array of objects where each object represents a menu item. Each menu item has an id, title, description, image name, and price.
// You can use the image name to get the image from the images folder.
const menuItems = [
  {
    id: 1,
    title: 'Gyoza',
    description: 'Japanese dumplings',
    imageName: 'gyoza.png',
    price: 5.99,
  },
  {
    id: 2,
    title: 'Sushi',
    description: 'Japanese rice rolls',
    imageName: 'sushi.png',
    price: 6.99,
  },
  {
    id: 3,
    title: 'Ramen',
    description: 'Japanese noodle soup',
    imageName: 'ramen.png',
    price: 7.99,
  },
  {
    id: 4,
    title: 'Matcha Cake',
    description: 'Japanese green tea cake',
    imageName: 'matcha-cake.png',
    price: 4.99,
  },
  {
    id: 5,
    title: 'Mochi',
    description: 'Japanese rice cake',
    imageName: 'mochi.png',
    price: 3.99,
  },
  {
    id: 6,
    title: 'Yakitori',
    description: 'Japanese skewered chicken',
    imageName: 'yakitori.png',
    price: 2.99,
  },
  {
    id: 7,
    title: 'Takoyaki',
    description: 'Japanese octopus balls',
    imageName: 'takoyaki.png',
    price: 5.99,
  },
  {
    id: 8,
    title: 'Sashimi',
    description: 'Japanese raw fish',
    imageName: 'sashimi.png',
    price: 8.99,
  },
  {
    id: 9,
    title: 'Okonomiyaki',
    description: 'Japanese savory pancake',
    imageName: 'okonomiyaki.png',
    price: 6.99,
  },
  {
    id: 10,
    title: 'Katsu Curry',
    description: 'Japanese curry with fried pork',
    imageName: 'katsu-curry.png',
    price: 9.99,
  }
];


function App() {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

  const addToCart = (id, price) => {
    setCart(prevCart => {
      const newQuantity = (prevCart[id] || 0) + 1;
      return { ...prevCart, [id]: newQuantity };
    });
    setTotal(prevTotal => prevTotal + price);
  };

  const removeFromCart = (id, price) => {
    setCart(prevCart => {
      // if the item doesnt exist in cart or quantity is already 0, don't do anything
      if (!prevCart[id] || prevCart[id] <= 0) return prevCart;

      const newQuantity = prevCart[id] - 1;
      if (newQuantity <= 0) {
        const { [id]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [id]: newQuantity };
    });

    setTotal(prevTotal => {
      const newTotal = prevTotal - price;
      // prevents negative vals (was showing -0.00) and handle floating point precision
      return Math.max(0, Number(newTotal.toFixed(2)));
    });
  };

  const clearCart = () => {
    setCart({});
    setTotal(0);
  };

  const handleOrder = () => {
    // empty cart case
    if (Object.keys(cart).length === 0) {
      alert("No items in cart");
      return;
    }

    let orderSummary = "Order placed!\n\n";

    //add each item and its quantity to the summary
    Object.keys(cart).forEach(itemId => {
      const item = menuItems.find(item => item.id === parseInt(itemId));
      if (item) {
        orderSummary += `${item.title}: ${cart[itemId]}\n`;
      }
    });

    // add total
    orderSummary += `\nTotal: $${total.toFixed(2)}`;

    // show the alert
    alert(orderSummary);

    // clear the cart after the order
    clearCart();
  };

  return (
    <div className="container">
      <div className="text-center my-4">
        <img src="https://emgarviii.github.io/cs378-p2//images/asian_logo.jpg" alt="Asian Restaurant Logo" className="logo" />
      </div>
      
      <div className="text-center mb-4">
        <div className="cf">Delicious, Nutritious & Affordable Food on the Go</div>
        <div className="ucf">Asian inspired!</div>
      </div>

      <div id="food_menu">
        {menuItems.map(item => (
          <MenuItem
            key={item.id}
            title={item.title}
            description={item.description}
            imageName={item.imageName}
            price={item.price}
            quantity={cart[item.id] || 0}
            addToCart={() => addToCart(item.id, item.price)}
            removeFromCart={() => removeFromCart(item.id, item.price)}
          />
        ))}
      </div>

      {/* spacer div to prevent the bottom whitespace from preventing 
      bottom item press */}

      <div style={{ height: '100px' }}></div>

      <div className="fixed-bottom-bar">
        <div>Subtotal: ${total.toFixed(2)}</div>
        <div>
          <button onClick={handleOrder} className="btn btn-primary mx-2">Order</button>
          <button onClick={clearCart} className="btn btn-secondary mx-2">Clear all</button>
        </div>
      </div>
    </div>
  );
}

export default App;
