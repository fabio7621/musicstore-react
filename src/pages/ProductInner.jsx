import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useEffect, useState } from "react";
import Swiper from "swiper";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;
export default function ProductInner() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [smallIsLoading, setSmallLoading] = useState(false);
  const [qtySelect, setQtySelect] = useState(1);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/product/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      alert("取得產品失敗", `${error}`);
    }
  };
  const addToCart = async (product_id, qty) => {
    setSmallLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, {
        data: { product_id, qty: Number(qty) },
      });

      setSmallLoading(false);
      setQtySelect(1);
      alert("加入購物車成功");
    } catch (error) {
      alert("加入購物車失敗", `${error}`);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const swiperThumbs = new Swiper(".innerSwiper", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    new Swiper(".innerSwiper2", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiperThumbs,
      },
    });
  }, []);

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
                    <div className="swiper innerSwiper2">
                      <div className="swiper-wrapper">
                        {product.imageUrl && (
                          <div className="swiper-slide">
                            <img src={product.imageUrl} alt="Main Image" />
                          </div>
                        )}

                        {product.imagesUrl?.map((image, index) => (
                          <div className="swiper-slide" key={index}>
                            <img src={image} alt={`Thumbnail ${index}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="swiper innerSwiper">
                      <div className="swiper-wrapper">
                        {product.imageUrl && (
                          <div className="swiper-slide">
                            <img src={product.imageUrl} alt="Main Image" />
                          </div>
                        )}

                        {product.imagesUrl?.map((image, index) => (
                          <div className="swiper-slide" key={index}>
                            <img src={image} alt={`Thumbnail ${index}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 p-0">
                  <div className="inner-product-profile">
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>{product.content}</p>
                    <p> 價格：${product.price}</p>

                    <div className="inner-order">
                      <label htmlFor="innerOrder">訂購數量</label>
                      <select
                        value={qtySelect}
                        onChange={(e) => setQtySelect(e.target.value)}
                        id="qtySelect"
                        className="form-select"
                      >
                        {Array.from({ length: 10 }).map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => addToCart(product.id, qtySelect)}
                      type="button"
                      className="inner-btn"
                      disabled={smallIsLoading}
                    >
                      確認購買
                    </button>
                  </div>
                </div>
                <div className="col-12 p-0">
                  <div className="product-inner-bottem">
                    <button
                      onClick={() => navigate(-1)}
                      className="back-btn mx-auto"
                      type="button"
                    >
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
