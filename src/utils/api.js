import axios from 'axios';

export const API_URL = 'http://localhost:3001/users';

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Kullanıcılar alınırken bir hata oluştu:', error);
    throw error; 
  }
};

export const addUser = async (userData) => {
  try {
    const users = await getUsers();
    const emailExists = users.some(user => user.email === userData.email);
    
    if (emailExists) {
      throw new Error("Email already exists.");
    }

    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Kullanıcı eklenirken bir hata oluştu:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Kullanıcı güncellenirken bir hata oluştu:', error);
    throw error;
  }
};
