const formatAmount = (amount: number | undefined) => {
  const handleAmount = amount?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  return handleAmount;
};

export default formatAmount;
