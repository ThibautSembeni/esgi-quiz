export default function Countdown({ countdown }: { countdown: number }) {
  return (
    <div className="overflow-hidden rounded-lg">
      <span className="truncate text-sm font-medium text-gray-500">
        Temps restant
      </span>
      <span className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 ml-4">
        {countdown} s
      </span>
    </div>
  );
}
