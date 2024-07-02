import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import MenuLayanan from './MenuLayanan';
import KonsultasiDokter from './KonsultasiDokter';
import PilihKucing from './PilihKucing';
import PilihDokter from './PilihDokter';
import InfoJadwal from './InfoJadwal';
import Konfirmasi from './Konfirmasi';

function App() {
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setBackendData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Router>
      <div>
        {typeof backendData.users === 'undefined' ? (
          <p>No users found</p>
        ) : (
          <div className="App">
            <Routes>
              <Route path="/" element={<MenuLayanan />} />
              <Route path="/KonsultasiDokter" element={<KonsultasiDokter />} />
              <Route path="/PilihKucing" element={<PilihKucing />} />
              <Route path="/PilihDokter" element={<PilihDokter />} />
              <Route path="/InfoJadwal/:id_d" element={<InfoJadwal />} />
              <Route path="/Konfirmasi/:id_d/:id_j" element={<Konfirmasi />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
