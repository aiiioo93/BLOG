from django.contrib import admin
from .models import Post, Comment, Category, Tag


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "created")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("name",)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "created")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("name",)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "category", "author", "created", "updated")
    list_filter = ("status", "category", "tags", "created", "updated")
    search_fields = ("title", "body")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-created",)
    filter_horizontal = ("tags",)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("author_name", "post", "body_markdown", "created", "approved")
    list_filter = ("approved", "body_markdown", "created")
    search_fields = ("author_name", "author_email", "body")
    ordering = ("-created",)
    actions = ["approve_comments", "disapprove_comments"]
    
    def approve_comments(self, request, queryset):
        """Action pour approuver les commentaires sélectionnés."""
        count = queryset.update(approved=True)
        self.message_user(request, f"{count} commentaire(s) approuvé(s).")
    approve_comments.short_description = "Approuver les commentaires sélectionnés"
    
    def disapprove_comments(self, request, queryset):
        """Action pour désapprouver les commentaires sélectionnés."""
        count = queryset.update(approved=False)
        self.message_user(request, f"{count} commentaire(s) désapprouvé(s).")
    disapprove_comments.short_description = "Désapprouver les commentaires sélectionnés"
