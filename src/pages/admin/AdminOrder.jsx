import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import PagePagination from "../../components/PagePagination";
import OrderEditModal from "../../components/modal/OrderEditModel";
import { API_BASE_URL, API_PATH } from "../../constants/api";
import { pushMessage } from "../../redux/toastSlice";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [tempOrder, setTempOrder] = useState({});
  const dispatch = useDispatch();

  //model
  const orderModal = useRef(null);
  const orderRef = useRef(null);
  // const delOrderRef = useRef(null);
  // const delOrderModal = useRef(null);

  const openOrderModel = (order) => {
    setTempOrder(order);
    orderModal.current.show();
  };
  const closeOrderModel = () => {
    orderModal.current.hide();
  };

  //取得訂單
  const getOrders = useCallback(
    async (page = 1) => {
      try {
        const res = await axios.get(`${API_BASE_URL}/v2/api/${API_PATH}/admin/orders?page=${page}`);
        setOrders(res.data.orders);
        setPagination(res.data.pagination);
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || "操作失敗";
        dispatch(pushMessage({ text: message, status: "failed" }));
      }
    },
    [dispatch]
  );

  //刪除訂單
  const deleteOrder = async (id) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/v2/api/${API_PATH}/admin/order/${id}`);
      dispatch(pushMessage({ text: res.data.message, status: "success" }));
      getOrders();
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message, status: "failed" }));
    }
  };
  //刪除全部訂單
  const deleteAllOrders = async () => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/v2/api/${API_PATH}/admin/orders/all`);
      dispatch(pushMessage({ text: res.data.message, status: "success" }));
      getOrders();
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message, status: "failed" }));
    }
  };
  //修改訂單

  const togglePaidStatus = async (order) => {
    try {
      const updatedOrder = {
        ...order,
        is_paid: !order.is_paid, // 切換付款狀態
      };

      const res = await axios.put(`${API_BASE_URL}/v2/api/${API_PATH}/admin/order/${order.id}`, {
        data: updatedOrder,
      });

      dispatch(pushMessage({ text: res.data.message, status: "success" }));
      getOrders();
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message, status: "failed" }));
    }
  };

  const updateOrder = async (order) => {
    try {
      const updatedOrder = {
        ...order,
      };

      const res = await axios.put(`${API_BASE_URL}/v2/api/${API_PATH}/admin/order/${order.id}`, {
        data: updatedOrder,
      });

      dispatch(pushMessage({ text: res.data.message, status: "success" }));
      getOrders();
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message, status: "failed" }));
    }
  };

  //更新訂單

  const pagesChange = (page) => {
    getOrders(page);
  };

  useEffect(() => {
    getOrders();
  }, [getOrders]);
  return (
    <>
      <div className="container py-5">
        <button onClick={deleteAllOrders} className="btn btn-danger mb-3">
          刪除所有訂單
        </button>
        <h2>訂單列表</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">購買時間</th>
              <th scope="col">應付金額</th>
              <th scope="col">是否付款</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{new Date(item.create_at * 1000).toLocaleString()}</td>
                  <td>{item.total}</td>
                  <td>
                    <div className="form-check form-switch">
                      付款狀態{" "}
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`paidSwitch-${item.id}`}
                        checked={item.is_paid}
                        onChange={() => togglePaidStatus(item)}
                      />
                      <label className="form-check-label" htmlFor={`paidSwitch-${item.id}`}>
                        <span>{item.is_paid ? "已付款" : "未付款"}</span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex g-1">
                      <button onClick={() => openOrderModel(item)} className="btn bg-info text-white">
                        檢視
                      </button>
                      <button onClick={() => deleteOrder(item.id)} className="btn bg-danger text-white ms-1">
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <OrderEditModal
          orderModal={orderModal}
          orderRef={orderRef}
          tempOrder={tempOrder}
          closeOrderModel={closeOrderModel}
          updateOrder={updateOrder}
          getOrders={getOrders}
        />
        <PagePagination pagesChange={pagesChange} pagination={pagination} />
      </div>
    </>
  );
}
// {
//   "success": true,
//   "orders": [
//     {
//       "create_at": 1523539519,
//       "id": "-L9u11NAE0m0SpSBUDIq",
//       "is_paid": false,
//       "message": "這是留言",
//       "products": {
//         "L8nBrq8Ym4ARI1Kog4t": {
//           "id": "L8nBrq8Ym4ARI1Kog4t",
//           "product_id": "-L8moRfPlDZZ2e-1ritQ",
//           "qty": "3"
//         }
//       },
//       "user": {
//         "address": "kaohsiung",
//         "email": "test@gmail.com",
//         "name": "test",
//         "tel": "0912346768"
//       },
//       "num": 2
//     }
//   ],
//   "pagination": {
//     "total_pages": 1,
//     "current_page": 1,
//     "has_pre": false,
//     "has_next": false,
//     "category": ""
//   },
//   "messages": []
// }
