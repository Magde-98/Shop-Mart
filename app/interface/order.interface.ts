export interface Order {
  _id: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;

  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };

  shippingAddress: {
    details: string;
    city: string;
    phone: string;
  };

  cartItems: {
    _id: string;
    count: number;
    price: number;
    product: {
      _id: string;
      title: string;
      imageCover: string;
      brand: {
        name: string;
      };
      category: {
        name: string;
      };
    };
  }[];
}
