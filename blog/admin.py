from django.contrib import admin
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "author", "created", "updated")
    list_filter = ("status", "created", "updated")
    search_fields = ("title", "body")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-created",)

# Register your models here.
