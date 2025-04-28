import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { ItemDto } from '@/interfaces/ItemDto';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Props {
    item: ItemDto;
}

export function AppCard({ item }: Props) {
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
                    {/* EDIT */}
                    <div>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button className='bg-blue-500 hover:black'>
                                    <Trash2 />
                                    Edit
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete this item.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div>
                        {/* DELETE */}
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button variant='destructive' className='hover:bg-black'>
                                    <Trash2 />
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete this item.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
