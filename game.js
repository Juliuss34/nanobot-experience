// Configuration du jeu
const CONFIG = {
    saveKey: 'nanobotEmpireSave',
    tickRate: 100, // ms
    levels: [
        { name: "Débutant", requirement: 0, description: "Commencez votre empire technologique" },
        { name: "Apprenti", requirement: 100, description: "Vos premiers nanobots prennent forme" },
        { name: "Ingénieur", requirement: 1000, description: "Maîtrisez la production automatisée" },
        { name: "Scientifique", requirement: 10000, description: "Débloquez la recherche avancée" },
        { name: "Innovateur", requirement: 100000, description: "Créez des technologies révolutionnaires" },
        { name: "Visionnaire", requirement: 1000000, description: "Votre empire s'étend à travers les dimensions" }
    ],
    upgrades: [
        {
            id: 'basic_production',
            name: 'Production de base',
            description: 'Augmente la production de nanobots',
            baseCost: 10,
            costMultiplier: 1.15,
            effect: 1,
            maxLevel: Infinity,
            unlockLevel: 0
        },
        {
            id: 'energy_efficiency',
            name: 'Efficacité énergétique',
            description: 'Réduit la consommation d\'énergie',
            baseCost: 50,
            costMultiplier: 1.2,
            effect: 0.1,
            maxLevel: 20,
            unlockLevel: 1
        },
        {
            id: 'auto_research',
            name: 'Recherche automatique',
            description: 'Génère automatiquement des points de recherche',
            baseCost: 200,
            costMultiplier: 1.3,
            effect: 1,
            maxLevel: 10,
            unlockLevel: 2
        },
        {
            id: 'quantum_boost',
            name: 'Amplificateur quantique',
            description: 'Multiplie la production par 2',
            baseCost: 1000,
            costMultiplier: 2,
            effect: 2,
            maxLevel: 5,
            unlockLevel: 3
        },
        {
            id: 'dimensional_mining',
            name: 'Extraction dimensionnelle',
            description: 'Génère des matériaux rares',
            baseCost: 5000,
            costMultiplier: 1.5,
            effect: 1,
            maxLevel: 15,
            unlockLevel: 4
        }
    ],
    achievements: [
        { id: 'first_nanobot', name: 'Premier Nanobot', description: 'Produisez votre premier nanobot', icon: '🤖', requirement: 1 },
        { id: 'hundred_nanobots', name: 'Centurion', description: 'Possédez 100 nanobots', icon: '💯', requirement: 100 },
        { id: 'thousand_nanobots', name: 'Millénaire', description: 'Possédez 1000 nanobots', icon: '🏭', requirement: 1000 },
        { id: 'first_upgrade', name: 'Amélioration', description: 'Achetez votre première amélioration', icon: '⬆️', requirement: 1 },
        { id: 'researcher', name: 'Chercheur', description: 'Générez 100 points de recherche', icon: '🔬', requirement: 100 },
        { id: 'energy_master', name: 'Maître de l\'énergie', description: 'Atteignez 1000 d\'énergie', icon: '⚡', requirement: 1000 },
        { id: 'first_prestige', name: 'Renaissance', description: 'Effectuez votre premier prestige', icon: '✨', requirement: 1 }
    ]
};

// État du jeu
let gameState = {
    // Ressources
    nanobots: 0,
    energy: 100,
    research: 0,
    rareMaterials: 0,
    
    // Production
    productionRate: 0,
    energyRate: 1,
    researchRate: 0,
    rareMaterialsRate: 0,
    
    // Progression
    level: 0,
    totalNanobotsProduced: 0,
    totalEnergyUsed: 0,
    totalResearchGenerated: 0,
    
    // Prestige
    prestigePoints: 0,
    prestigeLevel: 0,
    totalPrestiges: 0,
    
    // Améliorations
    upgrades: {},
    
    // Succès
    achievements: {},
    
    // Statistiques
    stats: {
        totalClicks: 0,
        totalUpgradesPurchased: 0,
        gameStartTime: Date.now(),
        totalPlayTime: 0
    },
    
    // Méta
    lastSave: null,
    version: '1.0.0'
};

// Éléments DOM
const elements = {};

// Initialisation
function init() {
    console.log("🚀 Initialisation de Nanobot Empire");
    
    // Récupérer les éléments DOM
    cacheElements();
    
    // Charger la sauvegarde
    loadGame();
    
    // Initialiser les améliorations
    initializeUpgrades();
    
    // Configurer les événements
    setupEventListeners();
    
    // Mettre à jour l'interface
    updateUI();
    
    // Démarrer la boucle de jeu
    startGameLoop();
    
    console.log("✅ Initialisation terminée");
}

function cacheElements() {
    const elementIds = [
        'menu', 'game', 'achievements-panel', 'stats-panel',
        'nanobots', 'energy', 'research', 'rare-materials', 'per-second',
        'level-display', 'level-progress', 'level-description', 'prestige-points',
        'upgrades-container', 'achievements-container', 'stats-container',
        'prestige-panel', 'prestige-gain', 'notification'
    ];
    
    elementIds.forEach(id => {
        elements[id] = document.getElementById(id);
    });
}

function setupEventListeners() {
    // Menu principal
    document.getElementById('btn-new-game').addEventListener('click', newGame);
    document.getElementById('btn-continue').addEventListener('click', continueGame);
    document.getElementById('btn-achievements').addEventListener('click', showAchievements);
    document.getElementById('btn-stats').addEventListener('click', showStats);
    document.getElementById('btn-reset').addEventListener('click', resetGame);
    
    // Jeu
    document.getElementById('btn-produce').addEventListener('click', produceNanobots);
    document.getElementById('btn-research').addEventListener('click', doResearch);
    document.getElementById('btn-save').addEventListener('click', saveGame);
    document.getElementById('btn-back').addEventListener('click', backToMenu);
    document.getElementById('btn-prestige').addEventListener('click', doPrestige);
    
    // Navigation
    document.getElementById('btn-back-achievements').addEventListener('click', backToMenu);
    document.getElementById('btn-back-stats').addEventListener('click', backToMenu);
    
    // Sauvegarde automatique
    setInterval(saveGame, 30000); // Sauvegarde toutes les 30 secondes
}

function initializeUpgrades() {
    CONFIG.upgrades.forEach(upgrade => {
        if (!gameState.upgrades[upgrade.id]) {
            gameState.upgrades[upgrade.id] = {
                level: 0,
                totalPurchased: 0
            };
        }
    });
}

// Fonctions du menu
function newGame() {
    console.log("🆕 Nouvelle partie");
    
    // Réinitialiser l'état (sauf les succès et stats globales)
    const preservedAchievements = { ...gameState.achievements };
    const preservedStats = { ...gameState.stats };
    
    gameState = {
        nanobots: 0,
        energy: 100,
        research: 0,
        rareMaterials: 0,
        productionRate: 0,
        energyRate: 1,
        researchRate: 0,
        rareMaterialsRate: 0,
        level: 0,
        totalNanobotsProduced: 0,
        totalEnergyUsed: 0,
        totalResearchGenerated: 0,
        prestigePoints: 0,
        prestigeLevel: 0,
        totalPrestiges: 0,
        upgrades: {},
        achievements: preservedAchievements,
        stats: {
            ...preservedStats,
            gameStartTime: Date.now()
        },
        lastSave: null,
        version: '1.0.0'
    };
    
    initializeUpgrades();
    showGame();
    updateUI();
    showNotification("Nouvelle partie démarrée!", "success");
}

function continueGame() {
    console.log("📁 Continuer la partie");
    
    if (gameState.lastSave) {
        showGame();
        showNotification("Partie chargée!", "success");
    } else {
        showNotification("Aucune sauvegarde trouvée!", "warning");
    }
}

function resetGame() {
    console.log("🔄 Réinitialisation");
    
    if (confirm("⚠️ Êtes-vous sûr de vouloir réinitialiser toutes les données?\nCette action est irréversible et supprimera tous vos progrès!")) {
        localStorage.removeItem(CONFIG.saveKey);
        location.reload();
    }
}

function showAchievements() {
    hideAllPanels();
    elements['achievements-panel'].style.display = 'block';
    updateAchievementsDisplay();
}

function showStats() {
    hideAllPanels();
    elements['stats-panel'].style.display = 'block';
    updateStatsDisplay();
}

function showGame() {
    hideAllPanels();
    elements.game.style.display = 'block';
}

function backToMenu() {
    saveGame();
    hideAllPanels();
    elements.menu.style.display = 'block';
}

function hideAllPanels() {
    elements.menu.style.display = 'none';
    elements.game.style.display = 'none';
    elements['achievements-panel'].style.display = 'none';
    elements['stats-panel'].style.display = 'none';
}

// Fonctions de jeu
function produceNanobots() {
    if (gameState.energy >= 1) {
        gameState.nanobots += 1 + getPrestigeBonus();
        gameState.energy -= 1;
        gameState.totalNanobotsProduced += 1;
        gameState.totalEnergyUsed += 1;
        gameState.stats.totalClicks += 1;
        
        checkAchievements();
        updateUI();
    } else {
        showNotification("Pas assez d'énergie!", "warning");
    }
}

function doResearch() {
    if (gameState.energy >= 5) {
        gameState.research += 1 + Math.floor(getPrestigeBonus() / 2);
        gameState.energy -= 5;
        gameState.totalResearchGenerated += 1;
        gameState.totalEnergyUsed += 5;
        
        checkAchievements();
        updateUI();
    } else {
        showNotification("Pas assez d'énergie pour la recherche!", "warning");
    }
}

function buyUpgrade(upgradeId) {
    const upgrade = CONFIG.upgrades.find(u => u.id === upgradeId);
    const currentLevel = gameState.upgrades[upgradeId].level;
    
    if (currentLevel >= upgrade.maxLevel) {
        showNotification("Amélioration au niveau maximum!", "warning");
        return;
    }
    
    const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));
    
    if (gameState.nanobots >= cost) {
        gameState.nanobots -= cost;
        gameState.upgrades[upgradeId].level += 1;
        gameState.upgrades[upgradeId].totalPurchased += 1;
        gameState.stats.totalUpgradesPurchased += 1;
        
        applyUpgradeEffects();
        checkAchievements();
        updateUI();
        
        showNotification(`${upgrade.name} amélioré!`, "success");
    } else {
        showNotification("Pas assez de nanobots!", "warning");
    }
}

function applyUpgradeEffects() {
    // Réinitialiser les taux
    gameState.productionRate = 0;
    gameState.researchRate = 0;
    gameState.rareMaterialsRate = 0;
    
    // Appliquer les effets des améliorations
    const basicProd = gameState.upgrades.basic_production.level;
    const autoResearch = gameState.upgrades.auto_research.level;
    const dimMining = gameState.upgrades.dimensional_mining.level;
    const quantumBoost = gameState.upgrades.quantum_boost.level;
    
    gameState.productionRate = basicProd * (1 + quantumBoost);
    gameState.researchRate = autoResearch * 0.5;
    gameState.rareMaterialsRate = dimMining * 0.1;
    
    // Bonus de prestige
    const prestigeMultiplier = 1 + (gameState.prestigePoints * 0.1);
    gameState.productionRate *= prestigeMultiplier;
    gameState.researchRate *= prestigeMultiplier;
}

function doPrestige() {
    const prestigeGain = calculatePrestigeGain();
    
    if (prestigeGain > 0 && confirm(`Êtes-vous sûr de vouloir faire un prestige?\nVous gagnerez ${prestigeGain} points de prestige mais perdrez tous vos nanobots et améliorations.`)) {
        gameState.prestigePoints += prestigeGain;
        gameState.totalPrestiges += 1;
        gameState.prestigeLevel += 1;
        
        // Réinitialiser les ressources et améliorations
        gameState.nanobots = 0;
        gameState.energy = 100;
        gameState.research = 0;
        gameState.rareMaterials = 0;
        gameState.level = 0;
        
        // Réinitialiser les améliorations
        Object.keys(gameState.upgrades).forEach(key => {
            gameState.upgrades[key].level = 0;
        });
        
        applyUpgradeEffects();
        checkAchievements();
        updateUI();
        
        showNotification(`Prestige effectué! +${prestigeGain} points de prestige`, "success");
    }
}

function calculatePrestigeGain() {
    if (gameState.totalNanobotsProduced < 1000000) return 0;
    return Math.floor(Math.sqrt(gameState.totalNanobotsProduced / 1000000));
}

function getPrestigeBonus() {
    return gameState.prestigePoints * 0.1;
}

// Système de niveaux
function updateLevel() {
    const currentLevel = gameState.level;
    const nextLevel = CONFIG.levels[currentLevel + 1];
    
    if (nextLevel && gameState.totalNanobotsProduced >= nextLevel.requirement) {
        gameState.level += 1;
        showNotification(`Niveau ${gameState.level + 1} atteint: ${CONFIG.levels[gameState.level].name}!`, "success");
        
        // Débloquer le prestige au niveau 3
        if (gameState.level >= 3) {
            elements['prestige-panel'].style.display = 'block';
        }
    }
}

// Système de succès
function checkAchievements() {
    CONFIG.achievements.forEach(achievement => {
        if (!gameState.achievements[achievement.id]) {
            let unlocked = false;
            
            switch (achievement.id) {
                case 'first_nanobot':
                    unlocked = gameState.totalNanobotsProduced >= 1;
                    break;
                case 'hundred_nanobots':
                    unlocked = gameState.nanobots >= 100;
                    break;
                case 'thousand_nanobots':
                    unlocked = gameState.nanobots >= 1000;
                    break;
                case 'first_upgrade':
                    unlocked = gameState.stats.totalUpgradesPurchased >= 1;
                    break;
                case 'researcher':
                    unlocked = gameState.totalResearchGenerated >= 100;
                    break;
                case 'energy_master':
                    unlocked = gameState.energy >= 1000;
                    break;
                case 'first_prestige':
                    unlocked = gameState.totalPrestiges >= 1;
                    break;
            }
            
            if (unlocked) {
                gameState.achievements[achievement.id] = {
                    unlocked: true,
                    unlockedAt: Date.now()
                };
                showNotification(`🏆 Succès débloqué: ${achievement.name}!`, "success");
            }
        }
    });
}

// Boucle de jeu
function gameLoop() {
    const deltaTime = CONFIG.tickRate / 1000; // Convertir en secondes
    
    // Production automatique
    gameState.nanobots += gameState.productionRate * deltaTime;
    gameState.research += gameState.researchRate * deltaTime;
    gameState.rareMaterials += gameState.rareMaterialsRate * deltaTime;
    
    // Régénération d'énergie
    gameState.energy += gameState.energyRate * deltaTime;
    gameState.energy = Math.min(gameState.energy, 100 + (gameState.level * 50));
    
    // Mise à jour du niveau
    updateLevel();
    
    // Mise à jour de l'interface
    updateUI();
    
    // Mise à jour du temps de jeu
    gameState.stats.totalPlayTime = Date.now() - gameState.stats.gameStartTime;
}

function startGameLoop() {
    setInterval(gameLoop, CONFIG.tickRate);
}

// Interface utilisateur
function updateUI() {
    // Ressources
    elements.nanobots.textContent = formatNumber(gameState.nanobots);
    elements.energy.textContent = formatNumber(gameState.energy);
    elements.research.textContent = formatNumber(gameState.research);
    elements['rare-materials'].textContent = formatNumber(gameState.rareMaterials);
    elements['per-second'].textContent = formatNumber(gameState.productionRate);
    
    // Niveau et prestige
    const currentLevelInfo = CONFIG.levels[gameState.level];
    elements['level-display'].textContent = `Niveau ${gameState.level + 1}: ${currentLevelInfo.name}`;
    elements['level-description'].textContent = currentLevelInfo.description;
    elements['prestige-points'].textContent = gameState.prestigePoints;
    
    // Barre de progression du niveau
    const nextLevel = CONFIG.levels[gameState.level + 1];
    if (nextLevel) {
        const progress = Math.min(100, (gameState.totalNanobotsProduced / nextLevel.requirement) * 100);
        elements['level-progress'].style.width = progress + '%';
    } else {
        elements['level-progress'].style.width = '100%';
    }
    
    // Prestige
    const prestigeGain = calculatePrestigeGain();
    elements['prestige-gain'].textContent = prestigeGain;
    document.getElementById('btn-prestige').disabled = prestigeGain === 0;
    
    // Améliorations
    updateUpgradesDisplay();
}

function updateUpgradesDisplay() {
    const container = elements['upgrades-container'];
    container.innerHTML = '';
    
    CONFIG.upgrades.forEach(upgrade => {
        if (gameState.level >= upgrade.unlockLevel) {
            const upgradeElement = createUpgradeElement(upgrade);
            container.appendChild(upgradeElement);
        }
    });
}

function createUpgradeElement(upgrade) {
    const currentLevel = gameState.upgrades[upgrade.id].level;
    const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));
    const canAfford = gameState.nanobots >= cost;
    const maxLevel = currentLevel >= upgrade.maxLevel;
    
    const div = document.createElement('div');
    div.className = 'upgrade-item';
    div.innerHTML = `
        <div class="upgrade-header">
            <span class="upgrade-name">${upgrade.name}</span>
            <span class="upgrade-cost">${maxLevel ? 'MAX' : formatNumber(cost) + ' 🤖'}</span>
        </div>
        <div class="upgrade-description">${upgrade.description}</div>
        <div class="upgrade-owned">Niveau: ${currentLevel}/${upgrade.maxLevel === Infinity ? '∞' : upgrade.maxLevel}</div>
    `;
    
    if (!maxLevel) {
        div.style.cursor = 'pointer';
        div.style.opacity = canAfford ? '1' : '0.6';
        div.addEventListener('click', () => buyUpgrade(upgrade.id));
    } else {
        div.style.opacity = '0.8';
    }
    
    return div;
}

function updateAchievementsDisplay() {
    const container = elements['achievements-container'];
    container.innerHTML = '';
    
    CONFIG.achievements.forEach(achievement => {
        const unlocked = gameState.achievements[achievement.id]?.unlocked || false;
        
        const div = document.createElement('div');
        div.className = `achievement ${unlocked ? 'unlocked' : ''}`;
        div.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div><strong>${achievement.name}</strong></div>
            <div style="font-size: 0.9rem; color: var(--text-muted);">${achievement.description}</div>
        `;
        
        container.appendChild(div);
    });
}

function updateStatsDisplay() {
    const container = elements['stats-container'];
    const stats = [
        { label: 'Nanobots produits', value: formatNumber(gameState.totalNanobotsProduced) },
        { label: 'Énergie utilisée', value: formatNumber(gameState.totalEnergyUsed) },
        { label: 'Recherche générée', value: formatNumber(gameState.totalResearchGenerated) },
        { label: 'Clics totaux', value: formatNumber(gameState.stats.totalClicks) },
        { label: 'Améliorations achetées', value: formatNumber(gameState.stats.totalUpgradesPurchased) },
        { label: 'Prestiges effectués', value: formatNumber(gameState.totalPrestiges) },
        { label: 'Temps de jeu', value: formatTime(gameState.stats.totalPlayTime) },
        { label: 'Niveau actuel', value: gameState.level + 1 }
    ];
    
    container.innerHTML = '';
    stats.forEach(stat => {
        const div = document.createElement('div');
        div.className = 'stat-item';
        div.innerHTML = `
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        container.appendChild(div);
    });
}

// Utilitaires
function formatNumber(num) {
    if (num < 1000) return Math.floor(num).toString();
    if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
    if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
    return (num / 1000000000000).toFixed(1) + 'T';
}

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}j ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

function showNotification(message, type = 'info') {
    const notification = elements.notification;
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Sauvegarde et chargement
function saveGame() {
    gameState.lastSave = new Date().toISOString();
    localStorage.setItem(CONFIG.saveKey, JSON.stringify(gameState));
    console.log("💾 Jeu sauvegardé");
}

function loadGame() {
    const savedGame = localStorage.getItem(CONFIG.saveKey);
    if (savedGame) {
        try {
            const loaded = JSON.parse(savedGame);
            gameState = { ...gameState, ...loaded };
            
            // Calculer le temps hors ligne
            if (gameState.lastSave) {
                const offlineTime = Date.now() - new Date(gameState.lastSave).getTime();
                const offlineSeconds = offlineTime / 1000;
                
                if (offlineSeconds > 60) { // Plus d'une minute hors ligne
                    const offlineProduction = gameState.productionRate * offlineSeconds;
                    gameState.nanobots += offlineProduction;
                    
                    showNotification(`Bienvenue! Vous avez produit ${formatNumber(offlineProduction)} nanobots hors ligne.`, "success");
                }
            }
            
            applyUpgradeEffects();
            console.log("📁 Sauvegarde chargée");
        } catch (error) {
            console.error("❌ Erreur lors du chargement:", error);
        }
    }
}

// Initialiser le jeu au chargement de la page
document.addEventListener('DOMContentLoaded', init);