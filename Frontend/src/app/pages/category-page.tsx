import { AppCard } from '@/components/app-card';
import { ItemDto } from '@/interfaces/ItemDto';

import { useParams } from '@tanstack/react-router';


interface Props {
    items: ItemDto[];
}

function CategoryPage({items} : Props) {
    const { name } = useParams({ strict: false }); // <-- this grabs /categories/:name
    return (
        <div className='min-h-[calc(100vh-8rem)] flex flex-col items-center'>
            <h1 className='text-3xl font-extrabold text-gray-800 mb-6 uppercase'>
                {name}
            </h1>

            {/* Items Grid */}
            {items.length === 0 ? (
                <p className='text-center text-gray-500 text-lg'>
                    No items available in this category.
                </p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {items.map((i) => (
                        <div key={i.id}>
                            <AppCard item={i} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryPage;
