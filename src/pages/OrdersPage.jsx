import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Clock, MapPin, ChevronRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem('freshcart_orders') || '[]');
    const userOrders = allOrders
      .filter((o) => o.userId === user?.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setOrders(userOrders);
  }, [user]);

  const statusColors = {
    confirmed: '#3b82f6',
    preparing: '#f59e0b',
    delivering: '#8b5cf6',
    delivered: '#22c55e',
  };

  if (orders.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <ShoppingBag size={64} className="empty-icon" />
          <h2>No orders yet</h2>
          <p>Your order history will appear here.</p>
          <Link to="/" className="btn btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="page-container">
        <h1 className="page-title">Your Orders</h1>

        <div className="orders-list">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              className="order-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="order-card-header">
                <div className="order-card-id">
                  <Package size={18} />
                  <span>Order {order.id}</span>
                </div>
                <span
                  className="order-status"
                  style={{ background: `${statusColors[order.status]}20`, color: statusColors[order.status] }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="order-card-body">
                <div className="order-items-preview">
                  {order.items.slice(0, 5).map((item) => (
                    <span key={item.id} className="order-item-emoji" title={item.name}>
                      {item.image}
                    </span>
                  ))}
                  {order.items.length > 5 && (
                    <span className="order-items-more">
                      +{order.items.length - 5}
                    </span>
                  )}
                </div>

                <div className="order-card-meta">
                  <span>
                    <Clock size={14} />
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </span>
                  <span>
                    <MapPin size={14} />
                    {order.address}
                  </span>
                </div>
              </div>

              <div className="order-card-footer">
                <span className="order-total">
                  ${order.total.toFixed(2)} · {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                </span>
                <Link to={`/orders`} className="order-detail-link">
                  Details <ChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
