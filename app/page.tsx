import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <Navbar />
            <section className="w-full h-full bg-secondary-100 p-6 flex flex-col gap-8">
                <div className="w-full h-full relative">
                    <Image src="/images/bg-home.jpg" alt="hero" width={500} height={500} className="rounded-2xl w-auto h-auto" />
                    <div className="flex flex-col text-center font-bold absolute top-4 left-4 bg-secondary-300 p-2 rounded-md bg-opacity-75">
                        <h1 className="text-2xl">UrbanRoots</h1>
                        <p className="text-md">Semons aujourd&apos;hui, récoltons demain</p>
                    </div>
                </div>
                <div className="w-full h-full">
                    <div className="w-full h-full flex flex-col gap-8 p-4 lg:p-8">
                        <div className="w-full h-full flex flex-col gap-8">
                            <h2 className="text-xl font-bold text-center">
                                Envie de sortir de <span className="bg-primary text-secondary-100 inline-block rotate-3">l&apos;angoisse</span> du
                                quotidien ?
                            </h2>
                            <p className="text-justify bg-secondary-200 p-8 rounded-2xl text-sm">
                                UrbanRoots est une plateforme de jardinage urbain collaboratif visant à transformer nos villes en espaces verts
                                écoresponsables. Localisez et créez des jardins, échangez des ressources et conseils, participez à des forums
                                communautaires et suivez l&apos;impact environnemental de vos actions. Rejoignez une communauté engagée pour une ville
                                plus verte et solidaire.
                            </p>
                        </div>
                        <div className="w-full h-full flex flex-col gap-8 text-center">
                            <h2 className="text-xl font-bold">
                                C&apos;est quoi nos <span className="bg-secondary-300 text-secondary-100 inline-block rotate-3">valeurs</span> ?
                            </h2>
                            <p className="text-justify bg-secondary-200 p-8 rounded-2xl text-sm">
                                UrbanRoots valorise l&apos;écologie urbaine, la solidarité communautaire et l&apos;éducation à
                                l&apos;écoresponsabilité. Nous encourageons la collaboration, la durabilité et l&apos;innovation dans les pratiques de
                                jardinage urbain, tout en facilitant l&apos;accès aux ressources et en créant des liens forts entre les jardiniers
                                urbains.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col gap-8 p-4 text-center">
                    <h2 className="text-xl font-bold">
                        Prêt à faire <span className="bg-primary text-secondary-100 inline-block rotate-3">fleurir</span> la ville avec nous ?
                    </h2>
                    <a href="/connect" className="bg-primary px-4 py-3 font-bold rounded-2xl hover:bg-green-800 hover:text-secondary-200">
                        Rejoignez nous
                    </a>
                </div>
            </section>
            <Footer />
        </>
    );
}
