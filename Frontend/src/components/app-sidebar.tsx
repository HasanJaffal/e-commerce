import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { CategoryDto } from '@/interfaces/CategoryDto';
import { Link } from '@tanstack/react-router';

interface Props {
    categories: CategoryDto[];
}

export function AppSidebar({ categories }: Props) {
    return (
        <Sidebar className='w-[256px] border-r border-gray-100 bg-white'>
            <SidebarHeader className='px-4 py-5 border-b border-gray-100'>
                <SidebarGroupLabel className='font-bold text-xl text-gray-800'>
                    E-Commerce
                </SidebarGroupLabel>
            </SidebarHeader>

            <SidebarContent className='px-2 py-3'>
                <SidebarGroup>
                    <SidebarGroupLabel className='px-3 py-1.5 mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Categories
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {categories.map((c) => (
                                <SidebarMenuItem key={c.id}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            to='/categories/$name'
                                            params={{ name: c.name }}
                                            className='block px-3 py-2 rounded text-gray-700 hover:bg-gray-50 transition-colors duration-100
                                                        focus:outline-none focus:ring-1 focus:ring-blue-400 focus:bg-blue-50'
                                            activeProps={{
                                                className:
                                                    'bg-blue-100 text-blue-600 font-medium',
                                            }}
                                        >
                                            {c.name}
                                        </Link>
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
