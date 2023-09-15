import DaumPostcodeEmbed from 'react-daum-postcode';
import styled from 'styled-components';
import { handleModalLayoutClick } from 'utils/modalFunction';
import { SModalBackground, SModalLayout } from '../style/ModalStyle';
import CloseButton from '../common/Buttons/CloseButton';

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

  return (
    <SModalBackground onClick={closeModal}>
      <SAddressModalLayout onClick={handleModalLayoutClick}>
        <DaumPostcodeEmbed onComplete={handleComplete} />
        <CloseButton onClick={closeModal} />
      </SAddressModalLayout>
    </SModalBackground>
  );
}

const SAddressModalLayout = styled(SModalLayout)`
  width: auto;
  padding: 2.5rem 4rem;
`;
