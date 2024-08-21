from django.http import JsonResponse
from django.utils import timezone
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404

from myapp.models import Author
from myapp.serializers import AuthorSerializer


class ListCreateAuthorView(ListCreateAPIView):
    model = Author
    serializer_class = AuthorSerializer

    def get_queryset(self):
        return Author.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = AuthorSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse({
                'message': 'Create a new Author successful!'
            }, status=status.HTTP_201_CREATED)

        return JsonResponse({
            'message': 'Create a new Author unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)


class UpdateDeleteAuthorView(RetrieveUpdateDestroyAPIView):
    model = Author
    serializer_class = AuthorSerializer

    def put(self, request, *args, **kwargs):
        author = get_object_or_404(Author, id=kwargs.get('pk'))
        author.updated_at = timezone.now()  # Cập nhật thời gian hiện tại
        serializer = AuthorSerializer(author, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse({
                'message': 'Update Author successful!'
            }, status=status.HTTP_200_OK)

        return JsonResponse({
            'message': 'Update Author unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        author = get_object_or_404(Author, id=kwargs.get('pk'))
        author.delete()

        return JsonResponse({
            'message': 'Delete Author successful!'
        }, status=status.HTTP_200_OK)
