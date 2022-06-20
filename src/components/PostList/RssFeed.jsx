import React from 'react'
import RssCard from '../Card/RssCard';
import styles from './PostList.module.css';
export default function RssFeed(props) {

    return (
        <div className={styles.cards}>
            {props.data.map((data, key) => {
                return <RssCard key={key.toString()} data={data} />
            })
            }

        </div>

    )
}
