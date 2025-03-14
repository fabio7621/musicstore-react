import { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductInner() {
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
              <a href="#">Lisa-ALTER EGO</a>
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
                        <div className="swiper-slide">
                          <img src="/music/1444.jpg" alt="Album" />
                        </div>
                        <div className="swiper-slide">
                          <img src="/music/1444.jpg" alt="Album" />
                        </div>
                        <div className="swiper-slide">
                          <img src="/music/1444.jpg" alt="Album" />
                        </div>
                        <div className="swiper-slide">
                          <img src="/music/1444.jpg" alt="Album" />
                        </div>
                        <div className="swiper-slide">
                          <img src="/music/1444.jpg" alt="Album" />
                        </div>
                      </div>
                    </div>
                    <div className="swiper innerSwiper">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <img src="/music/1444.jpg" alt="Thumbnail" />
                        </div>
                        <div className="swiper-slide">
                          <img src="/music/1444.jpg" alt="Thumbnail" />
                        </div>
                        <div className="swiper-slide">
                          <img src="/music/1444.jpg" alt="Thumbnail" />
                        </div>
                        <div className="swiper-slide">
                          <img src="/music/1444.jpg" alt="Thumbnail" />
                        </div>
                        <div className="swiper-slide">
                          <img src="/music/1444.jpg" alt="Thumbnail" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 p-0">
                  <div className="inner-product-profile">
                    <h2>Lisa-ALTER EGO</h2>
                    <p>
                      Instagram全球億人追蹤、個人串流超過20億收聽，引領全球時尚的女王
                      LISA 出道8年終於推出個人首張專輯《雙生自我 ALTER
                      EGO》，收錄2024年化身巨星的酷帥主題曲〈Rockstar〉、攜手西班牙天后
                      蘿莎莉雅 (ROSALÍA) 共唱完美女力神曲〈New
                      Woman〉，以及取樣Sixpence None the Richer
                      經典情歌的〈Moonlit Floor (Kiss
                      Me)〉等共12首歌，2025年初就聽這張，一聽LISA展現火辣與酷帥的巨星魅力。
                    </p>
                    <p>
                      產品內容：JEWEL CASE CD SUPER JEWEL CASE：1種 HOLOGRAPHIC
                      STAR STICKER：1種 CD：1張 隨機小卡：15種隨機1
                    </p>

                    <div className="inner-order">
                      <label htmlFor="innerOrder">訂購數量</label>
                      <input
                        className="form-control"
                        type="number"
                        id="innerOrder"
                      />
                    </div>
                    <button type="button" className="inner-btn">
                      確認購買
                    </button>
                  </div>
                </div>
                <div className="col-12 p-0">
                  <div className="product-inner-bottem">
                    <button className="back-btn mx-auto" type="button">
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
