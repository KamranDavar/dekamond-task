import { RandomUserResponse, User } from '@/types/user.types';

export const fetchRandomUser = async (): Promise<User> => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: RandomUserResponse = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error('No user data received');
    }
    
    return data.results[0];
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user data');
  }
};