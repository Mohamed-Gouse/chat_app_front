import axios from 'axios';
import { signin } from '../app/authSlice';

const BASE_URL = 'http://127.0.0.1:8000/api/';

export const axiosIn = axios.create({
  baseURL: BASE_URL,
})

export const register = async (formData) => {
  try {
    const response = await axiosIn.post('user/register/', formData)
    return response
  } catch (error) {
    throw error
  }
}

export const login = (formData) => async (dispatch) => {
  try {
    const response = await axiosIn.post('user/login/', formData)
    dispatch(signin(response.data))
    console.log(response.data);
    return response
  } catch (error) {
    throw error
  }
}

export const usersList = async (token) => {
  try {
    const response = await axiosIn.get('user/user-list/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}
