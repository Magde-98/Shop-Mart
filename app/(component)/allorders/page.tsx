import { getUserOrders } from "@/app/api/orders/getUserOrders";
import { OrderCard } from "../order Card/OrderCard";
import { Order } from "@/app/interface/order.interface";

export default async function AllOrders() {
  const userId = "6407cf6f515bdcf347c09f17"; 

  const orders = (await getUserOrders(userId)) as Order[];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-bold mb-8">
          My Orders
        </h1>

        {orders.length === 0 && (
          <p className="text-gray-500">
            You have no orders yet.
          </p>
        )}

        {orders.map((order: Order, index: number) => (
          <OrderCard
            key={order._id}
            order={order}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

