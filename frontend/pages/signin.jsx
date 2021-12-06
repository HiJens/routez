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

export default function Signin() {
    const router = useRouter();

    // States
    const [ data, setData ] = useState({
        email: "",
        password: "",
    });

    const [ error, setError ] = useState({
        visible: false,
    });

    const [ loader, setLoader ] = useState(false);

    const notify = (msg) => toast(msg, {});

    const signIn = async (e) => {
        e.preventDefault();
        setLoader(true);

        // Register user
        await axios
            .post(`${Config.apiUrl}/auth/local`, {
                identifier: data.email,
                password: data.password,
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

                notify("Er is een probleem opgetreden bij het aanmelden.");
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
                <h1 className="title title--large">Welkom aan boord!</h1>
                <form className="form" onSubmit={(e)=> signIn(e)}>
                    <div className="form-input" style={{ fontSize: 16 }}>
                        <FloatingLabelInput id="email" label="E-mail" type="email" onChange={(e)=> changeData(e)}
                            required
                            autoFocus
                            />
                    </div>
                    <div className="form-input" style={{ fontSize: 16 }}>
                        <FloatingLabelInput id="password" label="Wachtwoord" type="password" onChange={(e)=>
                            changeData(e)} required
                            />
                    </div>
                    <Link href="/reset"><a className="form-link form-link--bottom">Wachtwoord vergeten?</a></Link>
                    <ButtonLarge content="Log in"></ButtonLarge>
                    <Link href="/signup"><a className="form-link form-link--top">Nog geen account? <b>Registreer hier</b></a></Link>
                </form>
            </div>
        </Auth>
    )
};