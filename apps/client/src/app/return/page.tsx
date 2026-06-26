import Link from "next/link";
import ClearCart from "@/components/ClearCart";

const ReturnPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }> | undefined;
}) => {
  const session_id = (await searchParams)?.session_id;

  if (!session_id) {
    return <div>No session id found!</div>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_URL}/sessions/${session_id}`
  );
  const data = await res.json();

  const isPaid = data.status === "complete" || data.payment_status === "paid";

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      {isPaid && <ClearCart />}
      <h1 className="text-3xl font-semibold mb-2">Payment {isPaid ? "Successful!" : "Failed"}</h1>
      <p className="text-gray-600 mb-6">Payment status: <span className="font-medium text-black capitalize">{data.payment_status}</span></p>
      <Link href="/orders" className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
        See your orders
      </Link>
    </div>
  );
};

export default ReturnPage;