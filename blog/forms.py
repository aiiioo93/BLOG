from django import forms
from .models import Comment


class CommentForm(forms.ModelForm):
    """Formulaire pour soumettre un commentaire."""
    
    class Meta:
        model = Comment
        fields = ['author_name', 'author_email', 'body']
        widgets = {
            'author_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Votre nom',
            }),
            'author_email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Votre email (ne sera pas publié)',
            }),
            'body': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Votre commentaire...',
            }),
        }
        labels = {
            'author_name': 'Nom',
            'author_email': 'Email',
            'body': 'Commentaire',
        }

