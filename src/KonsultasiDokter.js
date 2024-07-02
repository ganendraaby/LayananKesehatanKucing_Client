import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { PageContainer } from './Templates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './KonsultasiDokter.css';

const KonsultasiDokter = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointment data:', error);
      });
  }, []);

  const handleCancel = (id_jt) => {
    axios.put(`http://localhost:5000/api/appointments/${id_jt}`, { status: 'Dibatalkan' })
      .then(() => {
        setAppointments(appointments.map(appointment => 
          appointment.id_jt === id_jt ? { ...appointment, status: 'Dibatalkan' } : appointment
        ));
      })
      .catch(error => {
        console.error('Error updating appointment status:', error);
      });
  };

  const handleDelete = (id_jt) => {
    axios.delete(`http://localhost:5000/api/appointments/${id_jt}`)
      .then(() => {
        setAppointments(appointments.filter(appointment => appointment.id_jt !== id_jt));
      })
      .catch(error => {
        console.error('Error deleting appointment:', error);
      });
  };

  return (
    <PageContainer title="History Pemesanan">
      <div className="mt-3">
        <Link to="/PilihKucing">
          <Button variant="outline-primary"><FontAwesomeIcon icon={faCirclePlus} /> Buat Janji</Button>
        </Link>
      </div>
      <div className="table-responsive mt-3">
        <Table variant="dark" bordered>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>Dokter</th>
              <th>Status</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment.id_jt}>
                <td>{index + 1}</td>
                <td>{new Date(appointment.tanggal).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                <td>{appointment.waktu}</td>
                <td>{appointment.nama_d}</td>
                <td>{appointment.status}</td>
                <td>
                  {appointment.status === 'Dijadwalkan' ? (
                    <Button variant="outline-danger" onClick={() => handleCancel(appointment.id_jt)}><FontAwesomeIcon icon={faBan} /> Batalkan</Button>
                  ) : (
                    <Button variant="outline-light" onClick={() => handleDelete(appointment.id_jt)}><FontAwesomeIcon icon={faTrash} /> Hapus</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </PageContainer>
  );
};

export default KonsultasiDokter;
