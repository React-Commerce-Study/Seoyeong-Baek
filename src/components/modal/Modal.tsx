import Button from '../common/Buttons/Button';
import { DeleteCartItem } from '../../services/ResponseApi';
import { handleModalLayoutClick } from 'utils/modalFunction';
import { useNavigate } from 'react-router-dom';
import { SModalBackground, SModalLayout, SButtonWrapper } from '../style/ModalStyle';
import CloseButton from '../common/Buttons/CloseButton';
import { minusPrice } from '../../features/finalPriceSlice';
import { useDispatch } from 'react-redux';
// import getCartItems from '../../utils/getCartItems';

interface ModalProps {
  type: string;
  cartItemId?: number;
  setIsDeleteItem?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  successUserName?: string;
  price?: number;
  deliveryFee?: number;
}

export default function Modal({
  type,
  cartItemId,
  setIsDeleteItem,
  setIsShowModal,
  successUserName,
  price,
  deliveryFee,
}: ModalProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeModal = () => {
    // 옵셔널 체이닝(Optional Chaining) 연산자(?.)
    // null 또는 undefined일 경우에는 호출하지 않고 그냥 넘어가게 됨. 이렇게 함으로써 해당 함수가 존재하지 않을 때 발생할 수 있는 오류를 방지하고, 안전하게 함수 호출
    setIsShowModal?.(false);
  };

  const deleteItem = async () => {
    if (cartItemId) {
      setIsDeleteItem?.(true);
      await DeleteCartItem(cartItemId);
      // getCartItems('deleteItem');

      if (price && deliveryFee) dispatch(minusPrice({ price: price, deliveryFee: deliveryFee }));
    }
    closeModal();
  };

  const navigatePath = (path: string) => {
    closeModal();
    navigate(path);
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
    // 현재 웹 페이지 다시 로드
  };

  const contents = [
    { type: 'delete', value: '상품을 삭제하시겠습니까?', event: deleteItem },
    { type: 'deleteAll', value: '정말로 전체 삭제하시겠습니까?', event: deleteItem },
    { type: 'requiredLogin', value: '로그인이 필요한 서비스입니다.\n로그인 하시겠습니까?', event: () => navigatePath('/login') },
    { type: 'logout', value: '정말로 로그아웃 하시겠습니까?', event: logout },
    { type: 'addToCart', value: '장바구니에 담겼습니다.\n장바구니로 이동 하시겠습니까?', event: () => navigatePath('/cart') },
    {
      type: 'includedCart',
      value: '이미 장바구니에 담긴 상품입니다.\n장바구니로 이동 하시겠습니까?',
      event: () => navigatePath('/cart'),
    },
    {
      type: 'successSignUp',
      value: `"${successUserName}"님\n회원가입을 축하합니다! 🎉`,
    },
  ];

  const handleAfterSuccessSignUp = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      const buttonInnerHTML = event.currentTarget.innerHTML;
      console.log(buttonInnerHTML);
      if (buttonInnerHTML === '로그인') navigatePath('/login');
      else if (buttonInnerHTML === '홈') navigatePath('/');
    }
  };

  const typeCheck = contents.find((content) => content.type === type);

  return (
    <SModalBackground onClick={closeModal}>
      <SModalLayout onClick={handleModalLayoutClick}>
        <p>{typeCheck?.value}</p>
        <SButtonWrapper>
          <Button
            onClick={type === 'successSignUp' ? handleAfterSuccessSignUp : closeModal}
            bgColor="inherit"
            color="var(--dark-gray-color)"
            boxShadow="inset 0 0 0 1px var(--dark-gray-color)"
          >
            {typeCheck?.type === 'successSignUp' ? '홈' : '아니오'}
          </Button>
          <Button onClick={type === 'successSignUp' ? handleAfterSuccessSignUp : (typeCheck && typeCheck.event) || undefined}>
            {type === 'successSignUp' ? '로그인' : '네'}
          </Button>
        </SButtonWrapper>
        <CloseButton onClick={closeModal} />
      </SModalLayout>
    </SModalBackground>
  );
}
