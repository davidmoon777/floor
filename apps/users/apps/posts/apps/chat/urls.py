from django.urls import path
from .views import ChatRoomListCreate, MessageListCreate

urlpatterns = [
    path('', ChatRoomListCreate.as_view()),
    path('<int:room_id>/messages/', MessageListCreate.as_view()),
]
