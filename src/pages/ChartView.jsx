import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

export default function ChartView() {
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

  //top sales
  const topSales = useMemo(() => {
    return [...products].sort((a, b) => b.sales - a.sales).slice(0, 10);
  }, [products]);

  return (
    <>
      <section className="pages-bread">
        <div className="pages-bread-main d-flex align-items-center justify-between">
          <ul className="pages-bread-nav">
            <li>
              <a href="#">Index</a>
            </li>
            <li>
              <a href="#">Chart</a>
            </li>
          </ul>
        </div>
      </section>
      <section className="page-product">
        <div className="page-product-main">
          <div className="page-title-box">
            <div className="page-product-title">
              <h1>Music Chart</h1>
            </div>
          </div>
          <div className="page-chart-content">
            <div className="container-fluid">
              <div className="row pt-md-5 pt-1">
                <div className="col-12 col-md-3">
                  <div className="chart-top10-box d-flex flex-column">
                    <h2>TOP 10</h2>

                    {topSales.map((item, index) => (
                      <div className="chart-top10-item" key={item.id}>
                        <div className="chart-top10-pic">
                          <img src={item.imageUrl} alt={item.title} />
                        </div>
                        <div className="chart-top10-content d-flex flex-column">
                          <h3>{item.singer}</h3>
                          <span>
                            Top : {index + 1} {item.title}
                          </span>
                          <div class="chart-top10-sales">
                            <span>總銷量：{item.sales}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-12 col-md-9">
                  <div className="page-chart-main">
                    <div className="page-chart-item">
                      <h3>All sales rank</h3>
                      <div className="page-chart-target"></div>
                    </div>
                    <div className="page-chart-item">
                      <h3>All style rank</h3>
                      <div className="page-chart-target"></div>
                    </div>
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
