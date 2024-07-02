import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './KonsultasiDokter.css';

export const Sidebar = () => (
  <Col md={2} className="sidebar">
    <ul className="nav flex-column">
      <li className="nav-item">
        <a className="nav-link" href="#">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Dashboard</a>
      </li>
      <li className="nav-item">
        <a className="nav-link active" href="..">Menu layanan</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Profile</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Logout</a>
      </li>
    </ul>
  </Col>
);

export const Header = ({ title }) => (
  <>
    <div className="header">
      <div className="breadcrumb">
        <span>Menu Layanan</span> &gt; <span>Pilih Layanan</span> &gt; <span>Konsultasi Dokter</span> &gt; <span className="active">{title}</span>
      </div>
      <div className="profile">
        <Button variant="outline-light">Profile</Button>
      </div>
    </div>
    <Row>
      <Col md={10} className="title-col">
        <h2>Konsultasi Dokter</h2>
      </Col>
      <Col md={2} className="back-col">
        <Link to="/">
          <Button variant="warning">Menu Layanan</Button>
        </Link>
      </Col>
    </Row>
    <h4>{ title }</h4>
  </>
);

export const PageContainer = ({ title, children }) => (
  <Container className="mt-5 consultation-page">
    <Row>
      <Sidebar />
      <Col md={10} className="content">
        <Header title={title} />
        {children}
      </Col>
    </Row>
  </Container>
);
