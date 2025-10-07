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

## Démarrage (dev)
- Installer les dépendances listées dans `requirements.txt`.
- Lancer le serveur: `python manage.py runserver`.
