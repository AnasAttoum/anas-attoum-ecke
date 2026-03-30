import { Link } from '@/lib/localization/navigation';
import { Clapperboard } from 'lucide-react'

type Props = {
    href: string;
    newTab?: boolean;
};

export default function ShowButton({ href, newTab = false }: Props) {
    return (
        <Link
            href={href}
            {...(newTab
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
        >
            <Clapperboard className='p-0.5 cursor-pointer text-dark' />
        </Link>
    )
}