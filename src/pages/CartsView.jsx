export default function CartPage() {
  return (
    <div>
      {/* 麵包屑導航 */}
      <section className="pages-bread">
        <div className="pages-bread-main d-flex align-items-center justify-between">
          <ul className="pages-bread-nav">
            <li>
              <a href="#">Index</a>
            </li>
            <li>
              <a href="#">Cart</a>
            </li>
          </ul>
        </div>
      </section>

      {/* 購物車內容 */}
      <section className="page-product">
        <div className="page-product-main">
          <div className="page-title-box">
            <div className="page-product-title">
              <h1>Shop Cart</h1>
            </div>
          </div>

          <table className="shopcart-list">
            <thead>
              <tr>
                <th>品名</th>
                <th>數量</th>
                <th>價格</th>
                <th>刪除</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="shopcart-title d-flex align-items-center">
                    <div className="shopcart-pic">
                      <img
                        src="@/../../../../public/music/1444.jpg"
                        alt="album"
                      />
                    </div>
                    <span>Lisa - ASDAFW</span>
                  </div>
                </td>
                <td>
                  <input className="" type="text" name="quantity1" />
                </td>
                <td>1220</td>
                <td>
                  <div className="shopcart-del-pic">
                    <img
                      src="@/../../../../public/icon/Close.png"
                      alt="delete"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="shopcart-title d-flex align-items-center">
                    <div className="shopcart-pic">
                      <img
                        src="@/../../../../public/music/1444.jpg"
                        alt="album"
                      />
                    </div>
                    <span>Lisa - ASDAFW</span>
                  </div>
                </td>
                <td>
                  <input className="" type="text" name="quantity2" />
                </td>
                <td>1220</td>
                <td>
                  <div className="shopcart-del-pic">
                    <img
                      src="@/../../../../public/icon/Close.png"
                      alt="delete"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* 訂單表單 */}
          <form className="page-shop-form" action="">
            <div className="shop-form-item">
              <label>Email</label>
              <input type="email" name="email" />
            </div>
            <div className="shop-form-item">
              <label>收件人</label>
              <input type="text" name="receiver" />
            </div>
            <div className="shop-form-item">
              <label>電話</label>
              <input type="text" name="phone" />
            </div>
            <div className="shop-form-item">
              <label>地址</label>
              <input type="text" name="address" />
            </div>
            <div className="shop-form-item">
              <label>留言</label>
              <textarea name="message"></textarea>
            </div>
            <button className="page-shop-btn mx-auto" type="button">
              送出訂單
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
