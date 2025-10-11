from django.urls import path
from . import views


urlpatterns = [
    path("", views.post_list_placeholder, name="post_list"),
    path("search/", views.search_posts, name="search_posts"),
    path("category/<slug:slug>/", views.category_posts, name="category_posts"),
    path("tag/<slug:slug>/", views.tag_posts, name="tag_posts"),
    path("<slug:slug>/", views.post_detail_placeholder, name="post_detail"),
]



