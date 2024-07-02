import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { PageContainer } from './Templates';
import './KonsultasiDokter.css';

const InfoJadwal = () => {
  const { id_d } = useParams();
  const { vetId } = useState();  // Get the vetId from the URL parameters
  const [vet, setVet] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // Retrieve selected cats from location state
  const selectedCats = location.state?.selectedCats || [];

  useEffect(() => {
    // Fetch veterinarian details
    axios.get(`http://localhost:5000/api/veterinarians/${id_d}`)
      .then(response => setVet(response.data))
      .catch(error => {
        console.error('Error fetching veterinarian details:', error);
      });

    // Fetch veterinarian's schedules
    axios.get(`http://localhost:5000/api/veterinarians/${id_d}/schedules`)
      .then(response => {
        setSchedules(response.data);
      })
      .catch(error => {
        console.error('Error fetching veterinarian schedules:', error);
      });
  }, [id_d]);

  const handleSelect = (id_j) => {
    setSelectedSchedule(id_j);
  }

  const handleSubmit = () => {
    // Navigate to the next page with the selected cats, doctor, and schedule as state parameters
    navigate(`/Konfirmasi/${id_d}/${selectedSchedule}`, { state: { selectedCats } });
  }

  return (
    <PageContainer title="Info & Jadwal">
      <Card className="mb-3">
        <Card.Body>
          <><Card.Title>{vet.nama_d}</Card.Title><Card.Text>{vet.spesialisasi}</Card.Text><Card.Text>Biaya: Rp. {vet.biaya}</Card.Text><Card.Text>Lulusan: {vet.pendidikan_terakhir}</Card.Text></>
        </Card.Body>
      </Card>
      <ListGroup>
        {schedules.map(schedule => (
          <ListGroup.Item key={schedule.id_j} className="d-flex justify-content-between align-items-center">
            <div className="ms-3">
              <div>{new Date(schedule.tanggal).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              <div>{schedule.waktu}</div>
            </div>
            <Button onClick={() => handleSelect(schedule.id_jd)} variant={selectedSchedule === schedule.id_jd ? "primary" : "outline-primary"}>
              {selectedSchedule === schedule.id_jd ? "Unselect" : "Select"}
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="mt-3">
        <Link to="/PilihDokter">
          <Button variant="outline-secondary">Sebelumnya</Button>
        </Link>
        <Button onClick={handleSubmit} variant="outline-primary" disabled={!selectedSchedule}>Berikutnya</Button>
      </div>
    </PageContainer>
  );
};

export default InfoJadwal;
