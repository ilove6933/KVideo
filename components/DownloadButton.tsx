'use client';

import React, { useState } from 'react';

interface DownloadButtonProps {
  url: string;
  title?: string;
}

export default function DownloadButton({ url, title = 'video' }: DownloadButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied'>('idle');

  const handleDownload = async () => {
    if (!url) return;

    // 1. 複製連結到剪貼簿
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
      
      // 2. 設定延遲後跳轉，讓用戶看清楚提示
      setTimeout(() => {
        // 這裡選用的是一個乾淨、開源的 m3u8 下載器
        // 備用選項: 'https://m3u8-downloader.com/'
        const toolUrl = 'https://tools.thatwind.com/tool/m3u8downloader';
        window.open(toolUrl, '_blank');
        setStatus('idle');
      }, 800);

    } catch (err) {
      console.error('複製失敗', err);
      // 如果自動複製失敗，至少打開網站
      window.open('https://tools.thatwind.com/tool/m3u8downloader', '_blank');
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleDownload}
        disabled={!url}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all text-sm shadow-lg
          ${!url 
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
            : status === 'copied'
              ? 'bg-green-600 text-white scale-95'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'
          }
        `}
        title="複製連結並前往下載網站"
      >
        {status === 'copied' ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>連結已複製！正在跳轉...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>下載影片 (跳轉)</span>
          </>
        )}
      </button>
      
      {/* 提示文字 */}
      <span className="text-[10px] text-gray-400 opacity-80 pl-1">
        * 將自動複製連結並前往轉檔網站
      </span>
    </div>
  );
}
