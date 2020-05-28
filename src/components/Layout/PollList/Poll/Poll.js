import React from 'react';
import Option from "./Option/Option";
import styles from "./Poll.module.css";
import Close from "./../../../../img/close.png"

const Poll = (props) => {

    let sum = 0;
    for(let option of props.options){
        sum += parseInt(option.votes);
    }


    return (
        <div className={styles.container}>
            <h2>{props.title}</h2>
            <img 
            alt="CloseBtn"
            src={Close} 
            className={styles.close}
            onClick={() => props.rmPoll(props.ID)}></img>
            <div className={styles.optionsContainer}>
            {
                props.options.map((option, index) => {
                    return (
                        
                        <Option 
                        key={index}
                        ID={props.ID}
                        title={option.title} 
                        votes={option.votes}
                        sum={sum}
                        />
                        
                    )
                })
            }
            </div>
        </div>
    )
}

export default Poll;