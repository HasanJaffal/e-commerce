import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { ItemDto } from '@/interfaces/ItemDto';

import { toast } from 'sonner';
import UpdateItemForm from './update-item-form';
import { UpdateItemDto } from '@/interfaces/UpdateItemDto';
import DeleteForm from './delete-form';

interface Props {
    item: ItemDto;
    onDelete: (id: number) => void;
    onUpdate: (id: number, updateItemDto: UpdateItemDto) => void;
}

export function AppCard({ item, onDelete, onUpdate }: Props) {
    function handleDelete(id: number) {
        onDelete(id);
        toast('Item has been deleted', {
            description: new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }),
        });
    }
    function handleUpdate(id: number, updateItemDto: UpdateItemDto) {
        onUpdate(id, updateItemDto);
        toast('Item has been updated', {
            description: new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }),
        });
    }

    

    return (
        <Card className={cn('w-[240px] p-4 bg-white')}>
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
                <div className='flex flex-row items-center space-x-2'>
                    <div>
                        <UpdateItemForm item={item} onUpdate={handleUpdate} />
                    </div>

                    <div>
                        <DeleteForm onDelete={handleDelete} id={item.id} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
