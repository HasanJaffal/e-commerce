import { AppCard } from '@/components/app-card';
import { ImageDto } from '@/interfaces/backend/ImageDto';
import { ItemDto } from '@/interfaces/backend/ItemDto';
import { DisplayItem } from '@/interfaces/display/DisplayItem';
import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/categories/$name')({
    component: Category,
});

function Category() {
    const { name } = Route.useParams();
    const [items, setItems] = useState<ItemDto[]>([]);
    const [displayItems, setDisplayItems] = useState<DisplayItem[]>([]);

    useEffect(() => {
        axios
            .get(`https://localhost:7206/api/Categories/${name}/Items`)
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => console.error('Error fetching items:', error));
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            if (items.length === 0) return;

            try {
                const newFormat: DisplayItem[] = await Promise.all(
                    items.map(async (item) => ({
                        item,
                        imageUrl: await getImage(item.id),
                    })),
                );

                setDisplayItems(newFormat);
            } catch (error) {
                console.error('Error processing images:', error);
            }
        };

        fetchImages();
    }, [items]);

    const getImage = async (itemId: number): Promise<string> => {
        try {
            const response = await axios.get<ImageDto>(
                `https://localhost:7206/api/Items/${itemId}/image`,
            );
            return response.data.url || '';
        } catch (error) {
            console.error('Error fetching image:', error);
            return '';
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-bold'>{name.toUpperCase()}</h1>
            {displayItems.length === 0 ? (
                <p>No items available in this category.</p>
            ) : (
                <div className='grid grid-cols-2 gap-4'>
                    {displayItems.map((i) => (
                        <AppCard key={i.item.id} displayItem={i} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Category;
