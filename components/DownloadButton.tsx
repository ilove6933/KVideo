'use client';

import React, { useState } from 'react';

// 定義下載按鈕接收的參數
interface DownloadButtonProps {
  url: string;      // 影片連結
  title?: string;   // 影片標題（用於檔名）
}

export default function DownloadButton({ url, title = 'video' }: DownloadButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const handleDownload = async () => {
    if (!url) return;

    // 判斷是否為 M3U8 (HLS) 串流
    const isM3U8 = url.toLowerCase().includes('.m3u8');

    if (isM3U8) {
      // 策略 A: 如果是 m3u8，自動複製連結並提示
      try {
        await navigator.clipboard.writeText(url);
        setStatus('success');
        setMsg('串流連結已複製！請使用 IDM 或下載器下載');
        setTimeout(() => { setStatus('idle'); setMsg(''); }, 3000);
      } catch (err) {
        setStatus('error');
        setMsg('複製失敗');
      }
    } else {
      // 策略 B: 如果是 MP4/一般檔案，嘗試瀏覽器直接下載
      setStatus('loading');
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network error');
        
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = `${title}.mp4`;
        
        document.body.appendChild(a);
        a.click();
        
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);
        
        setStatus('success');
        setMsg('下載已開始');
        setTimeout(() => { setStatus('idle'); setMsg(''); }, 3000);
      } catch (error) {
        // 如果瀏覽器阻擋 (CORS)，改為開新視窗
        console.error(error);
        window.open(url, '_blank');
        setStatus('idle');
      }
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 mt-4">
      <button
        onClick={handleDownload}
        disabled={status === 'loading'}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
          ${status === 'loading' ? 'bg-gray-600 cursor-wait' : 'bg-primary hover:bg-primary/90'}
          text-white
        `}
        style={{ backgroundColor: '#2563eb' }} // 預設給一個藍色，避免 Tailwind 變數未定義
      >
        {/* 下載圖示 SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        
        <span>
          {status === 'loading' ? '下載處理中...' : '下載影片 / 複製連結'}
        </span>
      </button>

      {/* 狀態提示訊息 */}
      {msg && (
        <span className={`text-sm ${status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
          {msg}
        </span>
      )}
    </div>
  );
}
