export const calculateTotalCost = (itemSpecifications) => {
  return itemSpecifications.reduce((previous, current) => {
    return previous + current.itemSpecification.price * current.quantity;
  }, 0);
};

export const calculateTotalCount = (itemSpecifications) => {
  return itemSpecifications.reduce((previous, current) => previous + current.quantity, 0);
};
