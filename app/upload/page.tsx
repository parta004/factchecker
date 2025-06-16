'use client';

import { motion } from 'framer-motion';
import { Upload, Video, Link, FileText, Zap } from 'lucide-react';
import { useState } from 'react';

export default function UploadPage() {
  const [uploadType, setUploadType] = useState<'video' | 'url' | 'text'>('url');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.div
        className="pt-16 pb-8 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-center mb-2">Upload Content</h1>
        <p className="text-gray-400 text-center">Submit content for fact-checking analysis</p>
      </motion.div>

      {/* Upload Type Selector */}
      <motion.div
        className="px-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex bg-gray-800/50 rounded-xl p-1">
          {[
            { type: 'url' as const, icon: Link, label: 'URL' },
            { type: 'video' as const, icon: Video, label: 'Video' },
            { type: 'text' as const, icon: FileText, label: 'Text' }
          ].map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => setUploadType(type)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                uploadType === type
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

      {/* Upload Form */}
      <motion.div
        className="px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
          {uploadType === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Video URL</label>
                <input
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Add context or specific claims to fact-check..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          )}

          {uploadType === 'video' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Drop your video file here or click to browse</p>
                <p className="text-sm text-gray-500">MP4, MOV, AVI up to 500MB</p>
                <input type="file" accept="video/*" className="hidden" />
              </div>
            </div>
          )}

          {uploadType === 'text' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Text Content</label>
                <textarea
                  rows={6}
                  placeholder="Paste the text content you want fact-checked..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap className="w-4 h-4" />
            Start Fact-Check Analysis
          </motion.button>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        className="px-4 mt-8 pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-4">What we analyze:</h3>
        <div className="space-y-3">
          {[
            '📊 Data accuracy and source verification',
            '🗣️ Emotional manipulation techniques',
            '🧠 Logical fallacies and reasoning errors',
            '🍒 Cherry-picking and selective reporting',
            '✅ Cross-reference with reliable sources'
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}