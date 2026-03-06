import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import GiftCity from './pages/GiftCity';
import ExportFunding from './pages/ExportFunding';
import MsmeFunding from './pages/MsmeFunding';
import IpoServices from './pages/IpoServices';
import NriServices from './pages/NriServices';
import ZedCertification from './pages/ZedCertification';
import InvestmentServices from './pages/InvestmentServices';
import WorkingCapital from './pages/WorkingCapital';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';
import ClientPortal from './pages/ClientPortal';
import Team from './pages/Team';
import AdminPortal from './pages/AdminPortal';
import InsuranceServices from './pages/InsuranceServices';
import WorkWithUs from './pages/WorkWithUs';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} /> {/* <--- ADD THIS LINE */}


      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />

        <main className="flex-grow pt-20"> {/* pt-20 for fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Future routes based on PDFs */}
            <Route path="/services/gift-city" element={<GiftCity />} />
            <Route path="/services/nri" element={<NriServices />} />

            <Route path="/services/export-funding" element={<ExportFunding />} />
            <Route path="/services/msme-funding" element={<MsmeFunding />} />
            <Route path="/services/ipo" element={<IpoServices />} />
            <Route path="/services/zed-certification" element={<ZedCertification />} />
            <Route path="/services/investment" element={<InvestmentServices />} />
            <Route path="/services/working-capital" element={<WorkingCapital />} />
            <Route path="/services/insurance" element={<InsuranceServices />} />

            <Route path="/work-with-us" element={<WorkWithUs />} />

            <Route path="/portal" element={<ClientPortal />} />
            <Route path="/admin" element={<AdminPortal />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* Placeholder for Footer */}
       
        <Footer />
      </div>
    </Router>
  );
}

export default App;