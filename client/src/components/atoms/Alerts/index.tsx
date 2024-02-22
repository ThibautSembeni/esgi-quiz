import Success from "@/components/atoms/Alerts/Success";
import Warning from "@/components/atoms/Alerts/Warning";
import Error from "@/components/atoms/Alerts/Error";
import Info from "@/components/atoms/Alerts/Info";

export interface AlertProps {
    title: string;
    type?: string;
    content?: string;
    actions?: string;
    close: () => void;
    className?: string;
}

export default function Alert({
                                  title,
                                  type,
                                  content,
                                  actions,
                                  close,
                                  className,
                              }: AlertProps) {
    if (type === "success") {
        return <Success title={title} close={close} className={className} />;
    } else if (type === "warning") {
        return <Warning title={title} close={close} className={className} />;
    } else if (type === "error") {
        return <Error title={title} close={close} className={className} />;
    } else if (type === "info") {
        return <Info title={title} close={close} className={className} />;
    }
}
