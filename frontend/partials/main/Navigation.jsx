import Link from "next/link";

import { 
    LogoColor 
} from '../../assets/logos';

import {
    default as axios
} from "axios";

import { 
    useCallback,
    useEffect,
    useState
} from "react";

import {
    Config
} from "../../lib";

const Navigation = () => {
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
        <div className="nav">
            <Link href="/dashboard">
                <a className="nav-header">
                    <img className="nav-header__image" src={LogoColor.src}/>
                </a>
            </Link>

            <nav className="nav-list">
                {
                    signposts.length !== 0 && signposts.map((signpost, index) => {
                        return (
                            <Link key={index} href={`/signposts/${signpost.id}`}>
                                <a className="nav-list-link">
                                    <div className="nav-list-link__icon-wrapper">
                                        <div className="nav-list-link__icon">
                                            <svg width="40" height="40">       
                                                <image xlinkHref={`${Config.apiUrl}${signpost.icon.url}`} width="40" height="40"/>    
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="nav-list-link__text">
                                        <span className="nav-list-link__text-span">Wegwijzer {index + 1}</span>
                                        <p className="nav-list-link__text-title">{signpost.keyword}</p>
                                    </div>
                                </a>
                            </Link>
                        )
                    })
                }
            </nav>
        </div>
    )
};

export default Navigation;