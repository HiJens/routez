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

import { 
    Col,
    Row 
} from "react-bootstrap";

import {
    default as showdown
} from "showdown";

import ReactHtmlParser from 'react-html-parser';

import { HiOutlineDownload } from 'react-icons/hi';

import Head from 'next/head';

const Module = () => {
    const showHTML = new showdown.Converter();
    const [ module, setModule ] = useState();

    const getModule = useCallback(async () => {
        const token = localStorage.getItem("jwt");

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        await axios
            .get(`${Config.apiUrl}/modules/${window.location.pathname.split("/")[2]}`, config)
            .then(response => {
                // Response
                setModule(response.data);
                return true;
            })
            .catch(() => {
                // Error
                return false;
            });
    }, []);

    useEffect(() => {
        getModule();
    }, [getModule]);

    return module ? (
        <DashboardLayout pageTitle="Module">
            <Head>
                <title>Module | {module.title}</title>
            </Head>
            <Row className="signpost">
                <div className="signpost-header">
                    <h1 className="signpost-title">{ module.title }</h1>
                </div>
                <Col lg={6}>
                    {
                        ReactHtmlParser(showHTML.makeHtml(module.description))
                    }
                </Col>
                <Col lg={5} className="signpost-paths">
                    {
                        module.pages.length !== 0 && module.pages.map((path, index) => {
                            return (
                                <div className="signpost-modules-item" key={index}>
                                    <p className="signpost-paths-item-title">{path.title}</p>
                                    <div>
                                        <Link href={`/modules/pages/${module.id}?path=${path.id}`}>
											<ButtonSmall content="Open" color="secondary"/>
										</Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Col>
                <div className="signpost-extra">
                    <p className="signpost-undertitle">
                        Wat anderen hebben gedeeld
                    </p>
                </div>
                <div className="material-cards">
                    {
                        module.materials.map((material, index) => {
                            return (
                                <div key={index} className="material-card">
                                    <Link href={`/materials/${material.id}`}>
                                        <a className="material-card-link">
                                            <div className="material-card-profile">

                                            </div>
                                            <p className="material-card-text">
                                                {material.title}
                                            </p>

                                            <div className="material-card-image">
                                                <HiOutlineDownload className="material-card-image__download"/>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </Row>
        </DashboardLayout>
    ) : ""
};

export default Module;