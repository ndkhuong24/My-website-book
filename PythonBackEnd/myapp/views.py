from django.utils import timezone
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from myapp.models import Author, Category, Tags, Languages, Artists
from myapp.serializers import AuthorSerializer, CategorySerializer, TagsSerializer, LanguagesSerializer, \
    ArtistsSerializer


class ListCreateAuthorView(ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        if Author.objects.filter(name=name).exists():
            raise ValidationError({'error': 'Author with this name already exists.'})

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Create a new Author successful!'}, status=status.HTTP_201_CREATED)


class UpdateDeleteAuthorView(RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    def put(self, request, *args, **kwargs):
        author = self.get_object()

        name = request.data.get('name')
        if Category.objects.filter(name=name).exclude(id=author.id).exists():
            raise ValidationError({'error': 'Author with this name already exists.'})

        author.updated_at = timezone.now()
        serializer = self.get_serializer(author, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Update Author successful!'}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        author = self.get_object()
        author.delete()
        return Response({'message': 'Delete Author successful!'}, status=status.HTTP_200_OK)


class ListCreateCategoryView(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        if Category.objects.filter(name=name).exists():
            raise ValidationError({'error': 'Category with this name already exists.'})

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Create a new Category successful!'}, status=status.HTTP_201_CREATED)


class UpdateDeleteCategoryView(RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def put(self, request, *args, **kwargs):
        category = self.get_object()
        name = request.data.get('name')
        if Category.objects.filter(name=name).exclude(id=category.id).exists():
            raise ValidationError({'error': 'Category with this name already exists.'})

        category.updated_at = timezone.now()
        serializer = self.get_serializer(category, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Update Category successful!'}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        try:
            category = self.get_object()
        except Category.DoesNotExist:
            raise NotFound({'error': 'Category not found.'})

        category.delete()
        return Response({'message': 'Delete Category successful!'}, status=status.HTTP_200_OK)


class ListCreateTagsView(ListCreateAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer

    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        if Tags.objects.filter(name=name).exists():
            raise ValidationError({'error': 'Tags with this name already exists.'})

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Create a new Tags successful!'}, status=status.HTTP_201_CREATED)


class UpdateDeleteTagsView(RetrieveUpdateDestroyAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer

    def put(self, request, *args, **kwargs):
        tags = self.get_object()
        name = request.data.get('name')
        if Tags.objects.filter(name=name).exclude(id=tags.id).exists():
            raise ValidationError({'error': 'Tags with this name already exists.'})

        tags.updated_at = timezone.now()
        serializer = self.get_serializer(tags, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Update Tags successful!'}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        try:
            tags = self.get_object()
        except Tags.DoesNotExist:
            raise NotFound({'error': 'Tags not found.'})

        tags.delete()
        return Response({'message': 'Delete Tags successful!'}, status=status.HTTP_200_OK)


class ListCreateLanguagesView(ListCreateAPIView):
    queryset = Languages.objects.all()
    serializer_class = LanguagesSerializer

    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        if Languages.objects.filter(name=name).exists():
            raise ValidationError({'error': 'Languages with this name already exists.'})

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Create a new Languages successful!'}, status=status.HTTP_201_CREATED)


class UpdateDeleteLanguagesView(RetrieveUpdateDestroyAPIView):
    queryset = Languages.objects.all()
    serializer_class = LanguagesSerializer

    def put(self, request, *args, **kwargs):
        languages = self.get_object()
        name = request.data.get('name')
        if Languages.objects.filter(name=name).exclude(id=languages.id).exists():
            raise ValidationError({'error': 'Languages with this name already exists.'})

        languages.updated_at = timezone.now()
        serializer = self.get_serializer(languages, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Update Languages successful!'}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        try:
            languages = self.get_object()
        except Languages.DoesNotExist:
            raise NotFound({'error': 'Languages not found.'})

        languages.delete()
        return Response({'message': 'Delete Languages successful!'}, status=status.HTTP_200_OK)


class ListCreateArtistsView(ListCreateAPIView):
    queryset = Artists.objects.all()
    serializer_class = ArtistsSerializer

    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        if Artists.objects.filter(name=name).exists():
            raise ValidationError({'error': 'Artists with this name already exists.'})

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Create a new Artists successful!'}, status=status.HTTP_201_CREATED)


class UpdateDeleteArtistsView(RetrieveUpdateDestroyAPIView):
    queryset = Artists.objects.all()
    serializer_class = ArtistsSerializer

    def put(self, request, *args, **kwargs):
        artists = self.get_object()
        name = request.data.get('name')
        if Artists.objects.filter(name=name).exclude(id=artists.id).exists():
            raise ValidationError({'error': 'Artists with this name already exists.'})

        artists.updated_at = timezone.now()
        serializer = self.get_serializer(artists, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Update Artists successful!'}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        try:
            artists = self.get_object()
        except Artists.DoesNotExist:
            raise NotFound({'error': 'Artists not found.'})

        artists.delete()
        return Response({'message': 'Delete Artists successful!'}, status=status.HTTP_200_OK)
