"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface FormConnectProps {
    setShowSignup: Dispatch<SetStateAction<boolean>>;
}

const FormRegister: React.FC<FormConnectProps> = ({ setShowSignup }) => {
    const router = useRouter();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [rules, setRules] = useState(false);
    const [newsletter, setNewsletter] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log(rules, newsletter);

        if (!firstname || !lastname || !mail || !password || !confirmPassword || !rules) return alert("Veuillez remplir tous les champs.");
        if (password !== confirmPassword) return alert("Les mots de passe ne correspondent pas");

        const response = await fetch("http://localhost:5001/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname,
                lastname,
                mail,
                password,
                newsletter,
                rules,
            }),
        });

        if (response.status === 400) return alert("Informations invalides.");
        if (response.status === 409) return alert("L'adresse mail est déjà utilisée.");
        response.json().then((data) => sessionStorage.setItem("user", JSON.stringify(data)));
        if (response.ok) {
            alert("Compte créé !");
            setFirstname("");
            setLastname("");
            setMail("");
            setPassword("");
            setConfirmPassword("");
            setNewsletter(false);
            router.push("/account");
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-[url('/images/bg-flower.jpg')] bg-cover p-8 rounded-2xl bg-opacity-15 text-secondary-200 flex flex-col gap-4 text-sm md:text-lg lg:text-xl">
                <label className="flex flex-col gap-2">
                    <p>Prénom</p>
                    <input
                        type="text"
                        value={firstname}
                        onChange={(event) => setFirstname(event.target.value)}
                        className="p-2 border border-solid border-secondary-200 rounded-full bg-transparent"
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <p>Nom</p>
                    <input
                        type="text"
                        value={lastname}
                        onChange={(event) => setLastname(event.target.value)}
                        className="p-2 border border-solid border-secondary-200 rounded-full bg-transparent"
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <p>Adresse mail</p>
                    <input
                        type="email"
                        value={mail}
                        onChange={(event) => setMail(event.target.value)}
                        className="p-2 border border-solid border-secondary-200 rounded-full bg-transparent"
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <p>Mot de passe</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="p-2 border border-solid border-secondary-200 rounded-full bg-transparent"
                    />
                </label>
                <label className="flex flex-col gap-2">
                    <p>Confirmez le mot de passe</p>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className="p-2 border border-solid border-secondary-200 rounded-full bg-transparent"
                    />
                </label>
                <label className="w-full flex justify-start items-center gap-2">
                    <input type="checkbox" checked={rules} onChange={(event) => setRules(event.target.checked)} className="mr-2" />
                    J&apos;accepte les conditions d&apos;utilisation
                </label>
                <label className="w-full flex justify-start items-center gap-2">
                    <input type="checkbox" checked={newsletter} onChange={(event) => setNewsletter(event.target.checked)} className="mr-2" />
                    Je souhaite m&apos;abonner à la newsletter
                </label>
                <button className="bg-secondary-200 text-black font-bold p-3 rounded-full" type="submit">
                    Créer un compte
                </button>
                <div className="text-center">
                    <p>
                        Déjà un compte ?{" "}
                        <a className="underline" href="#" onClick={() => setShowSignup(false)}>
                            Connecte toi ici !
                        </a>
                    </p>
                </div>
            </form>
        </>
    );
};

export default FormRegister;
