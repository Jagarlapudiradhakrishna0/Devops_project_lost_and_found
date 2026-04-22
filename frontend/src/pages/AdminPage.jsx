import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Check, X, Users, Package, Zap, BarChart3, Eye, Trash2, Lock, Unlock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import GlassButton from '../components/GlassButton';

const API_URL = process.env.REACT_APP_API_URL || 'https://lostandfound-1vzs.onrender.com';

export default function AdminPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [pendingItems, setPendingItems] = useState(null);
  const [pendingMatches, setPendingMatches] = useState(null);
  const [users, setUsers] = useState(null);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  // Fetch all admin data
  useEffect(() => {
    if (!token) return;
    fetchAdminData();
  }, [token]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, itemsRes, matchesRes, usersRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/stats`, { headers }),
        fetch(`${API_URL}/api/admin/pending-items`, { headers }),
        fetch(`${API_URL}/api/admin/pending-matches`, { headers }),
        fetch(`${API_URL}/api/admin/users`, { headers }),
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (itemsRes.ok) setPendingItems(await itemsRes.json());
      if (matchesRes.ok) setPendingMatches(await matchesRes.json());
      if (usersRes.ok) setUsers(await usersRes.json());
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to load admin data: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const verifyItem = async (itemId, itemType) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/verify-item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, itemType }),
      });

      if (res.ok) {
        setToast({ type: 'success', message: `${itemType} item verified` });
        fetchAdminData();
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to verify item' });
    }
  };

  const rejectItem = async (itemId, itemType) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/reject-item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, itemType, reason: 'Admin rejection' }),
      });

      if (res.ok) {
        setToast({ type: 'success', message: `${itemType} item rejected` });
        fetchAdminData();
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to reject item' });
    }
  };

  const approveMatch = async (matchId) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/approve-match/${matchId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setToast({ type: 'success', message: 'Match approved' });
        fetchAdminData();
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to approve match' });
    }
  };

  const rejectMatch = async (matchId) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/reject-match/${matchId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason: 'Admin rejection' }),
      });

      if (res.ok) {
        setToast({ type: 'success', message: 'Match rejected' });
        fetchAdminData();
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to reject match' });
    }
  };

  const suspendUser = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/suspend-user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setToast({ type: 'success', message: 'User suspended' });
        fetchAdminData();
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to suspend user' });
    }
  };

  const activateUser = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/activate-user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setToast({ type: 'success', message: 'User activated' });
        fetchAdminData();
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to activate user' });
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-white text-xl">Access Denied: Admin Only</p>
        </div>
      </div>
    );
  }

  if (loading || !stats || !pendingItems || !pendingMatches || !users) {
    return <LoadingSpinner />;
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-blue-600 to-blue-400',
    },
    {
      title: 'Lost Items',
      value: stats.totalLostItems,
      icon: Package,
      color: 'from-red-600 to-red-400',
    },
    {
      title: 'Found Items',
      value: stats.totalFoundItems,
      icon: Package,
      color: 'from-green-600 to-green-400',
    },
    {
      title: 'Total Matches',
      value: stats.totalMatches,
      icon: Zap,
      color: 'from-purple-600 to-purple-400',
    },
    {
      title: 'Successful Returns',
      value: stats.successfulReturns,
      icon: Check,
      color: 'from-emerald-600 to-emerald-400',
    },
    {
      title: 'Pending Review',
      value: stats.pendingVerification,
      icon: AlertCircle,
      color: 'from-yellow-600 to-yellow-400',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 px-8 py-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-blue-400" />
          Admin Dashboard
        </h1>
        <p className="text-slate-400 mt-1">System Management & Moderation</p>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800/50 border-b border-slate-700 px-8">
        <div className="flex gap-4">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'items', label: 'Pending Items', icon: Package },
            { id: 'matches', label: 'Matches', icon: Zap },
            { id: 'users', label: 'Users', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-gradient-to-br ${card.color} p-6 rounded-lg shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">{card.title}</p>
                      <p className="text-3xl font-bold mt-2">{card.value}</p>
                    </div>
                    <card.icon className="w-12 h-12 opacity-50" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <GlassButton onClick={() => setActiveTab('items')}>
                  Review Items
                </GlassButton>
                <GlassButton onClick={() => setActiveTab('matches')}>
                  Review Matches
                </GlassButton>
                <GlassButton onClick={() => setActiveTab('users')}>
                  Manage Users
                </GlassButton>
                <GlassButton onClick={fetchAdminData}>Refresh Data</GlassButton>
              </div>
            </div>
          </motion.div>
        )}

        {/* Items Tab */}
        {activeTab === 'items' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-6">
              {/* Lost Items */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Package className="w-6 h-6 text-red-400" />
                  Pending Lost Items ({pendingItems.lostItems.length})
                </h3>
                {pendingItems.lostItems.length === 0 ? (
                  <p className="text-slate-400 p-4">No pending lost items</p>
                ) : (
                  <div className="space-y-3">
                    {pendingItems.lostItems.map((item) => (
                      <div key={item._id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{item.category}</h4>
                            <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                            <p className="text-slate-500 text-xs mt-2">
                              Reported by: {item.userId?.name} ({item.userId?.email})
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => verifyItem(item._id, 'lost')}
                              className="p-2 bg-green-600/20 hover:bg-green-600/40 text-green-400 rounded-lg transition-all"
                              title="Approve"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => rejectItem(item._id, 'lost')}
                              className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-all"
                              title="Reject"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Found Items */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Package className="w-6 h-6 text-green-400" />
                  Pending Found Items ({pendingItems.foundItems.length})
                </h3>
                {pendingItems.foundItems.length === 0 ? (
                  <p className="text-slate-400 p-4">No pending found items</p>
                ) : (
                  <div className="space-y-3">
                    {pendingItems.foundItems.map((item) => (
                      <div key={item._id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{item.category}</h4>
                            <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                            <p className="text-slate-500 text-xs mt-2">
                              Reported by: {item.userId?.name} ({item.userId?.email})
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => verifyItem(item._id, 'found')}
                              className="p-2 bg-green-600/20 hover:bg-green-600/40 text-green-400 rounded-lg transition-all"
                              title="Approve"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => rejectItem(item._id, 'found')}
                              className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-all"
                              title="Reject"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-400" />
              Pending Matches ({pendingMatches.length})
            </h3>
            {pendingMatches.length === 0 ? (
              <p className="text-slate-400 p-4">No pending matches</p>
            ) : (
              <div className="space-y-3">
                {pendingMatches.map((match) => (
                  <div key={match._id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">
                          Lost Item: {match.lostItemId?.category}
                        </h4>
                        <p className="text-slate-400 text-sm mt-1">
                          ↔ Found Item: {match.foundItemId?.category}
                        </p>
                        <p className="text-slate-500 text-xs mt-2">
                          Lost Reporter: {match.lostUserId?.name} | Found Reporter: {match.foundUserId?.name}
                        </p>
                        <p className="text-yellow-400 text-xs mt-1">
                          Status: <span className="font-semibold">{match.status}</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveMatch(match._id)}
                          className="p-2 bg-green-600/20 hover:bg-green-600/40 text-green-400 rounded-lg transition-all"
                          title="Approve"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => rejectMatch(match._id)}
                          className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-all"
                          title="Reject"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-400" />
              Users ({users.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="px-4 py-3 text-left text-slate-400">Name</th>
                    <th className="px-4 py-3 text-left text-slate-400">Email</th>
                    <th className="px-4 py-3 text-left text-slate-400">Role</th>
                    <th className="px-4 py-3 text-left text-slate-400">Status</th>
                    <th className="px-4 py-3 text-left text-slate-400">Joined</th>
                    <th className="px-4 py-3 text-center text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-all">
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-red-600/20 text-red-400'
                            : 'bg-slate-700/50 text-slate-300'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          user.isActive
                            ? 'bg-green-600/20 text-green-400'
                            : 'bg-red-600/20 text-red-400'
                        }`}>
                          {user.isActive ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => user.isActive ? suspendUser(user._id) : activateUser(user._id)}
                            className={`p-2 rounded-lg transition-all ${
                              user.isActive
                                ? 'bg-red-600/20 hover:bg-red-600/40 text-red-400'
                                : 'bg-green-600/20 hover:bg-green-600/40 text-green-400'
                            }`}
                            title={user.isActive ? 'Suspend' : 'Activate'}
                          >
                            {user.isActive ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
