'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value?: number;
  max?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
  colorClassName?: string;
  size?: number;
  showValue?: boolean; // NEW
}

export function StarRating({
  value = 0,
  max = 5,
  readOnly = false,
  onChange,
  colorClassName = 'text-yellow-400',
  size = 20,
  showValue = true,
}: StarRatingProps) {
  const displayValue = Math.min(value, max);

  return (
    <div
      className={cn('flex items-center gap-2', readOnly && 'cursor-default')}
      role="radiogroup"
      aria-readonly={readOnly}
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: max }, (_, idx) => {
          const ratingValue = idx + 1;
          const filled = ratingValue <= displayValue;

          return (
            <button
              key={idx}
              type="button"
              disabled={readOnly}
              onClick={() => onChange?.(ratingValue)}
              aria-label={`Rate ${ratingValue} star${ratingValue > 1 ? 's' : ''}`}
              className={cn('p-0', !readOnly && 'cursor-pointer', readOnly && 'cursor-default')}
            >
              <Star
                size={size}
                className={cn(
                  'transition-colors',
                  filled ? colorClassName : 'text-muted-foreground',
                  !readOnly && !filled && `hover:${colorClassName}`,
                  readOnly && 'pointer-events-none'
                )}
                fill={filled ? 'currentColor' : 'none'}
              />
            </button>
          );
        })}
      </div>

      {readOnly && showValue && (
        <span className="text-sm text-muted-foreground">
          {displayValue.toFixed(1)} / {max}
        </span>
      )}
    </div>
  );
}
