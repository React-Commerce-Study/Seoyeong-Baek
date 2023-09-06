import DaumPostcodeEmbed from 'react-daum-postcode';
import styled from 'styled-components';
import DeleteIcon from '../../assets/icon/icon-delete.svg';

interface AddressModalProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddressModal({ setIsOpenModal, setAddress }: AddressModalProps) {
  const handleComplete = (data: { address: string; addressType: string; bname: string; buildingName: string }) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    console.log(fullAddress);
    closeModal();
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  // 모달을 클릭했을 때는 모달이 닫히지 않도록
  const handleModalLayoutClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <SModalBackground onClick={closeModal}>
      <SModalLayout onClick={handleModalLayoutClick}>
        <DaumPostcodeEmbed onComplete={handleComplete} />
        <button className="delete-btn" onClick={closeModal}>
          <img src={DeleteIcon} alt="" />
        </button>
      </SModalLayout>
    </SModalBackground>
  );
}

const SModalBackground = styled.div`
  z-index: 99;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;

  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(1.8px);
  }
`;

const SModalLayout = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32.5rem;
  padding: 2.5rem 4.5rem;
  background-color: #6f2c2c;
  border-radius: 0.6rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11), 0 4px 4px rgba(0, 0, 0, 0.11),
    0 6px 8px rgba(0, 0, 0, 0.11), 0 8px 16px rgba(0, 0, 0, 0.11);
  box-sizing: border-box;

  .delete-btn {
    position: absolute;
    top: 1.125rem;
    right: 1.125rem;
    padding: 0;
    width: 1.38rem;
    height: 1.38rem;
  }
`;
