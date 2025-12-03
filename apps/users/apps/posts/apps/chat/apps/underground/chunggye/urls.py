from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('apps.users.urls')),
    path('posts/', include('apps.posts.urls')),
    path('chat/', include('apps.chat.urls')),
    path('underground/', include('apps.underground.urls')),
]
