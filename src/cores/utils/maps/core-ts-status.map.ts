export function tsStatusMap({ status }: { status: string }) {
  switch (status) {
    // Trận chưa diễn ra → slate
    case 'not_started':
    case 'to_be_determined':
      return { color: 'bg-slate-100 text-slate-700 border-slate-200' };

    case 'replay':
    case 'first_half':
    case 'second_half':
    case 'overtime':
    case 'penalty_shoot_out':
      return { color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };

    // Đang diễn ra → xanh lá
    case 'first_half':
    case 'second_half':
    case 'overtime':
    case 'penalty_shoot_out':
      return { color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };

    // Nghỉ giữa / delay → vàng
    case 'half_time':
    case 'delay':
    case 'interrupt':
      return { color: 'bg-amber-100 text-amber-800 border-amber-200' };

    // Kết thúc / hủy → đỏ
    case 'end':
    case 'cut_in_half':
    case 'cancel':
    case 'overtime_deprecated':
      return { color: 'bg-rose-100 text-rose-700 border-rose-200' };

    default:
      return { color: 'bg-gray-100 text-gray-700 border-gray-200' };
  }
}
