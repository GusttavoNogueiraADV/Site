import React, { useRef } from 'react';
import Home from './pages/Home';
import Equipe from './pages/Equipe';
import Whats from './components/Whats';
import Top from './components/Top';
import Desk from './pages/Desk';
import Services from './pages/Services';
import Instagram from './pages/Instagram';
import Contact from './pages/Contact';
import BottomCookie from './components/BottomCookie';

function App() {
  const deskRef = useRef(null);

  const scrollToDesk = () => {
    if (deskRef.current) {
      deskRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Home />
      <Equipe />
      <Whats />
      <Top />
      <div ref={deskRef}>
        <Desk />
      </div>
      <Services />
      <Instagram />
      <Contact onShowDesk={scrollToDesk} />
      <BottomCookie />
    </>
  );
}

export default App;
