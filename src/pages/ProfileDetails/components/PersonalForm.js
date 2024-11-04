import React, { useEffect, useState } from 'react';
import { FaUser, FaCalendar, FaPhone, FaGlobe, FaBuilding } from 'react-icons/fa';

export default function PersonalForm({ formData, handleChange }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [phoneError, setPhoneError] = useState('');

  // Fetch countries when the component mounts
  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then(response => response.json())
      .then(data => setCountries(data.data.map(country => country.country)));
  }, []);

  // Fetch cities when the selected country changes
  useEffect(() => {
    if (formData.country) {
      fetch(`https://countriesnow.space/api/v0.1/countries/cities/q?country=${formData.country}`)
        .then(response => response.json())
        .then(data => setCities(data.data));
    } else {
      setCities([]);
    }
  }, [formData.country]);

  // Phone validation function
  const validatePhone = (phone) => {
    const phonePattern = /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return phonePattern.test(phone);
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    handleChange(e); // Call the original handleChange function
    if (!validatePhone(value)) {
      setPhoneError('Geçersiz telefon numarası formatı. Lütfen "+90 123 456 78 90" formatında girin.');
    } else {
      setPhoneError('');
    }
  };

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
          onChange={handlePhoneChange} // Update to use the new phone change handler
          placeholder="+90 123 456 78 90"
          required
        />
        {phoneError && <span className="error-message">{phoneError}</span>}
      </div>
      <div className="form-group">
        <label><FaGlobe /> Ülke</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Ülke Seçin</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label><FaBuilding /> Şehir</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          disabled={!formData.country}
        >
          <option value="">Şehir Seçin</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
