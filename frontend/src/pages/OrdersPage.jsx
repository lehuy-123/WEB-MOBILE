import '../styles/OrdersPage.css';

function OrdersPage() {
  const orders = [
    {
      id: '71',
      date: '19/12/2024',
      total: 57989000,
      status: 'Đang xử lý',
      items: [
        { name: 'iPhone 15 128GB', qty: 2, price: 22990000 },
        { name: 'iPhone 15 Pro Max 256GB', qty: 1, price: 34999000 },
      ]
    },
    {
      id: '72',
      date: '15/12/2024',
      total: 22990000,
      status: 'Đã giao',
      items: [
        { name: 'Samsung S24 256GB', qty: 1, price: 22990000 }
      ]
    }
  ];

  return (
    <div className="orders-page">
      <h2>Lịch sử đơn hàng</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Mã ĐH</th>
            <th>Ngày đặt</th>
            <th>Sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>
                {order.items.map((item, i) => (
                  <div key={i}>
                    {item.qty} x {item.name}
                  </div>
                ))}
              </td>
              <td>{order.total.toLocaleString()} VND</td>
              <td>
                <span className={`status ${order.status.replace(/\s/g, '-').toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>
                {order.status === 'Đang xử lý' ? (
                  <button className="cancel-btn">Hủy đơn</button>
                ) : (
                  <button className="view-btn">Xem</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
