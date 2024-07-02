import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { PageContainer } from './Templates';
import './KonsultasiDokter.css';

const Konfirmasi = () => {
  const { id_d, id_j } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [vet, setVet] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [cats, setCats] = useState([]);
  const [error, setError] = useState(null);

  const selectedCats = location.state?.selectedCats || [];

  useEffect(() => {
    axios.get(`http://localhost:5000/api/veterinarians/${id_d}`)
      .then(response => setVet(response.data))
      .catch(error => {
        console.error('Error fetching veterinarian details:', error);
        setError('Failed to fetch veterinarian details');
      });

    axios.get(`http://localhost:5000/api/veterinarians/${id_d}/schedules/${id_j}`)
      .then(response => {
        setSchedule(response.data);
      })
      .catch(error => {
        console.error('Error fetching schedule:', error.response?.data || error.message);
        setError('Failed to fetch schedule');
      });

    axios.get(`http://localhost:5000/api/cats`)
      .then(response => {
        const selectedCatDetails = response.data.filter(cat => selectedCats.includes(cat.id_k));
        setCats(selectedCatDetails);
      })
      .catch(error => {
        console.error('Error fetching cats:', error);
        setError('Failed to fetch cats');
      });
  }, [id_d, id_j, selectedCats]);

  const handleConfirm = () => {
    const appointmentData = {
      id_jd: id_j,
      cats: selectedCats,
      status: 'Dijadwalkan',
    };

    axios.post('http://localhost:5000/api/appointments', appointmentData)
      .then(response => {
        navigate('/KonsultasiDokter');
      })
      .catch(error => {
        console.error('Error creating appointment:', error);
        setError('Failed to create appointment');
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <PageContainer title="Konfirmasi Janji Temu">
      <div className="confirmation">
        <Card className="confirmation-card">
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <strong>Kucing:</strong> {cats.map(cat => cat.nama_k).join(', ')}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Dokter:</strong> {vet && vet.nama_d}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Jadwal:</strong> {schedule && `${new Date(schedule.tanggal).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })} ${schedule.waktu}`}
              </ListGroup.Item>
            </ListGroup>
            <Button variant="success" className="mt-3" onClick={handleConfirm}>Konfirmasi</Button>
          </Card.Body>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Konfirmasi;
