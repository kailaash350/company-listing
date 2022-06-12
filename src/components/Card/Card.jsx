import React from "react";

import styles from "./Card.module.css";

const Card = ({ data }) => {
    return (
        <div className={`ui card blue ${styles['card-size']}`}>
            <div className='content'>
                <div className={styles["my-header"]}>{data.title}</div>

                <div className={styles["my-desc"]}>
                    <p>{data.description}</p>
                </div>

                <div className='header'>
                    <span className='header'></span>
                </div>
            </div>
            <div className='extra content'>
                <div className='meta' style={{ marginTop: "5px" }}>
                    <a href={data.link} target='_blank'>
                        <i className='tag icon'></i>
                        Link
                    </a>
                    {/* <span className='time'>{data.link}</span> */}
                    <span className={`right floated category ${styles.date}`}>
                        {data.pubDate}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
