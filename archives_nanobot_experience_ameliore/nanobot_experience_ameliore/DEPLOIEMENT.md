# Guide de déploiement de Nano Bot Experience sur GitHub Pages

Ce guide vous explique comment mettre votre jeu Nano Bot Experience en ligne pour que tout le monde puisse y jouer depuis n'importe quel navigateur.

## Étapes de déploiement

### 1. Créer un compte GitHub (si vous n'en avez pas déjà un)

1. Rendez-vous sur [github.com](https://github.com/)
2. Cliquez sur "Sign up" en haut à droite
3. Suivez les instructions pour créer votre compte (email, mot de passe, nom d'utilisateur)

### 2. Créer un nouveau dépôt pour votre jeu

1. Une fois connecté à votre compte GitHub, cliquez sur le bouton "+" en haut à droite, puis sélectionnez "New repository"
2. Nommez votre dépôt `nanobot-experience`
3. Ajoutez une description comme "Un jeu incrémental sur l'expansion des nanobots dans l'univers"
4. Gardez le dépôt "Public" (nécessaire pour GitHub Pages avec un compte gratuit)
5. Cochez "Add a README file"
6. Cliquez sur "Create repository"

### 3. Téléverser les fichiers de votre jeu

1. Dans votre dépôt GitHub, cliquez sur "Add file" puis "Upload files"
2. Faites glisser tous les fichiers de votre jeu (index.html, dossiers css et js) dans la zone indiquée
   - Assurez-vous d'avoir bien l'index.html à la racine du dépôt
   - Vérifiez que la structure des dossiers est maintenue (css/, js/, assets/ si applicable)
3. Ajoutez un message de commit comme "Ajout des fichiers initiaux du jeu Nano Bot Experience"
4. Cliquez sur "Commit changes"

### 4. Activer GitHub Pages

1. Dans votre dépôt, cliquez sur "Settings" en haut
2. Dans le menu latéral gauche, cliquez sur "Pages" (dans la section "Code and automation")
3. Dans la section "Build and deployment":
   - Pour "Source", sélectionnez "Deploy from a branch"
   - Pour "Branch", sélectionnez "main" et conservez le dossier "/ (root)"
   - Cliquez sur "Save"
4. Attendez quelques minutes que GitHub construise votre site
5. Rafraîchissez la page - vous devriez voir un message indiquant que votre site est publié à l'adresse: `https://votre-nom-utilisateur.github.io/nanobot-experience/`

### 5. Vérifier que votre jeu fonctionne en ligne

1. Cliquez sur le lien fourni par GitHub: `https://votre-nom-utilisateur.github.io/nanobot-experience/`
2. Vérifiez que tous les éléments de votre jeu fonctionnent correctement:
   - Le bouton "Répliquer" ajoute des nanobots
   - Les producteurs peuvent être achetés
   - Les améliorations fonctionnent
   - La progression s'enregistre (essayez de rafraîchir la page)

### 6. Partager votre jeu

Maintenant que votre jeu est en ligne, vous pouvez partager l'URL avec vos amis, sur les réseaux sociaux ou sur des forums de jeux!

## Dépannage

Si votre jeu ne fonctionne pas correctement en ligne, vérifiez ces points courants:

1. **Problèmes de chargement des ressources**: Ouvrez la console du navigateur (F12) pour voir les erreurs
   - Assurez-vous que tous les chemins sont relatifs (pas de chemins absolus comme `/workspace/...`)
   - Vérifiez que les noms de fichiers respectent exactement la casse (GitHub Pages est sensible à la casse)

2. **Page blanche**: Vérifiez que le fichier index.html est bien à la racine du dépôt

3. **Sauvegarde ne fonctionne pas**: Assurez-vous que localStorage est utilisé correctement et que vous testez sur un navigateur qui le supporte

## Mettre à jour votre jeu

Pour ajouter des nouvelles fonctionnalités ou corriger des bugs:

1. Modifiez vos fichiers localement
2. Retournez dans votre dépôt GitHub
3. Cliquez sur "Add file" > "Upload files" 
4. Téléversez les fichiers modifiés (ils remplaceront les anciens)
5. Ajoutez un message de commit décrivant vos modifications
6. Cliquez sur "Commit changes"

GitHub Pages se mettra automatiquement à jour avec vos nouvelles modifications dans quelques minutes.