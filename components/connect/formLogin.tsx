"use client";
import { useRouter } from "next/navigation";

import { Dispatch, SetStateAction, useState } from "react";

interface FormCreateProps {
    setShowSignup: Dispatch<SetStateAction<boolean>>;
}

const FormLogin: React.FC<FormCreateProps> = ({ setShowSignup }) => {
    const router = useRouter();
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!mail || !password) return alert("Veuillez remplir tous les champs");
        // https://urban-roots-ada879145d2c.herokuapp.com
        const response = await fetch("https://urban-roots-ada879145d2c.herokuapp.com/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                mail,
                password,
            }),
        });

        if (response.status === 400) return alert("Informations invalides.");
        if (response.status === 404) return alert("Utilisateur non trouvé.");
        if (response.status === 401) return alert("Mot de passe incorrect.");
        response.json().then((data) => sessionStorage.setItem("user", JSON.stringify(data)));
        if (response.ok) {
            setMail("");
            setPassword("");
            router.push("/account");
        }
    };
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="w-full h-full bg-[url('/images/bg-flower.jpg')] bg-cover p-8 rounded-2xl bg-opacity-15 text-secondary-200 text-sm flex flex-col gap-4">
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
                <button className="bg-secondary-200 text-black font-bold p-3 rounded-full" type="submit">
                    Connexion
                </button>
                <p className="text-center">
                    Pas encore de compte ?<br></br>
                    <a className="underline cursor-pointer" href="#" onClick={() => setShowSignup(true)}>
                        Créer mon compte
                    </a>
                </p>
            </form>
        </>
    );
};

export default FormLogin;
