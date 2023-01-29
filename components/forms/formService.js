import axios from 'axios';
import { origin } from '../../src/config';
axios.defaults.withCredentials = true;

export const registerUser = async (clientData) => {
  return axios.post(
      origin + '/auth/local/register',
      {
        username: clientData.email,
        email: clientData.email,
        password: clientData.password,
      },
      {
        withCredentials: true,
        crossDomain: true,
      }
    )
    .then((response) => {
      if (response.data) {
        return { status: true, data: response.data };
      } else {
        return { status: false, data: response.data.message };
      }
    })
    .catch(function (error) {
      return { status: false, data: error.response.data.error.message };
    });
};

export const loginUser = async (clientData) => {
  return axios.post(
      origin + '/auth/local',
      {
        identifier: clientData.email,
        password: clientData.password,
      },
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
      return { status: false, data: error.response.data.error.message };
    });
};


export const getClientData = async (clientData) => {
    return axios.get(
        origin + '/clients/'+clientData.id,
        {
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${clientData.jwt}`
              },
        },
        {
           
          withCredentials: true,
          crossDomain: true,
        }
      )
      .then(async (response) => {
        console.log('the client data', response)
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





export const updateUserUsername = async (clientData) => {
    console.log(clientData)
    return axios.put(
        origin + '/users/'+clientData.id,
        {
          username: clientData.username         
        },
        {
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${clientData.jwt}`
              },
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
        return { status: false, data: error.response.data };
      });
  };


