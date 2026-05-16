import React from 'react'
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarausel from './CategoryCarausel';
import LatestJobs from './LatestJobs';
import Footer from './Footer';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  return (
    <div className="page-dark">
      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Ambient lighting blobs */}
      <div
        className="ambient-blob"
        style={{
          width: '900px',
          height: '600px',
          background: 'var(--accent-glow)',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(150px)',
          animationDuration: '9s',
        }}
      />
      <div
        className="ambient-blob ambient-blob-reverse"
        style={{
          width: '500px',
          height: '500px',
          background: 'var(--accent-glow)',
          opacity: 0.5,
          top: '200px',
          left: '-100px',
          filter: 'blur(120px)',
          animationDuration: '11s',
        }}
      />
      <div
        className="ambient-blob"
        style={{
          width: '500px',
          height: '500px',
          background: 'var(--accent-glow)',
          opacity: 0.4,
          top: '300px',
          right: '-100px',
          filter: 'blur(100px)',
          animationDuration: '13s',
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <CategoryCarausel />
        <LatestJobs />
        <Footer />
      </div>
    </div>
  )
}

export default Home
