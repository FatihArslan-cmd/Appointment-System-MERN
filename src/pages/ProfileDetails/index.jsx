import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../../utils/api';
import AccountTypeSelector from './components/AccountTypeSelector';
import BusinessForm from './components/BusinessForm';
import PersonalForm from './components/PersonalForm';
import './index.css';

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
        <AccountTypeSelector 
          accountType={accountType} 
          onAccountTypeChange={handleAccountTypeChange} 
        />

        {accountType === 'business' && (
          <BusinessForm formData={formData} handleChange={handleChange} />
        )}

        {accountType === 'personal' && (
          <PersonalForm formData={formData} handleChange={handleChange} />
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