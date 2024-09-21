from rest_framework import serializers

from .models import Category, Tags, Languages, Artists, Groups, Characters, Parodies, Comic, ComicDetail


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


class ComicSerializer(serializers.ModelSerializer):
    tags = TagsSerializer(many=True, read_only=True)
    artists = ArtistsSerializer(many=True, read_only=True)
    languages = LanguagesSerializer(many=True, read_only=True)
    parodies = ParodiesSerializer(many=True, read_only=True)
    characters = CharactersSerializer(many=True, read_only=True)
    groups = GroupsSerializer(many=True, read_only=True)
    category = CategorySerializer(many=True, read_only=True)

    tags_ids = serializers.PrimaryKeyRelatedField(queryset=Tags.objects.all(), many=True, write_only=True,
                                                  pk_field=serializers.UUIDField())
    artists_ids = serializers.PrimaryKeyRelatedField(queryset=Artists.objects.all(), many=True, write_only=True,
                                                     pk_field=serializers.UUIDField())
    languages_ids = serializers.PrimaryKeyRelatedField(queryset=Languages.objects.all(), many=True, write_only=True,
                                                       pk_field=serializers.UUIDField())
    parodies_ids = serializers.PrimaryKeyRelatedField(queryset=Parodies.objects.all(), many=True, write_only=True,
                                                      pk_field=serializers.UUIDField())
    characters_ids = serializers.PrimaryKeyRelatedField(queryset=Characters.objects.all(), many=True, write_only=True,
                                                        pk_field=serializers.UUIDField())
    groups_ids = serializers.PrimaryKeyRelatedField(queryset=Groups.objects.all(), many=True, write_only=True,
                                                    pk_field=serializers.UUIDField())
    category_ids = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True, write_only=True,
                                                      pk_field=serializers.UUIDField())

    class Meta:
        model = Comic
        fields = [
            'id', 'name', 'profile_picture', 'created_at', 'updated_at', 'status',
            'tags', 'artists', 'languages', 'parodies', 'characters', 'groups', 'category',
            'tags_ids', 'artists_ids', 'languages_ids', 'parodies_ids', 'characters_ids', 'groups_ids', 'category_ids'
        ]

    def create(self, validated_data):
        tags_data = validated_data.pop('tags_ids')
        artists_data = validated_data.pop('artists_ids')
        languages_data = validated_data.pop('languages_ids')
        parodies_data = validated_data.pop('parodies_ids')
        characters_data = validated_data.pop('characters_ids')
        groups_data = validated_data.pop('groups_ids')
        category_data = validated_data.pop('category_ids')

        comic = Comic.objects.create(**validated_data)

        # Gán các quan hệ ManyToMany sau khi tạo Comic
        comic.tags.set(tags_data)
        comic.artists.set(artists_data)
        comic.languages.set(languages_data)
        comic.parodies.set(parodies_data)
        comic.characters.set(characters_data)
        comic.groups.set(groups_data)
        comic.category.set(category_data)

        return comic

    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags_ids')
        artists_data = validated_data.pop('artists_ids')
        languages_data = validated_data.pop('languages_ids')
        parodies_data = validated_data.pop('parodies_ids')
        characters_data = validated_data.pop('characters_ids')
        groups_data = validated_data.pop('groups_ids')
        category_data = validated_data.pop('category_ids')

        instance.name = validated_data.get('name', instance.name)
        instance.status = validated_data.get('status', instance.status)
        instance.save()

        # Cập nhật các quan hệ ManyToMany
        instance.tags.set(tags_data)
        instance.artists.set(artists_data)
        instance.languages.set(languages_data)
        instance.parodies.set(parodies_data)
        instance.characters.set(characters_data)
        instance.groups.set(groups_data)
        instance.category.set(category_data)

        return instance


class ComicDetailSerializer(serializers.ModelSerializer):
    comic = ComicSerializer(read_only=True)
    comic_id = serializers.PrimaryKeyRelatedField(queryset=Comic.objects.all(), write_only=True)

    class Meta:
        model = ComicDetail
        fields = [
            'id', 'image_detail', 'page_number', 'comic', 'comic_id'
        ]

    def create(self, validated_data):
        comic_id = validated_data.pop('comic_id')
        comic_detail = ComicDetail.objects.create(comic_id=comic_id.id, **validated_data)
        return comic_detail

    def update(self, instance, validated_data):
        comic_id = validated_data.pop('comic_id', None)
        if comic_id:
            instance.comic_id = comic_id.id
        instance.image_detail = validated_data.get('image_detail', instance.image_detail)
        instance.page_number = validated_data.get('page_number', instance.page_number)
        instance.save()
        return instance
