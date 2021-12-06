import { 
    DashboardLayout 
} from "../../../layouts";

import { 
    useCallback,
    useEffect,
    useState
} from "react";

import {
    Config
} from "../../../lib";

import {
    default as axios
} from "axios";

import { 
    Col,
    Row 
} from "react-bootstrap";

import {
    default as showdown
} from "showdown";

import ReactHtmlParser from 'react-html-parser';

import Head from 'next/head';
import Link from 'next/link';

const Pages = () => {
    const showHTML = new showdown.Converter();

    const [ module, setModule ] = useState();
    const [ path, setPath ] = useState();
    const [ currentPath, setCurrentPath ] = useState();

    const getModule = useCallback(async () => {
        const token = localStorage.getItem("jwt");

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        await axios
            .get(`${Config.apiUrl}/modules/${window.location.pathname.split("/")[3]}`, config)
            .then(response => {
                // Response
                setModule(response.data);
                setCurrentPath(response.data.pages[Number(location.search.split('path=')[1]) - 1]);
                return true;
            })
            .catch(() => {
                // Error
                return false;
            });
    }, []);

    useEffect(() => {
        setPath(Number(location.search.split('path=')[1]));
        getModule();
    }, [getModule, path]);

    return currentPath ? (
        <DashboardLayout pageTitle="Module">
            <Head>
                <title>Module | {module.title} | Pagina {path}</title>
            </Head>
            <Row className="signpost">
                <Col>
                    <div className="breadcrumbs">
                        <Link href={`/modules/${module.id}`}>{module.title + " > "}</Link><Link href={`/modules/pages/${module.id}?path=${currentPath.id}`}>{currentPath.title}</Link>
                    </div>

                    <h3 className="path-title">{currentPath.title}</h3>

                    <div className="path-content">
                        { ReactHtmlParser(showHTML.makeHtml(currentPath.content)) }
                    </div>

                    <div className="order">
                        {
                            module.pages && module.pages.map((page, index) => {
                                return <a href={`/modules/pages/${module.id}?path=${index + 1}`} key={index} className={`${index === path - 1 ? 'active' : 'non-active'}`}>{index + 1}</a>
                            })
                        }
                    </div>
                </Col>
            </Row>
        </DashboardLayout>
    ) : ""
};

export default Pages;