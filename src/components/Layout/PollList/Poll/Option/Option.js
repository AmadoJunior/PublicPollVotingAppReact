import React, {useContext} from 'react';
import styles from "./Option.module.css";
import Context from "./../../../../../context/context";

const Option = (props) => {
    const voteContext = useContext(Context);

    if(localStorage.getItem("marked") !== null){
        const markedPollArr = JSON.parse(localStorage.marked);
        for(let ID of markedPollArr){
            if(ID === props.ID){
                return (
                    <div 
                        className={styles.container}>
                    <div className={styles.stat}>{props.votes}</div>
                    <div 
                        className={styles.off}
                    >{props.title}</div>
                    </div>
                )
            }
        }
        return (
            <div 
            className={styles.container}>
            <div className={styles.stat}>{props.votes}</div>
            <div 
                className={styles.title}
                onClick={() => voteContext.vote(props.title, props.ID)}
            >{props.title}</div>
            </div>
        )
    } else {
        return (
            <div 
            className={styles.container}>
            <div className={styles.stat}>{props.votes}</div>
            <div 
                className={styles.title}
                onClick={() => voteContext.vote(props.title, props.ID)}
            >{props.title}</div>
            </div>
        )
    }
    
}     


export default Option;