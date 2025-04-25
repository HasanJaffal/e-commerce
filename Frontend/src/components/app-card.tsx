import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { ItemDto } from '@/interfaces/ItemDto';

interface Props {
    item: ItemDto
}

export function AppCard({ item }: Props) {
    return (
        <Card className={cn('w-[240px] p-4')}>
            <CardContent className='flex flex-col items-center space-y-2'>
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className='w-40 h-40 object-cover rounded-md'
                />
                <h2 className='text-lg font-bold'>{item.name}</h2>
                <p className='text-xl font-bold text-green-600'>
                    ${item.price}
                </p>
            </CardContent>
        </Card>
    );
}
