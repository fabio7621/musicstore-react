import { useEffect, useState } from "react";
import { Modal } from "bootstrap";

export default function OrderEditModal({ orderModal, orderRef, tempOrder, closeOrderModel, updateOrder, getOrders }) {
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    orderModal.current = new Modal(orderRef.current);
  }, [orderModal, orderRef]);

  useEffect(() => {
    if (tempOrder && typeof tempOrder.is_paid === "boolean") {
      setIsPaid(tempOrder.is_paid);
    }
  }, [tempOrder]);

  const handleUpdate = () => {
    const updatedOrder = {
      ...tempOrder,
      is_paid: isPaid,
    };
    updateOrder(updatedOrder);
    getOrders();
    closeOrderModel();
  };

  return (
    <div className="modal fade" ref={orderRef} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content border-0">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">訂單細節</h5>
            <button type="button" className="btn-close" onClick={closeOrderModel}></button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-4">
                <h3>用戶資料</h3>
                <table className="table">
                  {tempOrder.user && (
                    <tbody>
                      <tr>
                        <th style={{ width: "100px" }}>姓名</th>
                        <td>{tempOrder.user.name}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{tempOrder.user.email}</td>
                      </tr>
                      <tr>
                        <th>電話</th>
                        <td>{tempOrder.user.tel}</td>
                      </tr>
                      <tr>
                        <th>地址</th>
                        <td>{tempOrder.user.address}</td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
              <div className="col-md-8">
                <h3>訂單細節</h3>
                <table className="table">
                  <tbody>
                    <tr>
                      <th style={{ width: "100px" }}>訂單編號</th>
                      <td>{tempOrder.id}</td>
                    </tr>
                    <tr>
                      <th>下單時間</th>
                      <td>
                        {typeof tempOrder.create_at === "number" && !isNaN(tempOrder.create_at) && tempOrder.create_at > 0
                          ? new Date(tempOrder.create_at * 1000).toLocaleString()
                          : "時間不正確"}
                      </td>
                    </tr>
                    <tr>
                      <th>付款狀態</th>
                      <td>{tempOrder.is_paid ? <span className="text-success">已付款</span> : <span className="text-muted">尚未付款</span>}</td>
                    </tr>
                    <tr>
                      <th>總金額</th>
                      <td>$ {tempOrder.total}</td>
                    </tr>
                  </tbody>
                </table>
                <h3>選購商品</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>產品名稱</th>
                      <th>數量 / 單位</th>
                      <th className="text-end">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tempOrder.products &&
                      Object.values(tempOrder.products).map((item) => (
                        <tr key={item.id}>
                          <td>{item.product?.title || "產品名稱遺失"}</td>
                          <td>
                            {item.qty} / {item.product?.unit || "-"}
                          </td>
                          <td className="text-end">${item.total}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end mt-3">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="paidSwitch-modal" checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} />
                    <label className="form-check-label" htmlFor="paidSwitch-modal">
                      {isPaid ? "已付款" : "未付款"}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={closeOrderModel}>
              取消
            </button>
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
              修改付款狀態
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
