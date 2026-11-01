import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  Clock,
  Truck,
  ArrowLeft,
  Plus,
  Search,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { products, formatPrice } from '../data/products';
import { Product } from '../types';

interface AdminDashboardProps {
  onBackToStore: () => void;
}

interface DemoOrder {
  id: string;
  customer: string;
  phone: string;
  governorate: string;
  items: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  payment: string;
}

const initialOrders: DemoOrder[] = [
  {
    id: 'AH-89214',
    customer: 'Omar El-Sayed',
    phone: '01098765432',
    governorate: 'Cairo (Nasr City)',
    items: 'Gojo Satoru (Limitless) x1',
    total: 3450,
    status: 'Pending',
    date: 'Today, 2:45 PM',
    payment: 'Cash on Delivery'
  },
  {
    id: 'AH-89213',
    customer: 'Nouran Khalil',
    phone: '01123456789',
    governorate: 'Giza (Dokki)',
    items: 'Pochita Large Plush x1, Uzumaki Manga x1',
    total: 1400,
    status: 'Shipped',
    date: 'Today, 11:20 AM',
    payment: 'InstaPay'
  },
  {
    id: 'AH-89212',
    customer: 'Karim Mostafa',
    phone: '01234567890',
    governorate: 'Alexandria (Sidi Gaber)',
    items: 'Berserk Deluxe Vol. 1 x1',
    total: 1330,
    status: 'Delivered',
    date: 'Yesterday',
    payment: 'Cash on Delivery'
  },
  {
    id: 'AH-89211',
    customer: 'Youssef Adel',
    phone: '01511223344',
    governorate: 'Mansoura',
    items: 'Akatsuki Cloud Hoodie x1',
    total: 1030,
    status: 'Delivered',
    date: 'Yesterday',
    payment: 'Cash on Delivery'
  },
  {
    id: 'AH-89210',
    customer: 'Salma Tarek',
    phone: '01009876543',
    governorate: 'Cairo (New Cairo)',
    items: 'Roronoa Zoro (King of Artist) x1',
    total: 1850,
    status: 'Shipped',
    date: '2 days ago',
    payment: 'Credit Card'
  }
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToStore }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory'>('overview');
  const [orderList, setOrderList] = useState<DemoOrder[]>(initialOrders);
  const [inventoryList, setInventoryList] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Toggle order status
  const handleUpdateStatus = (id: string, newStatus: DemoOrder['status']) => {
    setOrderList(prev => prev.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  const filteredOrders = orderList.filter(order => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.governorate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orderList.reduce((acc, order) => acc + order.total, 0) + 148200; // Realistic demo base

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Top Header */}
      <header className="bg-brand-black border-b border-brand-gray-light sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="bg-brand-orange p-2 rounded-xl text-black font-black text-xl italic">
                AH
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-black tracking-tight text-white">Store Owner Dashboard</h1>
                  <span className="bg-brand-orange/20 text-brand-orange text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-brand-orange/30">
                    Live Demo
                  </span>
                </div>
                <p className="text-xs text-gray-400">The Anime House • Egypt Operations</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToStore}
                className="bg-brand-gray hover:bg-brand-gray-light text-white hover:text-brand-orange border border-brand-gray-light px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Storefront</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-brand-black/50 border-t border-brand-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'overview'
                    ? 'border-brand-orange text-brand-orange'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Overview & KPIs
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all relative ${
                  activeTab === 'orders'
                    ? 'border-brand-orange text-brand-orange'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Orders Management
                <span className="ml-2 bg-brand-orange text-black font-black text-[10px] px-1.5 py-0.5 rounded-full">
                  {orderList.filter(o => o.status === 'Pending').length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`py-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'inventory'
                    ? 'border-brand-orange text-brand-orange'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Inventory Catalog ({inventoryList.length})
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-brand-gray border border-brand-gray-light p-6 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase text-gray-400">Total Monthly Revenue</span>
                  <div className="p-2 rounded-xl bg-brand-orange/10 text-brand-orange border border-brand-orange/20">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">{formatPrice(totalRevenue)}</div>
                <div className="flex items-center space-x-2 text-xs text-green-400 mt-2 font-semibold">
                  <span>+18.4% vs last month</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-brand-gray border border-brand-gray-light p-6 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase text-gray-400">Total Orders Placed</span>
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">184 Orders</div>
                <div className="flex items-center space-x-2 text-xs text-brand-orange mt-2 font-semibold">
                  <span>+14 today</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-brand-gray border border-brand-gray-light p-6 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase text-gray-400">Pending Fulfillment</span>
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">
                  {orderList.filter(o => o.status === 'Pending').length} Pending
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400 mt-2">
                  <span>Requires Cairo dispatch</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-brand-gray border border-brand-gray-light p-6 rounded-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase text-gray-400">Low Stock Alert</span>
                  <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-white">2 Items</div>
                <div className="flex items-center space-x-2 text-xs text-red-400 mt-2">
                  <span>Gojo Figure (5 left)</span>
                </div>
              </div>
            </div>

            {/* Regional Performance & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Regional Breakdown (Egypt Governorates) */}
              <div className="lg:col-span-2 bg-brand-gray border border-brand-gray-light rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-black uppercase text-white">Sales by Egyptian Region</h2>
                    <p className="text-xs text-gray-400">Distribution of customer orders</p>
                  </div>
                  <span className="text-xs font-bold text-brand-orange bg-brand-black px-3 py-1 rounded-full border border-brand-gray-light">
                    Egypt Nationwide
                  </span>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-white">Greater Cairo & Giza</span>
                      <span className="text-brand-orange font-black">68% (125 Orders)</span>
                    </div>
                    <div className="w-full bg-brand-black h-3 rounded-full overflow-hidden">
                      <div className="bg-brand-orange h-full rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-white">Alexandria & Coast</span>
                      <span className="text-brand-orange font-black">18% (33 Orders)</span>
                    </div>
                    <div className="w-full bg-brand-black h-3 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '18%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-white">Delta Governorates (Mansoura, Tanta)</span>
                      <span className="text-brand-orange font-black">9% (16 Orders)</span>
                    </div>
                    <div className="w-full bg-brand-black h-3 rounded-full overflow-hidden">
                      <div className="bg-gray-400 h-full rounded-full" style={{ width: '9%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-white">Upper Egypt & Canal Zone</span>
                      <span className="text-brand-orange font-black">5% (10 Orders)</span>
                    </div>
                    <div className="w-full bg-brand-black h-3 rounded-full overflow-hidden">
                      <div className="bg-gray-600 h-full rounded-full" style={{ width: '5%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Ops & Notice */}
              <div className="bg-brand-gray border border-brand-gray-light rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-black uppercase text-white mb-2">WhatsApp Order Sync</h2>
                  <p className="text-xs text-gray-400 mb-6">
                    Egyptian buyers love confirming cash-on-delivery orders over WhatsApp before dispatch.
                  </p>

                  <div className="space-y-3">
                    <div className="bg-brand-black p-4 rounded-xl border border-brand-gray-light flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-[#25D366]/20 text-[#25D366]">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Instant Confirmation</div>
                        <div className="text-[10px] text-gray-400">Auto-generated WhatsApp link for each order</div>
                      </div>
                    </div>

                    <div className="bg-brand-black p-4 rounded-xl border border-brand-gray-light flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-brand-orange/20 text-brand-orange">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Bosta / Mylerz Integration</div>
                        <div className="text-[10px] text-gray-400">Ready for automated shipping label generation</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-gray-light mt-6">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="w-full bg-brand-orange text-black font-black py-3 rounded-xl uppercase text-xs tracking-wider hover:bg-orange-600 transition-colors"
                  >
                    Manage Orders Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-gray p-4 rounded-2xl border border-brand-gray-light">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search customer, Order ID, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-brand-black border border-brand-gray-light text-white pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-brand-orange"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                {['All', 'Pending', 'Shipped', 'Delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors ${
                      statusFilter === st
                        ? 'bg-brand-orange text-black'
                        : 'bg-brand-black text-gray-400 hover:text-white border border-brand-gray-light'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-brand-gray border border-brand-gray-light rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-brand-black text-[10px] uppercase font-black tracking-widest text-gray-400 border-b border-brand-gray-light">
                    <tr>
                      <th className="py-4 px-6">Order ID</th>
                      <th className="py-4 px-6">Customer & Location</th>
                      <th className="py-4 px-6">Products</th>
                      <th className="py-4 px-6">Amount</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-gray-light">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-brand-black/40 transition-colors">
                        <td className="py-4 px-6 font-black text-brand-orange whitespace-nowrap">
                          {order.id}
                          <div className="text-[10px] text-gray-500 font-normal">{order.date}</div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="font-bold text-white">{order.customer}</div>
                          <div className="text-xs text-gray-400">{order.governorate}</div>
                          <div className="text-[10px] text-gray-500">{order.phone}</div>
                        </td>
                        <td className="py-4 px-6 text-xs text-gray-300 max-w-xs truncate">
                          {order.items}
                        </td>
                        <td className="py-4 px-6 font-black text-white whitespace-nowrap">
                          {formatPrice(order.total)}
                          <div className="text-[10px] text-gray-400 font-normal">{order.payment}</div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value as DemoOrder['status'])}
                            className={`text-xs font-black uppercase px-3 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                              order.status === 'Pending'
                                ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                                : order.status === 'Shipped'
                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                : 'bg-green-500/10 text-green-400 border-green-500/30'
                            }`}
                          >
                            <option value="Pending" className="bg-brand-black text-white">Pending</option>
                            <option value="Shipped" className="bg-brand-black text-white">Shipped</option>
                            <option value="Delivered" className="bg-brand-black text-white">Delivered</option>
                            <option value="Cancelled" className="bg-brand-black text-white">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <a
                            href={`https://wa.me/2${order.phone}?text=Hello%20${encodeURIComponent(order.customer)},%20this%20is%20The%20Anime%20House%20regarding%20order%20${order.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1.5 bg-[#25D366] hover:bg-[#20bd5c] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-brand-gray p-4 rounded-2xl border border-brand-gray-light">
              <div>
                <h2 className="text-base font-black uppercase text-white">Store Inventory</h2>
                <p className="text-xs text-gray-400">Manage products, stock levels, and pricing</p>
              </div>
              <button
                onClick={() => alert("Demo Mode: Adding new product form simulated!")}
                className="bg-brand-orange hover:bg-orange-600 text-black font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventoryList.map((product) => (
                <div key={product.id} className="bg-brand-gray border border-brand-gray-light p-4 rounded-2xl flex space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-xl bg-brand-black flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-orange">{product.category}</span>
                      <h3 className="text-xs font-bold text-white truncate">{product.name}</h3>
                      <div className="text-sm font-black text-brand-orange mt-1">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-brand-gray-light">
                      <span className={`text-[10px] font-black uppercase ${product.stock < 10 ? 'text-amber-500' : 'text-green-400'}`}>
                        {product.stock} in stock
                      </span>
                      <button
                        onClick={() => {
                          setInventoryList(prev => prev.map(p => p.id === product.id ? { ...p, stock: p.stock + 5 } : p));
                        }}
                        className="text-[10px] bg-brand-black hover:bg-brand-gray-light border border-brand-gray-light text-white px-2 py-1 rounded-md font-bold uppercase"
                      >
                        +5 Restock
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
