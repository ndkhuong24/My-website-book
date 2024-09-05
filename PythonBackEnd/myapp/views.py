from rest_framework import status as http_status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from myapp.models import Category
from myapp.serializers import CategorySerializer


class ServiceResult:
    @staticmethod
    def get_result(success, data=None, message="", status=http_status.HTTP_200_OK):
        return Response({
            "status": status,
            "message": message,
            "data": data,
            "success": success
        }, status=status)


class BaseListCreateView(ListCreateAPIView):
    model = None
    serializer_class = None

    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        if self.model.objects.filter(name=name).exists():
            return ServiceResult.get_result(
                success=False,
                message=f'{self.model.__name__} with this name already exists.',
                status=http_status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return ServiceResult.get_result(
            success=True,
            data=serializer.data,
            message=f'Create a new {self.model.__name__} successful!',
            status=http_status.HTTP_201_CREATED
        )


class BaseUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    model = None
    serializer_class = None

    def put(self, request, *args, **kwargs):
        obj = self.get_object()
        name = request.data.get('name')
        if self.model.objects.filter(name=name).exclude(id=obj.id).exists():
            return ServiceResult.get_result(
                success=False,
                message=f'{self.model.__name__} with this name already exists.',
                status=http_status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(obj, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return ServiceResult.get_result(
            success=True,
            data=serializer.data,
            message=f'Update {self.model.__name__} successful!',
            status=http_status.HTTP_200_OK
        )

    def delete(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.delete()
        return ServiceResult.get_result(
            success=True,
            message=f'Delete {self.model.__name__} successful!',
            status=http_status.HTTP_200_OK
        )


class ListCreateCategoryView(BaseListCreateView):
    model = Category
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()


class UpdateDeleteCategoryView(BaseUpdateDeleteView):
    model = Category
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.all()
