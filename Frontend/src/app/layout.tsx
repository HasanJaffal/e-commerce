import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CategoryDto } from '@/interfaces/CategoryDto';
import { AppSearchBar } from '@/components/app-search-bar';
import CategoryPage from './pages/category-page';
import { ItemDto } from '@/interfaces/ItemDto';
import { QueryResponse } from '@/interfaces/QueryResponse';
import { useParams } from '@tanstack/react-router';
import { QueryRequest } from '@/interfaces/QueryRequest';
import { AppPagination } from '@/components/app-pagination';
import { Toaster } from 'sonner';
import { UpdateItemDto } from '@/interfaces/UpdateItemDto';
import { Button } from '@/components/ui/button';
import AddItemForm from '@/components/add-item-form';

export default function Layout() {
    const { name } = useParams({ strict: false }); // <-- this grabs /categories/:name

    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [items, setItems] = useState<ItemDto[]>([]);
    const [query, setQuery] = useState<QueryRequest>({
        search: '',
        page: 1,
        pageSize: 16,
    });
    const [totalpages, setTotalPages] = useState<number>(100);

    useEffect(() => {
        axios
            .get<CategoryDto[]>('https://localhost:7206/api/Categories')
            .then((response) => {
                setCategories(response.data);
                console.log(categories);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setItems([]);
                const response = await axios.get<QueryResponse<ItemDto>>(
                    `https://localhost:7206/api/Categories/${name}/Items`,
                    {
                        params: query,
                    },
                );
                setItems(response.data.objects);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching items:', error);
                setItems([]);
            }
        };
        fetchItems();
    }, [name, query]);

    async function deleteItem(id: number) {
        try {
            await axios.delete(`https://localhost:7206/api/Items/Delete/${id}`);
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Failed to delete item: ', error);
        }
    }

    async function updateItem(id: number, updateItemDto: UpdateItemDto) {
        try {
            const formData = new FormData();
            formData.append('name', updateItemDto.name);
            formData.append('price', updateItemDto.price.toString());
            if (updateItemDto.image) {
                formData.append('image', updateItemDto.image);
            }

            await axios.put(
                `https://localhost:7206/api/Items/Update/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            const refreshed = await axios.get<QueryResponse<ItemDto>>(
                `https://localhost:7206/api/Categories/${name}/Items`,
                { params: query },
            );
            setItems(refreshed.data.objects);
        } catch (error) {
            console.error('Failed to update item: ', error);
        }
    }

    function setSearchValue(data: string) {
        setQuery((prevQuery) => ({ ...prevQuery, search: data, page: 1 }));
    }

    function setPageSize(data: number) {
        setQuery((prevQuery) => ({ ...prevQuery, pageSize: data }));
        console.log(query);
    }
    function next() {
        setQuery((prevQuery) => ({ ...prevQuery, page: query.page + 1 }));
        console.log(query);
    }
    function previous() {
        if (query.page > 1) {
            setQuery((prevQuery) => ({ ...prevQuery, page: query.page - 1 }));
            console.log(query);
        }
    }

    return (
        <SidebarProvider>
            <div className='flex max-w-screen w-screen'>
                <AppSidebar categories={categories} />
                <main className='flex-1 overflow-auto'>
                    <SidebarTrigger />
                    <div className='flex items-center justify-center mb-2 gap-3'>
                        <AddItemForm categories={categories}/>
                        <Button variant='outline'>ADD ITEM</Button>
                        <AppSearchBar setSearchValue={setSearchValue} />
                    </div>
                    <div className='flex items-center justify-center'>
                        <CategoryPage
                            items={items}
                            onDelete={deleteItem}
                            onUpdate={updateItem}
                        />
                    </div>
                    <div className='flex items-center justify-center  pt-[5rem]'>
                        <AppPagination
                            page={query.page}
                            pageSize={query.pageSize}
                            onNext={next}
                            onPrevious={previous}
                            onSetPageSize={setPageSize}
                            totalPages={totalpages}
                        />
                    </div>
                </main>
                <Toaster />
            </div>
        </SidebarProvider>
    );
}
