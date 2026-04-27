import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './smartCampusUI.css';
import Panel from './pages/Panel/Panel.jsx';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import Elearning from './pages/Elearning/Elearning.jsx';
import PlanLekcji from './pages/PlanLekcji/PlanLekcji.jsx';
import NavBar from './global/Components/NavBar/NavBar.jsx';
import MobileNavBar from './global/Components/NavBar/MobileNavBar.jsx';
import MapaKampusu from './pages/MapaKampusu/MapaKampusu.jsx';
import Feed from './pages/Feed/Feed.jsx';
import Ustawienia from './pages/settings/settings.jsx';
import VideoManager from './pages/Elearning/VideoManager.jsx';



function AppWrapper() {
  const location = useLocation();
  const isStartPage = location.pathname === '/LandingPage';

  return (
    <>
      {!isStartPage && <NavBar />}
      <Routes>
        <Route path="/Panel" element={<Panel />} />
        <Route path="/MapaKampusu" element={<MapaKampusu />} />
        <Route path="/pages/Elearning" element={<Elearning />} />
        <Route path="/Feed" element={<Feed />} />
        <Route path="/PlanLekcji" element={<PlanLekcji />} />
        <Route path="/Ustawienia" element={<Ustawienia />} />
        <Route path="/VideoManager" element={<VideoManager />} />
        <Route path="/LandingPage" element={<LandingPage />} />
      </Routes>
      {!isStartPage && <MobileNavBar />}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>
);
