import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { PageContainer } from './Templates';
import './KonsultasiDokter.css';

const PilihKucing = () => {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]); // New state variable for selected cats

  useEffect(() => {
    axios.get('http://localhost:5000/api/cats')
      .then(response => {
        setCats(response.data);
      })
      .catch(error => {
        console.error('Error fetching cats:', error);
      });
  }, []);

  const handleSelect = (id_k) => {
    setSelectedCats(prevSelectedCats => {
      // If the cat is already selected, unselect it
      if (prevSelectedCats.includes(id_k)) {
        return prevSelectedCats.filter(catId => catId !== id_k);
      }
      // Otherwise, select the cat
      else {
        return [...prevSelectedCats, id_k];
      }
    });
  }

  const handleSubmit = () => {
    // Navigate to the next page with the selected cats as a state parameter
    navigate('/PilihDokter', { state: { selectedCats } });
  }

  return (
    <PageContainer title="Pilih Kucing">
      <div className="cat-selection">
        <ListGroup>
          {cats.map(cat => (
            <ListGroup.Item key={cat.id_k} className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src={`data:image/jpeg;base64,${cat.foto_kucing}`} alt="Cat" className="cat-icon" style={{ maxHeight: '350px', maxWidth: '350px' }} />
                <div className="ms-3">
                  <div>{cat.nama_k}</div>
                  <div>{cat.jenis}</div>
                </div>
              </div>
              <Button onClick={() => handleSelect(cat.id_k)} variant={selectedCats.includes(cat.id_k) ? "primary" : "outline-primary"}>
                {selectedCats.includes(cat.id_k) ? "Unselect" : "Select"}
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="mt-3">
          <Link to="/KonsultasiDokter">
            <Button variant="outline-secondary">Sebelumnya</Button>
          </Link>
          <Button onClick={handleSubmit} variant="outline-primary" disabled={selectedCats.length === 0}>Berikutnya</Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default PilihKucing;
