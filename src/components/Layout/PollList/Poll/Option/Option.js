import React, {useContext} from 'react';
import styles from "./Option.module.css";
import Context from "./../../../../../context/context";

const Option = (props) => {
    const voteContext = useContext(Context);

    let percentage = parseFloat((parseInt(props.votes) / parseInt(props.sum)) * 100).toFixed(1);

    let widthStyle = {
        width: percentage+"%"
    }


    if(localStorage.getItem("marked") !== null){
        const markedPollArr = JSON.parse(localStorage.marked);
        for(let ID of markedPollArr){
            if(ID === props.ID){
                
                return (
                    <div 
                        className={styles.offContainer}
                        style={widthStyle}>
                    <div className={styles.stat}>{percentage}%</div>
                    <div 
                        className={styles.title}
                    >{props.title}</div>
                    </div>
                )
            }
        }
        return (
            <div 
            className={styles.container}
            onClick={() => voteContext.vote(props.title, props.ID)}>
            <div className={styles.stat}>{props.votes}</div>
            <div 
                className={styles.title}
            >{props.title}</div>
            </div>
        )
    } else {
        return (
            <div 
            className={styles.container}
            onClick={() => voteContext.vote(props.title, props.ID)}>
            <div className={styles.stat}>{props.votes}</div>
            <div 
                className={styles.title}
            >{props.title}</div>
            </div>
        )
    }
    
}     


export default Option;