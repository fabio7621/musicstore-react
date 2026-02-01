import { useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toast as BsToast } from "bootstrap/dist/js/bootstrap.esm";

import { TOAST_DURATION_MS } from "../constants/api";
import { removeMessage } from "../redux/toastSlice";

export default function ToastMessage() {
  const messages = useSelector((state) => state.toast.messages);
  const toastRef = useRef({});
  const dispatch = useDispatch();

  const removeMessageCallback = useCallback(
    (id) => {
      dispatch(removeMessage(id));
    },
    [dispatch]
  );

  useEffect(() => {
    messages.forEach((message) => {
      const toastElement = toastRef.current[message.id];
      if (toastElement) {
        const toastInstance = new BsToast(toastElement);
        toastInstance.show();

        const timer = setTimeout(() => {
          removeMessageCallback(message.id);
        }, TOAST_DURATION_MS);

        return () => clearTimeout(timer);
      }
    });
  }, [messages, removeMessageCallback]);

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
      {messages.map((message) => (
        <div
          key={message.id}
          ref={(el) => (toastRef.current[message.id] = el)}
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div
            className={`toast-header text-white bg-${
              message.status === "success" ? "success" : "danger"
            }`}
          >
            <strong className="me-auto">
              {message.status === "success" ? "成功" : "失敗"}
            </strong>
            <button
              onClick={() => removeMessageCallback(message.id)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="toast-body">{message.text}</div>
        </div>
      ))}
    </div>
  );
}
