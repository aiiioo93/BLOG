from django.contrib import admin
from .models import Post, Comment


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "author", "created", "updated")
    list_filter = ("status", "created", "updated")
    search_fields = ("title", "body")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("-created",)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("author_name", "post", "created", "approved")
    list_filter = ("approved", "created")
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
