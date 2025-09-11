export type ReceiptDataRes = {
  data: {
    receipt: ReceiptDetails;
  };
  error: null | string;
  message: string;
  status: number;
};

export type ReceiptDetails = {
  currency: string;
  error: null;
  items: ReceiptItem[];
  // ISO 8601 format
  receipt_date: string;

  total_receipt_price: number;
};

export type ReceiptItem = {
  id: string;
  name: string;
  price: number;
  price_total: number;
  quantity: number;
};
