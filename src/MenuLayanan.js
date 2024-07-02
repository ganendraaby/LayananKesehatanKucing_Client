import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MenuLayanan.css';

const MenuLayanan = () => {
    return (
        <div className="container-fluid service-menu">
            <div className="row">
                <div className="col-md-2 sidebar">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Menu layanan</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Logout</a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-10 content">
                    <div className="header">
                        <div className="breadcrumb">
                            <span>Menu Layanan</span> &gt; <span className="active">Pilih Layanan</span>
                        </div>
                        <div className="profile">
                            <button className="btn btn-outline-light">Profile</button>
                        </div>
                    </div>
                    <div className="service-options">
                        <h2>Menu Layanan</h2>
                        <p>Silahkan pilih layanan yang tersedia</p>
                        <div className="buttons">
                            <button className="btn btn-outline-light">Grooming</button>
                            <Link to="/KonsultasiDokter">
                                <button className="btn btn-outline-light">Konsultasi Dokter</button>
                            </Link>
                            <button className="btn btn-outline-light">Penitipan kucing</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuLayanan;
