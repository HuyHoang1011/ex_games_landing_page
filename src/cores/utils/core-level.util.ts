export type LevelConfig = { level: number; point: number };

export interface UserLevelInfo {
  currentLevel: number;
  nextLevel: number;
  progress: number;
  remainingPoint: number;
}

/**
 * Tính toán thông tin level của user dựa trên reward_point và danh sách level config
 * @param reward_point - Điểm thưởng hiện tại của user
 * @param listLevel - Danh sách level config từ CMS, ví dụ: [{ level: 1, point: 0 }, { level: 2, point: 100 }, ...]
 * @returns Thông tin level hiện tại, level kế tiếp, progress và điểm còn lại
 */
export function getUserLevelInfo(reward_point: number, listLevel: LevelConfig[]): UserLevelInfo {
  if (!listLevel || listLevel.length === 0) {
    // Fallback nếu không có config
    return {
      currentLevel: 1,
      nextLevel: 1,
      progress: 100,
      remainingPoint: 0,
    };
  }

  // B2: Xác định level hiện tại - tìm level lớn nhất mà reward_point >= point yêu cầu
  const currentLevel = listLevel.filter(l => reward_point >= l.point).at(-1) ?? listLevel[0];

  // B3: Xác định level kế tiếp - phần tử đầu tiên mà point > reward_point
  const nextLevel = listLevel.find(l => l.point > reward_point) ?? null;

  // B4: Tính progress giữa level hiện tại → kế tiếp
  const currentBase = currentLevel.point;
  const nextBase = nextLevel ? nextLevel.point : currentBase;

  const progress = nextLevel
    ? Math.min(Math.max(((reward_point - currentBase) / (nextBase - currentBase)) * 100, 0), 100)
    : 100;

  // B5: Tính số điểm cần thêm để lên level kế tiếp
  const remainingPoint = nextLevel ? Math.max(nextLevel.point - reward_point, 0) : 0;

  return {
    currentLevel: currentLevel.level,
    nextLevel: nextLevel?.level ?? currentLevel.level,
    progress,
    remainingPoint,
  };
}
