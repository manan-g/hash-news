import json
from typing import final
import tweepy
from django.conf import settings
import requests

Client = tweepy.AppAuthHandler(settings.TWITTER_CONSUMER_KEY, settings.TWITTER_CONSUMER_SECRET)

api = tweepy.Client(bearer_token = settings.TWITTER_BEARER_TOKEN,consumer_key= settings.TWITTER_CONSUMER_KEY,consumer_secret = settings.TWITTER_CONSUMER_SECRET)


def ocr_space_url(url, overlay=False, api_key='2e6d09010388957', language='eng'):

    payload = {'url': url,
               'isOverlayRequired': overlay,
               'apikey': api_key,
               'language': language,
               }
    r = requests.post('https://api.ocr.space/parse/image',
                      data=payload,
                      )
    myobj = r.content.decode()
    myobj = json.loads(myobj)
    return myobj['ParsedResults'][0]['ParsedText']

def tweet_lookup(id):
    t = api.get_tweet(id, expansions='attachments.media_keys', media_fields = ['url'])
    
    # t = api.get_tweet(id, include_entities = True)
    image_url = t.includes['media'][0]['url']
    image_text = ocr_space_url(image_url)

    caption = t.data.text
    final_query = image_text+" "+caption
    final_query = (final_query[:75]) if len(final_query) > 75 else final_query
    return final_query

