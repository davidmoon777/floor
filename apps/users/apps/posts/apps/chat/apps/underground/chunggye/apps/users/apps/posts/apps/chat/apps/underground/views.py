from rest_framework import generics
from .models import UndergroundAccess
from .serializers import UndergroundAccessSerializer
from rest_framework.response import Response
from rest_framework import status

class AccessUnderground(generics.GenericAPIView):
    serializer_class = UndergroundAccessSerializer

    def post(self, request, *args, **kwargs):
        code = request.data.get('access_code')
        user_level = request.data.get('user_level', 1)
        try:
            access = UndergroundAccess.objects.get(access_code=code, is_active=True)
            if user_level >= access.required_level:
                return Response({"message": "Access granted"})
            else:
                return Response({"message": "Level too low"}, status=status.HTTP_403_FORBIDDEN)
        except UndergroundAccess.DoesNotExist:
            return Response({"message": "Invalid access code"}, status=status.HTTP_404_NOT_FOUND)
