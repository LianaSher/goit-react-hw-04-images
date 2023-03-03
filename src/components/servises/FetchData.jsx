import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32967431-2c53db117de8c0f5af1f13e74';

export const FetchData = async (search, page) => {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q="${search}"&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );

  return response.data.hits;
};
