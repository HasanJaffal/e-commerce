import { Button } from './ui/button';
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
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateItemDto } from '@/interfaces/CreateItemDto';
import { CategoryDto } from '@/interfaces/CategoryDto';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
    categories: CategoryDto[];
}

export default function AddItemForm({ categories }: Props) {
    const [createItemDto, setCreateItemDto] = useState<CreateItemDto>({
        name: '',
        price: 0,
        categoryId: 0,
        image: {} as File,
    });

    const [categoryName, setCategoryName] = useState('');

    function handleAddItem() {
        // Submit logic here (e.g. call API)
        console.log('Submitting:', createItemDto);
    }

    function onSubmit() {
        setCreateItemDto((prev) => ({
            ...prev,
            categoryId:
                categories.find((c) => c.name === categoryName)?.id || 0,
        }));
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant='outline'>
                    <Plus />
                    ADD ITEM
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add Item</AlertDialogTitle>

                    {/* CHOOSE CATEGORY */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline'>
                                {categoryName || 'Choose Category'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56'>
                            <DropdownMenuLabel>Category</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                                value={categoryName}
                                onValueChange={setCategoryName}
                            >
                                {categories.map((c) => (
                                    <DropdownMenuRadioItem
                                        value={c.name}
                                        key={c.id}
                                    >
                                        {c.name}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Label htmlFor='name'>Name</Label>
                    <Input
                        type='text'
                        name='name'
                        onChange={(e) =>
                            setCreateItemDto({
                                ...createItemDto,
                                name: e.target.value,
                            })
                        }
                    />

                    <Label htmlFor='price'>Price</Label>
                    <Input
                        type='number'
                        name='price'
                        onChange={(e) =>
                            setCreateItemDto({
                                ...createItemDto,
                                price: parseFloat(e.target.value),
                            })
                        }
                    />

                    <Label htmlFor='image'>Image</Label>
                    <Input
                        id='image'
                        type='file'
                        onChange={(e) =>
                            setCreateItemDto({
                                ...createItemDto,
                                image: e.target.files?.[0] ?? ({} as File),
                            })
                        }
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAddItem}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
