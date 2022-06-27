# DynamoDb architecture 

## (rss-feed table)

1. name (partition key)(string)
2. date (sort key) (string)
3. articleFllText (string)
4. desc (string) - has (link of news feed)
4. link (string) - has (desc of news feed)
5. scarapingStatus(string) - progress | completed

### GSI 
1. 	name-articleFullText-index 


# api
...

# lambda function
...