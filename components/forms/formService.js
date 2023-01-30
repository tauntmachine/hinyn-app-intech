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

export const logoutUser = async () => {
  if(localStorage.getItem('hinyn-cjwt')){
    localStorage.removeItem('hinyn-cjwt');
    localStorage.removeItem('hinyn-cid');
    localStorage.removeItem('hinyn-uid');
    localStorage.removeItem('usertype');
  }
};



/* CLIENTS */


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


  export const addClientData = async (userData,jwt) => {
    return axios.post(
        origin + '/clients',
        {
          data: userData,
        },
        {
          headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
          withCredentials: true,
          crossDomain: true,
        }
      )
      .then((response) => {
        if (response.data) {
          return { status: true, data: response.data.data };
        } else {
          return { status: false, data: response.data.message };
        }
      })
      .catch(function (error) {
        return { status: false, data: error.response.data.error.message };
      });
  };

  export const updateClientData = async (clientData,clientId) => {
    const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
    return axios.put(
        origin + '/clients/'+clientId,
        {
          data: clientData         
        },
        {
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
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




  /* USERS */


export const getLoggedInUserData = async (clientData) => {
  return axios.get(
      origin + '/users/me?populate=client',
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
      console.log('the loggedin user data', response)
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


