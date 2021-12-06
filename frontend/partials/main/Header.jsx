import { 
    useEffect, 
    useState 
} from "react";

import Link from "next/link";
import ReactTooltip from 'react-tooltip';

import { 
    IoIosArrowDown 
} from 'react-icons/io';

import { 
    useRouter 
} from 'next/router';

import { 
    DefaultImage 
} from '../../assets/images';

import {
    Config
} from "../../lib";

const Header = ({user, pageTitle}) => {
    const router = useRouter();
    const [ url, setUrl ] = useState("Dashboard");

    useEffect(() => {
        const windowLocation = window.location.pathname.split("/")[1];
        setUrl(windowLocation);
    });

    const logOut = () => {
        localStorage.removeItem("jwt");
        router.push("/signin");
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1 className="header-left-title">
                    {
                        !pageTitle ? url ?? (
                            url.includes('dashboard') ? 'Dashboard' : 
                            url.includes('settings') ? 'Instellingen' : 
                            url.includes('my-profile') ? 'Mijn profiel' : 
                            url.includes('profile') ? 'Profiel' : 
                            url.includes('my-materials') ? 'Mijn materiaal' : 
                            url.includes('materials') ? 'Materiaal' : 
                            url.includes('material') ? 'Materiaal' : 
                            url.includes('create-material') ? 'Materiaal' : 
                            url.includes('search-results') ? 'Zoeken' : 
                            url.includes('notifications') ? 'Meldingen' : 
                            url.includes('signposts') ? 'Wegwijzers' : 
                            url.includes('faq') ? 'FAQ' : 
                            'Wegwijzers'
                        ) : (
                            pageTitle
                        )
                    }
                </h1>
            </div>
            <div className="header-right">
                <div className="header-right-profile" data-tip data-for="profile" data-event='click focus'>
					<div className="header-right-profile__image-link">
						{
							user.avatar ? (
								<img className="header-right-profile__image" src={`${Config.apiUrl}${user.avatar.url}`} alt="profile"/>
							) : <img className="header-right-profile__image" src={ DefaultImage.src } alt="profile"/>
						}
						<IoIosArrowDown/>
					</div>
				</div>
                <ReactTooltip id="profile" place="bottom" className="react-tooltip react-tooltip--profile" globalEventOff='click' type="light" effect='solid' clickable={true}>
					<div className="header-right-profile__text">
							{ 
								user && (
									<Link href={"/profile"}>
                                        <a className="header-right-profile__text-name-link">
                                            <p className="header-right-profile__text-name">{user.firstname + ' ' + user.lastname}</p>
                                        </a>
									</Link>
								)
							}
							<Link href={"/profile"}>
                                <a className="header-right-profile__text-settings-link">
								    <p className="header-right-profile__text-settings">Ga naar profiel</p>
                                </a>
							</Link>
							<Link href={"/profile/settings"}>
                                <a className="header-right-profile__text-settings-link">
								    <p className="header-right-profile__text-settings">Instellingen</p>
                                </a>
							</Link>
							<div className="header-right-profile__text-settings-link header-right-profile__text-settings-link--logout">
								<p className="header-right-profile__text-settings" onClick={() => logOut()}>Afmelden</p>
							</div>
						</div>
				</ReactTooltip>
            </div>
        </header>
    )
};

export default Header;