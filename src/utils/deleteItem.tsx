import { deleteSaleItem, DeleteCartItem, DeleteAllItem } from '../services/ResponseApi';

export async function deleteItem(itemId: number): Promise<void> {
  const userType = localStorage.getItem('user_type');

  if (userType === 'SELLER') {
    await deleteSaleItem(itemId);
  } else if (userType === 'BUYER') {
    await DeleteCartItem(itemId);
  }
}

export async function deleteAllItem(): Promise<void> {
  await DeleteAllItem();
}
