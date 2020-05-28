import React, {useState, useEffect} from 'react';
import styles from "./PollList.module.css";
import io from "socket.io-client";
import Axios from "axios";
import Poll from "./Poll/Poll"
import Context from "./../../../context/context"

const apiURL = "/api/poll/";
const apiRmURL = "/api/poll/rm/";
let socket;

const PollList = () => {
    //State
    const [pollListState, setPollList] = useState({
        error: null,
        isLoaded: false,
        pollArray: null
      });
    
      //EFFECT
      useEffect(()=> {
        //Init Socket
        socket = io();
    
        async function fetchData() {
          Axios.get(apiURL)
          .then((res) => {
            const pollsArray = res.data;
            pollsArray.reverse();
            setPollList({
              error: false,
              isLoaded: true,
              pollArray: pollsArray
            })
            
          })
          .catch(error => {
            setPollList({
              error: error,
              isLoaded: true,
              pollArray: null
            })
          })
        }
        fetchData();
      }, [])
    
      useEffect(() => {
          socket.on("voteCasted", (pollArray) => {
            const tempArr = pollArray;
            tempArr.reverse();
            setPollList({
              ...pollListState,
              pollArray: tempArr
            });
          })
          socket.on("newPoll", (pollArray) => {
            const tempArr = pollArray;
            tempArr.reverse();
            setPollList((prevState) => {
              return{
                ...prevState,
                pollArray: tempArr
              }
              
            });
          })
          socket.on("pollListSent", (cookies) => {
            if(cookies !== undefined && cookies !== null){
              localStorage.setItem("marked", cookies);
            }
          })
          socket.on("pollRemoved", (pollArray) => {
            const tempArr = pollArray;
            tempArr.reverse();
            setPollList((prevState) => {
              return{
                ...prevState,
                pollArray: tempArr
              }
            });
          })
          
          return () => {
            socket.off("voteCasted");
            socket.off("newPoll");
            socket.off("pollListSent");
            socket.off("pollRemoved");
          }
      })

    //Methods
    const rmPoll = async (id) => {
      Axios.delete(apiRmURL + id)
      .then(res => {
          console.log(res.data);
      })
      .catch(err => {
          console.log(err);
      })
    }
    const vote = (optionTitle, ID) => {
        Axios.post(apiURL + ID, {optionTitle: optionTitle})
        .then((res) => {
            console.log(res.data.message);
            if(localStorage.marked === undefined){
              localStorage.setItem("marked", JSON.stringify([ID]));
            } else {
              let pollIDArr = JSON.parse(localStorage.marked);
              pollIDArr.push(ID);
              localStorage.setItem("marked", JSON.stringify(pollIDArr));
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    //Render
    if(pollListState.error){
        return (
            <h1>{pollListState.error.message}</h1>
        )
    } else if(!pollListState.isLoaded){
        return(
            <h1>Loading ...</h1>
        )
    } else {
            return (
                <Context.Provider
                value={
                        {
                            vote: vote
                        }
                    }>
                    <div className={styles.container}>
                        <h1>Recent Polls</h1>
                        {
                            pollListState.pollArray.map((poll) => {
                                return (
                                    <Poll 
                                    rmPoll={rmPoll}
                                    key={poll._id}  
                                    title={poll.title} 
                                    options={poll.options} 
                                    ID={poll._id}></Poll>
                                )
                            })
                        }
                    </div>
                </Context.Provider>
            )
    }
    
}

export default PollList;