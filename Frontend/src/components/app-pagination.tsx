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
import { useState } from 'react';
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
    pageSize,
    page,
    onSetPageSize,
    onNext,
    onPrevious,
    totalPages
}: Props) {
    const [paginationParams, setPaginationParams] = useState({
        page: page,
        pageSize: pageSize,
    });

    const sizes = [1, 2, 4, 8, 16];

    function setPageSize(size: number) {
        setPaginationParams((paginationParams) => ({
            ...paginationParams,
            pageSize: size,
        }));
        onSetPageSize(size);
    }
    function next() {
        setPaginationParams((paginationParams) => ({
            ...paginationParams,
            page: page + 1,
        }));
        onNext();
    }
    function previous() {
        if (page > 1) {
            setPaginationParams((paginationParams) => ({
                ...paginationParams,
                page: page - 1,
            }));
        }
        onPrevious();
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {
                        paginationParams.page > 1 ? <PaginationPrevious onClick={previous} /> : <></>
                    }
                    
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink isActive>
                        {paginationParams.page}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <Popover>
                        <PopoverTrigger asChild>
                            <PaginationEllipsis />
                        </PopoverTrigger>
                        <PopoverContent className='w-80 mb-2'>
                            <div className='grid p-1 grid-rows-1 grid-cols-5'>
                                {sizes.map((s) => (
                                    <div
                                        className='space-y-2'
                                        key={s.valueOf()}
                                    >
                                        <Button
                                        variant="secondary"
                                            className='w-2'
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
                    {
                        totalPages > page ? <PaginationNext onClick={next} /> : <></>
                    }
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
