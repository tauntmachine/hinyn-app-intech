import axios from 'axios';
import { origin } from './config';
axios.defaults.withCredentials = true;

export const getApiSkill = async () => {
  return axios
    .get(
      origin + '/clients?populate=*',
      {},
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then(async (response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error };
    });
};
