from django.urls import path
from . import views


urlpatterns = [
    path("", views.post_list_placeholder, name="post_list"),
    path("<slug:slug>/", views.post_detail_placeholder, name="post_detail"),
]


