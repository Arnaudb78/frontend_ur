"use client";

import Footer from "@/components/footer";
import Mention from "@/components/mention";
import Navbar from "@/components/navbar";

export default function Mentions() {
    const mentionsDatas = [
        {
            id: 3,
            title: "Propriété intellectuelle",
            content:
                "L&apos;ensemble des éléments constituant le site (textes, images, graphismes, logos, vidéos, sons, etc.) est protégé par la législation française sur le droit d&apos;auteur et la propriété intellectuelle. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l&apos;éditeur.",
        },
        {
            id: 4,
            title: "Données personnelles",
            content:
                "Les informations recueillies sur le site Urban-Roots sont enregistrées dans un fichier informatisé par Arnaud Beaulieu pour analyser les données. Elles sont conservées pendant une durée de 2ans et sont destinées à être analyser pour des fins d&apos;amélioration de notre solution. Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d&apos;accès aux données vous concernant et les faire rectifier en contactant : arnaudb92230@gmail.com.",
        },
        {
            id: 5,
            title: "Cookies",
            content:
                "Le site Urban-Roots utilise des cookies pour améliorer l&apos;expérience utilisateur et à des fins de statistiques. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour être averti lorsque des cookies sont envoyés. Cependant, certaines fonctionnalités du site pourraient ne pas fonctionner correctement sans cookies.",
        },
        {
            id: 6,
            title: "Limitation de responsabilité",
            content:
                "Urban-Roots s&apos;efforce de fournir des informations aussi précises que possible sur le site. Toutefois, il ne saurait être tenu responsable des omissions, inexactitudes et carences dans la mise à jour, qu&apos;elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. L&apos;utilisateur du site Urban-Roots reconnaît disposer de la compétence et des moyens nécessaires pour accéder et utiliser ce site.",
        },
        {
            id: 7,
            title: "Droit applicable et attribution de juridiction",
            content:
                "Tout litige en relation avec l&apos;utilisation du site Urban-Roots est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.",
        },
        {
            id: 8,
            title: "Contact",
            content: "Pour toute question ou réclamation, veuillez nous contacter à l&apos;adresse suivante : arnaudb92230@gmail.com.",
        },
    ];

    const mentions = mentionsDatas.map((mention) => <Mention key={mention.id} id={mention.id} title={mention.title} content={mention.content} />);

    return (
        <>
            <Navbar />
            <section className="p-8 pt-24 w-full h-full">
                <h1 className="font-bold text-xl">Mentions Légales</h1>
                <div className="w-full h-full flex flex-col gap-4 mt-4">
                    <div className="p-8 flex flex-col gap-2 items-start bg-secondary-200 rounded-2xl text-sm">
                        <h2 className="font-bold text-lg">1.Éditeur du site</h2>
                        <p>
                            <span className="font-bold">Nom du site :</span> Urban-Roots
                        </p>
                        <p>
                            <span className="font-bold">Responsable de publication :</span> Arnaud Beaulieu
                        </p>
                        <p>
                            <span className="font-bold">Adresse :</span> 1 rue des champs, 75008 Paris
                        </p>
                        <p>
                            <span className="font-bold">Email :</span> arnaudb92230@gmail.com
                        </p>
                        <p>
                            <span className="font-bold">Numéros de téléphone :</span> 01.23.45.67.89
                        </p>
                    </div>

                    <div className="p-8 flex flex-col gap-2 items-start bg-secondary-200 rounded-2xl text-sm">
                        <h2 className="font-bold text-lg">2.Hébergement du site</h2>
                        <p>
                            <span className="font-bold">Hébergement :</span>{" "}
                            <a href="https://vercel.com/" className="underline cursor-pointer">
                                {" "}
                                Vercel
                            </a>
                        </p>
                        <p>
                            <span className="font-bold">Adresse de l&apos;hébergeur :</span> -
                        </p>
                        <p>
                            <span className="font-bold">Numéros de téléphone de l&apos;hébergeur :</span> -
                        </p>
                    </div>
                    {mentions}
                </div>
            </section>
            <Footer />
        </>
    );
}
