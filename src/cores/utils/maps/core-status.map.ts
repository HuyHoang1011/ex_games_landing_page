export function statusMap({ status }: { status: string }): {
  color: string;
} {
  switch (status) {
    // ? vàng
    case 'pending':
    case 'commentator':
      return { color: 'bg-amber-100 text-amber-800 border-amber-200' };

    // ? xanh lá
    case 'approved':
    case 'published':
    case 'paid':
      return { color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };

    // ? đỏ
    case 'rejected':
    case 'failed':
    case 'admin':
      return { color: 'bg-rose-100 text-rose-700 border-rose-200' };

    // ? xám
    case 'draft':
    case 'user':
      return { color: 'bg-slate-100 text-slate-700 border-slate-200' };

    default:
      return { color: 'bg-gray-100 text-gray-700 border-gray-200' };
  }
}
