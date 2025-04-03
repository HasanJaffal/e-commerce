/* eslint-disable react-hooks/exhaustive-deps */
import { AppCard } from '@/components/app-card';
import { AppSearchBar } from '@/components/app-search-bar';
import { ImageDto } from '@/interfaces/backend/ImageDto';
import { ItemDto } from '@/interfaces/backend/ItemDto';
import { QueryRequest } from '@/interfaces/backend/QueryRequest';
import { QueryResponse } from '@/interfaces/backend/QueryResponse';
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
    const [queryRequest, setQueryRequest] = useState<QueryRequest>({
        search: '',
        page: 1,
        pageSize: 100,
    });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get<QueryResponse<ItemDto>>(
                    `https://localhost:7206/api/Categories/${name}/Items?Search=${queryRequest.search}&Page=${queryRequest.page}&PageSize=${queryRequest.pageSize}`,
                );
                console.log(response.data.objects);
                setItems(response.data.objects);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, [queryRequest, name]);

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

    const handleSearch = (search: string) => {
        setQueryRequest((prevQueryRequest) => ({
            ...prevQueryRequest,
            search: search,
            page: 1,
        }));
    };

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
            <AppSearchBar onClick={handleSearch} />
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
