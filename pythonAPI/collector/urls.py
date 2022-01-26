from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('add-comment/', views.add_comment , name="add-comment-summary"),
    path('add-article/', views.add_article, name="add-article"),
    path('add-summary/', views.add_summary, name="add-summary"),
    path('update-vote/', views.update_vote, name="update-vote"),
]
