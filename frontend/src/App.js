import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CommunitySection from "./components/CommunitySection";
import WhoWeAreSection from "./components/WhoWeAreSection";
import FeaturesSection from "./components/FeaturesSection";
import FounderSection from "./components/FounderSection";
import ContactSection from "./components/ContactSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FounderSection />
        <CommunitySection />
        <WhoWeAreSection />
        <FeaturesSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
