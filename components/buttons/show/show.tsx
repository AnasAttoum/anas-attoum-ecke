import { Link } from '@/lib/localization/navigation';
import { Clapperboard } from 'lucide-react'

type Props = {
    href: string;
}

export default function ShowButton({ href }: Props) {
    return (
        <Link href={href}>
            <Clapperboard className='p-0.5 cursor-pointer text-dark' />
        </Link>
    )
}