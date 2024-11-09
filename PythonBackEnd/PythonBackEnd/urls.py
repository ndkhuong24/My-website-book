from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from rest_framework import routers

from myapp import views

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/category', views.ListCreateCategoryView.as_view(), name='list-create-category'),
    path('api/category/<uuid:pk>', views.UpdateDeleteCategoryView.as_view(), name='retrieve-update-delete-category'),

    path('api/tags', views.ListCreateTagsView.as_view(), name='list-create-tags'),
    path('api/tags/<uuid:pk>', views.UpdateDeleteTagsView.as_view(), name='retrieve-update-delete-tags'),
    path('api/tags/name/<str:name>/', views.TagByTagName.as_view(), name='tag-by-tag-name'),

    path('api/languages', views.ListCreateLanguagesView.as_view(), name='list-create-languages'),
    path('api/languages/<uuid:pk>', views.UpdateDeleteLanguagesView.as_view(), name='retrieve-update-delete-languages'),

    path('api/artists', views.ListCreateArtistsView.as_view(), name='list-create-artists'),
    path('api/artists/<uuid:pk>', views.UpdateDeleteArtistsView.as_view(), name='retrieve-update-delete-artists'),
    path('api/artists/name/<str:name>/', views.ArtistByArtistName.as_view(), name='artist-by-artist-name'),

    path('api/parodies', views.ListCreateParodiesView.as_view(), name='list-create-parodies'),
    path('api/parodies/<uuid:pk>', views.UpdateDeleteParodiesView.as_view(), name='retrieve-update-delete-parodies'),
    path('api/parodies/name/<str:name>/', views.ParodyByParodyName.as_view(), name='parody-by-parody-name'),

    path('api/characters', views.ListCreateCharactersView.as_view(), name='list-create-characters'),
    path('api/characters/<uuid:pk>', views.UpdateDeleteCharactersView.as_view(),
         name='retrieve-update-delete-characters'),
    path('api/characters/name/<str:name>/', views.CharacterByCharacterName.as_view(),
         name='character-by-character-name'),

    path('api/groups', views.ListCreateGroupsView.as_view(), name='list-create-groups'),
    path('api/groups/<uuid:pk>', views.UpdateDeleteGroupsView.as_view(), name='retrieve-update-delete-groups'),
    path('api/groups/name/<str:name>/', views.GroupByGroupName.as_view(), name='group-by-group-name'),

    path('api/comic', views.ListCreateComicView.as_view(), name='list-create-comic'),
    path('api/comic/<int:pk>', views.UpdateDeleteComicView.as_view(), name='retrieve-update-delete-comic'),

    path('api/comic_detail', views.ListCreateComicDetailView.as_view(), name='list-create-comic-detail'),
    path('api/comic_detail/<int:pk>', views.UpdateDeleteComicDetailView.as_view(),
         name='retrieve-update-delete-comic-detail'),
    path('api/comic/<int:comic_id>/details/', views.ComicDetailByComicIdView.as_view(),
         name='comic-detail-by-comic-id'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
