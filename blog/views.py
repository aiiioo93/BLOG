from django.shortcuts import render


def post_list_placeholder(request):
    return render(request, "blog_list.html", {"placeholder": True})


def post_detail_placeholder(request, slug: str):
    return render(request, "blog_detail.html", {"slug": slug, "placeholder": True})

# Create your views here.
