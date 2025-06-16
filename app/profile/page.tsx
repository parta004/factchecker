'use client';

import { motion } from 'framer-motion';
import { User, Settings, BarChart3, Shield, Bell, LogOut, Edit3 } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'settings'>('overview');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.div
        className="pt-16 pb-8 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold">John Doe</h1>
            <p className="text-gray-400">Fact-check enthusiast</p>
          </div>
          <button className="ml-auto p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="px-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex bg-gray-800/50 rounded-xl p-1">
          {[
            { id: 'overview' as const, label: 'Overview', icon: User },
            { id: 'stats' as const, label: 'Stats', icon: BarChart3 },
            { id: 'settings' as const, label: 'Settings', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                activeTab === id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="px-4 pb-24">
        {activeTab === 'overview' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Activity Summary */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Activity Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">142</div>
                  <div className="text-sm text-gray-400">Videos Checked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">89%</div>
                  <div className="text-sm text-gray-400">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">23</div>
                  <div className="text-sm text-gray-400">Notes Added</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">7</div>
                  <div className="text-sm text-gray-400">Days Streak</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'Fact-checked video', title: 'Climate Change Facts', time: '2h ago' },
                  { action: 'Added community note', title: 'Economic Statistics', time: '5h ago' },
                  { action: 'Verified source', title: 'Health Research', time: '1d ago' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <div className="text-sm font-medium">{item.action}</div>
                      <div className="text-xs text-gray-400">{item.title}</div>
                    </div>
                    <div className="text-xs text-gray-500">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'stats' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Fact-Check Statistics */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Fact-Check Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Truth Detection Rate</span>
                  <span className="text-green-400 font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Misinformation Spotted</span>
                  <span className="text-red-400 font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>

            {/* Contribution Badges */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Achievement Badges</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { emoji: '🔍', name: 'Truth Seeker', earned: true },
                  { emoji: '🛡️', name: 'Defender', earned: true },
                  { emoji: '📚', name: 'Scholar', earned: false },
                  { emoji: '⭐', name: 'Expert', earned: false },
                  { emoji: '🏆', name: 'Champion', earned: false },
                  { emoji: '💎', name: 'Master', earned: false }
                ].map((badge, index) => (
                  <div
                    key={index}
                    className={`text-center p-3 rounded-lg border ${
                      badge.earned 
                        ? 'border-blue-500 bg-blue-500/10' 
                        : 'border-gray-600 bg-gray-800/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.emoji}</div>
                    <div className="text-xs font-medium">{badge.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Notification Settings */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'New fact-check results', enabled: true },
                  { label: 'Community note updates', enabled: true },
                  { label: 'Weekly summary', enabled: false },
                  { label: 'Achievement unlocked', enabled: true }
                ].map((setting, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{setting.label}</span>
                    <button
                      className={`w-12 h-6 rounded-full transition-colors ${
                        setting.enabled ? 'bg-blue-600' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          setting.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-800 rounded-lg transition-colors">
                  <div className="font-medium">Data & Privacy</div>
                  <div className="text-sm text-gray-400">Manage your data preferences</div>
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-800 rounded-lg transition-colors">
                  <div className="font-medium">Account Security</div>
                  <div className="text-sm text-gray-400">Password and security settings</div>
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
              <button className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}