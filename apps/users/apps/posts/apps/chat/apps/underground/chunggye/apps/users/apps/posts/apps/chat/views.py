from rest_framework import generics
from .models import ChatRoom, Message
from .serializers import ChatRoomSerializer, MessageSerializer

class ChatRoomListCreate(generics.ListCreateAPIView):
    serializer_class = ChatRoomSerializer
    queryset = ChatRoom.objects.all()

class MessageListCreate(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

    def get_queryset(self):
        room_id = self.kwargs.get('room_id')
        return Message.objects.filter(room_id=room_id)
