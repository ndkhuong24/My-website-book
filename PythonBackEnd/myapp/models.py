import uuid

from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.utils.timezone import localtime


class CommonInfo(models.Model):
    STATUS_CHOICES = (
        (0, 'Inactive'),
        (1, 'Active'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.IntegerField(choices=STATUS_CHOICES, default=1)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name

    @property
    def local_created_at(self):
        """Trả về thời gian tạo theo múi giờ địa phương"""
        return localtime(self.created_at)

    @property
    def local_updated_at(self):
        """Trả về thời gian cập nhật theo múi giờ địa phương"""
        return localtime(self.updated_at)


class Category(CommonInfo):
    pass


class Tags(CommonInfo):
    pass


class Languages(CommonInfo):
    pass


class Artists(CommonInfo):
    pass


class Parodies(CommonInfo):
    pass


class Characters(CommonInfo):
    pass


class Groups(CommonInfo):
    pass


class Comic(models.Model):
    STATUS_CHOICES = (
        (0, 'Inactive'),
        (1, 'Active'),
    )

    name = models.CharField(max_length=250)
    profile_picture = models.ImageField(upload_to='profile_picture/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Tự động thiết lập thời gian khi tạo
    updated_at = models.DateTimeField(auto_now=True)  # Tự động cập nhật thời gian khi lưu
    tags = models.ManyToManyField('Tags', related_name='comics', blank=True)
    artists = models.ManyToManyField('Artists', related_name='comics', blank=True)
    languages = models.ManyToManyField('Languages', related_name='comics', blank=True)
    parodies = models.ManyToManyField('Parodies', related_name='comics', blank=True)
    characters = models.ManyToManyField('Characters', related_name='comics', blank=True)
    groups = models.ManyToManyField('Groups', related_name='comics', blank=True)
    category = models.ManyToManyField('Category', related_name='comics', blank=True)
    status = models.IntegerField(choices=STATUS_CHOICES, default=1)

    def __str__(self):
        return self.name


class ComicDetail(models.Model):
    image_detail = models.ImageField(upload_to='image_detail/', blank=True, null=True)
    page_number = models.IntegerField()
    comic = models.ForeignKey(Comic, related_name='comic_details', on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"Page {self.page_number} of {self.comic.name}"


@receiver(post_delete, sender=ComicDetail)
def delete_comic_detail_file(sender, instance, **kwargs):
    if instance.image_detail:
        instance.image_detail.delete(False)


@receiver(post_delete, sender=Comic)
def delete_comic_detail_file(sender, instance, **kwargs):
    if instance.profile_picture:
        instance.profile_picture.delete(False)
