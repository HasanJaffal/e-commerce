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

export default function Layout() {
    const { name } = useParams({ strict: false }); // <-- this grabs /categories/:name

    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [items, setItems] = useState<ItemDto[]>([]);
    const [query, setQuery] = useState<QueryRequest>({
        search: '',
        page: 1,
        pageSize: 2,
    });
    const [totalpages, setTotalPages] =useState<number>(100);

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
                        params: query
                    },
                );
                setItems(response.data.objects);
                setTotalPages(response.data.totalPages)
            } catch (error) {
                console.error('Error fetching items:', error);
                setItems([]);
            }
        };
        fetchItems();
    }, [name, query]);

    function setSearchValue(data: string) {
        setQuery((query) => ({ ...query, search: data }));
    }

    function setPageSize(data: number) {
        setQuery( query => ({ ...query, pageSize: data }));
        console.log(query)
    }
    function next() {
        setQuery(query => ({ ...query, page: query.page + 1}));
        console.log(query)
    }
    function previous() {
        if (query.page > 1) {
            setQuery(query => ({ ...query, page: query.page -1 }));
            console.log(query)
        }
    }

    return (
        <SidebarProvider>
            <div className='flex max-w-screen w-screen'>
                <AppSidebar categories={categories} />
                <main className='flex-1 overflow-auto'>
                    <SidebarTrigger />
                    <div className='flex items-center justify-center mb-2'>
                        <AppSearchBar setSearchValue={setSearchValue} />
                    </div>
                    <div className='flex items-center justify-center mb-2'>
                        <CategoryPage items={items} />
                    </div>
                    <div className='flex items-center justify-center mb-2'>
                        <AppPagination page={query.page} pageSize={query.pageSize} onNext={next} onPrevious={previous} onSetPageSize={setPageSize} totalPages={totalpages}/>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
