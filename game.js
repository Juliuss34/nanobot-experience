// État du jeu
let game = {
    // Ressources
    nanobots: 0,
    totalNanobots: 0,
    clickValue: 1,
    
    // Expansion et zones
    expansion: {
        currentLevel: 0,
        progressToNext: 0,
        levelNames: [
            "Terre", "Système Solaire", "Voie Lactée", 
            "Groupe Local", "Super-amas Local", "Univers Observable",
            "Multivers", "Dimensions Parallèles", "Réalité Quantique"
        ],
        milestones: [
            { name: "Terre", desc: "Point de départ", icon: "globe", unlocked: true, nanobotReq: 0 },
            { name: "Lune", desc: "+10% production", icon: "moon", unlocked: false, nanobotReq: 1e3, effect: () => { applyProductionMultiplier(1.1); } },
            { name: "Mars", desc: "+15% production", icon: "rocket", unlocked: false, nanobotReq: 1e4, effect: () => { applyProductionMultiplier(1.15); } },
            { name: "Système Solaire", desc: "+25% production", icon: "sun", unlocked: false, nanobotReq: 1e6, effect: () => { applyProductionMultiplier(1.25); } },
            { name: "Étoiles Proches", desc: "Débloque nouvel assembleur", icon: "star", unlocked: false, nanobotReq: 1e8, effect: () => { unlockProducer(3); } },
            { name: "Voie Lactée", desc: "+50% production", icon: "galaxy", unlocked: false, nanobotReq: 1e10, effect: () => { applyProductionMultiplier(1.5); } },
            { name: "Galaxies Voisines", desc: "Double valeur des clics", icon: "atom", unlocked: false, nanobotReq: 1e13, effect: () => { game.clickValue *= 2; } },
            { name: "Groupe Local", desc: "+100% production", icon: "meteor", unlocked: false, nanobotReq: 1e16, effect: () => { applyProductionMultiplier(2); } },
            { name: "Super-amas Local", desc: "Débloque évolution quantique", icon: "project-diagram", unlocked: false, nanobotReq: 1e20, effect: () => { unlockProducer(5); } },
            { name: "Univers Observable", desc: "Triple toute production", icon: "microscope", unlocked: false, nanobotReq: 1e25, effect: () => { applyProductionMultiplier(3); } },
            { name: "Multivers", desc: "Débloque réplicateurs ultimes", icon: "cube", unlocked: false, nanobotReq: 1e30, effect: () => { unlockProducer(6); } },
            { name: "Dimensions Parallèles", desc: "x10 à la valeur des clics", icon: "cubes", unlocked: false, nanobotReq: 1e35, effect: () => { game.clickValue *= 10; } },
            { name: "Réalité Quantique", desc: "Maîtrise totale", icon: "infinity", unlocked: false, nanobotReq: 1e40, effect: () => { applyProductionMultiplier(10); } }
        ]
    },
    
    // Producteurs
    producers: [
        { id: 'producer1', name: 'Nano-Assembleur', count: 0, baseCost: 10, costMultiplier: 1.1, production: 0.1, unlocked: true, 
          desc: "Assemble des nanobots individuellement", icon: "microchip" },
        { id: 'producer2', name: 'Réplicateur Moléculaire', count: 0, baseCost: 100, costMultiplier: 1.12, production: 1, unlocked: false, 
          desc: "Réplique les nanobots au niveau moléculaire", icon: "code-branch" },
        { id: 'producer3', name: 'Usine Quantique', count: 0, baseCost: 1500, costMultiplier: 1.15, production: 10, unlocked: false, 
          desc: "Utilise les fluctuations quantiques pour générer des nanobots", icon: "atom" },
        { id: 'producer4', name: 'Matrice Stellaire', count: 0, baseCost: 20000, costMultiplier: 1.17, production: 100, unlocked: false, 
          desc: "Convertit l'énergie stellaire en nanobots", icon: "sun" },
        { id: 'producer5', name: 'Condensateur Galactique', count: 0, baseCost: 500000, costMultiplier: 1.18, production: 1000, unlocked: false, 
          desc: "Condense la matière interstellaire en nanobots", icon: "galaxy" },
        { id: 'producer6', name: 'Transmutateur Quantique', count: 0, baseCost: 10000000, costMultiplier: 1.2, production: 10000, unlocked: false, 
          desc: "Transmute l'énergie du vide en nanobots", icon: "project-diagram" },
        { id: 'producer7', name: 'Générateur Dimensionnel', count: 0, baseCost: 500000000, costMultiplier: 1.22, production: 100000, unlocked: false, 
          desc: "Extrait des nanobots d'autres dimensions", icon: "cube" }
    ],
    
    // Améliorations
    upgrades: [
        { id: 'upgrade1', name: 'Protocole d\'auto-réplication', description: 'Double la valeur de vos clics', cost: 50, purchased: false, 
          effect: () => { game.clickValue *= 2; }, icon: "hand-pointer" },
        { id: 'upgrade2', name: 'Nano-processeurs avancés', description: 'Double la production des Nano-Assembleurs', cost: 200, purchased: false, 
          effect: () => { multiplyProducerProduction(0, 2); }, requirement: () => game.producers[0].count >= 10, icon: "microchip" },
        { id: 'upgrade3', name: 'Algorithmes adaptatifs', description: 'Triple la production des Réplicateurs Moléculaires', cost: 1000, purchased: false, 
          effect: () => { multiplyProducerProduction(1, 3); }, requirement: () => game.producers[1].count >= 10, icon: "brain" },
        { id: 'upgrade4', name: 'Manipulation atomique', description: 'Double la production de tous les producteurs', cost: 5000, purchased: false, 
          effect: () => { applyProductionMultiplier(2); }, requirement: () => game.totalNanobots >= 2000, icon: "atom" },
        { id: 'upgrade5', name: 'Compression moléculaire', description: 'Tous les coûts -10%', cost: 20000, purchased: false, 
          effect: () => { applyCostReduction(0.9); }, requirement: () => game.expansion.currentLevel >= 1, icon: "compress" },
        { id: 'upgrade6', name: 'Intelligence collective', description: 'Production +50% par zone débloquée', cost: 100000, purchased: false, 
          effect: () => { recalculateCollectiveIntelligence(); }, requirement: () => game.expansion.currentLevel >= 2, icon: "network-wired" },
        { id: 'upgrade7', name: 'Manipulation quantique', description: 'Quadruple la production des Usines Quantiques', cost: 500000, purchased: false, 
          effect: () => { multiplyProducerProduction(2, 4); }, requirement: () => game.producers[2].count >= 15, icon: "dice-d20" },
        { id: 'upgrade8', name: 'Matière noire', description: 'Production x5 pendant 30 secondes', cost: 2000000, purchased: false, 
          effect: () => { applyTemporaryBoost(5, 30); }, requirement: () => game.expansion.currentLevel >= 3, icon: "star-half-alt" },
        { id: 'upgrade9', name: 'Singularité technologique', description: 'Production x10 mais consomme 1% de nanobots/sec', cost: 50000000, purchased: false, 
          effect: () => { applySingularity(); }, requirement: () => game.expansion.currentLevel >= 5, icon: "bullseye" }
    ],
    
    // Prestige (évolution nanobotique)
    prestige: {
        points: 0,
        multiplier: 1,
        toGain: 0,
        unlocked: false
    },
    
    // Boosts temporaires
    temporaryBoosts: [],
    
    // Statistiques
    stats: {
        clickCount: 0,
        playTime: 0,
        prestigeCount: 0
    },
    
    // Timing et sauvegarde
    lastUpdate: Date.now(),
    lastSave: null
};

// Éléments DOM
const elements = {
    nanobots: document.getElementById('nanobots'),
    perSecond: document.getElementById('per-second'),
    clickValue: document.getElementById('click-value'),
    expansionLevel: document.getElementById('expansion-level'),
    expansionProgress: document.getElementById('expansion-progress'),
    expansionPercent: document.getElementById('expansion-percent'),
    clicker: document.getElementById('clicker'),
    producersContainer: document.getElementById('producers-container'),
    upgradesContainer: document.getElementById('upgrades-container'),
    milestonesContainer: document.getElementById('milestones-container'),
    prestigePoints: document.getElementById('prestige-points'),
    prestigeMultiplier: document.getElementById('prestige-multiplier'),
    prestigeToGain: document.getElementById('prestige-to-gain'),
    prestigeButton: document.getElementById('prestige-button'),
    saveButton: document.getElementById('save-button'),
    resetButton: document.getElementById('reset-button'),
    lastSave: document.getElementById('last-save')
};

// Fonctions utilitaires
function formatNumber(num) {
    if (num < 1000) return num.toFixed(1).replace(/\.0$/, '');
    
    const units = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QaDc', 'QiDc'];
    const exponent = Math.floor(Math.log10(num) / 3);
    const unit = units[exponent] || `e${exponent*3}`;
    
    return (num / Math.pow(10, exponent * 3)).toFixed(2).replace(/\.00$/, '') + unit;
}

function formatTime(timestamp) {
    if (!timestamp) return 'Jamais';
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
}

// Fonction pour calculer la production par seconde
function calculateProduction() {
    let production = 0;
    
    game.producers.forEach(producer => {
        production += producer.count * producer.production;
    });
    
    // Appliquer multiplicateur de prestige
    production *= game.prestige.multiplier;
    
    // Appliquer boosts temporaires
    game.temporaryBoosts.forEach(boost => {
        production *= boost.multiplier;
    });
    
    return production;
}

// Fonction pour calculer le coût d'un producteur
function getProducerCost(producer) {
    return Math.floor(producer.baseCost * Math.pow(producer.costMultiplier, producer.count));
}

// Fonction pour calculer les points de prestige à gagner
function calculatePrestigeGain() {
    // Formule: racine carrée de (nanobots totaux / 1e10)
    return Math.floor(Math.sqrt(game.totalNanobots / 1e10));
}

// Fonction pour appliquer un multiplicateur à la production
function applyProductionMultiplier(multiplier) {
    game.producers.forEach(producer => {
        producer.production *= multiplier;
    });
}

// Fonction pour multiplier la production d'un producteur spécifique
function multiplyProducerProduction(index, multiplier) {
    if (index >= 0 && index < game.producers.length) {
        game.producers[index].production *= multiplier;
    }
}

// Fonction pour appliquer une réduction de coût
function applyCostReduction(factor) {
    game.producers.forEach(producer => {
        producer.costMultiplier = producer.costMultiplier * factor + (1 - factor);
    });
}

// Fonction pour déverrouiller un producteur
function unlockProducer(index) {
    if (index >= 0 && index < game.producers.length) {
        game.producers[index].unlocked = true;
    }
}

// Fonction pour recalculer l'intelligence collective
function recalculateCollectiveIntelligence() {
    // Compte le nombre de jalons débloqués
    const unlockedMilestones = game.expansion.milestones.filter(m => m.unlocked).length;
    // +50% par jalon débloqué
    const multiplier = 1 + (unlockedMilestones * 0.5);
    applyProductionMultiplier(multiplier);
}

// Fonction pour appliquer un boost temporaire
function applyTemporaryBoost(multiplier, durationSeconds) {
    const boost = {
        multiplier: multiplier,
        expiryTime: Date.now() + (durationSeconds * 1000)
    };
    
    game.temporaryBoosts.push(boost);
}

// Fonction pour appliquer la singularité
function applySingularity() {
    // Production x10 mais consommation de 1% des nanobots par seconde
    applyProductionMultiplier(10);
    
    // Logique de consommation implémentée dans la boucle de jeu
    game.singularityActive = true;
}

// Fonction pour vérifier et débloquer des jalons
function checkMilestones() {
    let updated = false;
    
    game.expansion.milestones.forEach(milestone => {
        if (!milestone.unlocked && game.totalNanobots >= milestone.nanobotReq) {
            milestone.unlocked = true;
            if (milestone.effect) {
                milestone.effect();
            }
            updated = true;
            
            // Notification de déblocage
            createNotification(`Jalon débloqué: ${milestone.name}`);
        }
    });
    
    // Mettre à jour le niveau d'expansion
    updateExpansionLevel();
    
    return updated;
}

// Fonction pour mettre à jour le niveau d'expansion
function updateExpansionLevel() {
    const unlockedMilestones = game.expansion.milestones.filter(m => m.unlocked).length;
    
    // Chaque groupe de 3 jalons débloque un nouveau niveau d'expansion
    const newLevel = Math.floor(unlockedMilestones / 3);
    
    if (newLevel > game.expansion.currentLevel) {
        game.expansion.currentLevel = newLevel;
        elements.expansionLevel.textContent = game.expansion.levelNames[newLevel];
        
        // Si le niveau est >= 2, déverrouiller le prestige
        if (newLevel >= 2 && !game.prestige.unlocked) {
            game.prestige.unlocked = true;
            document.getElementById('prestige-section').style.display = 'block';
        }
        
        // Notification de niveau
        createNotification(`Expansion atteinte: ${game.expansion.levelNames[newLevel]}`);
    }
    
    // Calculer la progression vers le prochain niveau
    if (newLevel < game.expansion.levelNames.length - 1) {
        const currentThreshold = Math.pow(10, 3 + (newLevel * 3)); // 1e3, 1e6, 1e9, etc.
        const nextThreshold = Math.pow(10, 3 + ((newLevel + 1) * 3));
        
        const progress = (Math.log10(Math.max(game.totalNanobots, 1)) - Math.log10(currentThreshold)) / 
                        (Math.log10(nextThreshold) - Math.log10(currentThreshold));
        
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        
        game.expansion.progressToNext = clampedProgress;
        elements.expansionProgress.style.width = `${clampedProgress * 100}%`;
        elements.expansionPercent.textContent = Math.floor(clampedProgress * 100);
    } else {
        // Niveau maximum atteint
        game.expansion.progressToNext = 1;
        elements.expansionProgress.style.width = `100%`;
        elements.expansionPercent.textContent = 100;
    }
}

// Fonction pour acheter un producteur
function buyProducer(index) {
    const producer = game.producers[index];
    const cost = getProducerCost(producer);
    
    if (game.nanobots >= cost) {
        game.nanobots -= cost;
        producer.count++;
        updateUI();
        
        // Effets visuels
        createFloatingNanobots(10);
    }
}

// Fonction pour acheter une amélioration
function buyUpgrade(index) {
    const upgrade = game.upgrades[index];
    
    if (game.nanobots >= upgrade.cost && !upgrade.purchased) {
        game.nanobots -= upgrade.cost;
        upgrade.purchased = true;
        upgrade.effect();
        updateUI();
        
        // Effets visuels
        createFloatingNanobots(20);
    }
}

// Fonction pour effectuer un prestige
function performPrestige() {
    const pointsToGain = calculatePrestigeGain();
    
    if (pointsToGain < 1) return;
    
    game.prestige.points += pointsToGain;
    game.prestige.multiplier = 1 + (game.prestige.points * 0.1); // +10% par point
    game.stats.prestigeCount++;
    
    // Réinitialiser le jeu tout en conservant le prestige
    game.nanobots = 0;
    game.totalNanobots = 0;
    
    // Réinitialiser les producteurs
    game.producers.forEach(producer => {
        producer.count = 0;
        producer.unlocked = producer.id === 'producer1'; // Seul le premier est déverrouillé
    });
    
    // Réinitialiser les améliorations
    game.upgrades.forEach(upgrade => {
        upgrade.purchased = false;
    });
    
    // Réinitialiser les boosts temporaires et la singularité
    game.temporaryBoosts = [];
    game.singularityActive = false;
    
    // Conserver les jalons d'expansion débloqués
    game.expansion.progressToNext = 0;
    
    // Réinitialiser le clickValue
    game.clickValue = 1;
    
    // Mettre à jour l'interface
    updateUI();
    saveGame();
    
    // Effets visuels
    createFloatingNanobots(100, 'rgba(156, 39, 176, 0.7)');
}

// Fonction pour créer une notification de déblocage
function createNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Suppression automatique
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Fonction pour créer des nanobots flottants
function createFloatingNanobots(count, color = 'rgba(0, 229, 255, 0.7)') {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const nanobot = document.createElement('div');
            nanobot.className = 'floating-nanobot';
            nanobot.style.backgroundColor = color;
            nanobot.style.boxShadow = `0 0 4px ${color}`;
            
            // Position aléatoire près du centre de l'écran
            const x = window.innerWidth / 2 + (Math.random() * 200 - 100);
            const y = window.innerHeight / 2 + (Math.random() * 200 - 100);
            
            nanobot.style.left = `${x}px`;
            nanobot.style.top = `${y}px`;
            
            // Direction aléatoire
            const randomDuration = 2 + Math.random() * 2;
            const randomDelay = Math.random() * 0.5;
            nanobot.style.animation = `float-up ${randomDuration}s ease-out ${randomDelay}s forwards`;
            
            document.body.appendChild(nanobot);
            
            // Supprimer après l'animation
            setTimeout(() => {
                nanobot.remove();
            }, (randomDuration + randomDelay) * 1000);
        }, Math.random() * 500);
    }
}

// Mettre à jour l'affichage des producteurs
function updateProducers() {
    elements.producersContainer.innerHTML = '';
    
    game.producers.forEach((producer, index) => {
        // Vérifier si le producteur est déverrouillé
        if (!producer.unlocked) {
            if (game.nanobots >= producer.baseCost * 0.5 || game.totalNanobots >= producer.baseCost) {
                producer.unlocked = true;
            } else {
                return;
            }
        }
        
        const cost = getProducerCost(producer);
        const canBuy = game.nanobots >= cost;
        
        const producerElement = document.createElement('div');
        producerElement.className = 'producer-item';
        producerElement.innerHTML = `
            <div class="producer-info">
                <div class="producer-title"><i class="fas fa-${producer.icon}"></i> ${producer.name} (${producer.count})</div>
                <div class="producer-stats">
                    Produit ${formatNumber(producer.production)} nanobots/sec<br>
                    Total: ${formatNumber(producer.count * producer.production)} nanobots/sec<br>
                    <small>${producer.desc}</small>
                </div>
            </div>
            <button class="buy-button" data-producer="${index}" ${canBuy ? '' : 'disabled'}>
                ${formatNumber(cost)} <i class="fas fa-microchip"></i>
            </button>
        `;
        
        elements.producersContainer.appendChild(producerElement);
    });
    
    // Ajouter les écouteurs d'événements pour les boutons d'achat
    document.querySelectorAll('.buy-button[data-producer]').forEach(button => {
        button.addEventListener('click', function() {
            const producerIndex = parseInt(this.getAttribute('data-producer'));
            buyProducer(producerIndex);
        });
    });
}

// Mettre à jour l'affichage des améliorations
function updateUpgrades() {
    elements.upgradesContainer.innerHTML = '';
    
    game.upgrades.forEach((upgrade, index) => {
        // Si l'amélioration est déjà achetée, ne pas l'afficher
        if (upgrade.purchased) return;
        
        // Vérifier si l'amélioration a une condition de déverrouillage
        if (upgrade.requirement && !upgrade.requirement()) return;
        
        const canBuy = game.nanobots >= upgrade.cost;
        
        const upgradeElement = document.createElement('div');
        upgradeElement.className = 'upgrade-item';
        upgradeElement.innerHTML = `
            <div class="upgrade-info">
                <div class="upgrade-title"><i class="fas fa-${upgrade.icon}"></i> ${upgrade.name}</div>
                <div class="upgrade-desc">${upgrade.description}</div>
            </div>
            <button class="buy-button" data-upgrade="${index}" ${canBuy ? '' : 'disabled'}>
                ${formatNumber(upgrade.cost)} <i class="fas fa-microchip"></i>
            </button>
        `;
        
        elements.upgradesContainer.appendChild(upgradeElement);
    });
    
    // Ajouter les écouteurs d'événements pour les boutons d'achat
    document.querySelectorAll('.buy-button[data-upgrade]').forEach(button => {
        button.addEventListener('click', function() {
            const upgradeIndex = parseInt(this.getAttribute('data-upgrade'));
            buyUpgrade(upgradeIndex);
        });
    });
}

// Mettre à jour l'affichage des jalons
function updateMilestones() {
    elements.milestonesContainer.innerHTML = '';
    
    game.expansion.milestones.forEach((milestone, index) => {
        // N'afficher que les jalons débloqués et les prochains à débloquer
        if (!milestone.unlocked && game.totalNanobots < milestone.nanobotReq * 0.01 && index > 0) {
            // Ne pas afficher les jalons lointains
            return;
        }
        
        const milestoneElement = document.createElement('div');
        milestoneElement.className = 'milestone-item';
        
        if (milestone.unlocked) {
            milestoneElement.classList.add('unlocked');
        }
        
        // Identifier le prochain jalon à débloquer
        if (!milestone.unlocked && game.expansion.milestones[index-1]?.unlocked) {
            milestoneElement.classList.add('next');
        }
        
        milestoneElement.innerHTML = `
            <div class="milestone-icon"><i class="fas fa-${milestone.icon}"></i></div>
            <div class="milestone-name">${milestone.name}</div>
            <div class="milestone-desc">${milestone.desc}</div>
            ${!milestone.unlocked ? `<div class="milestone-req">${formatNumber(milestone.nanobotReq)} nanobots</div>` : ''}
        `;
        
        elements.milestonesContainer.appendChild(milestoneElement);
    });
}

// Mettre à jour l'affichage du prestige
function updatePrestige() {
    // Cacher la section si le prestige n'est pas encore débloqué
    document.getElementById('prestige-section').style.display = game.prestige.unlocked ? 'block' : 'none';
    
    if (!game.prestige.unlocked) return;
    
    const pointsToGain = calculatePrestigeGain();
    
    elements.prestigePoints.textContent = game.prestige.points;
    elements.prestigeMultiplier.textContent = `x${game.prestige.multiplier.toFixed(2)}`;
    elements.prestigeToGain.textContent = pointsToGain;
    
    // Activer le bouton de prestige seulement si on peut gagner au moins 1 point
    elements.prestigeButton.disabled = pointsToGain < 1;
}

// Fonction pour mettre à jour l'interface utilisateur
function updateUI() {
    // Mise à jour des compteurs principaux
    elements.nanobots.textContent = formatNumber(game.nanobots);
    elements.perSecond.textContent = formatNumber(calculateProduction());
    elements.clickValue.textContent = formatNumber(game.clickValue);
    elements.expansionLevel.textContent = game.expansion.levelNames[game.expansion.currentLevel];
    
    // Mise à jour de la barre de progression
    elements.expansionProgress.style.width = `${game.expansion.progressToNext * 100}%`;
    elements.expansionPercent.textContent = Math.floor(game.expansion.progressToNext * 100);
    
    // Mise à jour des producteurs
    updateProducers();
    
    // Mise à jour des améliorations
    updateUpgrades();
    
    // Mise à jour des jalons
    updateMilestones();
    
    // Mise à jour du prestige
    updatePrestige();
}

// Sauvegarder le jeu
function saveGame() {
    const saveData = JSON.stringify(game);
    localStorage.setItem('nanoBotExperienceSave', saveData);
    game.lastSave = Date.now();
    elements.lastSave.textContent = formatTime(game.lastSave);
}

// Charger le jeu
function loadGame() {
    const saveData = localStorage.getItem('nanoBotExperienceSave');
    
    if (saveData) {
        try {
            const loadedGame = JSON.parse(saveData);
            
            // Fusionner les données chargées avec le jeu actuel
            game = {...game, ...loadedGame};
            
            // Calcul des gains hors ligne
            const currentTime = Date.now();
            const offlineTime = (currentTime - game.lastUpdate) / 1000; // en secondes
            
            if (offlineTime > 10) { // Si plus de 10 secondes se sont écoulées
                const production = calculateProduction();
                const offlineGain = production * offlineTime;
                
                game.nanobots += offlineGain;
                game.totalNanobots += offlineGain;
                
                // Vérification des nouveaux jalons
                checkMilestones();
                
                // Afficher un message
                createNotification(`Vous avez gagné ${formatNumber(offlineGain)} nanobots pendant votre absence!`);
            }
            
            // Mise à jour du temps
            game.lastUpdate = currentTime;
            
            // Mettre à jour l'interface
            updateUI();
            elements.lastSave.textContent = formatTime(game.lastSave);
            
            console.log('Jeu chargé avec succès!');
        } catch (error) {
            console.error('Erreur lors du chargement de la sauvegarde:', error);
        }
    }
}

// Réinitialiser le jeu
function resetGame() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tout le jeu? Vous perdrez toute votre progression, y compris les points d\'évolution!')) {
        localStorage.removeItem('nanoBotExperienceSave');
        location.reload();
    }
}

// Boucle principale du jeu
function gameLoop() {
    const currentTime = Date.now();
    const deltaTime = (currentTime - game.lastUpdate) / 1000; // en secondes
    
    // Mise à jour des ressources
    const production = calculateProduction();
    game.nanobots += production * deltaTime;
    game.totalNanobots += production * deltaTime;
    
    // Appliquer la singularité si active (consomme 1% des nanobots par seconde)
    if (game.singularityActive) {
        const consumption = game.nanobots * 0.01 * deltaTime;
        game.nanobots = Math.max(0, game.nanobots - consumption);
    }
    
    // Nettoyer les boosts temporaires expirés
    game.temporaryBoosts = game.temporaryBoosts.filter(boost => boost.expiryTime > currentTime);
    
    // Vérifier et débloquer des jalons
    if (checkMilestones()) {
        updateUI();
    } else {
        // Mise à jour des affichages qui changent constamment
        elements.nanobots.textContent = formatNumber(game.nanobots);
        elements.perSecond.textContent = formatNumber(production);
        
        // Vérification des déverrouillages (producteurs et améliorations)
        let needUIUpdate = false;
        
        // Vérifier si des producteurs peuvent être déverrouillés
        game.producers.forEach(producer => {
            if (!producer.unlocked && (game.nanobots >= producer.baseCost * 0.5 || game.totalNanobots >= producer.baseCost)) {
                producer.unlocked = true;
                needUIUpdate = true;
            }
        });
        
        // Mise à jour des points de prestige à gagner
        const newPrestigeToGain = calculatePrestigeGain();
        if (game.prestige.toGain !== newPrestigeToGain) {
            game.prestige.toGain = newPrestigeToGain;
            elements.prestigeToGain.textContent = newPrestigeToGain;
            elements.prestigeButton.disabled = newPrestigeToGain < 1;
        }
        
        // Mise à jour complète de l'interface si nécessaire
        if (needUIUpdate) {
            updateUI();
        }
    }
    
    // Sauvegarde automatique toutes les minutes
    if (currentTime - (game.lastSave || 0) > 60000) {
        saveGame();
    }
    
    // Mise à jour du temps
    game.lastUpdate = currentTime;
    game.stats.playTime += deltaTime;
    
    requestAnimationFrame(gameLoop);
}

// Initialisation
function init() {
    // Charger la sauvegarde existante
    loadGame();
    
    // Initialiser la dernière mise à jour si elle n'existe pas
    if (!game.lastUpdate) {
        game.lastUpdate = Date.now();
    }
    
    // Cacher la section de prestige jusqu'au déverrouillage
    if (!game.prestige.unlocked) {
        document.getElementById('prestige-section').style.display = 'none';
    }
    
    // Écouteurs d'événements
    elements.clicker.addEventListener('click', () => {
        // Ajouter la valeur du clic
        game.nanobots += game.clickValue * game.prestige.multiplier;
        game.totalNanobots += game.clickValue * game.prestige.multiplier;
        game.stats.clickCount++;
        
        // Effet d'animation
        elements.nanobots.classList.add('nanobot-gain');
        setTimeout(() => {
            elements.nanobots.classList.remove('nanobot-gain');
        }, 500);
        
        // Créer des nanobots flottants
        createFloatingNanobots(3);
        
        // Mise à jour immédiate
        elements.nanobots.textContent = formatNumber(game.nanobots);
        
        // Vérifier les jalons
        if (checkMilestones()) {
            updateUI();
        }
    });
    
    elements.saveButton.addEventListener('click', saveGame);
    elements.resetButton.addEventListener('click', resetGame);
    elements.prestigeButton.addEventListener('click', performPrestige);
    
    // Ajouter style pour les notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: -100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 150, 255, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 10px;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            transition: bottom 0.5s ease-out;
            font-weight: bold;
        }
        
        .notification.show {
            bottom: 30px;
        }
    `;
    document.head.appendChild(style);
    
    // Démarrer la boucle de jeu
    gameLoop();
    
    // Message de bienvenue
    setTimeout(() => {
        createNotification('Bienvenue dans Nano Bot Experience!');
    }, 1000);
}

// Démarrer le jeu
init();
