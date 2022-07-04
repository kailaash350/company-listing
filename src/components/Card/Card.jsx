import { ConsoleLogger } from "@aws-amplify/core";
import React,{useState} from "react";
import  { API } from "aws-amplify";
import styles from "./Card.module.css";
const myAPI = "rssfeed";
const path = "/getByCategory"



const colorList = Object({
    Software: "blue",
    Networking: "pink",
    "Digital & Disruption": "red",
    Storage: "yellow",
    Security: "olive",
    Cloud: "teal",
    "Telcom/ISP": "green",
})

const Card = ({ data, setAllPosts }) => {
    
    // const [ctrData, setCtrData] = useState([]);
    // api to seach rss feed by category - working fine - need to integrate to front
    const getBycategory =(e)=> {
        var category = e.target.textContent
            const myInit = {
                body: {
                  category:category
                }
              };
            API.post(myAPI, path, myInit)
                .then((response) => {
                    console.log(response.Items)
                    // setCtrData = response.Items;
                    setAllPosts(response.Items)
                })
                .catch((error) => {
                    console.log(error);
                });
    }
    
    let color;
    if(data.category in colorList){
        color = colorList[data.category]
    }else{
        color = "brown"
    }
    return (
        <div className={`ui card blue ${styles["card-size"]}`}>
            <div className='content'>
                <div onClick={getBycategory} className={`ui ${color} label ${styles["my-label"]}`}>
                    {data.category}
                </div>

                <div className={styles["my-header"]}>{data.name}</div>

                <div className={styles["my-desc"]}>
                    <p>{data.link}</p>
                </div>

                <div className='header'>
                    <span className='header'></span>
                </div>
            </div>
            <div className='extra content'>
                <div className='meta' style={{ marginTop: "5px" }}>
                    <a href={data.desc} target='_blank'>
                        <i className='tag icon'></i>
                        Link
                    </a>
                    {/* <span className='time'>{data.desc}</span> */}
                    <span className={`right floated category ${styles.date}`}>
                        {data.date}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
