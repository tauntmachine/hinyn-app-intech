import { useEffect, useState } from "react";
import Modal from "../components/shared/Modal";
import UsernameForm from "../components/forms/UsernameForm";
import AccountTypeForm from "../components/forms/AccountTypeForm";

function Registration() {
  const [clientData, setClientData] = useState({});
  const [open, setOpen] = useState(true);
  const [currentActiveForm, setCurrentActiveForm] = useState('default');
  const handleClose = (e,reason) => {
    if(reason !== 'backdropClick') setOpen(false);
  };


  const handleSubmit = () => {
    console.log('submitted')
  }

  const handleUsernameSubmit = (data) => {
    setClientData(prevData => {
        return {
            ...prevData,
            data
        }
    });
    setCurrentActiveForm('accountType')
  }

  const formsSequence = {
    'default': <UsernameForm onUsernameSubmit={handleUsernameSubmit}/>,
    'accountType': <AccountTypeForm />
  }
  
  return (
    <>
    <Modal handleClose={handleClose} handleSubmit={handleSubmit} isOpen={open} hasHeader={false} hasFooter={false} >
        {formsSequence[currentActiveForm]}
    </Modal>
    </>
  )
}

export default Registration