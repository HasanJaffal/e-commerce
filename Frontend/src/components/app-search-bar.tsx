import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Props {
    search: string;
}

export function AppSearchBar({ search }: Props) {
    const [search, setSearch] = useState('');
    function onClick(search: string) {
        setSearch(search);
    }
    return (
        <div className='flex w-full max-witems-center space-x-2'>
            <Input placeholder='SEARCH BY NAME' />
            <Button type='submit'>Search</Button>
        </div>
    );
}
