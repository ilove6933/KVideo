/**
 * HistoryEmptyState - Empty state for watch history
 * Displays when no viewing history exists
 */

import { Icons } from '@/components/ui/Icon';

export function HistoryEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-12">
      <Icons.Inbox 
        size={64} 
        className="text-[var(--text-color-secondary)] opacity-50 mb-4" 
      />
      <p className="text-[var(--text-color-secondary)] text-lg">
        目前沒有歷史觀看紀錄
      </p>
      <p className="text-[var(--text-color-secondary)] text-sm mt-2 opacity-70">
        您的觀看紀錄在這邊
      </p>
    </div>
  );
}
