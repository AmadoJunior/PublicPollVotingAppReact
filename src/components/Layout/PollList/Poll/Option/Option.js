import React, {useContext} from 'react';
import styles from "./Option.module.css";
import Context from "./../../../../../context/context";

const Option = (props) => {
    const voteContext = useContext(Context);

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

export default Option;