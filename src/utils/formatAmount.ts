const formatAmount = (amount: number | undefined) => {
  const handleAmount = amount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  return handleAmount;
};

export default formatAmount;
