import React from 'react';
import {Image, Container, Card, ResponsiveEmbed} from 'react-bootstrap';
import classes from './LeftSide.module.css';

const leftSide = props => {
    
    return(
        <React.Fragment>
            <Container>
                <Card className={classes.CentralContent}>
                <Card.Body onClick={()=>{alert("Eh!")}}>
                    <ResponsiveEmbed aspectRatio="1by1">
                        <Image src = {props.imageLink} className={classes.Image}/>
                    </ResponsiveEmbed>
                </Card.Body>
                <Card.Body ></Card.Body>
                </Card>
                <Card className={classes.CentralContent}>
                <Card.Body>Recommended Jobs</Card.Body>
                </Card>

                <Card className={classes.CentralContent}>
                <Card.Body>Applied Jobs</Card.Body>
                </Card>
                
                <Card className={classes.CentralContent}>
                <Card.Body>Saved Jobs</Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    );
}

export default leftSide;