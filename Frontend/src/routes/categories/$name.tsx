import CategoryPage from '@/app/pages/category-page';
import { createFileRoute } from '@tanstack/react-router';

const CategoryRouteComponent = () => {
    const { name } = Route.useParams();
    return <CategoryPage name={name} />;
};

export const Route = createFileRoute('/categories/$name')({
    component: CategoryRouteComponent,
});
