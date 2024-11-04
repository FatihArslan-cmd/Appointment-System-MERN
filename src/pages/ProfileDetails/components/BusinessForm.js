import React, { useEffect, useState } from 'react';
import { FaBuilding, FaGlobe, FaClock, FaCalendar, FaMapMarker, FaCreditCard, FaPhone } from 'react-icons/fa';

export default function BusinessForm({ formData, handleChange }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [phoneError, setPhoneError] = useState(null);

  const daysOfWeek = [
    { id: 'monday', label: 'Pazartesi' },
    { id: 'tuesday', label: 'Salı' },
    { id: 'wednesday', label: 'Çarşamba' },
    { id: 'thursday', label: 'Perşembe' },
    { id: 'friday', label: 'Cuma' },
    { id: 'saturday', label: 'Cumartesi' },
    { id: 'sunday', label: 'Pazar' }
  ];

  const paymentMethods = [
    { id: 'cash', label: 'Nakit' },
    { id: 'card', label: 'Kart' },
    { id: 'both', label: 'Her İkisi' }
  ];
  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    const phoneRegex = /^\+?\d{10,14}$/; // Accepts + and 10-14 digits
    handleChange(e);
    
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError('Lütfen geçerli bir telefon numarası girin (örn: +905001234567 veya 05001234567)');
    } else {
      setPhoneError(null);
    }
  };

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then(response => response.json())
      .then(data => setCountries(data.data.map(country => country.country)));
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetch(`https://countriesnow.space/api/v0.1/countries/cities/q?country=${formData.country}`)
        .then(response => response.json())
        .then(data => setCities(data.data));
    } else {
      setCities([]);
    }
  }, [formData.country]);

  const handleDayChange = (dayId, isChecked) => {
    const currentSchedule = formData.schedule || {};
    
    if (isChecked) {
      handleChange({
        target: {
          name: 'schedule',
          value: {
            ...currentSchedule,
            [dayId]: { isOpen: true, start: '09:00', end: '18:00' }
          }
        }
      });
    } else {
      const { [dayId]: removed, ...remainingDays } = currentSchedule;
      handleChange({
        target: {
          name: 'schedule',
          value: remainingDays
        }
      });
    }
  };

  const handleHoursChange = (dayId, field, value) => {
    const currentSchedule = formData.schedule || {};
    handleChange({
      target: {
        name: 'schedule',
        value: {
          ...currentSchedule,
          [dayId]: {
            ...currentSchedule[dayId],
            [field]: value
          }
        }
      }
    });
  };

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
          <option value="">İşletme türü seçin</option>
          <option value="Retail">Perakende</option>
          <option value="Manufacturing">Üretim</option>
          <option value="Services">Hizmet</option>
          <option value="Technology">Teknoloji</option>
          <option value="Custom">Diğer</option>
        </select>
      </div>

      <div className="form-group">
        <label><FaCreditCard /> Ödeme Yöntemleri</label>
        <div className="payment-methods">
          {paymentMethods.map(method => (
            <div key={method.id} className="payment-option">
              <input
                type="radio"
                id={`payment-${method.id}`}
                name="paymentMethod"
                value={method.id}
                checked={formData.paymentMethod === method.id}
                onChange={handleChange}
              />
              <label htmlFor={`payment-${method.id}`}>{method.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label><FaCalendar /> Çalışma Günleri ve Saatleri</label>
        <div className="days-container">
          {daysOfWeek.map(day => {
            const daySchedule = formData.schedule?.[day.id] || {};
            const isChecked = !!daySchedule.isOpen;

            return (
              <div key={day.id} className="day-schedule">
                <div className="day-header">
                  <div className="day-checkbox">
                    <input
                      type="checkbox"
                      id={day.id}
                      checked={isChecked}
                      onChange={(e) => handleDayChange(day.id, e.target.checked)}
                    />
                    <label htmlFor={day.id}>{day.label}</label>
                  </div>
                </div>
                
                {isChecked && (
                  <div className="hours-inputs">
                    <div className="time-input">
                      <label>Açılış:</label>
                      <input
                        type="time"
                        value={daySchedule.start || '09:00'}
                        onChange={(e) => handleHoursChange(day.id, 'start', e.target.value)}
                      />
                    </div>
                    <div className="time-input">
                      <label>Kapanış:</label>
                      <input
                        type="time"
                        value={daySchedule.end || '18:00'}
                        onChange={(e) => handleHoursChange(day.id, 'end', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="form-group">
        <label><FaPhone /> Telefon Numarası</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber || ''}
          onChange={handlePhoneChange}
          placeholder="+905001234567 veya 05001234567"
          required
        />
        {phoneError && <span className="error-message">{phoneError}</span>}
      </div>
      <div className="address-section">
      <label> Adres bilgileri</label>
        
        <div className="form-group">
          <label>Ülke</label>
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
          <label>Şehir</label>
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

        <div className="form-group">
          <label>İlçe</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="İlçe adı"
            required
          />
        </div>

        <div className="form-group">
          <label>Mahalle</label>
          <input
            type="text"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            placeholder="Mahalle adı"
            required
          />
        </div>

        <div className="form-group">
          <label>Sokak</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Sokak adı"
            required
          />
        </div>

        <div className="form-group">
          <label>Detaylı Adres</label>
          <textarea
            name="addressDetail"
            value={formData.addressDetail}
            onChange={handleChange}
            placeholder="Bina no, daire no, vb."
            rows="3"
          />
        </div>
      </div>

      <style jsx>{`
        .form-section {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        h3, h4 {
          color: #333;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #eee;
        }

        h3 {
          font-size: 1.5rem;
        }

        h4 {
          font-size: 1.2rem;
          margin-top: 30px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
          margin-bottom: 8px;
          color: #444;
        }

        input, select, textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        textarea {
          resize: vertical;
          min-height: 80px;
        }

        input:focus, select:focus, textarea:focus {
          border-color: #2196F3;
          outline: none;
        }

        .payment-methods {
          display: flex;
          gap: 20px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: #f8f9fa;
        }

        .payment-option {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .payment-option input[type="radio"] {
          width: auto;
          margin: 0;
        }

        .payment-option label {
          margin: 0;
          cursor: pointer;
        }

        .days-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .day-schedule {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 6px;
          border: 1px solid #e9ecef;
        }

        .day-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .day-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .day-checkbox input[type="checkbox"] {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .day-checkbox label {
          margin: 0;
          cursor: pointer;
          font-weight: 500;
        }

        .hours-inputs {
          display: flex;
          gap: 15px;
          padding-top: 10px;
          margin-top: 10px;
          border-top: 1px solid #e9ecef;
        }

        .time-input {
          flex: 1;
        }

        .time-input label {
          display: block;
          font-size: 0.875rem;
          margin-bottom: 5px;
          color: #666;
        }

        .time-input input[type="time"] {
          width: 100%;
          padding: 8px;
        }

        .address-section {
          margin-top: 10px;
        }

        select:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }

        input::placeholder,
        textarea::placeholder {
          color: #aaa;
        }

        @media (max-width: 480px) {
          .hours-inputs {
            flex-direction: column;
            gap: 10px;
          }
          
          .form-section {
            padding: 15px;
          }

          .payment-methods {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}