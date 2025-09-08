export enum TransactionStatusType  {
  CAPTURE = 'capture',
  SETTLEMENT = 'settlement',
  PENDING = 'pending',
  DENY = 'deny',
  CANCEL = 'cancel',
  EXPIRE = 'expire',
  FAILURE = 'failure',
  REFUND = 'refund',
  PARTIAL_REFUND = 'partial_refund',
  AUTHORIZE = 'authorize',
};
export enum TransactionFraudStatusType {
    ACCEPT = 'accept',
    DENY = 'deny'
}
