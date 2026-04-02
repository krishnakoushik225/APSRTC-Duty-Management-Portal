export default function DutySkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-100">
        <div className="h-8 w-8 rounded-xl bg-slate-200"></div>
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-slate-200 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded w-2/3"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-100">
        <div className="h-8 w-8 rounded-xl bg-slate-200"></div>
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-100">
        <div className="h-8 w-8 rounded-xl bg-slate-200"></div>
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-slate-200 rounded w-1/3"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-100">
        <div className="h-8 w-8 rounded-xl bg-slate-200"></div>
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 space-y-3">
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-100">
          <div className="h-8 w-8 rounded-xl bg-slate-200"></div>
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-100">
          <div className="h-8 w-8 rounded-xl bg-slate-200"></div>
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
