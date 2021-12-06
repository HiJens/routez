import { 
    DashboardLayout 
} from "../../layouts";

import { 
    useCallback,
    useEffect,
    useState
} from "react";

// Formatting date
import { 
    default as moment 
} from 'moment';
import 'moment/locale/nl-be';

import { default as Downloader } from 'downloadjs';

import {
    default as axios
} from "axios";

import Head from 'next/head';

import { 
    Row, 
    Col 
} from 'react-bootstrap';

import { ButtonSmall } from '../../components';

import ReactTooltip from 'react-tooltip';

import { default as HTMLParser } from 'react-html-parser';

import {
    Config
} from "../../lib";

import { IoHeartSharp, IoHeartOutline } from 'react-icons/io5'
import { HiOutlineDownload } from 'react-icons/hi';
import { MdPhone, MdMailOutline } from 'react-icons/md';

const Material = () => {
    const [ material, setMaterial ] = useState();
    const [ author, setAuthor ] = useState();

    let date = moment(material && material.file.created_at);
    moment.locale('nl-be');

    const getMaterial = useCallback(async () => {
        const token = localStorage.getItem("jwt");
        let userId;

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        await axios
            .get(`${Config.apiUrl}/materials/${window.location.pathname.split("/")[2]}`, config)
            .then(response => {
                // Response
                setMaterial(response.data);
                console.log(response.data);
                userId = response.data.author.id;
                return true;
            })
            .catch(() => {
                // Error
                return false;
            });

        await axios
            .get(`${Config.apiUrl}/users/${userId}`, config)
            .then(response => {
                // Response
                setAuthor(response.data);
            })
            .catch(() => {
                // Error
                return false;
            });
    }, []);

    useEffect(() => {
        getMaterial();
    }, [getMaterial]);

    return material ? (
        <DashboardLayout pageTitle="Materiaal">
            <Head>
                <title>Materiaal</title>
            </Head>
            <div className="material">
                <Row className="material-detail">
                    <Col lg={7} className="material-detail-left">
                        <div className="material-detail-title-wrapper">
                            <h1 className="material-detail-title">{material.title}</h1>
                        </div>
                        <p className="material-detail-text">
                            {
                                HTMLParser(material.description)
                            }
                        </p>
                    </Col>
                    <Col lg={5} className="material-detail-right">
                        <h5 className="material-detail-right-title">Auteur van het materiaal</h5>
                        <div className="material-detail-right-profile">
                            {
                                author && (
                                    <>
                                        <img className="material-detail-right-profile__image" src={`${Config.apiUrl}${author.avatar.url}`} alt="profile"/>

                                        <div className="material-detail-right-profile__text" data-tip data-for='details'>
                                            <p className="material-detail-right-profile__text-name">{author.firstname + ' ' + author.lastname}</p>
                                            <p className="material-detail-right-profile__text-settings">{author.school}</p>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        {
                            author && (
                                <ReactTooltip className='react-tooltip' delayHide={1000} type="light" effect='solid' id='details' globalEventOff='click'>
                                    <p className="react-tooltip__email"> <MdMailOutline/> {author.email}</p>
                                    
                                    <p className="react-tooltip__phone" style={ { display: author.phone ? 'block' : 'none' } }> 
                                        <MdPhone/> {author.phone}
                                    </p>
                                        
                                </ReactTooltip>
                            )
                        }

                        <p className="material-detail-right-download-title">Download</p>
                        <div className="material-detail-right-download" title="Download PDF" onClick={() => Downloader(`${Config.apiUrl}${material.file.url}`)}>
                            <div className="material-detail-right-download-text">
                                <p className="material-detail-right-download-text__name">{material.filename}</p>
                                <p className="material-detail-right-download-text__data">{date.format('L')} | {material.file.size}KB</p>
                            </div>
                            <HiOutlineDownload className="material-icon__download" /> 
                        </div>
                        <div className="material-detail-right-likes">
  
                        </div>
                        <div className="material-detail-right-tags">
                            {
                                material.tags.length !== 0 && material.tags.map((tag, index) => {
                                    return <span className="material-detail-right-tags__item" key={index}>#{tag.title}</span>
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </DashboardLayout>
    ) : "";
}

export default Material;