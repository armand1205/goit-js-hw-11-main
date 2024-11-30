export function fetchImg(query) {
    const searchParams = new URLSearchParams({
      key: '47193227-eb3ce661dcb56760e85b83cac',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
    const url = `https://pixabay.com/api/?${searchParams}`;
  
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }