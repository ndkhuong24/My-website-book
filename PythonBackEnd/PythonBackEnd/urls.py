from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from rest_framework import routers

from myapp import views

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/authors', views.ListCreateAuthorView.as_view(), name='list-create-authors'),
    path('api/authors/<int:pk>', views.UpdateDeleteAuthorView.as_view(), name='retrieve-update-delete-author'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
