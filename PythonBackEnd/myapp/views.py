from django.http import JsonResponse
from django.utils import timezone
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

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
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    def get(self, request, *args, **kwargs):
        try:
            author = self.get_object()
            serializer = self.get_serializer(author)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        except NotFound:
            return JsonResponse({'message': 'Author not found!'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        author = self.get_object()
        author.updated_at = timezone.now()  # Cập nhật thời gian hiện tại
        serializer = self.get_serializer(author, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Update Author successful!'}, status=status.HTTP_200_OK)

        return JsonResponse({'message': 'Update Author unsuccessful!'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        author = self.get_object()
        author.delete()
        return JsonResponse({'message': 'Delete Author successful!'}, status=status.HTTP_200_OK)
