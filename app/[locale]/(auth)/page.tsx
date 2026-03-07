import LetterAnimation from '@/components/gsap/letter-animation';
import Form from './form/form';
import ToAnimation from '@/components/gsap/to-animation';
import Photo from '@/components/photo/photo';
import { ENV } from '@/lib/env';

export default async function Page() {

    return (
        <>
            <div className="h-screen min-h-130 flex flex-col items-center justify-center relative overflow-hidden px-4">
                <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72">
                    <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-dark rounded-bl-[80px]" />
                    <div className="absolute top-8 right-8 md:top-12 md:right-12 w-24 h-24 md:w-36 md:h-36 border-4 border-primary -z-10 rounded-bl-[60px]" />
                </div>

                <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48">
                    <div className="absolute bottom-0 left-0 w-20 h-20 md:w-32 md:h-32 border-4 border-primary rounded-tr-[50px]" />
                </div>



                {/* Main content */}
                <div className="relative z-10 mx-auto grid grid-cols-2 gap-5 justify-between">

                    {/* Left */}
                    <div className='col-span-2 lg:col-span-1 relative'>
                        <div
                            className="pointer-events-none absolute top-[-20%] left-[50%] -translate-x-1/2 w-150 h-150 rounded-full opacity-15"
                            style={{
                                background:
                                    "radial-gradient(circle, var(--dark) 30%, transparent 70%)",
                            }}
                        />

                        <LetterAnimation title='Anas Attoum - Ecke' className="text-primary font-semibold" withoutTranslate />
                        <Form />
                    </div>

                    {/* Right */}
                    <div className="max-lg:hidden lg:col-span-1 flex justify-center items-center relative">
                        <ToAnimation to="none" order={4}>
                            <Photo src={ENV.AnasAttoum1!} />
                        </ToAnimation>
                    </div>

                </div>



            </div>
        </>
    );
}
