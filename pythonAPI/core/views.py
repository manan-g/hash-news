from django.shortcuts import render, HttpResponse
from .models import Article, Comment, Summary, Vote
from .twitterapi import tweet_lookup
from algoliasearch_django import raw_search
import json
# Create your views here.


def home(request):
    return HttpResponse("Welcome to NEWZLY!")


def tweet_parser(request, tweet):
    parsed_text = tweet_lookup(tweet).strip()

    return text_parser(request, parsed_text)

def text_parser(request, text):
    params = { "hitsPerPage": 5, "optionalWords":text }
    response = raw_search(Article, text, params)['hits']
    trending_articles = Article.objects.all().order_by('-posted_date')[:4]
    return render(request, 'articles-list.html', context={'articles':response, 'text':text, 'trending_articles':trending_articles})

def parse_query(request):
    if request.method=='POST':
        return text_parser(request, request.POST['searchQuery'])

def article_detail(request, _id):
    article = Article.objects.get(id = _id)
    article_votes = Vote.objects.get(id=article.vote_id).vote_count
    comments = []
    summaries = []

    for comment in article.get_comments():
        k = Comment.objects.get(id=comment)
        v = Vote.objects.get(id=k.vote_id).vote_count
        comments.append((k, v))

    for summary in article.get_summaries():
        s = Summary.objects.get(id=summary)
        v = Vote.objects.get(id=s.vote_id).vote_count
        cms = []
        for cmt in s.get_comments():
            kc = Comment.objects.get(id=cmt)
            vc = Vote.objects.get(id=kc.vote_id).vote_count
            cms.append((kc, vc))
        cms= sorted(cms, key = lambda x: x[1], reverse=True)
        summaries.append((s, v, cms))

    summaries= sorted(summaries, key = lambda x: x[1], reverse=True)
    comments= sorted(comments, key = lambda x: x[1], reverse=True)


    # trending articles
    trending_articles = Article.objects.all().order_by('-posted_date')[:4]
    return render(request, 'article-detail.html', context={'article':article,'article_votes':article_votes , 'summaries':summaries, 'comments':comments, 'trending_articles':trending_articles})
