import React from 'react';
import { FaUser, FaCalendar, FaPhone, FaGlobe, FaBuilding } from 'react-icons/fa';

export default function PersonalForm({ formData, handleChange }) {
  return (
    <div className="form-section">
      <h3>Bireysel Hesap Detayları</h3>
      <div className="form-group">
        <label><FaUser /> Ad</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label><FaUser /> Soyad</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label><FaCalendar /> Doğum Tarihi</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label><FaPhone /> Telefon</label>
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="+90 123 456 78 90"
          required
        />
      </div>
      <div className="form-group">
        <label><FaGlobe /> Ülke</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label><FaBuilding /> Şehir</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
}
