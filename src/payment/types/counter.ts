interface CounterTypes {
    status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: number;
  currency: string;
  payment_type: 'cstore';
  transaction_time: string; // format: "YYYY-MM-DD HH:mm:ss"
  transaction_status: any; // biasanya: "pending"
  fraud_status: string; // "accept", "deny", "challenge"
  payment_code: string; // kode bayar di gerai
  store: string; // contoh: "alfamart", "indomaret"
}