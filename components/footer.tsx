export default function Footer() {
    return (
        <footer className="h-full w-full p-8 bg-secondary-100 md:p-8 lg:p-10 xl:p-14">
            <div className="w-full h-full bg-secondary-200 flex flex-col p-8 text-[12px] gap-8 rounded-2xl">
                <div className="w-full h-full justify-evenly items-start flex gap-4 lg:w-full lg:flex-row lg:justify-end lg:gap-20">
                    <div className="flex flex-col gap-2">
                        <p className="text-[16px] font-bold  opacity-75">Navigation</p>
                        <a href="/">Accueil</a>
                        <a href="/forum">Forum</a>
                        <a href="/connect">Connexion</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <a href="/assistance" className="text-[16px] font-bold opacity-75">
                            Conditions
                        </a>
                        <a href="/assistance">Confidentialité</a>
                        <a href="/mentions">Mentions légales</a>
                        <a href="/mentions">Gestion cookies</a>
                    </div>
                </div>
                <div className="flex flex-col gap-2 text-center lg:w-full h-full">
                    <p>Ce site a un faible impact environnemental</p>
                </div>
                <div className="h-[0.5px] w-full bg-black"></div>
                <div className="w-full h-fit flex justify-center items-center">
                    <p className="text-[10px]">Copyright © 2024 UrbanRoots - Tous droits réservés</p>
                </div>
            </div>
        </footer>
    );
}
