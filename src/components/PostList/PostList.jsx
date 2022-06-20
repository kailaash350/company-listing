import React, {useState, useEffect, useContext} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Card from '../Card';
import styles from './PostList.module.css';
import Amplify, { API } from "aws-amplify";
import awsExports from "../../aws-exports";
import { SearchContext } from "../../hooks/Context";

Amplify.configure(awsExports);

// const GET_NEWS = gql`
//   query MyQuery {
//     listNews {
//       nextToken
//       items {
//         description
//         id
//         link
//         pubDate
//         createdAt
//         title
//         updatedAt
//       }
//     }
//   }`

const dummy_data =   {
      "listNews": {
          "nextToken": null,
          "items": [
              {
                  "description": "Two-year project puts system on AWS.",
                  "id": "8a1fa975-5124-401e-bcb7-104cd31089af",
                  "link": "https://www.itnews.com.au/news/macquarie-moves-sap-core-banking-to-cloud-580341?utm_source=feed&utm_medium=rss&utm_campaign=iTnews+Cloud+feed",
                  "pubDate": "Mon, 23 May 2022 11:57:00 +1000",
                  "createdAt": "2022-06-08T06:10:36.970Z",
                  "title": "Macquarie moves SAP core banking to cloud",
                  "updatedAt": "2022-06-08T06:10:36.970Z"
              },
              {
                  "description": "Targets businesses with free API services. ",
                  "id": "b634f086-b18c-4d15-9ce4-9543b36e072d",
                  "link": "https://www.itnews.com.au/news/whatsapp-to-launch-cloud-based-tools-premium-features-580262?utm_source=feed&utm_medium=rss&utm_campaign=iTnews+Cloud+feed",
                  "pubDate": "Fri, 20 May 2022 12:00:00 +1000",
                  "createdAt": "2022-06-08T06:10:37.217Z",
                  "title": "WhatsApp to launch cloud-based tools, premium features",
                  "updatedAt": "2022-06-08T06:10:37.217Z"
              },
              {
                  "description": "Podcast: Under technology transformation.",
                  "id": "6b793c6d-4e76-45c4-aed4-26697465f224",
                  "link": "https://www.itnews.com.au/news/eclipx-group-drives-vehicle-leasing-into-the-cloud-580257?utm_source=feed&utm_medium=rss&utm_campaign=iTnews+Cloud+feed",
                  "pubDate": "Mon, 23 May 2022 06:30:00 +1000",
                  "createdAt": "2022-06-08T06:10:37.091Z",
                  "title": "Eclipx Group drives vehicle leasing into the cloud",
                  "updatedAt": "2022-06-08T06:10:37.091Z"
              }
          ]
      }
  }

const PostList = ({ }) => {
  const myAPI = "companyListingAPI";
  const path = "/get-all-rss-feed";


  const [allData, setAllData] = useState([]);
  
  // const all_data = [...data.listNews.items, ...data.listNews.items, ...data.listNews.items,...data.listNews.items,...data.listNews.items,...data.listNews.items,...data.listNews.items,...data.listNews.items,...data.listNews.items,...data.listNews.items,...data.listNews.items,...data.listNews.items,...data.listNews.items]


  let loading = false;

  const n = 4;
  const [allPosts, setAllPosts] = useState([]);
  const [end, setEnd] = useState(4);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { searchInput, setSearchInput } = useContext(SearchContext);

  useEffect(() => {
    handleGetRSSData()
   },[]);
   
   
  function handleGetRSSData() {
      API.get(myAPI, path)
          .then((response) => {
            // console.log(response);
              setAllData(response.Items);
          })
          .catch((error) => {
              console.log(error);
          });
  }

  useEffect(()=>{

    if (allData.length > 0){
      if(searchInput !== ""){
        searchNews()
      }else{
        setAllPosts(allData)
      }
    }

  }, [allData])

  
  useEffect(()=>{
      increaseFilteredEnd()
      setPosts(allPosts.slice(0, end))
  }, [allPosts])
  
  const loadMorePosts = () => {
    setTimeout(() => {
      setPosts(allPosts.slice(0, end))
      increaseFilteredEnd()
    }, (1500));
  }
  
  const increaseFilteredEnd = () => {
    if (allPosts.length != 0 && end+n > allPosts.length){
      setEnd(allPosts.length);
      setHasMore(false)
    }else{
      setEnd(prevEnd=>(prevEnd+=n));
    }
  }

  const LoadMoreButton  = (
    <button className={`ui disabled button ${styles['load-more']}`}>
      Scroll to load..
    </button>
  )

  const searchNews = ()=>{

    let filtered_posts = [];
    if(searchInput !== ""){
      filtered_posts = allData.filter((el)=>{
        console.log(searchInput);
        return el.link.toLowerCase().includes(searchInput.toLowerCase()) ||
                el.name.toLowerCase().includes(searchInput.toLowerCase())
      })
    }else{
      filtered_posts = allData;
      console.log("all");
      console.log(allData);
    }

    setAllPosts(filtered_posts)
  }

  const inputValueOnChange = (event)=>{
    setSearchInput(event.target.value);
  }

  
  if(loading) return (<h1>Loading...</h1>)

  return (
    <div>
       <div className={`ui search ${styles['search-bar']}`}>
        <div className="ui icon input">
          <input value={searchInput} className="prompt" type="text" placeholder="Search..." onChange={inputValueOnChange}/>
          <i className="search link icon" onClick={searchNews}></i>
        </div>
      </div>
       <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMore}
          loader={LoadMoreButton}
          className={styles.scroll}
        >
          <div className={styles.cards}>
          {
            posts.map((data, index)=>{
              return <Card key={index.toString()} data={data}/>
            })
          }
          </div>
        </InfiniteScroll>

        
    </div>
  )
}

export default PostList;