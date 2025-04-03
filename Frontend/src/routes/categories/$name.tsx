/* eslint-disable react-hooks/exhaustive-deps */
import { AppCard } from '@/components/app-card';
import { AppSearchBar } from '@/components/app-search-bar';
import { Button } from '@/components/ui/button';
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
        pageSize: 6,
    });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setItems([]);
                setDisplayItems([]);

                const response = await axios.get<QueryResponse<ItemDto>>(
                    `https://localhost:7206/api/Categories/${name}/Items`,
                    {
                        params: {
                            search: queryRequest.search || '',
                            page: queryRequest.page.toString(),
                            pageSize: queryRequest.pageSize.toString(),
                        },
                    }
                );

                setItems(response.data.objects);
            } catch (error) {
                console.error('Error fetching items:', error);
                setItems([]);
                setDisplayItems([]);
            }
        };

        fetchItems();
    }, [queryRequest, name]);

    useEffect(() => {
        const fetchImages = async () => {
            if (items.length === 0) {
                setDisplayItems([]);
                return;
            }

            try {
                const newFormat: DisplayItem[] = await Promise.all(
                    items.map(async (item) => ({
                        item,
                        imageUrl: await getImage(item.id),
                    }))
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

    const handlePagination = (direction: 'next' | 'prev') => {
        setQueryRequest((prevQueryRequest) => ({
            ...prevQueryRequest,
            page:
                direction === 'next'
                    ? prevQueryRequest.page + 1
                    : Math.max(prevQueryRequest.page - 1, 1),
        }));
    };

    const getImage = async (itemId: number): Promise<string> => {
        try {
            const response = await axios.get<ImageDto>(
                `https://localhost:7206/api/Items/${itemId}/image`
            );
            return response.data.url || '';
        } catch (error) {
            console.error('Error fetching image:', error);
            return '';
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center bg-gray-100 p-8">
            {/* Search Bar */}
            <div className="mb-6 w-full max-w-3xl">
                <AppSearchBar onClick={handleSearch} />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 uppercase">
                {name}
            </h1>

            {/* Items Grid */}
            {displayItems.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    No items available in this category.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                    {displayItems.map((i) => (
                        <AppCard key={i.item.id} displayItem={i} />
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center gap-4 mt-6">
                <Button
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={queryRequest.page === 1}
                    onClick={() => handlePagination('prev')}
                >
                    Previous
                </Button>

                <span className="text-lg font-semibold text-gray-700">
                    Page {queryRequest.page}
                </span>

                <Button
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    onClick={() => handlePagination('next')}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

export default Category;
