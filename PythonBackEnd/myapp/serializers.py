from rest_framework import serializers

from .models import Category, Tags, Languages, Artists, Groups, Characters, Parodies, Comic


class BaseModelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'  # Đặt fields ở đây, các serializer khác sẽ tự động kế thừa
        # Nếu có nhu cầu khác như read-only fields, bạn có thể thêm vào đây sau này


# Serializer cho từng model kế thừa từ BaseModelSerializer
class CategorySerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Category


class TagsSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Tags


class LanguagesSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Languages


class ArtistsSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Artists


class CharactersSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Characters


class GroupsSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Groups


class ParodiesSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Parodies


class ComicSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Comic
