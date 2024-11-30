export const fetchImg = async query => {
  const API_KEY = '47382150-e4fa89dff9896cf40fbc69b85';
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: 1,
  });
  const url = `https://pixabay.com/api/?${searchParams}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};
