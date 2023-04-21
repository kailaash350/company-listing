from bs4 import BeautifulSoup
import requests
import boto3
import logging
count = 0
logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynClient = boto3.client('dynamodb', region_name='ap-southeast-2')

def lambda_handler(event=None, context=None):
  # rssList = []
  # url = 'https://www.itnews.com.au/RSS/rss.ashx?type=Category&ID=977'
  # url is dynamic from the below table
  response = dynClient.scan(
    TableName='scraping-link',
    AttributesToGet=[
      'link',
      'category'
    ]
  )
  for item in response['Items']:
    link = item['link']['S']
    category = item['category']['S']
    logger.info("Scrapping rss link: {}, category: {}".format(link, category))
    scrap_rss_feed(link, category)
  
    
def scrap_rss_feed(link, category):
  page = requests.get(link)
  soup = BeautifulSoup(page.content, features="xml")
  items = soup.find_all('item')
 
  for i in items:
      title = i.title.text
      desc = i.description.text
      link = i.link.text
      pubDate = i.pubDate.text
      
      response = requests.get(link)
      htmlSoup = BeautifulSoup(response.content, features="html.parser")
      contents = htmlSoup.find_all("p")
      articleFullText = ""
      for content in contents:
        articleFullText = articleFullText + content.text + "\n"

      item = {
        'name':{'S':str(title)},
        'link':{'S':str(desc)},
        'desc':{'S':str(link)},
        'date':{'S':str(pubDate)},
        'articleFullText':{'S':str(articleFullText)},
        'status':{'S':str("Completed")},
        'category':{'S':str(category)}   
      }

      logger.info("Inserting rss feed into DB: {}".format(item))
      logger.info("Item Inserted : {}".format(count+1))
      print(count+1)
      response = dynClient.put_item(
            TableName='rss-feed',
            Item = item
          )
