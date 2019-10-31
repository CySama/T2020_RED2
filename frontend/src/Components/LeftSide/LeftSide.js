import React from 'react';
import {Image, Container, Card, ResponsiveEmbed} from 'react-bootstrap';
import classes from './LeftSide.module.css';


const leftSide = props => {
    let getDate = (date) =>{
        var currentdate = Date.parse(date); 
        console.log(date);
        // // return "Last Login: " + currentdate.getDate() + "/"
        //             + (currentdate.getMonth()+1)  + "/" 
        //             + currentdate.getFullYear() + " @ "  
        //             + currentdate.getHours() + ":"  
        //             + currentdate.getMinutes() + ":" 
        //             + currentdate.getSeconds();
    }
    
    return(
        <React.Fragment>
            
                <Card className={classes.CentralContent}>
                <Card.Body>
                    <ResponsiveEmbed aspectRatio="1by1">
                        <Image src = {props.imageLink} className={classes.Image}/>
                    </ResponsiveEmbed>
                    
                    Hi! {props.customerDetail.gender=="Female"? "Ms.": (props.customerDetail.gender=="Male"?"Mr.":" ")}{props.customerDetail.firstName} {props.customerDetail.lastName}
                    <br />
                    {getDate(props.customerDetail.lastLogIn)}
                    {props.customerDetail.lastLogIn}

                    
                </Card.Body>
                
                <Card.Body>
                    
                    Account Number: {props.customerAccDetail.accountNumber}
                    {props.customerAccDetail.displayName}
                    Type: {props.customerAccDetail.type}
                </Card.Body>
                </Card>
                
        </React.Fragment>
    );
}

export default leftSide;