import { useTypedSelector } from './UseTypedSelector';

export const useTotalPrice = () => {
  const totalPrice = useTypedSelector((state) => { return state.finalPrice.totalPrice; });

  return totalPrice;
};

export const useTotalDeliveryPrice = () => {
  const totalDeliveryFee = useTypedSelector((state) => { return state.finalPrice.totalDeliveryFee; });

  return totalDeliveryFee;
};
