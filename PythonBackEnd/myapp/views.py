from django.utils import timezone
from rest_framework import status
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from myapp.models import Author, Category
from myapp.serializers import AuthorSerializer, CategorySerializer


#
# class ListCreateAuthorView(ListCreateAPIView):
#     model = Author
#     serializer_class = AuthorSerializer
#
#     def get_queryset(self):
#         return Author.objects.all()
#
#     def create(self, request, *args, **kwargs):
#         serializer = AuthorSerializer(data=request.data)
#
#         if serializer.is_valid():
#             serializer.save()
#
#             return JsonResponse({
#                 'message': 'Create a new Author successful!'
#             }, status=status.HTTP_201_CREATED)
#
#         return JsonResponse({
#             'message': 'Create a new Author unsuccessful!'
#         }, status=status.HTTP_400_BAD_REQUEST)
#
#
# class UpdateDeleteAuthorView(RetrieveUpdateDestroyAPIView):
#     queryset = Author.objects.all()
#     serializer_class = AuthorSerializer
#
#     def get(self, request, *args, **kwargs):
#         try:
#             author = self.get_object()
#             serializer = self.get_serializer(author)
#             return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
#         except NotFound:
#             return JsonResponse({'message': 'Author not found!'}, status=status.HTTP_404_NOT_FOUND)
#
#     def put(self, request, *args, **kwargs):
#         author = self.get_object()
#         author.updated_at = timezone.now()  # Cập nhật thời gian hiện tại
#         serializer = self.get_serializer(author, data=request.data)
#
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse({'message': 'Update Author successful!'}, status=status.HTTP_200_OK)
#
#         return JsonResponse({'message': 'Update Author unsuccessful!'}, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, *args, **kwargs):
#         author = self.get_object()
#         author.delete()
#         return JsonResponse({'message': 'Delete Author successful!'}, status=status.HTTP_200_OK)
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

        author.updated_at = timezone.now()  # Cập nhật thời gian hiện tại
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

        category.updated_at = timezone.now()  # Cập nhật thời gian hiện tại
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
