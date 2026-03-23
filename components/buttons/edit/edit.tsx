import { Pen } from 'lucide-react'

type Props = {
    openDialog: () => void;
}

export default function EditButton({ openDialog }: Props) {
    return (
        <div>
            <Pen onClick={openDialog} className='p-0.5 cursor-pointer text-dark' />
        </div>
    )
}