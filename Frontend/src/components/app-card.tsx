import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { DisplayItem } from '@/interfaces/display/DisplayItem';

interface Props {
    displayItem: DisplayItem;
    className?: string;
}

export function CardDemo({ displayItem, className }: Props) {
    return (
        <Card className={cn('w-[240px] p-4', className)}>
            <CardContent className='flex flex-col items-center space-y-2'>
                <img
                    src={displayItem.imageUrl}
                    alt={displayItem.item.name}
                    className='w-40 h-40 object-cover rounded-md'
                />
                <h2 className='text-lg font-bold'>{displayItem.item.name}</h2>
                <p className='text-xl font-bold text-green-600'>
                    ${displayItem.item.price}
                </p>
            </CardContent>
        </Card>
    );
}
