import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "../util/Carousel";
import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  return (
    <div className="homepage-container">
      <nav className="navbar">
        <div className="logo">ShopNinja</div>
        <ul className="navigation">
          <li>
            <a href="#login">Login</a>
          </li>
          <div className="line"></div>
          <li>
            <a href="#register">Register</a>
          </li>
          <div className="line"></div>
          <li>
            <a href="#orders">Orders</a>
          </li>
          <div className="line"></div>
          <li>
            <a href="#account">My Account</a>
          </li>
          <div className="navbar-icons">
            <FiShoppingCart />
            {/* <FiUser /> */}
          </div>
        </ul>
      </nav>
      <div className="search-feature-container">
        <input
          type="text"
          className="mobile-search-bar"
          placeholder="What are you looking for ?"
          // value={searchTerm}
          // onChange={handleSearch}
        />
        <div className="features">
          <p>New Arrivals</p>
          <p>Summer</p>
          <p>Deal & Promotions</p>
          <p>Christmas</p>
          <p>Valentines</p>
          <p>Sale</p>
        </div>
      </div>
    </div>
  );
};

// const HomePage = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Fetch products and categories when component mounts
//   useEffect(() => {
//     // fetchProducts();
//     fetchCategories();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/products");
//       console.log(response);
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/cartegories");
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories", error);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const filterProducts = (products) => {
//     return products.filter(
//       (product) =>
//         (selectedCategory ? product.category === selectedCategory : true) &&
//         (searchTerm
//           ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
//           : true)
//     );
//   };

//   return (
//     <div className="mobile-homepage-container">
//       {/* Navigation Bar */}
//       <nav className="mobile-navbar">
//         <div
//           className="mobile-navbar-menu"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <FiMenu />
//         </div>
//         <div className="mobile-navbar-brand"></div>
// <input
//   type="text"
//   className="mobile-search-bar"
//   placeholder="What are you looking for ?"
//   value={searchTerm}
//   onChange={handleSearch}
// />
//         <div className="mobile-navbar-icons">
//           <FiShoppingCart />
//           <FiUser />
//         </div>
//       </nav>

//       {/* Collapsible Menu for Categories */}
//       {menuOpen && (
//         <aside className="mobile-category-menu">
//           <div className="aside-title">ShopNinja</div>
//           <h3>Categories</h3>
//           <ul>
//             {categories.map((category) => (
//               <li
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.name)}
//               >
//                 {category.name}
//               </li>
//             ))}
//             <li onClick={() => setSelectedCategory("")}>All Products</li>
//           </ul>
//         </aside>
//       )}

//       {/* Featured Products */}
//       <section className="mobile-featured-products">
//         <div className="features-div">
//           <h2>Featured Caregories</h2>
//           <div className="featured-categories">
//             <Carousel data={categories} />
//           </div>
//         </div>
//         <div className="mobile-product-list">
//           {filterProducts(products).map((product) => (
//             <div className="mobile-product-card" key={product.id}>
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="mobile-product-image"
//               />
//               <div className="mobile-product-info">
//                 <h3>{product.name}</h3>
//                 <p>${product.price}</p>
//                 <button onClick={() => addToCart(product.id)}>
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// const addToCart = (productId) => {
//   console.log(`Product ${productId} added to cart`);
// };

export default HomePage;
