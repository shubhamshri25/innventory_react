import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import { FaShoppingCart } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Laptop",
    description: "High-performance laptop for professionals",
    price: 150000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Smartphone",
    description: "Latest model with advanced features",
    price: 70000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Headphones",
    description: "Wireless noise-canceling headphones",
    price: 1990.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Smartwatch",
    description: "Fitness tracking and notifications",
    price: 2990.99,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Tablet",
    description: "Perfect for work and entertainment",
    price: 44900.99,
    image:
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Gaming Console",
    description: "Next-gen gaming experience",
    price: 24999.99,
    image:
      "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Wireless Speaker",
    description: "Premium sound quality",
    price: 15900.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Keyboard",
    description: "Mechanical gaming keyboard",
    price: 1290.99,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
  },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-blue-600"
            >
              <FaShoppingCart />
              Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {isCartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <Cart
                items={cartItems}
                onRemoveFromCart={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
