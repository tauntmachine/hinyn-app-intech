import axios from 'axios';
import { origin } from '../../src/config';
axios.defaults.withCredentials = true;


/* BIDS */
  export const addBidData = async (bidData) => {
    const jwt = localStorage.getItem('hinyn-cjwt');
    return axios.post(
        origin + '/bids',
        {
          data: bidData,
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

  export const getBids= async (bidId) => {
    const jwt = localStorage.getItem('hinyn-cjwt');
    return axios.get(
        origin + "/bids/?populate=*",
        {
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
              },
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
        return { status: false, data: error };
      });
  };

  export const getBidData = async (bidId) => {
    const jwt = localStorage.getItem('hinyn-cjwt');
    return axios.get(
        origin + '/bids/'+bidId+"?populate=*",
        {
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
              },
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
        return { status: false, data: error };
      });
  };

  export const getBidsOfClient = async () => {
    const jwt = localStorage.getItem('hinyn-cjwt');
    const cid = localStorage.getItem('hinyn-cid');
    return axios.get(
        origin + "/bids?filters[client][id][$eq]="+cid+"&populate=*",
        {
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
              },
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
        return { status: false, data: error };
      });
  };



  export const getBidProposals= async (bidId) => {
    const jwt = localStorage.getItem('hinyn-cjwt');
    return axios.get(
        origin + '/bids/'+bidId+"?populate=proposals",
        {
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
              },
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
        return { status: false, data: error };
      });
  };

  export const updateBidData = async (proposalData,bidId) => {
    const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
    return axios.put(
        origin + '/bids/'+bidId,
        {
          data: proposalData         
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

export const logoutUser = () => {
  if(localStorage.getItem('hinyn-cjwt')){
    localStorage.removeItem('hinyn-cjwt');
    localStorage.removeItem('hinyn-cid');
    localStorage.removeItem('hinyn-uid');
    localStorage.removeItem('hinyn-usertype');
  }
};



/* CLIENTS */


export const getClients = async () => {
  return axios.get(
      origin + '/clients/',
      {
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
      return { status: false, data: error };
    });
};


export const getClientData = async (clientData) => {
    const jwt = localStorage.getItem('hinyn-cjwt');
    return axios.get(
        origin + '/clients/'+clientData.id,
        {
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
              },
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
export const getLoggedInUserData = async () => {
  const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
  return axios.get(
      origin + '/users/me?populate=client',
      {
          headers:{
              'Accept' : 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt}`
            },
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


export const updateUserData= async (clientId) => {
  const userId = localStorage.getItem('hinyn-uid');
  const jwt = localStorage.getItem('hinyn-cjwt');
    return axios.put(
        origin + '/users/'+userId,
        {
          client: clientId        
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


  /* Categories */
  export const getCategories = async () => {
    const jwt = localStorage.getItem('hinyn-cjwt');
    return axios.get(
        origin + '/categories',
        {
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
              },
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
        return { status: false, data: error };
      });
  };


  /* skills */
  export const getSkills= async (categoryId) => {
    const jwt = localStorage.getItem('hinyn-cjwt');
    return axios.get(
        origin + '/categories/'+categoryId+"?populate=*",
        {
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
              },
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
        return { status: false, data: error };
      });
  };





  /* professional category */
  export const addProfessionalCategoriesData = async (userData) => {
    const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
    return axios.post(
        origin + '/professional-categories',
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


  /* PROPOSALS */
  export const addProposal = async (proposalData) => {
    const jwt = localStorage.getItem('hinyn-cjwt') ?? '';
    return axios.post(
        origin + '/proposals',
        {
          data: proposalData,
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

  export const getProposals= async () => {
    const jwt = localStorage.getItem('hinyn-cjwt');
    return axios.get(
        origin + "/proposals?populate=*",
        {
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
              },
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
        return { status: false, data: error };
      });
  };

  export const getProposalsOfClient = async () => {
    const jwt = localStorage.getItem('hinyn-cjwt');
    const cid = localStorage.getItem('hinyn-cid');
    return axios.get(
        origin + "/proposals?filters[client][id][$eq]="+cid+"&populate=*",
        {
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
              },
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
        return { status: false, data: error };
      });
  };








  


