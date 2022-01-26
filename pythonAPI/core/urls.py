from django.urls import path
from . import views
urlpatterns = [
    path('', views.home, name="home"),
    path('tweet/<str:tweet>/', views.tweet_parser, name="tweet_parser"),
    path('text/<path:text>/', views.text_parser, name="text_parser"),
    path('article/<int:_id>', views.article_detail, name='article'),
    path('query/', views.parse_query, name='query'),
]
