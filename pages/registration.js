import { useEffect, useState } from 'react';
import Modal from '../components/shared/Modal';
import UsernameForm from '../components/forms/UsernameForm';
import AccountTypeForm from '../components/forms/AccountTypeForm';
import {
  updateUserUsername,
  addClientData,
  updateUserData,
} from '../components/forms/formService';
import { useRouter } from 'next/router';

function Registration() {
  const router = useRouter();
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
    const userId = localStorage.getItem('hinyn-uid');
    const jwt = localStorage.getItem('hinyn-cjwt');
    const clientData = {
      id: userId,
      username: data,
      jwt: jwt,
    };
    const userData = {
      uuid: 'client-' + userId,
      user: userId,
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

  const accountType = (type) => {
    let accountType = type === 'professional' ? 1 : 2;
    const clientId = localStorage.getItem('hinyn-cid');
    const userId = localStorage.getItem('hinyn-uid');
    const jwt = localStorage.getItem('hinyn-cjwt');
    const userData = {
      accountType: accountType,
      user: userId,
      uuid: `client-${clientId}`,
    };

    addClientData(userData, jwt).then((res) => {
      if (res?.status) {
        localStorage.setItem('hinyn-cid', res?.data?.id);
        localStorage.setItem('hinyn-clientData', JSON.stringify(res?.data));
        if (accountType === 1) router.push('/professional');
        else router.push('/dashboard');
      }
    });
    // updateClientData(userData, clientId).then((res) => {
    //   console.log(JSON.stringify(res));
    //   if (accountType === 1) router.push('/professional');
    //   else router.push('/dashboard');
    // });
  };

  const formsSequence = {
    default: <UsernameForm onUsernameSubmit={handleUsernameSubmit} />,
    accountType: <AccountTypeForm accountType={accountType} />,
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
