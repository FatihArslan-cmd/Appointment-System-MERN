import React from 'react';
import { FaBuilding, FaGlobe, FaClock } from 'react-icons/fa';

export default function BusinessForm({ formData, handleChange }) {
  return (
    <div className="form-section">
      <h3>Kurumsal Hesap Detayları</h3>
      <div className="form-group">
        <label><FaBuilding /> İşletme Adı</label>
        <input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label><FaGlobe /> İşletme Türü</label>
        <select 
          name="businessType" 
          value={formData.businessType} 
          onChange={handleChange}
          required
        >
          <option value="Retail">Perakende</option>
          <option value="Manufacturing">Üretim</option>
          <option value="Services">Hizmet</option>
          <option value="Technology">Teknoloji</option>
          <option value="Custom">Diğer</option>
        </select>
      </div>
      <div className="form-group">
        <label><FaClock /> İş Saatleri</label>
        <input
          type="text"
          name="operatingHours"
          value={formData.operatingHours}
          onChange={handleChange}
          placeholder="09:00 - 18:00"
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
