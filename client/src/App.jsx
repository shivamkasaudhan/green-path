import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {  useTranslation } from 'react-i18next';
import './App.css';
import LanguageSelector from './component/languageSelector';
import Admin from './pages/Admin'
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
      </Routes>
    </Router>
  )
}

export default App;
