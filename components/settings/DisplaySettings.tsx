'use client';

/**
 * DisplaySettings - Settings for search display and latency
 * Following Liquid Glass design system
 */

import { type SearchDisplayMode } from '@/lib/store/settings-store';
import { Switch } from '@/components/ui/Switch';

interface DisplaySettingsProps {
    realtimeLatency: boolean;
    searchDisplayMode: SearchDisplayMode;
    rememberScrollPosition: boolean;
    onRealtimeLatencyChange: (enabled: boolean) => void;
    onSearchDisplayModeChange: (mode: SearchDisplayMode) => void;
    onRememberScrollPositionChange: (enabled: boolean) => void;
}

export function DisplaySettings({
    realtimeLatency,
    searchDisplayMode,
    rememberScrollPosition,
    onRealtimeLatencyChange,
    onSearchDisplayModeChange,
    onRememberScrollPositionChange,
}: DisplaySettingsProps) {
    return (
        <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[var(--radius-2xl)] shadow-[var(--shadow-sm)] p-6 mb-6">
            <h2 className="text-xl font-semibold text-[var(--text-color)] mb-4">显示设置</h2>

            {/* Remember Scroll Position Toggle */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-[var(--text-color)]">记住滚动位置</h3>
                        <p className="text-sm text-[var(--text-color-secondary)] mt-1">
                            退出或重整頁面後，自動回復到之前的滚動位置
                        </p>
                    </div>
                    <Switch
                        checked={rememberScrollPosition}
                        onChange={onRememberScrollPositionChange}
                        ariaLabel="记住滚动位置开关"
                    />
                </div>
            </div>

            {/* Real-time Latency Toggle */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium text-[var(--text-color)]">實時延遲顯示</h3>
                        <p className="text-sm text-[var(--text-color-secondary)] mt-1">
                            開啟後，搜索结果中的延遲數值會每 5 秒更新一次
                        </p>
                    </div>
                    <Switch
                        checked={realtimeLatency}
                        onChange={onRealtimeLatencyChange}
                        ariaLabel="實時延遲顯示開關"
                    />
                </div>
            </div>

            {/* Search Display Mode */}
            <div>
                <h3 className="font-medium text-[var(--text-color)] mb-2">搜索结果顯示方式</h3>
                <p className="text-sm text-[var(--text-color-secondary)] mb-4">
                    選擇搜索结果的展示模式
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        onClick={() => onSearchDisplayModeChange('normal')}
                        className={`px-4 py-3 rounded-[var(--radius-2xl)] border text-left font-medium transition-all duration-200 cursor-pointer ${searchDisplayMode === 'normal'
                            ? 'bg-[var(--accent-color)] border-[var(--accent-color)] text-white shadow-[0_4px_12px_rgba(var(--accent-color-rgb),0.3)]'
                            : 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-color)] hover:bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)]'
                            }`}
                    >
                        <div className="font-semibold">默認顯示</div>
                        <div className="text-sm opacity-80 mt-1">每ㄍ來源的结果單獨顯示</div>
                    </button>
                    <button
                        onClick={() => onSearchDisplayModeChange('grouped')}
                        className={`px-4 py-3 rounded-[var(--radius-2xl)] border text-left font-medium transition-all duration-200 cursor-pointer ${searchDisplayMode === 'grouped'
                            ? 'bg-[var(--accent-color)] border-[var(--accent-color)] text-white shadow-[0_4px_12px_rgba(var(--accent-color-rgb),0.3)]'
                            : 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-color)] hover:bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)]'
                            }`}
                    >
                        <div className="font-semibold">合併同名來源</div>
                        <div className="text-sm opacity-80 mt-1">相同名稱的影片合併为一ㄍ卡片</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
