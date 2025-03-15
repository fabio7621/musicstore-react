import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import axios from "axios";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

export default function HomeView() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`);

      setProducts(res.data.products);
    } catch (error) {
      alert("取得產品失敗", `${error}`);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    new Swiper(".indexSwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        992: {
          slidesPerView: 3,
        },
        0: {
          slidesPerView: 1,
        },
      },
    });
  }, []);

  return (
    <>
      <section className="index-products">
        <div className="index-products-main d-flex flex-column">
          <div className="index-products-title">
            <h2>
              全部專輯 <span>Albums</span>
            </h2>
          </div>
          <div className="swiper indexSwiper">
            <div className="swiper-wrapper">
              {products.map((product) => (
                <div key={product.id} className="swiper-slide">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.imageUrl} alt={product.title} />
                    <i className="bi bi-heart"></i>
                  </Link>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
          </div>
          <button
            onClick={() => navigate("/products")}
            className="indexbtn mx-auto"
          >
            Watch more!!
          </button>
        </div>
      </section>
      <section className="index-product-banner">
        <div className="index-product-main">
          <h2>Click me to chat about the latest trends!</h2>
          <div className="index-product-pic">
            <img
              src="@/../../../public/music/background.png"
              alt="product-banner"
            />
            <div className="index-product-content">
              <Link to="/products">Click me! Find your music</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
