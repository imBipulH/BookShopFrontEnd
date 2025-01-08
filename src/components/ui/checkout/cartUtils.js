export const calculateSubtotal = cart =>
  cart
    ?.filter(item => item.isMarked)
    .reduce(
      (total, item) =>
        total +
        (item?.productId?.discountPercentage > 0
          ? item?.productId?.discountPrice
          : item?.productId?.price) *
          item.quantity,
      0
    )

export const calculateDiscountAmount = cart =>
  cart
    ?.filter(item => item.isMarked)
    .reduce(
      (total, item) =>
        total +
        (item?.productId?.discountPercentage > 0 &&
          item?.productId?.price - item?.productId?.discountPrice) *
          item.quantity,
      0
    )

export const calculateMRP = cart =>
  cart
    ?.filter(item => item.isMarked)
    .reduce((total, item) => total + item?.productId?.price * item?.quantity, 0)

export const calculateShippingFee = cart => {
  const baseFee = 60
  return cart?.filter(item => item.isMarked).length > 0 ? baseFee : 0
}

export const calculateTotalAmount = (subtotal, shippingFee) =>
  subtotal + shippingFee
