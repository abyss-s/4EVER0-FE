import axios from 'axios';

export const assignRandomPlan = async () => {
  return axios.post('/user/plans/random');
};
