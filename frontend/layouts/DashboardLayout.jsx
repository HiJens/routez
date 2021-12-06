import { 
    useCallback,
    useEffect,
    useState 
} from "react";

import { 
    Header,
    Navigation 
} from "../partials";

import {
    default as axios
} from "axios";

import {
    Config
} from "../lib";

import { 
    useRouter 
} from 'next/router';

const DashboardLayout = ({children, pageTitle}) => {
    const router = useRouter()
    const [ user, setUser ] = useState(false);

    const getUser = useCallback(async () => {
        const token = localStorage.getItem("jwt");

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        await axios
            .get(`${Config.apiUrl}/users/me`, config)
            .then(response => {
                // Response
                setUser(response.data);
                return true;
            })
            .catch(() => {
                // Error
                router.push("/signin");
                return false;
            });
    }, []);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return user ? (
        <div className="page">
            <Navigation />

            <main className="page-main">
                <Header 
                    user={user}
                    pageTitle={pageTitle}
                />
                {children}
            </main>
        </div>
    ) : ""
};

export default DashboardLayout;