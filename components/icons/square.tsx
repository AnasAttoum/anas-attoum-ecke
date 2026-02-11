import { ClassValue } from "clsx";

export default function Square({ className }: { className?: ClassValue }) {
    return (
        <svg className={className as string} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="none" />
            <path fill="#a886e4" fillOpacity="0" stroke="#a886e4" strokeDasharray="64" strokeDashoffset="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12v-7c0 -0.55 0.45 -1 1 -1h14c0.55 0 1 0.45 1 1v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1Z">
                <animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.15s" values="0;0.3" />
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
            </path>
        </svg>
    )
}
