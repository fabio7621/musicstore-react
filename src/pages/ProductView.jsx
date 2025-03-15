import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

const musicCategories = [
  { name: "Taiwan", value: "taiwan" },
  { name: "All", value: "all" },
  { name: "Hip Hop", value: "hiphop" },
  { name: "J-pop", value: "japan" },
  { name: "K-pop", value: "korea" },
];

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("high");
  const [pagination, setPagination] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all"); // 新增 state 來追蹤當前類別

  const getProducts = async (page = 1, category = "") => {
    try {
      const res = await axios.get(
        `${apiUrl}/v2/api/${apiPath}/products?category=${category}&page=${page}`
      );
      setPagination(res.data.pagination);
      setProducts(res.data.products);
      setFilteredProducts(res.data.products); // 取得新資料後更新 filteredProducts
    } catch (error) {
      alert("取得產品失敗", `${error}`);
    }
  };

  const filterProductsByCategory = (category) => {
    setCurrentCategory(category); // 更新當前類別
    getProducts(1, category); // 呼叫 API 取得該類別的資料，並回到第一頁
  };

  const filterProducts = () => {
    let tempProducts = [...products];

    // 根據關鍵字搜尋 (在取得特定類別資料後再搜尋)
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerSearchTerm) ||
          (item.singer && item.singer.toLowerCase().includes(lowerSearchTerm))
      );
    }

    // 根據價格排序 (在取得特定類別資料後再排序)
    if (sortOrder === "high") {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "low") {
      tempProducts.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(tempProducts);
  };

  const pagesChange = (page) => {
    getProducts(page, currentCategory);
  };

  useEffect(() => {
    getProducts(1, currentCategory);
  }, [currentCategory]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, sortOrder, products]);

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <section className="pages-bread">
        <div className="pages-bread-main d-flex align-items-center justify-between">
          <ul className="pages-bread-nav">
            <li>
              <a href="/">Index</a>
            </li>
            <li>
              <a>Music Products</a>
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
                {musicCategories.map((categoryItem) => (
                  <li key={categoryItem.value}>
                    <button
                      type="button"
                      onClick={() =>
                        filterProductsByCategory(categoryItem.value)
                      }
                    >
                      {categoryItem.name}
                    </button>
                  </li>
                ))}
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
            {filteredProducts.map((item) => (
              <Link
                to={`/products/${item.id}`}
                key={item.id}
                className="page-product-item"
              >
                <div className="product-item-pic">
                  <img src={item.imageUrl} alt="album" />
                  <i className="bi bi-heart"></i>
                  {/* <i className="bi bi-heart-fill"></i> */}
                </div>
                <span>{item.title}</span>
                <span>${item.price}</span>
              </Link>
            ))}
          </div>

          <nav className="w-100 col mx-auto">
            <ul
              className="mx-auto pagination mt-5"
              style={{ width: "fit-content" }}
            >
              <li
                className={`page-item ${!pagination.has_pre && "disabled"}`}
                onClick={() => pagesChange(pagination.current_page - 1)}
              >
                <button className="page-link">上一頁</button>
              </li>

              {Array.from({ length: pagination.total_pages }).map(
                (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      pagination.current_page === index + 1 && "active"
                    }`}
                  >
                    <button
                      onClick={() => pagesChange(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}

              <li className={`page-item ${!pagination.has_next && "disabled"}`}>
                <button
                  onClick={() => pagesChange(pagination.current_page + 1)}
                  className="page-link"
                >
                  下一頁
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
