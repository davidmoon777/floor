from rest_framework import serializers
from .models import UndergroundAccess

class UndergroundAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = UndergroundAccess
        fields = '__all__'
