import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddBlog from './pages/AddBlog';
import Products from './pages/Products';
import Blog from './pages/Blogs';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Farmer from './pages/Farmer';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<AddBlog/>}></Route>
        <Route path='/addblog' element={<AddBlog/>}></Route>
        <Route path='/blogs' element={<Blog/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/users' element={<Users/>}></Route>
        <Route path='/farmer' element={<Farmer/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
