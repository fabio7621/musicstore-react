import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import { API_BASE_URL, API_PATH, PRODUCT_QUANTITY_MAX } from "../constants/api";
import { updateCartData } from "../redux/cartSlice";
import { pushMessage } from "../redux/toastSlice";

export default function ProductInner() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [smallIsLoading, setSmallLoading] = useState(false);
  const [qtySelect, setQtySelect] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null); // Swiper 物件
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCart = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/v2/api/${API_PATH}/cart`);
      dispatch(updateCartData(res.data.data));
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || ["操作失敗"];
      dispatch(pushMessage({ text: Array.isArray(message) ? message.join(",") : message, status: "failed" }));
    }
  }, [dispatch]);

  const getProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/v2/api/${API_PATH}/product/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || ["操作失敗"];
      dispatch(pushMessage({ text: Array.isArray(message) ? message.join(",") : message, status: "failed" }));
    }
  }, [id, dispatch]);

  const addToCart = async (product_id, qty) => {
    setSmallLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/v2/api/${API_PATH}/cart`, {
        data: { product_id, qty: Number(qty) },
      });
      getCart();
      setSmallLoading(false);
      setQtySelect(1);
      dispatch(pushMessage({ text: "加入購物車成功", status: "success" }));
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || ["操作失敗"];
      dispatch(pushMessage({ text: Array.isArray(message) ? message.join(",") : message, status: "failed" }));
    }
  };

  useEffect(() => {
    getProducts();
    getCart();
  }, [getProducts, getCart]);

  return (
    <>
      <section className="pages-bread">
        <div className="pages-bread-main d-flex align-items-center justify-between">
          <ul className="pages-bread-nav">
            <li>
              <a href="#">Index</a>
            </li>
            <li>
              <a>{product.title}</a>
            </li>
          </ul>
        </div>
      </section>
      <section className="page-product">
        <div className="page-product-main">
          <div className="page-title-box">
            <div className="page-product-title">
              <h1>Music Album</h1>
            </div>
          </div>
          <div className="page-product-inner">
            <div className="product-inner-main">
              <div className="row">
                <div className="col-12 col-md-6 p-0">
                  <div className="inner-swiper">
                    <Swiper spaceBetween={10} navigation={true} thumbs={{ swiper: thumbsSwiper }} modules={[Navigation, Thumbs]} className="innerSwiper2">
                      {product.imageUrl && (
                        <SwiperSlide key="main-image">
                          <img src={product.imageUrl} alt="Main Image" />
                        </SwiperSlide>
                      )}
                      {product.imagesUrl?.map((image, index) => (
                        <SwiperSlide key={`image-${index}`}>
                          <img src={image} alt={`Thumbnail ${index}`} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Thumbs]}
                      className="innerSwiper"
                    >
                      {product.imageUrl && (
                        <SwiperSlide key="main-thumb">
                          <img src={product.imageUrl} alt="Main Thumbnail" />
                        </SwiperSlide>
                      )}
                      {product.imagesUrl?.map((image, index) => (
                        <SwiperSlide key={`thumb-${index}`}>
                          <img src={image} alt={`Thumbnail ${index}`} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
                <div className="col-12 col-md-6 p-0">
                  <div className="inner-product-profile">
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>{product.content}</p>
                    <p>價格：${product.price}</p>

                    <div className="inner-order">
                      <label htmlFor="innerOrder">訂購數量</label>
                      <select value={qtySelect} onChange={(e) => setQtySelect(e.target.value)} id="qtySelect" className="form-select">
                        {Array.from({ length: PRODUCT_QUANTITY_MAX }).map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button onClick={() => addToCart(product.id, qtySelect)} type="button" className="inner-btn" disabled={smallIsLoading}>
                      確認購買
                    </button>
                  </div>
                </div>

                <div className="col-12 p-0">
                  <div className="product-inner-bottem">
                    <button onClick={() => navigate(-1)} className="back-btn mx-auto" type="button">
                      Back!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
