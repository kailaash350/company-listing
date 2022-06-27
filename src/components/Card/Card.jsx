import React from "react";

import styles from "./Card.module.css";

const colorList = Object({
    Software: "blue",
    Networking: "pink",
    "Digital & Disruption": "red",
    Storage: "yellow",
    Security: "olive",
    Cloud: "teal",
    "Telcom/ISP": "green",
})

const Card = ({ data }) => {

    let color;
    if(data.category in colorList){
        color = colorList[data.category]
    }else{
        color = "brown"
    }
    return (
        <div className={`ui card blue ${styles["card-size"]}`}>
            <div className='content'>
                <div className={`ui ${color} label ${styles["my-label"]}`}>
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
