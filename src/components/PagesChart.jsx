import { Link } from "react-router-dom";

export default function PagesChart() {
  return (
    <>
      <Link to="/chart" className="pages-chart-btn d-none d-md-none d-lg-block">
        <img src="/public/icon/chart.png" alt="music" />
        <div className="chart-btn-box d-flex align-items-center justify-content-center">
          <div className="chart-btn-item long"></div>
          <div className="chart-btn-item short"></div>
          <div className="chart-btn-item long"></div>
          <div className="chart-btn-item short"></div>
        </div>
        <span className="pages-chart-btn-word">流行儀錶板</span>
      </Link>
    </>
  );
}
