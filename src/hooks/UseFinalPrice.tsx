import { useTypedSelector } from './UseTypedSelector';

export const useTotalPrice = () => {
  const totalPrice = useTypedSelector((state) => state.finalPrice.totalPrice);

  return totalPrice;
};

export const useTotalDeliveryPrice = () => {
  const totalDeliveryFee = useTypedSelector((state) => state.finalPrice.totalDeliveryFee);

  return totalDeliveryFee;
};
