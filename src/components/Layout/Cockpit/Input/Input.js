import React from "react";
import styles from "./Input.module.css";

const Input = (props) => {
    return (
        <div className={styles.container}>
            {
                props.id ? 
                <input className={styles.input} onChange={(event) => props.handler(props.id, event)} value={props.title}></input>
                :
                <input className={styles.input} onChange={props.handler} value={props.title}></input>
            }
              
        </div>
    )
}

export default Input;