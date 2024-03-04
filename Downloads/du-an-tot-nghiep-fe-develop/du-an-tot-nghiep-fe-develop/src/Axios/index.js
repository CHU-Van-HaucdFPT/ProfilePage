import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'https://du-an-tot-nghiep-be-1.vercel.app',
  headers: { 'X-Custom-Header': 'foobar' }
});

export const getProducts = async () => {
  try {
    const response = await apiService.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
export default instanceAxios