import React, { useState } from 'react';
import { FaBriefcase, FaUser, FaPhone, FaCalendar, FaBuilding, FaGlobe } from 'react-icons/fa';
import { Player } from '@lottiefiles/react-lottie-player';
import './index.css';

export default function ProfileDetails() {
  const [accountType, setAccountType] = useState(null);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'others',
    contactNumber: '',
    firstName: '',
    lastName: '',
    birthDate: ''
  });

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setFormData({
      businessName: '',
      businessType: 'Retail',
      contactNumber: '',
      firstName: '',
      lastName: '',
      birthDate: ''
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-details-container">
      <h2>Account Type Selection</h2>
      <div className="account-type-selection">
        <button
          className={`account-button ${accountType === 'business' ? 'selected' : ''}`}
          onClick={() => handleAccountTypeChange('business')}
        >
          <FaBriefcase /> Business Account
        </button>
        <button
          className={`account-button ${accountType === 'personal' ? 'selected' : ''}`}
          onClick={() => handleAccountTypeChange('personal')}
        >
          <FaUser /> Personal Account
        </button>
      </div>

      {accountType === 'business' && (
        <div className="form-section">
          <h3>Business Account Details</h3>
          <div className="form-group">
            <label><FaBuilding /> Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label><FaGlobe /> Business Type</label>
            <select name="businessType" value={formData.businessType} onChange={handleChange}>
              <option value="Retail">Retail</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Services">Services</option>
              <option value="Technology">Technology</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          <div className="form-group">
            <label><FaPhone /> Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="+90 123 456 78 90"
            />
          </div>
        </div>
      )}

      {accountType === 'personal' && (
        <div className="form-section">
          <h3>Personal Account Details</h3>
          <div className="form-group">
            <label><FaUser /> First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label><FaUser /> Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label><FaCalendar /> Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      <div className="lottie-container">
        {accountType === 'business' && (
          <Player
            src="https://assets1.lottiefiles.com/packages/lf20_myejiggj.json"
            className="player"
            loop
            autoplay
          />
        )}
        {accountType === 'personal' && (
          <Player
            src="https://assets1.lottiefiles.com/packages/lf20_myejiggj.json"  // Replace with desired animation URL for personal account
            className="player"
            loop
            autoplay
          />
        )}
      </div>
    </div>
  );
}
