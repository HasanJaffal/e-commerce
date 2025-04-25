export interface CreateItemDto {
    name: string;
    price: number;
    categoryId: number;
    image: File;
}