import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { AlertProps } from "@/components/atoms/Alerts/index";

export default function Info({ title, className }: AlertProps) {
    return (
        <div className={`rounded-md bg-blue-50 p-4 ${className}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <InformationCircleIcon
                        className="h-5 w-5 text-blue-400"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">{title}</p>
                </div>
            </div>
        </div>
    );
}
