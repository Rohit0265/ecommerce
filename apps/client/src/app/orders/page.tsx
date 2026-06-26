import { auth } from "@clerk/nextjs/server";
import { OrderType } from "@repo/types";

type OrdersResponse = {
  orders: OrderType[];
};

const fetchOrders = async (): Promise<OrderType[]> => {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    console.error("No auth token found");
    return [];
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORDER_URL}/user-orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // very important for auth-based data
    }
  );

  if (!res.ok) {
    console.error("Order API failed:", res.status);
    return [];
  }

  const data: any = await res.json();
  return Array.isArray(data) ? data : data.orders || [];
};

const OrdersPage = async () => {
  const orders = await fetchOrders();

  if (!orders || orders.length === 0) {
    return <div className="text-gray-500">No orders found!</div>;
  }

  return (
    <div>
      <h1 className="text-2xl my-4 font-medium">Your Orders</h1>

      <ul>
        {orders.map((order) => (
          <li key={order._id} className="flex items-center mb-4 gap-6">
            <div className="w-1/4">
              <span className="font-medium text-sm text-gray-500">
                Order ID
              </span>
              <p>{order._id}</p>
            </div>

            <div className="w-1/12">
              <span className="font-medium text-sm text-gray-500">
                Total
              </span>
              <p>₹{Number(order.amount) / 100}</p>
            </div>

            <div className="w-1/12">
              <span className="font-medium text-sm text-gray-500">
                Status
              </span>
              <p>{order.status}</p>
            </div>

            <div className="w-1/8">
              <span className="font-medium text-sm text-gray-500">
                Date
              </span>
              <p>
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-IN")
                  : "-"}
              </p>
            </div>

            <div className="flex-1">
              <span className="font-medium text-sm text-gray-500">
                Products
              </span>
              <p>
                {order.products?.map(p => p.name).join(", ") || "-"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
