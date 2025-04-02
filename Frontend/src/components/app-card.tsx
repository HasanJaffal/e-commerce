import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

type Product = {
    image: string;
    name: string;
    price: string;
};

type CardProps = React.ComponentProps<typeof Card> & {
    product: Product;
};

export function CardDemo({ className, product }: CardProps) {
    return (
        <Card className={cn('w-[300px] p-4', className)}>
            <CardContent className="flex flex-col items-center space-y-4">
                <img src={product.image} alt={product.name} className="w-40 h-40 object-cover rounded-md" />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-xl font-bold text-green-600">{product.price}</p>
            </CardContent>
        </Card>
    );
}
