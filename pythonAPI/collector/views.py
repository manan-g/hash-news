from django.http.response import HttpResponse
from core.models import Article, Comment, Summary, Vote
from django.views.decorators.csrf import csrf_exempt
import json
# Create your views here.

def home(request):
    return HttpResponse("Hello")

@csrf_exempt
def add_article(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        new_article = Article(
            id = data['articleId'],
            author = data['author'],
            title = data['title'],
            text = data['text'],
        )
        vote_obj = Vote(id = data['voteId'])
        vote_obj.save()
        new_article.vote_id = vote_obj.id
        new_article.save()
        return HttpResponse("501")
    else:
        return HttpResponse("ERR")

@csrf_exempt
def add_summary(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        article = Article.objects.get(id = data['articleId'])
        if article:
            new_summary = Summary(
                id = data['summaryId'],    
                author = data['author'],
                text = data['text'],
            )
            vote_obj = Vote(id = data['voteId'])
            vote_obj.save()
            new_summary.vote_id = vote_obj.id
            new_summary.save()
            article.update_summaries(data['summaryId'])
            article.save()
            return HttpResponse("501")
        else:
            return HttpResponse('wrong article')
    else:
        return HttpResponse("BAD REQUEST")

@csrf_exempt
def add_comment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        item = None
        if data['action']==0:
            item = Article.objects.get(id = data['id'])
        else:
            item = Summary.objects.get(id=data['id'])
        if item!=None:
            new_comment = Comment(
                id = data['commentId'],    
                author = data['author'],
                text = data['text'],
            )
            vote_obj = Vote(id = data['voteId'])
            vote_obj.save()
            new_comment.vote_id = vote_obj.id
            new_comment.save()
            item.update_comments(data['commentId'])
            item.save()
            return HttpResponse("501")
        else:
            return HttpResponse('wrong summary id')
    else:
        return HttpResponse("BAD REQUEST")

@csrf_exempt
def update_vote(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        vote = Vote.objects.get(id=data['voteId'])
        vote.vote_count = int(data['voteCount'])
        vote.save()
        return HttpResponse("success")
    else:
        return HttpResponse("ERR")
