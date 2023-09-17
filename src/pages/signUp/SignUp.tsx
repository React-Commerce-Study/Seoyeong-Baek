import { useState } from 'react';
import Modal from '../../components/modal/Modal';
import FormContainer from '../../components/common/form/FormContainer';

export default function SignUp() {
  const [successUserName, setSuccessUserName] = useState<string>('');

  return (
    <>
      <FormContainer setSuccessUserName={setSuccessUserName} />
      {successUserName !== '' && <Modal type={'successSignUp'} successUserName={successUserName} />}
    </>
  );
}
