export interface ReceiptItem {
  description?: string;
  id: string;
  name: string;
  quantity: number;
  total_price: number;
  unit_price: number;
}

export interface ReceiptState {
  currency: string;
  items: ReceiptItem[];
  product_count: number;
  receipt_date: Date;
  total_receipt_price: number;
}
