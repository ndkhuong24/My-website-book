from django.db import models


class Author(models.Model):
    name = models.CharField(max_length=250)
    pen_name = models.CharField(max_length=250, blank=True,
                                null=True)  # Cho phép trường này là trống nếu không có bút danh
    bio = models.TextField()  # Sử dụng TextField nếu mô tả dài
    birth_date = models.DateField()  # Sử dụng DateField cho ngày sinh
    nationality = models.CharField(max_length=250)
    profile_picture = models.ImageField(upload_to='profile_picture/', blank=True, null=True)  # Lưu đường dẫn của ảnh
    created_at = models.DateTimeField(auto_now_add=True)  # Tự động thiết lập thời gian khi tạo
    updated_at = models.DateTimeField(auto_now=True)  # Tự động cập nhật thời gian khi lưu
    status = models.IntegerField(default=1)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)  # Tự động thiết lập thời gian khi tạo
    updated_at = models.DateTimeField(auto_now=True)  # Tự động cập nhật thời gian khi lưu
    status = models.IntegerField(default=1)

    def __str__(self):
        return self.name


class Tags(models.Model):
    name = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)  # Tự động thiết lập thời gian khi tạo
    updated_at = models.DateTimeField(auto_now=True)  # Tự động cập nhật thời gian khi lưu
    status = models.IntegerField(default=1)

    def __str__(self):
        return self.name


class Languages(models.Model):
    name = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)  # Tự động thiết lập thời gian khi tạo
    updated_at = models.DateTimeField(auto_now=True)  # Tự động cập nhật thời gian khi lưu
    status = models.IntegerField(default=1)

    def __str__(self):
        return self.name
