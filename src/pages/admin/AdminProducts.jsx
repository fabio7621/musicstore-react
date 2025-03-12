import DelModel from "../../components/modal/DelModel";
import EditModel from "../../components/modal/EditModel";
import PagePagination from "../../components/PagePagination";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { pushMessage } from "../../redux/toastSlice";

const apiUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const getProducts = async (page = 1) => {
    try {
      const res = await axios.get(
        `${apiUrl}/v2/api/${apiPath}/admin/products?page=${page}`
      );
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message.join(","), status: "failed" }));
    }
  };

  const checkUserLogin = async () => {
    try {
      await axios.post(`${apiUrl}/v2/api/user/check`);
      getProducts();
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message, status: "failed" }));
    }
  };

  //model
  const prodModel = useRef(null);
  const productRef = useRef(null);
  const delProductRef = useRef(null);
  const delprodModel = useRef(null);
  const [modelMode, setModelMode] = useState(null);

  //產品跳窗
  const openProductModel = (mode, product) => {
    setModelMode(mode);
    if (mode === "edit") {
      setTempProduct(product);
    } else if (mode === "create") {
      setTempProduct({
        imageUrl: "",
        title: "",
        singer: "",
        sales: "",
        category: "",
        unit: "",
        origin_price: "",
        price: "",
        description: "",
        content: "",
        is_enabled: 0,
        imagesUrl: [""],
      });
    }

    prodModel.current.show();
  };
  const closeProductModel = () => {
    prodModel.current.hide();
  };
  //刪除跳窗
  const openDelModel = (product) => {
    delprodModel.current.show();
    setTempProduct(product);
  };
  const closeDelModel = () => {
    delprodModel.current.hide();
  };
  //product
  //表單內操作
  const [tempProduct, setTempProduct] = useState({
    imageUrl: "",
    title: "",
    singer: "",
    sales: "",
    category: "",
    unit: "",
    origin_price: "",
    price: "",
    description: "",
    content: "",
    is_enabled: 0,
    imagesUrl: [""],
  });

  const handleModelChange = (e) => {
    const { value, name, type, checked } = e.target;
    setTempProduct({
      ...tempProduct,
      [name]: type === "checked" ? checked : value,
    });
  };

  const handleImageChange = (e, index) => {
    const { value } = e.target;
    const newImages = [...tempProduct.imagesUrl];
    newImages[index] = value;
    setTempProduct({
      ...tempProduct,
      imagesUrl: newImages,
    });
  };

  const handleImageAdd = () => {
    const newImages = [...tempProduct.imagesUrl, ""];
    setTempProduct({
      ...tempProduct,
      imagesUrl: newImages,
    });
  };
  const handleImageDel = () => {
    const newImages = [...tempProduct.imagesUrl];
    newImages.pop();
    setTempProduct({
      ...tempProduct,
      imagesUrl: newImages,
    });
  };

  //新增更新產品api
  const createProduct = async () => {
    try {
      await axios.post(`${apiUrl}/v2/api/${apiPath}/admin/product`, {
        data: {
          ...tempProduct,
          origin_price: Number(tempProduct.origin_price),
          price: Number(tempProduct.price),
          is_enabled: tempProduct.is_enabled ? 1 : 0,
        },
      });
      dispatch(pushMessage({ text: "新增成功", status: "success" }));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message.join(","), status: "failed" }));
    }
  };
  const editProduct = async () => {
    try {
      await axios.put(
        `${apiUrl}/v2/api/${apiPath}/admin/product/${tempProduct.id}`,
        {
          data: {
            ...tempProduct,
            origin_price: Number(tempProduct.origin_price),
            price: Number(tempProduct.price),
            is_enabled: tempProduct.is_enabled ? 1 : 0,
          },
        }
      );
      dispatch(pushMessage({ text: "編輯成功", status: "success" }));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message.join(","), status: "failed" }));
    }
  };
  const updateProduct = async () => {
    const apiCall = modelMode === "create" ? createProduct : editProduct;
    try {
      await apiCall();
      getProducts();
      closeProductModel();
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message.join(","), status: "failed" }));
    }
  };

  const delProduct = async () => {
    try {
      await axios.delete(
        `${apiUrl}/v2/api/${apiPath}/admin/product/${tempProduct.id}`
      );
      dispatch(pushMessage({ text: "刪除成功", status: "success" }));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message.join(","), status: "failed" }));
    }
  };

  const handleDelProduct = async () => {
    try {
      await delProduct();
      getProducts();
      closeDelModel();
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message.join(","), status: "failed" }));
    }
  };
  //分頁
  const [pagination, setPagination] = useState({});

  const pagesChange = (page) => {
    getProducts(page);
  };
  //上傳
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file-to-upload", file);
    try {
      const res = await axios.post(
        `${apiUrl}/v2/api/${apiPath}/admin/upload`,
        formData
      );
      const uploadImageUrl = res.data.imageUrl;
      setTempProduct({
        ...tempProduct,
        imageUrl: uploadImageUrl,
      });
      dispatch(pushMessage({ text: "上傳成功", status: "success" }));
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message.join(","), status: "failed" }));
    }
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)fabio20\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    checkUserLogin();
  }, []);

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between">
              <h2>產品列表</h2>
              <button
                onClick={() => openProductModel("create")}
                type="button"
                className="btn btn-primary"
              >
                新增產品
              </button>
            </div>
            <div className="d-flex justify-content-center"></div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">查看細節</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>
                      {product.is_enabled ? (
                        <span className="text-success">啟用</span>
                      ) : (
                        <span>未啟用</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          onClick={() => openProductModel("edit", product)}
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => openDelModel(product)}
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>{" "}
          </div>
        </div>
      </div>
      <PagePagination pagesChange={pagesChange} pagination={pagination} />
      <EditModel
        modelMode={modelMode}
        prodModel={prodModel}
        productRef={productRef}
        closeProductModel={closeProductModel}
        handleFileChange={handleFileChange}
        tempProduct={tempProduct}
        handleImageChange={handleImageChange}
        handleModelChange={handleModelChange}
        updateProduct={updateProduct}
        handleImageAdd={handleImageAdd}
        handleImageDel={handleImageDel}
      />
      <DelModel
        delprodModel={delprodModel}
        delProductRef={delProductRef}
        closeDelModel={closeDelModel}
        tempProduct={tempProduct}
        handleDelProduct={handleDelProduct}
      />
    </>
  );
}
