import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Pencil } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { UpdateItemDto } from '@/interfaces/UpdateItemDto';
import { ItemDto } from '@/interfaces/ItemDto';
import { useEffect, useState } from 'react';

interface Props {
    item: ItemDto;
    onUpdate: (id: number, updateItemDto: UpdateItemDto) => void;
}

function UpdateItemForm({ item, onUpdate }: Props) {
    const [dto, updateDto] = useState<UpdateItemDto>({
        name: item.name,
        price: item.price,
        image: {} as File,
    });

    useEffect(() => {
        updateDto({
            name: item.name,
            price: item.price,
            image: {} as File,
        });
    }, [item]);

    const handleUpdate = () => {
        onUpdate(item.id, dto);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className='bg-blue-500 hover:black'>
                    <Pencil />
                    Update
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Update Item</AlertDialogTitle>

                    <Label htmlFor='name'>Name</Label>
                    <Input
                        type='text'
                        name='name'
                        value={dto.name}
                        onChange={(e) =>
                            updateDto({ ...dto, name: e.target.value })
                        }
                    />

                    <Label htmlFor='price'>Price</Label>
                    <Input
                        type='number'
                        name='price'
                        value={dto.price}
                        onChange={(e) =>
                            updateDto({
                                ...dto,
                                price: parseFloat(e.target.value),
                            })
                        }
                    />

                    <Label htmlFor='picture'>Image</Label>
                    <Input
                        id='picture'
                        type='file'
                        onChange={(e) =>
                            updateDto({
                                ...dto,
                                image: e.target.files
                                    ? e.target.files[0]
                                    : dto.image,
                            })
                        }
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleUpdate}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default UpdateItemForm;
