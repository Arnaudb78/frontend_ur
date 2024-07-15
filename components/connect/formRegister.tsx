"use client";

import { Dispatch, SetStateAction } from "react";

interface FormConnectProps {
    setShowSignup: Dispatch<SetStateAction<boolean>>;
}

const FormRegister: React.FC<FormConnectProps> = ({ setShowSignup }) => {


    return(
        <>
            <p>Form Register</p>
            <p>Déjà un compte ? {" "} 
                <a className="underline" href="#" onClick={() => setShowSignup(false)}>
                    Connecte toi ici !
                </a>
            </p>
        </>
    )
}

export default FormRegister;