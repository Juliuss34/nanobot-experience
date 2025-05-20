// État du jeu
let game = {
    // Ressources
    resources: 0,
    totalResources: 0,
    clickValue: 1,
    
    // Producteurs
    producers: [
        { id: 'producer1', name: 'Micro Bot', count: 0, baseCost: 10, costMultiplier: 1.1, production: 0.1, unlocked: true },
        { id: 'producer2', name: 'Mini Bot', count: 0, baseCost: 100, costMultiplier: 1.12, production: 1, unlocked: false },
        { id: 'producer3', name: 'Nano Factory', count: 0, baseCost: 1000, costMultiplier: 1.15, production: 10, unlocked: false },
        { id: 'producer4', name: 'Quantum Array', count: 0, baseCost: 10000, costMultiplier: 1.17, production: 100, unlocked: false }
    ],
    
    // Améliorations
    upgrades: [
        { id: 'upgrade1', name: 'Clics efficaces', description: 'Double la valeur de vos clics', cost: 50, purchased: false, 
          effect: () => { game.clickValue *= 2; } },
        { id: 'upgrade2', name: 'Micro Boost', description: 'Double la production des Micro Bots', cost: 200, purchased: false, 
          effect: () => { game.producers[0].production *= 2; }, requirement: () => game.producers[0].count >= 10 },
        { id: 'upgrade3', name: 'Mini Boost', description: 'Double la production des Mini Bots', cost: 1000, purchased: false, 
          effect: () => { game.producers[1].production *= 2; }, requirement: () => game.producers[1].count >= 10 },
        { id: 'upgrade4', name: 'Super Clics', description: 'Triple la valeur de vos clics', cost: 5000, purchased: false, 
          effect: () => { game.clickValue *= 3; }, requirement: () => game.totalResources >= 2000 },
        { id: 'upgrade5', name: 'Production Globale', description: 'Augmente toute la production de 50%', cost: 10000, purchased: false, 
          effect: () => { 
            game.producers.forEach(p => p.production *= 1.5); 
          }, requirement: () => game.totalResources >= 5000 }
    ],
    
    // Prestige
    prestige: {
        points: 0,
        multiplier: 1,
        toGain: 0
    },
    
    // Statistiques
    stats: {
        clickCount: 0,
        playTime: 0,
        prestigeCount: 0
    },
    
    // Timing et sauvegarde
    lastUpdate: Date.now(),
    lastSave: Date.now()
};

// Éléments DOM
const elements = {
    resources: document.getElementById('resources'),
    perSecond: document.getElementById('per-second'),
    clickValue: document.getElementById('click-value'),
    clicker: document.getElementById('clicker'),
    producersContainer: document.getElementById('producers-container'),
    upgradesContainer: document.getElementById('upgrades-container'),
    prestigePoints: document.getElementById('prestige-points'),
    prestigeMultiplier: document.getElementById('prestige-multiplier'),
    prestigeToGain: document.getElementById('prestige-to-gain'),
    prestigeButton: document.getElementById('prestige-button'),
    saveButton: document.getElementById('save-button'),
    resetButton: document.getElementById('reset-button'),
    lastSave: document.getElementById('last-save')
};

// Fonction pour calculer la production par seconde
function calculateProduction() {
    let production = 0;
    
    game.producers.forEach(producer => {
        production += producer.count * producer.production;
    });
    
    return production * game.prestige.multiplier;
}

// Fonction pour calculer le coût d'un producteur
function getProducerCost(producer) {
    return Math.floor(producer.baseCost * Math.pow(producer.costMultiplier, producer.count));
}

// Fonction pour calculer les points de prestige à gagner
function calculatePrestigeGain() {
    // Formule: racine carrée de (ressources totales / 1e7)
    return Math.floor(Math.sqrt(game.totalResources / 1e7));
}

// Fonction pour mettre à jour l'interface utilisateur
function updateUI() {
    // Mise à jour des compteurs principaux
    elements.resources.textContent = formatNumber(game.resources);
    elements.perSecond.textContent = formatNumber(calculateProduction());
    elements.clickValue.textContent = formatNumber(game.clickValue);
    
    // Mise à jour des producteurs
    updateProducers();
    
    // Mise à jour des améliorations
    updateUpgrades();
    
    // Mise à jour du prestige
    updatePrestige();
}

// Mettre à jour l'affichage des producteurs
function updateProducers() {
    elements.producersContainer.innerHTML = '';
    
    game.producers.forEach((producer, index) => {
        // Vérifier si le producteur est déverrouillé
        if (!producer.unlocked) {
            if (game.resources >= producer.baseCost * 0.5 || game.totalResources >= producer.baseCost) {
                producer.unlocked = true;
            } else {
                return;
            }
        }
        
        const cost = getProducerCost(producer);
        const canBuy = game.resources >= cost;
        
        const producerElement = document.createElement('div');
        producerElement.className = 'producer-item';
        producerElement.innerHTML = `
            <div class="producer-info">
                <div class="producer-title">${producer.name} (${producer.count})</div>
                <div class="producer-stats">
                    Produit ${formatNumber(producer.production)} par seconde<br>
                    Total: ${formatNumber(producer.count * producer.production)} par seconde
                </div>
            </div>
            <button class="buy-button" data-producer="${index}" ${canBuy ? '' : 'disabled'}>
                Acheter: ${formatNumber(cost)}
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
        
        const canBuy = game.resources >= upgrade.cost;
        
        const upgradeElement = document.createElement('div');
        upgradeElement.className = 'upgrade-item';
        upgradeElement.innerHTML = `
            <div class="upgrade-info">
                <div class="upgrade-title">${upgrade.name}</div>
                <div class="upgrade-desc">${upgrade.description}</div>
            </div>
            <button class="buy-button" data-upgrade="${index}" ${canBuy ? '' : 'disabled'}>
                Acheter: ${formatNumber(upgrade.cost)}
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

// Mettre à jour l'affichage du prestige
function updatePrestige() {
    const pointsToGain = calculatePrestigeGain();
    
    elements.prestigePoints.textContent = game.prestige.points;
    elements.prestigeMultiplier.textContent = `x${game.prestige.multiplier.toFixed(2)}`;
    elements.prestigeToGain.textContent = pointsToGain;
    
    // Activer le bouton de prestige seulement si on peut gagner au moins 1 point
    elements.prestigeButton.disabled = pointsToGain < 1;
}

// Acheter un producteur
function buyProducer(index) {
    const producer = game.producers[index];
    const cost = getProducerCost(producer);
    
    if (game.resources >= cost) {
        game.resources -= cost;
        producer.count++;
        updateUI();
    }
}

// Acheter une amélioration
function buyUpgrade(index) {
    const upgrade = game.upgrades[index];
    
    if (game.resources >= upgrade.cost && !upgrade.purchased) {
        game.resources -= upgrade.cost;
        upgrade.purchased = true;
        upgrade.effect();
        updateUI();
    }
}

// Effectuer un prestige
function performPrestige() {
    const pointsToGain = calculatePrestigeGain();
    
    if (pointsToGain < 1) return;
    
    game.prestige.points += pointsToGain;
    game.prestige.multiplier = 1 + (game.prestige.points * 0.1); // +10% par point
    game.stats.prestigeCount++;
    
    // Réinitialiser le jeu tout en conservant le prestige
    game.resources = 0;
    game.totalResources = 0;
    
    // Réinitialiser les producteurs
    game.producers.forEach(producer => {
        producer.count = 0;
        producer.unlocked = producer.id === 'producer1'; // Seul le premier est déverrouillé
    });
    
    // Réinitialiser les améliorations
    game.upgrades.forEach(upgrade => {
        upgrade.purchased = false;
    });
    
    // Réinitialiser le clickValue
    game.clickValue = 1;
    
    // Mettre à jour l'interface
    updateUI();
    saveGame();
}

// Formater les grands nombres
function formatNumber(num) {
    if (num < 1000) return num.toFixed(1).replace(/\.0$/, '');
    
    const units = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp'];
    const order = Math.floor(Math.log10(num) / 3);
    
    return (num / Math.pow(10, order * 3)).toFixed(2).replace(/\.00$/, '') + units[order];
}

// Formater le temps
function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
}

// Sauvegarder le jeu
function saveGame() {
    const saveData = JSON.stringify(game);
    localStorage.setItem('incrementalGameSave', saveData);
    game.lastSave = Date.now();
    elements.lastSave.textContent = formatTime(game.lastSave);
}

// Charger le jeu
function loadGame() {
    const saveData = localStorage.getItem('incrementalGameSave');
    
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
                
                game.resources += offlineGain;
                game.totalResources += offlineGain;
                
                // Afficher un message (à implémenter avec une notification)
                console.log(`Vous avez gagné ${formatNumber(offlineGain)} ressources pendant votre absence!`);
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
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tout le jeu? Vous perdrez toute votre progression, y compris les points de prestige!')) {
        localStorage.removeItem('incrementalGameSave');
        location.reload();
    }
}

// Boucle principale du jeu
function gameLoop() {
    const currentTime = Date.now();
    const deltaTime = (currentTime - game.lastUpdate) / 1000; // en secondes
    
    // Mise à jour des ressources
    const production = calculateProduction();
    game.resources += production * deltaTime;
    game.totalResources += production * deltaTime;
    
    // Mise à jour des affichages qui changent constamment
    elements.resources.textContent = formatNumber(game.resources);
    elements.perSecond.textContent = formatNumber(production);
    
    // Vérification des déverrouillages (producteurs et améliorations)
    let needUIUpdate = false;
    
    // Vérifier si des producteurs peuvent être déverrouillés
    game.producers.forEach(producer => {
        if (!producer.unlocked && (game.resources >= producer.baseCost * 0.5 || game.totalResources >= producer.baseCost)) {
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
    
    // Sauvegarde automatique toutes les minutes
    if (currentTime - game.lastSave > 60000) {
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
    
    // Écouteurs d'événements
    elements.clicker.addEventListener('click', () => {
        // Ajouter la valeur du clic
        game.resources += game.clickValue * game.prestige.multiplier;
        game.totalResources += game.clickValue * game.prestige.multiplier;
        game.stats.clickCount++;
        
        // Effet d'animation
        elements.resources.classList.add('resource-gain');
        setTimeout(() => {
            elements.resources.classList.remove('resource-gain');
        }, 300);
        
        // Mise à jour immédiate
        elements.resources.textContent = formatNumber(game.resources);
        
        // Vérifier si une mise à jour complète est nécessaire
        updateUI();
    });
    
    elements.saveButton.addEventListener('click', saveGame);
    elements.resetButton.addEventListener('click', resetGame);
    elements.prestigeButton.addEventListener('click', performPrestige);
    
    // Démarrer la boucle de jeu
    gameLoop();
}

// Démarrer le jeu
init();
