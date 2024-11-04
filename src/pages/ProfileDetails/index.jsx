import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaUser, FaPhone, FaCalendar, FaBuilding, FaGlobe, FaClock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/api';

// Add styles
const styles = `
  .profile-details-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .profile-details-container h2 {
    color: #2d3748;
    font-size: 1.8rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .account-type-selection {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
  }

  .account-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    background: white;
    color: #4a5568;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .account-button:hover {
    border-color: #4299e1;
    color: #4299e1;
  }

  .account-button.selected {
    background: #4299e1;
    color: white;
    border-color: #4299e1;
  }

  .form-section {
    background: #f8fafc;
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .form-section h3 {
    color: #2d3748;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #4a5568;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .form-group input,
  .form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
  }

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #4299e1;
  }

  .submit-button {
    width: 100%;
    padding: 1rem;
    background: #4299e1;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .submit-button:hover {
    background: #3182ce;
  }

  .submit-button:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }

  .loading {
    text-align: center;
    color: #4a5568;
    font-size: 1.2rem;
    padding: 2rem;
  }

  @media (max-width: 640px) {
    .profile-details-container {
      margin: 1rem;
      padding: 1rem;
    }

    .account-type-selection {
      flex-direction: column;
    }

    .account-button {
      width: 100%;
      justify-content: center;
    }

    .form-section {
      padding: 1rem;
    }
  }
`;

export default function ProfileDetails() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState(null);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'Retail',
    contactNumber: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    country: '',
    city: '',
    operatingHours: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          toast.error('Lütfen önce giriş yapın');
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_URL}/${userId}`);
        const userData = response.data;

        if (userData.accountType) {
          setAccountType(userData.accountType);
          setFormData({
            ...formData,
            ...userData
          });
        }
      } catch (error) {
        console.error('Kullanıcı bilgileri alınamadı:', error);
        toast.error('Kullanıcı bilgileri alınamadı');
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [navigate]);

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setFormData({
      businessName: '',
      businessType: 'Retail',
      contactNumber: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      country: '',
      city: '',
      operatingHours: ''
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
        navigate('/login');
        return;
      }

      const updateData = {
        accountType,
        ...formData,
      };

      if (accountType === 'personal') {
        delete updateData.businessName;
        delete updateData.businessType;
        delete updateData.operatingHours;
      }
      if (accountType === 'business') {
        delete updateData.firstName;
        delete updateData.lastName;
        delete updateData.birthDate;
      }

      await axios.patch(`${API_URL}/${userId}`, updateData);
      toast.success('Profil bilgileriniz başarıyla güncellendi');
      navigate('/home');
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      toast.error('Profil güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="profile-details-container">
      <h2>Hesap Bilgilerini Tamamla</h2>
      <form onSubmit={handleSubmit}>
        <div className="account-type-selection">
          <button
            type="button"
            className={`account-button ${accountType === 'business' ? 'selected' : ''}`}
            onClick={() => handleAccountTypeChange('business')}
          >
            <FaBriefcase /> Kurumsal Hesap
          </button>
          <button
            type="button"
            className={`account-button ${accountType === 'personal' ? 'selected' : ''}`}
            onClick={() => handleAccountTypeChange('personal')}
          >
            <FaUser /> Bireysel Hesap
          </button>
        </div>

        {accountType === 'business' && (
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
        )}

        {accountType === 'personal' && (
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
        )}

        <button 
          type="submit" 
          className="submit-button"
          disabled={!accountType || loading}
        >
          {loading ? 'Kaydediliyor...' : 'Bilgileri Kaydet'}
        </button>
      </form>
      
      <ToastContainer position="top-right" />
    </div>
  );
}