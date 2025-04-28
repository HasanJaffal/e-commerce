import CategoryPage from '@/app/pages/category-page';
import { createFileRoute } from '@tanstack/react-router';

const CategoryRouteComponent = () => {
    return <CategoryPage />;
};

export const Route = createFileRoute('/categories/$name')({
    component: CategoryRouteComponent,
});
