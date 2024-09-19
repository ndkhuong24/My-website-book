from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from rest_framework import routers

from myapp import views

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/authors', views.ListCreateAuthorView.as_view(), name='list-create-authors'),
    # path('api/authors/<int:pk>', views.UpdateDeleteAuthorView.as_view(), name='retrieve-update-delete-author'),
    path('api/category', views.ListCreateCategoryView.as_view(), name='list-create-category'),
    path('api/category/<uuid:pk>', views.UpdateDeleteCategoryView.as_view(), name='retrieve-update-delete-category'),
    path('api/tags', views.ListCreateTagsView.as_view(), name='list-create-tags'),
    path('api/tags/<uuid:pk>', views.UpdateDeleteTagsView.as_view(), name='retrieve-update-delete-tags'),
    path('api/languages', views.ListCreateLanguagesView.as_view(), name='list-create-languages'),
    path('api/languages/<uuid:pk>', views.UpdateDeleteLanguagesView.as_view(), name='retrieve-update-delete-languages'),
    path('api/artists', views.ListCreateArtistsView.as_view(), name='list-create-artists'),
    path('api/artists/<uuid:pk>', views.UpdateDeleteArtistsView.as_view(), name='retrieve-update-delete-artists'),
    path('api/parodies', views.ListCreateParodiesView.as_view(), name='list-create-parodies'),
    path('api/parodies/<uuid:pk>', views.UpdateDeleteParodiesView.as_view(), name='retrieve-update-delete-parodies'),
    path('api/characters', views.ListCreateCharactersView.as_view(), name='list-create-characters'),
    path('api/characters/<uuid:pk>', views.UpdateDeleteCharactersView.as_view(),
         name='retrieve-update-delete-characters'),
    path('api/groups', views.ListCreateGroupsView.as_view(), name='list-create-groups'),
    path('api/groups/<uuid:pk>', views.UpdateDeleteGroupsView.as_view(), name='retrieve-update-delete-groups'),
    path('api/comic', views.ListCreateComicView.as_view(), name='list-create-comic'),
    path('api/comic/<int:pk>', views.UpdateDeleteComicView.as_view(), name='retrieve-update-delete-comic'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
