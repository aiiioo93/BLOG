from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model


class Post(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'DRAFT', 'Brouillon'
        PUBLISHED = 'PUBLISHED', 'Publié'

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    body = models.TextField()
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.DRAFT,
    )
    created = models.DateTimeField(default=timezone.now, editable=False)
    updated = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='posts',
    )

    class Meta:
        ordering = ['-created']

    def __str__(self) -> str:
        return self.title


class Comment(models.Model):
    """Commentaire sur un article de blog."""
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments',
    )
    author_name = models.CharField(max_length=100, verbose_name="Nom")
    author_email = models.EmailField(verbose_name="Email")
    body = models.TextField(verbose_name="Commentaire")
    created = models.DateTimeField(default=timezone.now, editable=False)
    approved = models.BooleanField(default=False, verbose_name="Approuvé")

    class Meta:
        ordering = ['created']
        verbose_name = "Commentaire"
        verbose_name_plural = "Commentaires"

    def __str__(self) -> str:
        return f"Commentaire de {self.author_name} sur {self.post.title}"
