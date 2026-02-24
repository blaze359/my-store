import { cn } from '@/lib/utils';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

export default function StockStatus({ status }: Readonly<{ status: string }>) {
  const t = useTranslations('Product');
  let colorClass = 'text-gray-500';
  let icon = faCircleXmark;

  if (status === 'In Stock') {
    colorClass = 'text-green-800';
    icon = faCircleCheck;
  } else if (status === 'Low Stock') {
    colorClass = 'text-yellow-700';
    icon = faCircleExclamation;
  } else if (status === 'Out of Stock') {
    colorClass = 'text-red-800';
    icon = faCircleXmark;
  }

  return (
    <div className={cn(colorClass, 'flex flex-row items-center gap-1')}>
      <FontAwesomeIcon icon={icon} className="h-4 w-4" />
      {t(status)}
    </div>
  );
}
