import { cn } from "@/lib/utils";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StockStatus({ status }: Readonly<{ status: string }>) {
  let colorClass = "text-gray-500";
  let icon = faCircleXmark;

  if (status === "In Stock") {
    colorClass = "text-green-500";
    icon = faCircleCheck;
  } else if (status === "Low Stock") {
    colorClass = "text-yellow-500";
    icon = faCircleExclamation;
  } else if (status === "Out of Stock") {
    colorClass = "text-red-500";
    icon = faCircleXmark;
  }

  return (
    <div className={cn(colorClass, "flex flex-row items-center gap-1")}>
      <FontAwesomeIcon icon={icon} className="h-4 w-4" />
      {status}
    </div>
  );
}
