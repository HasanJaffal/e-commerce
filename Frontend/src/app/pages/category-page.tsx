import { AppCard } from '@/components/app-card';
import { ItemDto } from '@/interfaces/ItemDto';
import { QueryResponse } from '@/interfaces/QueryResponse';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
    name: string;
}

function CategoryPage({ name }: Props) {
    const [items, setItems] = useState<ItemDto[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setItems([]);
                const response = await axios.get<QueryResponse<ItemDto>>(
                    `https://localhost:7206/api/Categories/${name}/Items`,
                    // {
                    //     params: {
                    //         search: queryRequest.search || '',
                    //         page: queryRequest.page.toString(),
                    //         pageSize: queryRequest.pageSize.toString(),
                    //     },
                    // },
                );
                setItems(response.data.objects);
            } catch (error) {
                console.error('Error fetching items:', error);
                setItems([]);
            }
        };
        fetchItems();
    }, [name]);

    return (
        <div className='w-screen h-screen flex flex-col items-center bg-gray-100 p-8'>
            {/* Title */}
            <h1 className='text-3xl font-extrabold text-gray-800 mb-6 uppercase'>
                {name}
            </h1>

            {/* Items Grid */}
            {items.length === 0 ? (
                <p className='text-center text-gray-500 text-lg'>
                    No items available in this category.
                </p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl'>
                    {items.map((i) => (
                        <AppCard key={i.id} item={i} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryPage;
