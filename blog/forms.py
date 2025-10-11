from django import forms
from .models import Comment


class CommentForm(forms.ModelForm):
    """Formulaire pour soumettre un commentaire avec support markdown."""
    
    class Meta:
        model = Comment
        fields = ['author_name', 'author_email', 'body', 'body_markdown']
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
                'id': 'comment-body',
                'rows': 8,
                'placeholder': 'Votre commentaire... (Support Markdown et code)',
            }),
            'body_markdown': forms.CheckboxInput(attrs={
                'class': 'form-check-input',
                'id': 'markdown-toggle',
            }),
        }
        labels = {
            'author_name': 'Nom',
            'author_email': 'Email',
            'body': 'Commentaire',
            'body_markdown': 'Utiliser le format Markdown',
        }

