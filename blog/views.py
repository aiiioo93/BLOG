from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from .models import Post


def post_list_placeholder(request):
    """Liste des articles publiés avec pagination (5 par page)."""
    posts = Post.objects.filter(status=Post.Status.PUBLISHED).order_by('-created')
    paginator = Paginator(posts, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, "blog_list.html", {"page_obj": page_obj})


def post_detail_placeholder(request, slug: str):
    """Détail d'un article publié par slug."""
    post = get_object_or_404(Post, slug=slug, status=Post.Status.PUBLISHED)
    return render(request, "blog_detail.html", {"post": post})
