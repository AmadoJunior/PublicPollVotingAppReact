import React from 'react';
import Option from "./Option/Option";
import styles from "./Poll.module.css"

const Poll = (props) => {
    return (
        <div className={styles.container}>
            <h2>{props.title}</h2>
            <div className={styles.optionsContainer}>
            {
                props.options.map((option, index) => {
                    return (
                        
                        <Option 
                        key={index}
                        ID={props.ID}
                        title={option.title} 
                        votes={option.votes}/>
                        
                    )
                })
            }
            </div>
        </div>
    )
}

export default Poll;