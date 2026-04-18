
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavbarPage from './Pages/NavbarPage';
import HeroPage from './Pages/HeroPage';
import AboutPage from './Pages/AboutPage';
import ServicePage from './Pages/ServicePage';
import WhyChooseUsPage from './Pages/WhyChooseUsPage';
import ContactPage from './Pages/ContactPage';
import Footer from './Component/Footer/Footer';

function App() {
  return (
    <div>
      <NavbarPage />
      <HeroPage />
      <ServicePage />
      <WhyChooseUsPage />
      <AboutPage />
      <ContactPage />
      <Footer />

      <Routes>
        <Route path='/Admin' element={<HeroPage />}></Route>
        <Route path='/Karyawan' element={<AboutPage />}></Route>
        <Route path='/Login' element={<AboutPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
