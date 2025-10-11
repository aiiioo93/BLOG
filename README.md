# Blog minimal Django

Projet Django "Blog minimal" livré en 7 jours. Ce README résume, jour par jour, ce qui a été fait.

## Journal de bord

### Jour 1 — Initialisation & squelette
- Création du projet `config` et de l'app `blog`.
- Configuration `settings.py` (LANG=fr-fr, TIME_ZONE=Europe/Paris, templates, static).
- Modèle `Post` (titre, slug unique, contenu, statut brouillon/publié, dates, auteur optionnel).
- Admin `PostAdmin` (list_display, search, filter, slug prérempli).
- URLs: `/` (liste placeholder), `/<slug>/` (détail placeholder).
- Templates: `base.html`, `blog_list.html`, `blog_detail.html` (Bootstrap CDN).
- Migrations appliquées (SQLite).
- Git: init, branche `jour-1`, commit, push sur `main` (remote configuré).

### Jour 2 — Liste & détail fonctionnels + style de base
- Vue `post_list_placeholder`: affiche les posts publiés, triés par date décroissante, avec pagination (5/page).
- Vue `post_detail_placeholder`: affiche un article publié par slug (get_object_or_404).
- Template `blog_list.html`: liste articles en cards Bootstrap, liens vers détail, pagination complète (première/précédent/suivant/dernière).
- Template `blog_detail.html`: affichage titre, dates, auteur, contenu formaté (linebreaks), bouton retour liste.
- CSS personnalisé (`static/css/app.css`): styles navbar, cards avec hover, footer, post-body, pagination.
- Git: branche `jour-2`, commit, merge vers `main`, push.

### Jour 3 — Système de commentaires avec modération + Design moderne
- Modèle `Comment`: nom, email, contenu, date, approbation (booléen), relation avec Post.
- Formulaire `CommentForm`: validation et rendu Bootstrap pour soumettre un commentaire.
- Vue `post_detail_placeholder` mise à jour: gestion du formulaire POST, affichage des commentaires approuvés, messages de confirmation.
- Admin `CommentAdmin`: liste avec filtres, actions en masse pour approuver/désapprouver les commentaires.
- Template `blog_detail.html`: section commentaires avec liste et formulaire d'ajout.
- **Design moderne** (`static/css/app.css`):
  - Palette de couleurs avec dégradés violets/roses
  - Animations CSS: fade-in, slide, hover effects, parallax
  - Cards avec effets 3D et barre de progression au hover
  - Boutons avec effet ripple
  - Formulaires avec transitions fluides
  - Responsive design optimisé
- **Interactions JavaScript** (`static/js/app.js`):
  - Bouton "scroll to top" animé
  - Barre de progression de lecture
  - Effet typing sur le titre principal
  - Parallax sur les cards au survol
  - Validation de formulaire en temps réel avec animations
  - Confettis lors de la soumission réussie d'un commentaire
  - Smooth scroll pour tous les liens ancres
  - Easter egg: Konami code pour effet arc-en-ciel
  - Observer IntersectionObserver pour animations au scroll
- Migration `0002_comment.py`: création de la table Comment.
- Git: branche `jour-3`, commit, merge vers `main`, push.

### Jour 4 — Catégories, Tags, Recherche et Sidebar
- **Modèles** (`blog/models.py`):
  - Modèle `Category`: nom, slug, description, date création.
  - Modèle `Tag`: nom, slug, date création.
  - Mise à jour du modèle `Post`: ajout de ForeignKey vers Category et ManyToManyField vers Tag.
- **Migrations**: `0003_category_tag_post_category_post_tags.py` créée et appliquée.
- **Admin Django**:
  - `CategoryAdmin`: gestion des catégories avec slug prérempli.
  - `TagAdmin`: gestion des tags avec slug prérempli.
  - `PostAdmin` mis à jour: filtres par catégorie et tags, widget horizontal pour les tags.
- **Nouvelles vues** (`blog/views.py`):
  - `search_posts`: recherche d'articles par mots-clés (titre ou contenu).
  - `category_posts`: affichage des articles d'une catégorie spécifique.
  - `tag_posts`: affichage des articles d'un tag spécifique.
- **URLs** (`blog/urls.py`): routes pour `/search/`, `/category/<slug>/` et `/tag/<slug>/`.
- **Context processor** (`blog/context_processors.py`): 
  - Fournit les catégories (avec compteur) et tags populaires à tous les templates.
  - Enregistré dans `settings.py`.
- **Templates**:
  - `sidebar.html`: composant réutilisable avec recherche, catégories et tags populaires.
  - `blog_list.html` mis à jour: layout avec sidebar, affichage des catégories et tags sur les articles.
  - `blog_detail.html` mis à jour: affichage de la catégorie et des tags de l'article, sidebar.
  - `blog_search.html`: page de résultats de recherche avec pagination.
  - `blog_category.html`: page de liste d'articles par catégorie.
  - `blog_tag.html`: page de liste d'articles par tag.
- **Styles CSS** (`static/css/app.css`):
  - Sidebar sticky avec animations (fadeInUp, hover effects).
  - Tag cloud avec badges animés (popIn, scale effects).
  - Liste de catégories avec animations séquentielles (fadeInLeft).
  - Tags dans les articles (tag-badge-sm) avec hover effects.
  - Post meta avec icônes émoji pour meilleure lisibilité.
  - Responsive design pour mobile et tablette.
  - Animations séquentielles pour tous les éléments.
- Git: branche `jour-4`, commit, merge vers `main`, push.

## Démarrage (dev)
- Installer les dépendances listées dans `requirements.txt`.
- Appliquer les migrations: `python manage.py migrate`.
- Lancer le serveur: `python manage.py runserver`.
