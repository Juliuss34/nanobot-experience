#!/bin/bash

# Script de déploiement pour Nano Bot Experience sur GitHub Pages
# Ce script vous aide à initialiser un dépôt Git local et à le pousser vers GitHub

echo "===== Déploiement de Nano Bot Experience sur GitHub Pages ====="
echo ""
echo "Ce script va vous aider à préparer votre jeu pour GitHub Pages."
echo "Vous aurez besoin d'avoir Git installé et d'un compte GitHub."
echo ""

# Vérifier si Git est installé
if ! command -v git &> /dev/null; then
    echo "❌ Git n'est pas installé. Veuillez installer Git avant de continuer."
    echo "   Rendez-vous sur https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git est correctement installé."

# Demander le nom d'utilisateur GitHub
read -p "Entrez votre nom d'utilisateur GitHub: " github_username
if [ -z "$github_username" ]; then
    echo "❌ Nom d'utilisateur GitHub non fourni. Arrêt du script."
    exit 1
fi

# Demander le nom du dépôt
read -p "Entrez le nom du dépôt GitHub (par défaut: nanobot-experience): " repo_name
repo_name=${repo_name:-nanobot-experience}

echo ""
echo "Configuration du dépôt local Git..."

# Initialiser le dépôt Git s'il n'existe pas déjà
if [ ! -d ".git" ]; then
    git init
    echo "✅ Dépôt Git initialisé localement."
else
    echo "✅ Dépôt Git déjà initialisé."
fi

# Ajouter tous les fichiers au suivi
git add .

# Créer le premier commit
git commit -m "Version initiale de Nano Bot Experience"
echo "✅ Premier commit créé avec tous les fichiers du jeu."

# Ajouter le dépôt distant (GitHub)
remote_url="https://github.com/$github_username/$repo_name.git"
git remote add origin $remote_url
echo "✅ Dépôt distant configuré: $remote_url"

echo ""
echo "Tout est prêt pour pousser votre code vers GitHub !"
echo ""
echo "INSTRUCTIONS IMPORTANTES:"
echo "1. Assurez-vous d'avoir créé le dépôt '$repo_name' sur GitHub"
echo "2. Exécutez la commande suivante pour pousser votre code:"
echo ""
echo "   git push -u origin main"
echo ""
echo "3. Ensuite, suivez les étapes pour activer GitHub Pages:"
echo "   - Allez sur github.com/$github_username/$repo_name"
echo "   - Cliquez sur 'Settings' > 'Pages'"
echo "   - Dans 'Build and deployment', sélectionnez 'Deploy from a branch'"
echo "   - Choisissez la branche 'main' et le dossier '/ (root)'"
echo "   - Cliquez sur 'Save'"
echo ""
echo "Votre jeu sera disponible à l'adresse:"
echo "https://$github_username.github.io/$repo_name/"
echo ""
echo "Référez-vous au fichier DEPLOIEMENT.md pour plus de détails."