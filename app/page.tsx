import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <Navbar />
            <section className="w-full h-full bg-secondary-100 p-6 flex flex-col gap-8 pt-24 md:p-8 md:pt-24 md:gap-10 xl:gap-20 xl:pt-32">
                <div className="w-full h-full relative">
                    <Image
                        src="/images/bg-home.jpg"
                        alt="jardin potager"
                        width={500}
                        height={500}
                        className="rounded-2xl w-auto h-auto sm:hidden md:hidden"
                        priority
                    />
                    <Image
                        src="/images/bg-home.jpg"
                        alt="jardin potager"
                        width={800}
                        height={800}
                        className="rounded-2xl w-auto h-auto hidden sm:block md:block xl:hidden"
                        priority
                    />
                    <Image
                        src="/images/bg-home.jpg"
                        alt="jardin potager"
                        width={1200}
                        height={800}
                        className="rounded-2xl w-auto h-auto hidden xl:block 2xl:hidden"
                        priority
                    />
                    <Image
                        src="/images/bg-home.jpg"
                        alt="jardin potager"
                        width={1500}
                        height={800}
                        className="rounded-2xl w-auto h-auto hidden 2xl:block"
                        priority
                    />
                    <div className="flex flex-col text-center font-bold absolute top-4 left-4 bg-secondary-300 p-2 rounded-md bg-opacity-75 sm:w-[90%] sm:top-0 sm:left-3 sm:m-4 md:left-4 md:p-4 lg:left-8 2xl:left-14 2xl:top-14">
                        <h1 className="text-2xl lg:text-4xl">UrbanRoots</h1>
                        <p className="text-md md:text-xl lg:text-2xl">Semons aujourd&apos;hui, récoltons demain.</p>
                    </div>
                </div>
                <div className="w-full h-full">
                    <div className="w-full h-full flex flex-col gap-8 p-4 md:gap-10 lg:p-8 ">
                        <div className="w-full h-full flex flex-col gap-8 lg:gap-14 xl:gap-4">
                            <h2 className="text-xl font-bold text-center md:text-2xl lg:text-3xl xl:text-4xl">
                                Envie de sortir de <span className="bg-primary text-secondary-100 inline-block rotate-3">l&apos;angoisse</span> du
                                quotidien ?
                            </h2>
                            <p className="text-justify bg-secondary-200 p-8 rounded-2xl text-sm md:text-lg lg:text-xl lg:m-8 xl:m-20 xl:p-12">
                                UrbanRoots est une plateforme de jardinage urbain collaboratif visant à transformer nos villes en espaces verts
                                écoresponsables. Localisez et créez des jardins, échangez des ressources et conseils, participez à des forums
                                communautaires et suivez l&apos;impact environnemental de vos actions. Rejoignez une communauté engagée pour une ville
                                plus verte et solidaire.
                            </p>
                        </div>
                        <div className="w-full h-full flex flex-col gap-8 text-center lg:gap-14 ">
                            <h2 className="text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl">
                                C&apos;est quoi nos <span className="bg-secondary-300 text-secondary-100 inline-block rotate-3">valeurs</span> ?
                            </h2>
                            <p className="text-justify bg-secondary-200 p-8 rounded-2xl text-sm md:text-lg lg:text-xl lg:m-8 xl:m-20 xl:p-12">
                                UrbanRoots valorise l&apos;écologie urbaine, la solidarité communautaire et l&apos;éducation à
                                l&apos;écoresponsabilité. Nous encourageons la collaboration, la durabilité et l&apos;innovation dans les pratiques de
                                jardinage urbain, tout en facilitant l&apos;accès aux ressources et en créant des liens forts entre les jardiniers
                                urbains.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-8 p-4 text-center md:justify-center md:items-center lg:gap-12 xl:gap-20">
                    <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
                        Prêt à faire <span className="bg-primary text-secondary-100 inline-block rotate-3">fleurir</span> la ville avec nous ?
                    </h2>
                    <a
                        href="/connect"
                        className="bg-primary px-4 py-3 font-bold rounded-2xl hover:bg-green-800 hover:text-secondary-200 md:text-lg md:w-[60%] lg:text-xl xl:w-[40%] xl:text-2xl">
                        Rejoignez nous
                    </a>
                </div>
            </section>
            <Footer />
        </>
    );
}
