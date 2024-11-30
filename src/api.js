import axios from 'axios';

const API_KEY = '47264641-139baa2dc360fe62b105390da';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
