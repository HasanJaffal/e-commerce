import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CategoryDto } from '@/interfaces/backend/CategoryDto';
import { QueryResponse } from '@/interfaces/backend/QueryResponse';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<CategoryDto[]>([]);

    useEffect(() => {
        axios
            .get<QueryResponse<CategoryDto>>(
                'https://localhost:7206/api/Categories',
            )
            .then((response) => {
                setCategories(response.data.objects);
                console.log(categories);
            })
            .catch((error) => console.error('Error fetching data:', error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <SidebarProvider>
            <AppSidebar categories={categories} />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
