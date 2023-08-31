import { useEffect, useState } from 'react';
import Modal from '../components/shared/Modal';
import UsernameForm from '../components/forms/UsernameForm';
import AccountTypeForm from '../components/forms/AccountTypeForm';
import { useRouter } from 'next/router';

function Registration() {
  const router = useRouter();
  const { value } = router.query;

  // const [clientData, setClientData] = useState({});
  const [open, setOpen] = useState(true);
  // const [currentActiveForm, setCurrentActiveForm] = useState(value);
  const handleClose = (e, reason) => {
    if (reason !== 'backdropClick') setOpen(false);
  };

  const handleSubmit = () => {
    console.log('submitted');
    // setCurrentActiveForm(2);
  };

  // const handleUsernameSubmit = (data) => {
  //   setClientData((prevData) => {
  //     return {
  //       ...prevData,
  //       data,
  //     };
  //   });
  //   setCurrentActiveForm('accountType');
  // };

  const formsSequence = {
    1: <UsernameForm />,
    2: <AccountTypeForm />,
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
        {formsSequence[value]}
      </Modal>
    </>
  );
}

export default Registration;
