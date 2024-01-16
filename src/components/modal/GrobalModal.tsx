import React from 'react';

export default function GlobalModal() {
  const MODAL_TYPES = {
    LoginModal: 'LoginModal',
    BasicModal: 'BasicModal',
  };

  const MODAL_COMPONENTS = [
    {
      type: MODAL_TYPES.LoginModal,
      //   component: <LoginModal />,
    },
    {
      type: MODAL_TYPES.BasicModal,
      //   component: <BasicModal />,
    },
  ];
  return <div>GlobalModal</div>;
}
