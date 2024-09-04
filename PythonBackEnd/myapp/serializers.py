from rest_framework import serializers

from .models import Author, Category, Tags, Languages, Artists, Groups, Characters, Parodies


class BaseModelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'


class AuthorSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Author


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
