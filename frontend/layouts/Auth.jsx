import { default as React } from 'react';
import Image from 'next/image';
import {Container, Row, Col} from 'react-bootstrap';

import illustration from '../assets/illustrations/welcome-illustation.svg';
import logo from '../assets/logos/RouteZ-logo-color.png';

const Auth = ({children}) => {
  return (
	<div className="page">
		<Container className="page-main auth">
			<Row>
				<Col md={8} className="auth-left">
					<div className="auth-left-frame">
						<Image className="auth-left-frame__image" src={illustration} alt="illustration"/>
					</div>
				</Col>
				<Col md={4} className="auth-right">
					<img src={logo.src} alt="RouteZ" className="auth-right-logo" />
					{children}
				</Col>
			</Row>
		</Container>
	</div>
  );
};

export default Auth;