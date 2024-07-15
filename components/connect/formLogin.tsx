"use client";

import { Dispatch, SetStateAction } from "react";

interface FormCreateProps {
    setShowSignup: Dispatch<SetStateAction<boolean>>;
}

const FormLogin: React.FC<FormCreateProps> = ({ setShowSignup }) =>{
    return(
        <>
            <p>Form Login</p>
            <p>Pas encore de compte ?{" "}
                <a className="underline cursor-pointer" href="#" onClick={() => setShowSignup(true)}>
                    créer mon compte.
                </a>{" "}
            </p>
            
        </>
    )
}

export default FormLogin;