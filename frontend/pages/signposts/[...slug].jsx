import { 
    DashboardLayout 
} from "../../layouts";

import { 
    ButtonSmall 
} from "../../components";

import { 
    useCallback,
    useEffect,
    useState
} from "react";

import {
    Config
} from "../../lib";

import Link from "next/link";

import {
    default as axios
} from "axios";

import Head from 'next/head';

const Signpost = () => {
    const [ signpost, setSignpost ] = useState();

    const getSignpost = useCallback(async () => {
        const token = localStorage.getItem("jwt");

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        await axios
            .get(`${Config.apiUrl}/wegwijzers/${window.location.pathname.split("/")[2]}`, config)
            .then(response => {
                // Response
                setSignpost(response.data);
                return true;
            })
            .catch(() => {
                // Error
                return false;
            });
    }, []);

    useEffect(() => {
        getSignpost();
    }, [getSignpost]);

    return signpost ? (
        <DashboardLayout pageTitle="Wegwijzer">
            <Head>
                <title>Wegwijzer | {signpost.title}</title>
            </Head>
            <div className="signpost">
                <h1 className="signpost-title">{ signpost.title }</h1>
                <p className="signpost-text">{ signpost.description }</p>
                <img className="signpost-illustration" src={`${Config.apiUrl}${signpost.illustration.url}`}/>
                <div className="signpost-modules">
                    <h5 className="signpost-modules-title">
                        Modules
                    </h5>
                    {
                        signpost.modules.length !== 0 ? signpost.modules.map((module, index) => {
                            return (
                                <div className="signpost-modules-item" key={index}>
                                    <p className="signpost-modules-item-title">{module.title}</p>
                                    <div>
                                        <Link href={`/modules/${module.id}`}>
                                            <ButtonSmall content="Start" color="secondary"/>
                                        </Link>
                                    </div>
                                </div>
                            )
                        }) : ""
                    }
                </div>
            </div>
        </DashboardLayout>
    ) : ""
};

export default Signpost;