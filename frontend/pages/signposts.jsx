import { 
    DashboardLayout 
} from "../layouts";

import { 
    useCallback,
    useEffect,
    useState
} from "react";

import {
    Config
} from "../lib";

import Link from "next/link";

import {
    default as axios
} from "axios";

import Head from 'next/head';

const Signposts = () => {
    const [ signposts, setSignposts ] = useState([]);

    const getSignposts = useCallback(async () => {
        const token = localStorage.getItem("jwt");

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        await axios
            .get(`${Config.apiUrl}/wegwijzers`, config)
            .then(response => {
                // Response
                setSignposts(response.data);
                return true;
            })
            .catch(() => {
                // Error
                return false;
            });
    }, []);

    useEffect(() => {
        getSignposts();
    }, [getSignposts]);

    return (
        <DashboardLayout pageTitle="wegwijzers">
            <Head>
                <title>Wegwijzers</title>
            </Head>
            <div className="signposts">
                <h1 className="signposts-title">
                    Zelfgestuurd leren ...
                </h1>
                <div className="signposts-items">
                    {
                        signposts.length !== 0 && signposts.map((signpost, index) => {
                            return (
                                <Link key={index} href={`/signposts/${signpost.id}`}>
                                    <a className="signpost-card">
                                        <h1 className="signpost-card__title">{index + 1}. {signpost.title}</h1>
                                        <p className="signpost-card__text">{signpost.description}</p>
                                        <div className="signpost-card-bottom">
                                            <div className="signpost-card-bottom__icon-wrapper">
                                                <div className="signpost-card-bottom__icon">
                                                    <svg width="40" height="40">       
                                                        <image xlinkHref={`${Config.apiUrl}${signpost.icon.url}`} width="40" height="40"/>    
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </DashboardLayout>
    )
};

export default Signposts;