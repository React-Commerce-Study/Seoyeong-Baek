import { useState } from 'react';

import FormContainer from '../components/common/form/FormContainer';
import Modal from '../components/modal/Modal';

export default function SignUp() {
  const [successUserName, setSuccessUserName] = useState<string>('');

  return (
    <>
      <FormContainer setSuccessUserName={setSuccessUserName} />
      {successUserName !== '' && <Modal type="successSignUp" successUserName={successUserName} />}
    </>
  );
}
