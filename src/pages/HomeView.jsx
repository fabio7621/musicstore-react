import { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";

export default function HomeView() {
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
              {[...Array(5)].map((_, index) => (
                <div key={index} className="swiper-slide">
                  <img src="@/../../../public/music/1444.jpg" alt="lisa" />
                  <i className="bi bi-heart"></i>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
          </div>
          <button className="indexbtn mx-auto">Watch more!!</button>
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
              <a href="#">Click me! Find your music</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
