// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import { ToastProvider } from './components/ToastProvider';
// import Navbar from './components/Navbar';
// import Home from './views/Home';
// import Catalog from './views/Catalog';
// import ProductDetail from './views/ProductDetail';
// import Cart from './views/Cart';
// import Checkout from './views/Checkout';
// import Favorites from './views/Favorites';
// import Login from './views/Login';
// import Register from './views/Register';
// import AdminDashboard from './views/AdminDashboard';
// import LoadingView from './views/LoadingView';
// import Privacy from './views/Privacy';
// import Terms from './views/Terms';
// import About from "./views/About";
// import AdminLayout from './admin/AdminLayout';
// import ProductsAdmin from './admin/ProductsAdmin';
// import Inventory from './admin/Inventory';
// import OrdersAdmin from './admin/OrdersAdmin';
// import UsersAdmin from './admin/UsersAdmin';

// export default function App() {
//   return (
//     <Router>
//       <ToastProvider>
//         <Navbar />
//         <Routes>
//           <Route path="/"            element={<Home />} />
//           <Route path="/catalog"     element={<Catalog />} />
//           <Route path="/product/:id" element={<ProductDetail />} />
//           <Route path="/cart"        element={<Cart />} />
//           <Route path="/checkout"    element={<Checkout />} />
//           <Route path="/favorites"   element={<Favorites />} />
//           <Route path="/login"       element={<Login />} />
//           <Route path="/register"    element={<Register />} />
//           <Route path="/admin"       element={<AdminDashboard />} />
//           <Route path="/loading"     element={<LoadingView />} />
//           <Route path="/privacy" element={<Privacy />} />
//           <Route path="/terms" element={<Terms />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/admin" element={<AdminLayout/>}>
         


//           <Route 
//           path="products"
//           element={<ProductsAdmin/>}
//           />


//           <Route 
//           path="inventory"
//           element={<Inventory/>}
//           />


//           <Route 
//           path="orders"
//           element={<OrdersAdmin/>}
//           />


//           <Route 
//           path="users"
//           element={<UsersAdmin/>}
//           />


//           </Route>
                    
//                   </Routes>
//                 </ToastProvider>
//               </Router>
//             );
//           }


import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import { ToastProvider } from './components/ToastProvider';

import Navbar from './components/Navbar';

// Vistas cliente
import Home from './views/Home';
import Catalog from './views/Catalog';
import ProductDetail from './views/ProductDetail';
import Cart from './views/Cart';
import Checkout from './views/Checkout';
import Favorites from './views/Favorites';
import Login from './views/Login';
import Register from './views/Register';
import LoadingView from './views/LoadingView';
import Privacy from './views/Privacy';
import Terms from './views/Terms';
import About from './views/About';
import Orders from './views/Orders';


// Admin
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ProductsAdmin from "./admin/ProductsAdmin";
import Inventory from "./admin/Inventory";
import OrdersAdmin from "./admin/OrdersAdmin";
import UsersAdmin from "./admin/UsersAdmin";
import Profile from './views/Profile';
function AppContent() {

  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>

      {!isAdmin && <Navbar />}

      <Routes>

        {/* ======================
            CLIENTE
        ======================= */}

        <Route path="/" element={<Home />} />

        <Route path="/catalog" element={<Catalog />} />

        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/favorites" element={<Favorites />} />
        <Route 
          path="/profile" 
          element={<Profile />} 
          />
          <Route 
            path="/orders" 
            element={<Orders />} 
          />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />



        {/* ======================
            ADMIN PANEL
        ======================= */}

        <Route path="/admin" element={<AdminLayout />}>

          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="products"
            element={<ProductsAdmin />}
          />

          <Route
            path="inventory"
            element={<Inventory />}
          />

          <Route
            path="orders"
            element={<OrdersAdmin />}
          />

          <Route
            path="users"
            element={<UsersAdmin />}
          />

        </Route>



        {/* ======================
            LEGALES
        ======================= */}

        <Route
          path="/loading"
          element={<LoadingView />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/about"
          element={<About />}
        />

      </Routes>

    </>
  );
}

function App() {

  return (
    <Router>

      <ToastProvider>

        <AppContent />

      </ToastProvider>

    </Router>
  );
}

export default App;