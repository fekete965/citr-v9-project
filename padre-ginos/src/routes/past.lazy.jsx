import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { getPastOrders } from "../api/getPastOrders";
import { getPastOrder } from "../api/getPastOrder";
import { Modal } from "../components/Modal";
import { formatCurrency } from "../utils/formatCurrency";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrdersComponent,
});

function ErrorBoundaryWrappedPastOrdersComponent(props) {
  return (
    <ErrorBoundary>
      <PastOrdersComponent {...props} />
    </ErrorBoundary>
  );
}

function PastOrdersComponent() {
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });

  const { data: pastOrderData, isLoading: isLoadingPastOrder } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    enabled: focusedOrder != null,
    staleTime: 86_400_000, // 1 day
  });

  function prevPage() {
    setPage((p) => p - 1);
  }

  function nextPage() {
    setPage((p) => p + 1);
  }

  function selectOrder(orderId) {
    return () => {
      setFocusedOrder(orderId);
    };
  }

  function unselectOrder() {
    setFocusedOrder(null);
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
                <td>
                  <button onClick={selectOrder(order.order_id)} type="button">
                    {order.order_id}
                  </button>
                </td>
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
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {isLoadingPastOrder ? (
            <p>isLoading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {pastOrderData.orderItems.map((pizza) => {
                  return (
                    <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                      <td>
                        <img alt={pizza.name} src={pizza.image} />
                      </td>
                      <td>{pizza.name}</td>
                      <td>{pizza.size}</td>
                      <td>{pizza.quantity}</td>
                      <td>{formatCurrency(pizza.price)}</td>
                      <td>{formatCurrency(pizza.total)}</td>
                    </tr>
                  );
                })}
                <button onClick={unselectOrder} type="button">
                  Close
                </button>
              </tbody>
            </table>
          )}
        </Modal>
      ) : null}
    </div>
  );
}
