
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import { useEffect } from 'react';
import { productFetch } from './features/productSlice'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productFetch()); // Gọi API khi component render lần đầu
  }, [dispatch]);


  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/not-found' />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
