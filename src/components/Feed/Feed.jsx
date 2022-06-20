import PostList from "../PostList";
import React, { useState, useEffect } from "react";
import RssFeed from "../PostList/RssFeed";
import Amplify, { API } from "aws-amplify";
import awsExports from "../../aws-exports";
Amplify.configure(awsExports);

function Feed() {

  const myAPI = "companyListingAPI";
  const path = "/get-all-rss-feed";

const [rssFeed, setRssFeed] = useState([])

useEffect(() => {
 handleGetRSSData()
},[]);


  function handleGetRSSData() {
    API.get(myAPI, path)
        .then((response) => {
            console.log(response)
            setRssFeed(response.Items);
            return rssFeed;
        })
        .catch((error) => {
            console.log(error);
        });
}

  return (
    <div>
      <PostList data={rssFeed}></PostList>
      <RssFeed data={rssFeed}/>
    </div>
  )
}

export default Feed;
