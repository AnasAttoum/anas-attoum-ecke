import Header from '@/layouts/header/header';
import { paths } from '@/lib/paths';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function Page() {
    const t = await getTranslations();

    return (
        <>
            <Header />
            <div className="h-screen min-h-130 flex flex-col items-center justify-center relative overflow-hidden px-4">
                <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72">
                    <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-dark rounded-bl-[80px]" />
                    <div className="absolute top-8 right-8 md:top-12 md:right-12 w-24 h-24 md:w-36 md:h-36 border-4 border-primary -z-10 rounded-bl-[60px]" />
                </div>

                <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48">
                    <div className="absolute bottom-0 left-0 w-20 h-20 md:w-32 md:h-32 border-4 border-primary rounded-tr-[50px]" />
                </div>

                {/* Main content */}
                <div className="relative z-10 text-center max-w-2xl mx-auto">

                    <div className="relative mb-6">
                        <h1 className="text-[120px] md:text-[180px] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-primary to-primary/30">
                            404
                        </h1>
                        <div className="absolute inset-0 text-[120px] md:text-[180px] font-bold leading-none tracking-tighter text-dark/40 blur-xl">
                            404
                        </div>
                    </div>

                    {/* Message */}
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">{t("page-not-found")}</h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                        {t("oops")}
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <Link href="/" className="basicBtn bg-dark! hover:bg-primary! focus:bg-primary! text-white border-none flex-2">
                            {t("go-to-homepage")}
                        </Link>
                        <Link href={paths.contact} className="basicBtn flex-1">
                            {t("contact")}
                        </Link>
                    </div>

                </div>

                {/* Animated floating elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-dark/40 rounded-full animate-pulse" />
                    <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-dark/30 rounded-full animate-pulse delay-300" />
                    <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-dark/50 rounded-full animate-pulse delay-700" />
                    <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-500" />
                </div>

                <div className="absolute bottom-0 flex justify-center items-center w-full h-20">
                    {t("code-by")} &nbsp; <Link href="/" className="font-bold text-dark">Anas Attoum</Link>
                </div>
            </div>
        </>
    );
}
