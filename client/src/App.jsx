import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  useTranslation } from 'react-i18next';
import './App.css';
import LanguageSelector from './component/languageSelector';
import Admin from './pages/Admin'
import LoginPage from './pages/login';
import FarmerSignup from './pages/FarmerSignup';
import UserSignup from './pages/UserSignup';
function App() {
  const  {t}=useTranslation();
  return (
    // <>
    //   <div>{t('intro')}</div>
    //   <div></div>
    // </>
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/usersignup" element={<UserSignup/>}/>
        <Route path="/farmersignup" element={<FarmerSignup/>}/>

      </Routes>
    </Router>
  )
}

export default App;
