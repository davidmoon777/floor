from django.urls import path
from .views import PostListCreate, CommentListCreate

urlpatterns = [
    path('', PostListCreate.as_view()),
    path('comments/', CommentListCreate.as_view()),
]
