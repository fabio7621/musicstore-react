import { useState } from "react";

const albums = [
  { id: 1, title: "LISA / ALTER EGO", img: "/music/1444.jpg" },
  { id: 2, title: "LISA / ALTER EGO", img: "/music/1444.jpg" },
  { id: 3, title: "LISA / ALTER EGO", img: "/music/1444.jpg" },
  { id: 4, title: "LISA / ALTER EGO", img: "/music/1444.jpg" },
  { id: 5, title: "LISA / ALTER EGO", img: "/music/1444.jpg" },
  { id: 6, title: "LISA / ALTER EGO", img: "/music/1444.jpg" },
];

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("high");

  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="pages-bread">
        <div className="pages-bread-main d-flex align-items-center justify-between">
          <ul className="pages-bread-nav">
            <li>
              <a href="/">Index</a>
            </li>
            <li>
              <a href="/music-products">Music Products</a>
            </li>
          </ul>
        </div>
      </section>

      <section className="page-product">
        <div className="page-product-main">
          <div className="page-title-box">
            <div className="page-product-title">
              <h1>Music Product</h1>
            </div>
            <div className="page-product-navbar d-flex align-items-center justify-center flex-column">
              <ul className="product-navbar-list">
                <li>
                  <button type="button">English</button>
                </li>
                <li>
                  <button type="button">Chinese</button>
                </li>
                <li>
                  <button type="button">All</button>
                </li>
                <li>
                  <button type="button">J-pop</button>
                </li>
                <li>
                  <button type="button">K-pop</button>
                </li>
              </ul>
              <div className="search-music">
                <input
                  type="text"
                  placeholder="請輸入專輯名稱或歌手名稱"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="product-contrl-box">
            <div className="page-product-contrl ms-auto d-flex align-items-center">
              <label htmlFor="productPrice">價格</label>
              <select
                className="form-select"
                id="productPrice"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="high">高到低</option>
                <option value="low">低到高</option>
              </select>
            </div>
          </div>

          <div className="page-product-lists">
            {filteredAlbums.map((album) => (
              <div key={album.id} className="page-product-item">
                <div className="product-item-pic">
                  <img src={album.img} alt="album" />
                  <i className="bi bi-heart"></i>
                  {/* <i className="bi bi-heart-fill"></i> */}
                </div>
                <span>{album.title}</span>
              </div>
            ))}
          </div>

          <nav className="pages-pagination">
            <ul className="pagination mx-auto">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link active" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
