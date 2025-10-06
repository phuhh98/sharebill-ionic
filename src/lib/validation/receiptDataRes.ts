import * as z from "zod";

export const receiptItemShema = z.object({
  id: z.string().optional(), // this id is only used in FE
  name: z.string(),
  price: z.number(),
  price_total: z.number(),
  quantity: z.number(),
});

export const receiptDetailsShema = z.object({
  currency: z.string(),
  error: z.string().nullable(),
  items: z.array(receiptItemShema),
  receipt_date: z.string(), // ISO 8601 format
  total_receipt_price: z.number(),
});

export const receiptDataResSchema = z.object({
  data: z.object({
    receipt: receiptDetailsShema,
  }),
  error: z.string().nullable(),
  message: z.string(),
  status: z.number(),
});
