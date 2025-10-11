from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator
from django.contrib import messages
from django.db.models import Q, Count
from .models import Post, Comment, Category, Tag
from .forms import CommentForm


def post_list_placeholder(request):
    """Liste des articles publiés avec pagination (5 par page)."""
    posts = Post.objects.filter(status=Post.Status.PUBLISHED).order_by('-created')
    paginator = Paginator(posts, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, "blog_list.html", {"page_obj": page_obj})


def post_detail_placeholder(request, slug: str):
    """Détail d'un article publié par slug avec formulaire de commentaire."""
    post = get_object_or_404(Post, slug=slug, status=Post.Status.PUBLISHED)
    
    # Récupérer les commentaires approuvés
    comments = post.comments.filter(approved=True)
    
    # Traiter le formulaire de commentaire
    comment_form = CommentForm()
    comment_posted = False
    
    if request.method == 'POST':
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            new_comment = comment_form.save(commit=False)
            new_comment.post = post
            new_comment.save()
            comment_posted = True
            messages.success(
                request,
                "Votre commentaire a été soumis et sera visible après modération."
            )
            # Rediriger pour éviter la resoumission du formulaire
            return redirect('post_detail', slug=slug)
    
    context = {
        'post': post,
        'comments': comments,
        'comment_form': comment_form,
        'comment_posted': comment_posted,
    }
    return render(request, "blog_detail.html", context)


def search_posts(request):
    """Recherche d'articles par mots-clés."""
    query = request.GET.get('q', '')
    posts = Post.objects.filter(status=Post.Status.PUBLISHED)
    
    if query:
        posts = posts.filter(
            Q(title__icontains=query) | Q(body__icontains=query)
        ).distinct()
    
    paginator = Paginator(posts.order_by('-created'), 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'query': query,
    }
    return render(request, "blog_search.html", context)


def category_posts(request, slug: str):
    """Liste des articles d'une catégorie."""
    category = get_object_or_404(Category, slug=slug)
    posts = Post.objects.filter(
        status=Post.Status.PUBLISHED,
        category=category
    ).order_by('-created')
    
    paginator = Paginator(posts, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'category': category,
    }
    return render(request, "blog_category.html", context)


def tag_posts(request, slug: str):
    """Liste des articles d'un tag."""
    tag = get_object_or_404(Tag, slug=slug)
    posts = Post.objects.filter(
        status=Post.Status.PUBLISHED,
        tags=tag
    ).order_by('-created')
    
    paginator = Paginator(posts, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'tag': tag,
    }
    return render(request, "blog_tag.html", context)
