from rest_framework import generics
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer

class PostListCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Post.objects.exclude(mode='지하').filter(
                mode__in=['1층','2층','3층','4층']
            )
        return Post.objects.filter(mode__in=['1층','2층'])

class CommentListCreate(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
