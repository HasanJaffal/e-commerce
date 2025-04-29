import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@radix-ui/react-popover';
import { Button } from './ui/button';

interface Props {
    pageSize: number;
    page: number;
    onSetPageSize: (data: number) => void;
    onNext: () => void;
    onPrevious: () => void;
    totalPages: number;
}

export function AppPagination({
    page,
    onSetPageSize,
    onNext,
    onPrevious,
    totalPages,
}: Props) {
    const sizes = [1, 2, 4, 8, 16];

    function setPageSize(size: number) {
        onSetPageSize(size);
    }

    function next() {
        onNext();
    }

    function previous() {
        if (page > 1) {
            onPrevious();
        }
    }

    return (
        <Pagination className='h-[5rem]'>
            <PaginationContent>
                <PaginationItem>
                    {page > 1 ? (
                        <PaginationPrevious onClick={previous} />
                    ) : (
                        <Button onClick={next} disabled>
                            Previous
                        </Button>
                    )}
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <Popover>
                        <PopoverTrigger asChild>
                            <PaginationEllipsis />
                        </PopoverTrigger>
                        <PopoverContent className='w-80 mb-5'>
                            <div className='grid p-1 grid-rows-1 grid-cols-5 gap-1'>
                                {sizes.map((s) => (
                                    <div
                                        className='space-y-2'
                                        key={s.valueOf()}
                                    >
                                        <Button
                                            className='w-2 hover:bg-white hover:text-black'
                                            onClick={() => setPageSize(s)}
                                        >
                                            {s}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </PaginationItem>
                <PaginationItem>
                    {totalPages > page ? (
                        <PaginationNext onClick={next} />
                    ) : (
                        <Button onClick={next} disabled>
                            Next
                        </Button>
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
