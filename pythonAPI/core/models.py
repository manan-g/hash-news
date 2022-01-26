from django.db import models
from django.db.models.fields import IntegerField
from django.utils import timezone
import json
from django.urls import reverse
# Create your models here.
class Vote(models.Model):
    id = models.IntegerField(primary_key=True)
    vote_count = models.IntegerField(default=0)
    def __str__(self) -> str:
        return str(self.id)

class Comment(models.Model):
    id = models.IntegerField(primary_key=True)
    author = models.CharField(max_length=500)
    text = models.CharField(max_length=5000)
    vote_id = models.IntegerField(null=True)

    def __str__(self) -> str:
        return self.text

class Summary(models.Model):
    id = models.IntegerField(primary_key=True)
    text = models.CharField(max_length=5000)
    author = models.CharField(max_length=500)
    posted_date = models.DateField(default=timezone.now)
    
    vote_id = models.IntegerField(null=True)
    comment_list = models.TextField(default = "[]", null=True)

    def get_comments(self):
        return json.loads(self.comment_list)

    def update_comments(self, comment_id):
        ss = json.loads(self.comment_list)
        ss.append(comment_id)
        self.comment_list = json.dumps(ss)

    def __str__(self) -> str:
        return self.text

class Article(models.Model):
    id  = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=500)
    text = models.CharField(max_length=5000)
    author = models.CharField(max_length=500)
    posted_date = models.DateField(default=timezone.now)
    vote_id = models.IntegerField(null=True)

    summary_list = models.TextField(default = "[]", blank = True, null=True)
    comment_list = models.TextField(default = "[]", blank = True, null=True)


    def get_comments(self):
        return json.loads(self.comment_list)

    def update_comments(self, comment_id):
        ss = json.loads(self.comment_list)
        ss.append(comment_id)
        self.comment_list = json.dumps(ss)

    def get_summaries(self):
        return json.loads(self.summary_list)

    def update_summaries(self, summary_id):
        ss = json.loads(self.summary_list)
        ss.append(summary_id)
        self.summary_list = json.dumps(ss)
    
    def get_absolute_url(self):
        return reverse('article', args=[self.id])
    
    def __str__(self):
        return self.title