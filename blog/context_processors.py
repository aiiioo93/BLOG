from django.db.models import Count, Q
from .models import Category, Tag


def sidebar_data(request):
    """Context processor pour ajouter les données de la sidebar à tous les templates."""
    categories = Category.objects.annotate(
        post_count=Count('posts', filter=Q(posts__status='PUBLISHED'))
    ).filter(post_count__gt=0).order_by('name')[:10]
    
    tags = Tag.objects.annotate(
        post_count=Count('posts', filter=Q(posts__status='PUBLISHED'))
    ).filter(post_count__gt=0).order_by('-post_count')[:15]
    
    return {
        'categories': categories,
        'tags': tags,
    }

