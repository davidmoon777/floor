from django.urls import path
from .views import AccessUnderground

urlpatterns = [
    path('access/', AccessUnderground.as_view()),
]
