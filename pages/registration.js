import { useEffect, useState } from 'react';
import Modal from '../components/shared/Modal';
import UsernameForm from '../components/forms/UsernameForm';
import AccountTypeForm from '../components/forms/AccountTypeForm';
import {
  updateUserUsername,
  addClientData,
  updateUserData,
} from '../components/forms/formService';

function Registration() {
  const [clientData, setClientData] = useState({});
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState(true);
  const [currentActiveForm, setCurrentActiveForm] = useState('default');
  const handleClose = (e, reason) => {
    if (reason !== 'backdropClick') setOpen(false);
  };

  const handleSubmit = () => {
    console.log('submitted');
  };

  const handleUsernameSubmit = (data) => {
    // setClientData((prevData) => {
    //   return {
    //     ...prevData,
    //     data,
    //   };
    // });

    const userId = localStorage.getItem('hinyn-uid');
    const jwt = localStorage.getItem('hinyn-cjwt');
    const clientData = {
      id: userId,
      username: data,
      jwt: jwt,
    };
    updateUserUsername(clientData).then((result) => {
      if (result.status) {
        const clientId = localStorage.getItem('hinyn-cid');
        updateUserData(clientId).then((res) => {
          if (res?.data) {
            setCurrentActiveForm('accountType');
          }
        });
      } else {
        setMessage('Incorrect input.');
        console.log(message);
        setOpen(true);
      }
    });
    // setCurrentActiveForm(2);
  };

  const formsSequence = {
    default: <UsernameForm onUsernameSubmit={handleUsernameSubmit} />,
    accountType: <AccountTypeForm />,
  };

  return (
    <>
      <Modal
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isOpen={open}
        hasHeader={false}
        hasFooter={false}
      >
        {formsSequence[currentActiveForm]}
      </Modal>
    </>
  );
}

export default Registration;
