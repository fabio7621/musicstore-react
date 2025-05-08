import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { pushMessage } from "../redux/toastSlice";
import { useDispatch } from "react-redux";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const apiUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_API_PATH;

export default function ChartView() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`);
      setProducts(res.data.products);
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({ text: message.join(","), status: "failed" }));
    }
  }, [dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const topSales = useMemo(() => {
    return [...products].sort((a, b) => b.sales - a.sales).slice(0, 10);
  }, [products]);

  const data = useMemo(() => {
    const labels = topSales.map((item) => item.singer);
    const salesData = topSales.map((item) => item.sales);

    return {
      labels: labels,
      datasets: [
        {
          label: "銷售量",
          data: salesData,
          backgroundColor: "rgba(208, 248, 28, 0.61)",
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    };
  }, [topSales]);

  const options = useMemo(
    () => ({
      indexAxis: "y",
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "#fff",
          },
        },
        title: {
          display: true,
          text: "Top 10 Sales Rank",
          color: "#fff",
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#fff",
          },
          title: {
            color: "#fff",
          },
        },
        y: {
          ticks: {
            color: "#fff",
          },
          title: {
            color: "#fff",
          },
        },
      },
    }),
    []
  );

  const pieChartData = useMemo(() => {
    const categorySales = {};

    products.forEach((product) => {
      const category = product.category;
      const sales = product.sales;

      if (!categorySales[category]) {
        categorySales[category] = 0;
      }
      categorySales[category] += sales;
    });

    const labels = Object.keys(categorySales);
    const salesData = Object.values(categorySales);

    return {
      labels: labels,
      datasets: [
        {
          label: "Category Sales",
          data: salesData,
          backgroundColor: [
            "rgba(226, 172, 241, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    };
  }, [products]);

  const pieOptions = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "#fff",
          },
        },
        title: {
          display: true,
          text: "Category Sales Distribution",
          color: "#fff",
        },
      },
    }),
    []
  );

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
                <div className="col-12 col-md-6 col-lg-3">
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
                          <div className="chart-top10-sales">
                            <span>總銷量：{item.sales}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-9">
                  <div className="page-chart-main">
                    <div className="page-chart-item">
                      <h3>All sales rank</h3>
                      <Bar className="page-chart-target" data={data} options={options} />
                    </div>
                    <div className="page-chart-item">
                      <h3>All style rank</h3>
                      <Pie className="page-chart-target pie" data={pieChartData} options={pieOptions} />
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
