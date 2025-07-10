import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { getPastOrder } from "../api/getPastOrders";

export const Route = createLazyFileRoute("/past")({
  component: PastOrdersComponent,
});

function PastOrdersComponent() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrder(page),
    staleTime: 30000,
  });

  function prevPage() {
    setPage((p) => p - 1);
  }

  function nextPage() {
    setPage((p) => p + 1);
  }

  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>LOADING...</h2>
      </div>
    );
  }

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => {
            return (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.date}</td>
                <td>{order.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={prevPage} type="button">
          Previous
        </button>
        <button disabled={data.length < 10} onClick={nextPage} type="button">
          Next
        </button>
      </div>
    </div>
  );
}
