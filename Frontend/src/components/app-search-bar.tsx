import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface Props {
    onClick: (search: string) => void;
}

export function AppSearchBar({ onClick }: Props) {
    const [search, setSearch] = useState<string>('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    function handleClick() {
        onClick(search);
        setSearch('');
    }

    return (
        <div className='flex w-full max-w items-center space-x-2'>
            <Input
                placeholder='SEARCH BY NAME'
                value={search}
                onChange={handleChange}
            />
            <Button onClick={handleClick}>Search</Button>
        </div>
    );
}
