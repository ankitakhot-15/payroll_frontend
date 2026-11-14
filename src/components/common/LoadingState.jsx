export default function LoadingState(){return <div className="space-y-3">{[1,2,3,4].map(x=><div key={x} className="h-14 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"/>)}</div>}
