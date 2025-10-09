from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator
from django.contrib import messages
from .models import Post, Comment
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
