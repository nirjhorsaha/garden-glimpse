
import envConfig from '@/src/config/envConfig';

export const getAllPosts = async (category?: string) => {
  const query = category ? `?category=${category}` : ''; // If a category is provided, filter by it
  
  const fetchOption = {
    next: {
      tags: ['posts'],
    },
  };

  // Fetch posts with the category query parameter if it's provided
  const res = await fetch(`${envConfig.baseApi}/post${query}`, fetchOption);

  if (!res.ok) {
    throw new Error('Error fetching posts');
  }

  return res.json();
};





export const getAllUsers = async () => {
  const fetchOption = {
    next: {
      tags: ['users'],
    },
  };

  const res = await fetch(`${envConfig.baseApi}/users`, fetchOption);

  return res.json();
};

export const getSinglePost = async (postId: string) => {

  const fetchOption = {
    next: {
      tags: ['posts'],
    },
  };

  const res = await fetch(`${envConfig.baseApi}/post/${postId}`, fetchOption);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};






