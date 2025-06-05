export interface ReceiptItem {
  description?: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface ReceiptState {
  date: Date;
  items: ReceiptItem[];
  totalAmount: number;
}
