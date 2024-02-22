import { XMarkIcon } from "@heroicons/react/20/solid";
import {
    ExclamationTriangleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import { AlertProps } from "@/components/atoms/Alerts/index";

export default function Error({ title, close, className }: AlertProps) {
    return (
        <div className={`rounded-md bg-red-50 p-4 ${className}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{title}</p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        {close && (
                            <button
                                type="button"
                                className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                                onClick={close}
                            >
                                <span className="sr-only">Fermer</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
