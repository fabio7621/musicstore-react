import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import PagePagination from "../components/PagePagination";
import { pushMessage } from "../redux/toastSlice";
import { useDispatch } from "react-redux";

const apiUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

export default function ProductPage() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("high");
  const [pagination, setPagination] = useState({});
  const [products, setProducts] = useState([]);
  const [productsAll, setProductsAll] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");

  const musicCategories = [...new Set(productsAll.map((item) => item.category))];

  const getProductsAll = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`);
      setProductsAll(res.data.products);
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message.join(","), status: "failed" }));
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const getProducts = useCallback(
    async (page = 1, category = "") => {
      try {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products?category=${category}&page=${page}`);
        setPagination(res.data.pagination);
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      } catch (error) {
        const { message } = error.response.data;
        dispatch(pushMessage({ text: message.join(","), status: "failed" }));
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const filterProductsByCategory = (category) => {
    if (category !== currentCategory) {
      setCurrentCategory(category);
      getProducts(1, category === "all" ? "" : category);
    }
  };

  const filterProducts = useCallback(() => {
    let tempProducts = [...products];

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(
        (item) => item.title.toLowerCase().includes(lowerSearchTerm) || (item.singer && item.singer.toLowerCase().includes(lowerSearchTerm))
      );
    }

    tempProducts.sort((a, b) => (sortOrder === "high" ? b.price - a.price : a.price - b.price));

    setFilteredProducts(tempProducts);
  }, [products, searchTerm, sortOrder]);

  const pagesChange = (page) => {
    getProducts(page, currentCategory === "all" ? "" : currentCategory);
  };

  const [wishList, setWishList] = useState(() => {
    return JSON.parse(localStorage.getItem("wishList")) || {};
  });

  const toggleWishListItem = (product_id) => {
    const newWishList = { ...wishList, [product_id]: !wishList[product_id] };
    localStorage.setItem("wishList", JSON.stringify(newWishList));
    setWishList(newWishList);
  };

  useEffect(() => {
    getProductsAll();
  }, [getProductsAll]);

  useEffect(() => {
    getProducts(1, currentCategory === "all" ? "" : currentCategory);
  }, [getProducts, currentCategory]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  return (
    <>
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 999,
          }}
        >
          <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
        </div>
      )}
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
                  <button type="button" onClick={() => filterProductsByCategory("all")}>
                    All
                  </button>
                </li>
                {musicCategories.map((categoryItem) => (
                  <li key={categoryItem}>
                    <button type="button" onClick={() => filterProductsByCategory(categoryItem)}>
                      {categoryItem}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="search-music">
                <input type="text" placeholder="請輸入專輯名稱或歌手名稱" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="product-contrl-box">
            <div className="page-product-contrl ms-auto d-flex align-items-center">
              <label htmlFor="productPrice">價格</label>
              <select className="form-select" id="productPrice" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="high">高到低</option>
                <option value="low">低到高</option>
              </select>
            </div>
          </div>

          <div className="page-product-lists">
            {filteredProducts.map((item) => (
              <Link to={`/products/${item.id}`} key={item.id} className="page-product-item">
                <div className="product-item-pic">
                  <img src={item.imageUrl} alt="album" />
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      toggleWishListItem(item.id);
                    }}
                    type="button"
                  >
                    {wishList?.[item.id] ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                  </button>
                </div>
                <span>{item.title}</span>
                <span>${item.price}</span>
              </Link>
            ))}
          </div>
          <PagePagination pagesChange={pagesChange} pagination={pagination} />
        </div>
      </section>
    </>
  );
}
