import React, {useState} from "react";
import Axios from "axios";
import Input from "./Input/Input";
import styles from "./Cockpit.module.css";
import UUID from "uuid/v4";

const apiURL = "/api/poll/"

const Cockpit = () => {
    const [pollState, setPollState] = useState({
        title: ""
    })
    const [optionsState, setOptionsState] = useState({
        options: []
    })

    const handleTitleChange = (e) => {
        const tempState = {...pollState};
        tempState.title = e.target.value;
        setPollState(tempState);
    }

    const handleOptionInput = (id, e) => {
        const tempState = {...optionsState}
        for(let option of tempState.options){
            if(option.id === id){
                option.title = e.target.value;
                break;
            }
        }
        setOptionsState(tempState);
    }
    const addOption = () => {
        const tempState = {...optionsState};
        const newOption = {
            id: UUID(),
            title: "",
            votes: 0
        }
        tempState.options.push(newOption);
        setOptionsState(tempState);
    }
    const submit = () => {
        console.log(pollState.title, optionsState.options);
        const newPoll = {
            title: pollState.title,
            options: optionsState.options
        }
        Axios.post(apiURL, newPoll)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
        //CleanUp
        setPollState({
            title: ""
        })
        setOptionsState({
            options: []
        })
    }
    return (
        <div className={styles.container}>
            <h1>Create Poll</h1>
            <Input for="Title" handler={handleTitleChange} title={pollState.title}></Input>

            <div className={styles.add}>
                <div>
                {
                    optionsState.options.map((items) => {
                        return (
                            <Input key={items.id} for="Option" id={items.id} handler={handleOptionInput} title={items.title}></Input>
                        )
                    })
                }
                </div>
                <div className={styles.commands}>
                <button className={styles.Btn} onClick={addOption}>+</button>
                <button className={styles.Btn} onClick={submit}>Submit</button>
                </div>
            </div>

        </div>
    )
}

export default Cockpit;