import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

export default function HomeView() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const indexSwiperRef = useRef(null);

  const [wishList, setWishList] = useState(() => {
    const initWishList = localStorage.getItem("wishList") ? JSON.parse(localStorage.getItem("wishList")) : {};
    return initWishList;
  });

  const toggleWishListItem = (product_id) => {
    const newWishList = {
      ...wishList,
      [product_id]: !wishList[product_id],
    };
    localStorage.setItem("wishList", JSON.stringify(newWishList));
    setWishList(newWishList);
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products`);
      setProducts(res.data.products);
    } catch (error) {
      alert("取得產品失敗: " + error);
    }
  };

  useEffect(() => {
    getProducts();
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
          <Swiper
            ref={indexSwiperRef}
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              992: { slidesPerView: 3 },
              0: { slidesPerView: 1 },
            }}
            className="indexSwiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Link className="d-block position-relative" to={`/products/${product.id}`}>
                  <img src={product.imageUrl} alt={product.title} />
                  <button
                    className="index-heart"
                    onClick={(event) => {
                      event.preventDefault();
                      toggleWishListItem(product.id);
                    }}
                    type="button"
                  >
                    {wishList?.[product.id] ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                  </button>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <button onClick={() => navigate("/products")} className="indexbtn mx-auto">
            Watch more!!
          </button>
        </div>
      </section>

      <section className="index-product-banner">
        <div className="index-product-main">
          <h2>Click me to chat about the latest trends!</h2>
          <div className="index-product-pic">
            <img src="./music/background.png" alt="product-banner" />
            <div className="index-product-content">
              <Link to="/chart">Click me! Find your music</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
