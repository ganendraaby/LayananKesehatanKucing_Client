import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PageContainer } from './Templates';
import './KonsultasiDokter.css';

const PilihDokter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [vets, setVets] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);

  // Retrieve selected cats from location state
  const selectedCats = location.state?.selectedCats || [];

  useEffect(() => {
    axios.get('http://localhost:5000/api/veterinarians')
      .then(response => {
        setVets(response.data);
      })
      .catch(error => {
        console.error('Error fetching veterinarians:', error);
      });
  }, []);

  const handleSelect = (id_d) => {
    setSelectedVet(id_d);
  }

  const handleSubmit = () => {
    // Navigate to the next page with the selected cats and selected vet as state parameters
    navigate(`/InfoJadwal/${selectedVet}`, { state: { selectedCats } });
  }

  return (
    <PageContainer title="Pilih Dokter">
      <div className="doctor-selection">
        <ListGroup>
          {vets.map(vet => (
            <ListGroup.Item key={vet.id_d} className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="ms-3">
                  <div>{vet.nama_d}</div>
                  <div>{vet.spesialisasi}</div>
                </div>
              </div>
              <Button onClick={() => handleSelect(vet.id_d)} variant={selectedVet === vet.id_d ? "primary" : "outline-primary"}>
                {selectedVet === vet.id_d ? "Unselect" : "Select"}
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="mt-3">
          <Link to="/PilihKucing">
            <Button variant="outline-secondary">Sebelumnya</Button>
          </Link>
          <Button onClick={handleSubmit} variant="outline-primary" disabled={!selectedVet}>Berikutnya</Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default PilihDokter;
