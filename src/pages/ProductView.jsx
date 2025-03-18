import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

export default function ProductPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("high");
  const [pagination, setPagination] = useState({});
  const [products, setProducts] = useState([]);
  const [productsAll, setProductsAll] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");

  const musicCategories = [
    ...new Set(productsAll.map((item) => item.category)),
  ];

  const getProductsAll = async () => {
    try {
      const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`);
      setProductsAll(res.data.products);
    } catch (error) {
      alert("取得產品失敗", `${error}`);
    }
  };

  const getProducts = async (page = 1, category = "") => {
    try {
      const res = await axios.get(
        `${apiUrl}/v2/api/${apiPath}/products?category=${category}&page=${page}`
      );
      setPagination(res.data.pagination);
      setProducts(res.data.products);
      setFilteredProducts(res.data.products);
    } catch (error) {
      alert("取得產品失敗", `${error}`);
    }
  };

  const filterProductsByCategory = (category) => {
    const apiCategory = category === "all" ? "" : category;
    setCurrentCategory(category);
    getProducts(1, apiCategory);
  };

  const filterProducts = () => {
    let tempProducts = [...products];
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerSearchTerm) ||
          (item.singer && item.singer.toLowerCase().includes(lowerSearchTerm))
      );
    }

    if (sortOrder === "high") {
      tempProducts.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "low") {
      tempProducts.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(tempProducts);
  };

  const pagesChange = (page) => {
    const apiCategory = currentCategory === "all" ? "" : currentCategory;
    getProducts(page, apiCategory);
  };

  useEffect(() => {
    getProductsAll();
  }, []);
  useEffect(() => {
    getProducts(1, currentCategory === "all" ? "" : currentCategory);
  }, [currentCategory]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, sortOrder, products]);

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
                <li>
                  <button
                    type="button"
                    onClick={() => filterProductsByCategory("all")}
                  >
                    All
                  </button>
                </li>
                {musicCategories.map((categoryItem) => (
                  <li key={categoryItem}>
                    <button
                      type="button"
                      onClick={() => filterProductsByCategory(categoryItem)}
                    >
                      {categoryItem}
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
