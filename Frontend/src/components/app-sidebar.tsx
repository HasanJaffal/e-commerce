import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { CategoryDto } from '@/interfaces/backend/CategoryDto';

interface Props {
    categories: CategoryDto[];
}

export function AppSidebar({ categories }: Props) {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>E-Commerce</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {categories.map((c) => (
                                <SidebarMenuItem
                                    key={c.id}
                                    className='hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 active:bg-blue-400'
                                >
                                    <SidebarMenuButton asChild className=' active:bg-blue-400'>
                                        <a href={`/categories/${c.name}`}>
                                            <span>{c.name}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
