import React, {useState, useEffect, useContext} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Card from '../Card';
import styles from './PostList.module.css';
import Amplify, { API } from "aws-amplify";
import awsExports from "../../aws-exports";
import { SearchContext } from "../../hooks/Context";

Amplify.configure(awsExports);

const PostList = ({ }) => {
  const myAPI = "rssfeed";
  const path = "/getrssfeed";


  const [allData, setAllData] = useState([]);
  

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


  function onEnterPress(e) {
    if(e.code == 'Enter'){
      console.log("Pressing Enter key...");
      setSearchInput(e.target.value)
      searchNews()
    }
  }
   
  function handleGetRSSData() {
      API.get(myAPI, path)
          .then((response) => {
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
    }, (500));
  }
  
  const increaseFilteredEnd = () => {
    if (allPosts.length !== 0 && end+n > allPosts.length){
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
                el.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                el.articleFullText.toLowerCase().includes(searchInput.toLowerCase())
      })
    }else{
      filtered_posts = allData.map(el => el);
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

          <input value={searchInput}
           className={`prompt`} type="text"
           placeholder="Search..." 
           onChange={inputValueOnChange}
           onKeyDown={onEnterPress}
           id="search-bar"
           />
          <i className="search link icon"  onClick={searchNews}></i>
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
              return <Card key={index.toString()} data={data} setAllPosts={setAllPosts}/>
            })
          }
          </div>
        </InfiniteScroll>

        
    </div>
  )
}

export default PostList;