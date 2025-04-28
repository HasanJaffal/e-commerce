import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Props {
    setSearchValue: (search: string) => void;
}

export function AppSearchBar({ setSearchValue }: Props) {
    const [search, setSearch] = useState<string>('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    function handleClick() {
        setSearchValue(search);
    }

    return (
        <div className='flex w-1/2 items-center space-x-1'>
            <Input
                placeholder='SEARCH BY NAME'
                value={search}
                onChange={handleChange}
                className='bg-white'
            />
            <Button onClick={handleClick}>Search</Button>
        </div>
    );
}
