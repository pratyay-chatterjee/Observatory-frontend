import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Events from './components/Events';
import EventCalendar from './components/EventCalendar';
import Membership from './components/Membership';
import Research from './components/Research';
import Members from './components/Members';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Events />
        <EventCalendar />
        <Research />
        <Members />
        <Membership />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;