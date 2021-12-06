import React, {
    useState
} from "react";

import { 
    useRouter 
} from 'next/router';

import Link from "next/link";
import FloatingLabelInput from 'react-floating-label-input';

import {
    ToastContainer,
    toast
} from 'react-toastify';

import {
    ButtonLarge,
    Loader
} from "../components";

import {
    Auth
} from "../layouts";

import {
    default as axios
} from "axios";

import {
    Config
} from "../lib";

import Head from 'next/head';

export default function Signup() {
    const router = useRouter();

    // States
    const [ data, setData ] = useState({
        email: "",
        password: "",
        passwordRepeat: "",
        firstname: "",
        lastname: ""
    });

    const [ error, setError ] = useState({
        visible: false,
    });

    const [ loader, setLoader ] = useState(false);

    const notify = (msg) => toast(msg, {});

    const signUp = async (e) => {
        e.preventDefault();
        setLoader(true);

        if (data.password !== data.passwordRepeat) {
            setError({
                visible: true,
            });
            setLoader(false);
            notify("Wachtwoorden komen niet overeen.");

            return;
        };

        // Register user
        await axios
            .post(`${Config.apiUrl}/auth/local/register`, {
                email: data.email,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname
            })
            .then(response => {
                // Response
                localStorage.setItem("jwt", response.data.jwt);
                router.push("/dashboard");
                return true;
            })
            .catch(() => {
                // Error
                setError({
                    visible: true,
                });

                notify("Er is een probleem opgetreden bij het aanmaken van een account.");
                setLoader(false);
                return false;
            });
    };

    const changeData = (e) => {
        setData({
            ...data,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <Auth>
            <Head>
                <title>Aanmelden</title>
            </Head>
            { error.visible ? <ToastContainer /> : "" }
            { loader ? <Loader /> : "" }
            <div className="auth-content">
                <form className="form" onSubmit={(e)=> signUp(e)}>
                    <h1 className="title title--large">Registreer</h1>
                    <div className="form-input" style={{ fontSize: 16 }}>
                        <FloatingLabelInput id="firstname" label="Voornaam" type="text" onChange={(e)=> changeData(e)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="form-input" style={{ fontSize: 16 }}>
                        <FloatingLabelInput id="lastname" label="Achternaam" type="text" onChange={(e)=> changeData(e)}
                            required
                        />
                    </div>
                    <div className="form-input" style={{ fontSize: 16 }}>
                        <FloatingLabelInput id="email" label="E-mail" type="email" onChange={(e)=> changeData(e)} required/>
                    </div>
                    <div className="form-input" style={{ fontSize: 16 }}>
                        <FloatingLabelInput id="password" label="Wachtwoord" type="password" onChange={(e)=> changeData(e)}
                            required
                        />
                    </div>
                    <div className="form-input" style={{ fontSize: 16 }}>
                        <FloatingLabelInput id="passwordRepeat" label="Herhaal wachtwoord" type="password" onChange={(e)=> changeData(e)} required
                        />
                    </div>
                    <div className="form-restrictions">
                        <input type="checkbox" name="restrictions" id="restrictions" required />
                        <span className="form-restrictions-text">Ik accepteer de <b>algemene voorwaarden</b></span>
                    </div>
                    <ButtonLarge content="Registreer"></ButtonLarge>
                    <Link href="/signin"><a className="form-link form-link--top">Al een account?</a></Link>
                </form>
            </div>
        </Auth>
    )
};