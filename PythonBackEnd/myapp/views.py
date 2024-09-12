from rest_framework import status as http_status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from myapp.models import Category, Tags, Languages, Artists, Parodies, Characters, Groups, Comic
from myapp.serializers import CategorySerializer, TagsSerializer, LanguagesSerializer, ArtistsSerializer, \
    ParodiesSerializer, CharactersSerializer, GroupsSerializer, ComicSerializer


class ServiceResult:
    @staticmethod
    def get_result(success, data=None, message="", status_code=http_status.HTTP_200_OK):
        return Response({
            "status": status_code,
            "message": message,
            "data": data,
            "success": success
        }, status=status_code)


class BaseListCreateView(ListCreateAPIView):
    model = None
    serializer_class = None

    def get_queryset(self):
        return self.model.objects.all().order_by('name')

    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        if self.model.objects.filter(name=name).exists():
            return ServiceResult.get_result(
                success=False,
                message=f'{self.model.__name__} with this name already exists.',
                status_code=http_status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return ServiceResult.get_result(
            success=True,
            data=serializer.data,
            message=f'Create a new {self.model.__name__} successful!',
            status_code=http_status.HTTP_201_CREATED
        )


class BaseUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    model = None
    serializer_class = None

    def get_queryset(self):
        return self.model.objects.all()

    def put(self, request, *args, **kwargs):
        obj = self.get_object()
        name = request.data.get('name')
        if self.model.objects.filter(name=name).exclude(id=obj.id).exists():
            return ServiceResult.get_result(
                success=False,
                message=f'{self.model.__name__} with this name already exists.',
                status_code=http_status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(obj, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return ServiceResult.get_result(
            success=True,
            data=serializer.data,
            message=f'Update {self.model.__name__} successful!',
            status_code=http_status.HTTP_200_OK
        )

    def delete(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.delete()
        return ServiceResult.get_result(
            success=True,
            message=f'Delete {self.model.__name__} successful!',
            status_code=http_status.HTTP_200_OK
        )


class ListCreateCategoryView(BaseListCreateView):
    model = Category
    serializer_class = CategorySerializer


class UpdateDeleteCategoryView(BaseUpdateDeleteView):
    model = Category
    serializer_class = CategorySerializer


class ListCreateTagsView(BaseListCreateView):
    model = Tags
    serializer_class = TagsSerializer


class UpdateDeleteTagsView(BaseUpdateDeleteView):
    model = Tags
    serializer_class = TagsSerializer


class ListCreateLanguagesView(BaseListCreateView):
    model = Languages
    serializer_class = LanguagesSerializer


class UpdateDeleteLanguagesView(BaseUpdateDeleteView):
    model = Languages
    serializer_class = LanguagesSerializer


class ListCreateArtistsView(BaseListCreateView):
    model = Artists
    serializer_class = ArtistsSerializer


class UpdateDeleteArtistsView(BaseUpdateDeleteView):
    model = Artists
    serializer_class = ArtistsSerializer


class ListCreateParodiesView(BaseListCreateView):
    model = Parodies
    serializer_class = ParodiesSerializer


class UpdateDeleteParodiesView(BaseUpdateDeleteView):
    model = Parodies
    serializer_class = ParodiesSerializer


class ListCreateCharactersView(BaseListCreateView):
    model = Characters
    serializer_class = CharactersSerializer


class UpdateDeleteCharactersView(BaseUpdateDeleteView):
    model = Characters
    serializer_class = CharactersSerializer


class ListCreateGroupsView(BaseListCreateView):
    model = Groups
    serializer_class = GroupsSerializer


class UpdateDeleteGroupsView(BaseUpdateDeleteView):
    model = Groups
    serializer_class = GroupsSerializer


class ListCreateComicView(BaseListCreateView):
    model = Comic
    serializer_class = ComicSerializer


class UpdateDeleteComicView(BaseUpdateDeleteView):
    model = Comic
    serializer_class = ComicSerializer
