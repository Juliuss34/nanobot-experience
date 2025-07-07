// Configuration du jeu V2
const CONFIG = {
    saveKey: 'nanobotEmpireV2Save',
    tickRate: 50, // ms - Plus fluide
    autoSaveInterval: 15000, // 15 secondes
    
    levels: [
        { name: "Débutant", requirement: 0, description: "Commencez votre empire technologique", energyBonus: 0 },
        { name: "Apprenti", requirement: 100, description: "Vos premiers nanobots prennent forme", energyBonus: 25 },
        { name: "Ingénieur", requirement: 1000, description: "Maîtrisez la production automatisée", energyBonus: 50 },
        { name: "Scientifique", requirement: 10000, description: "Débloquez la recherche avancée", energyBonus: 100 },
        { name: "Innovateur", requirement: 100000, description: "Créez des technologies révolutionnaires", energyBonus: 200 },
        { name: "Visionnaire", requirement: 1000000, description: "Votre empire s'étend à travers les dimensions", energyBonus: 500 }
    ],
    
    upgrades: [
        {
            id: 'basic_production',
            name: 'Production de base',
            description: 'Augmente la production automatique de nanobots',
            category: 'production',
            baseCost: 10,
            costMultiplier: 1.15,
            effect: 1,
            maxLevel: 50,
            unlockLevel: 0,
            icon: '🏭'
        },
        {
            id: 'energy_efficiency',
            name: 'Efficacité énergétique',
            description: 'Réduit la consommation d\'énergie des actions',
            category: 'efficiency',
            baseCost: 50,
            costMultiplier: 1.2,
            effect: 0.1,
            maxLevel: 20,
            unlockLevel: 1,
            icon: '⚡'
        },
        {
            id: 'auto_research',
            name: 'Recherche automatique',
            description: 'Génère automatiquement des points de recherche',
            category: 'production',
            baseCost: 200,
            costMultiplier: 1.3,
            effect: 0.5,
            maxLevel: 15,
            unlockLevel: 2,
            icon: '🔬'
        },
        {
            id: 'quantum_boost',
            name: 'Amplificateur quantique',
            description: 'Multiplie toute la production par 2',
            category: 'special',
            baseCost: 1000,
            costMultiplier: 2.5,
            effect: 2,
            maxLevel: 8,
            unlockLevel: 3,
            icon: '⚛️'
        },
        {
            id: 'dimensional_mining',
            name: 'Extraction dimensionnelle',
            description: 'Génère des matériaux rares automatiquement',
            category: 'production',
            baseCost: 5000,
            costMultiplier: 1.8,
            effect: 0.2,
            maxLevel: 12,
            unlockLevel: 4,
            icon: '💎'
        },
        {
            id: 'energy_core',
            name: 'Cœur énergétique',
            description: 'Augmente la capacité et régénération d\'énergie',
            category: 'efficiency',
            baseCost: 2500,
            costMultiplier: 1.6,
            effect: 50,
            maxLevel: 10,
            unlockLevel: 2,
            icon: '🔋'
        },
        {
            id: 'neural_network',
            name: 'Réseau neuronal',
            description: 'Améliore l\'efficacité de toutes les améliorations',
            category: 'special',
            baseCost: 15000,
            costMultiplier: 3,
            effect: 1.5,
            maxLevel: 5,
            unlockLevel: 5,
            icon: '🧠'
        }
    ],
    
    achievements: [
        { id: 'first_nanobot', name: 'Premier Nanobot', description: 'Produisez votre premier nanobot', icon: '🤖', requirement: 1, type: 'nanobots_produced' },
        { id: 'hundred_nanobots', name: 'Centurion', description: 'Possédez 100 nanobots', icon: '💯', requirement: 100, type: 'nanobots_owned' },
        { id: 'thousand_nanobots', name: 'Millénaire', description: 'Possédez 1000 nanobots', icon: '🏭', requirement: 1000, type: 'nanobots_owned' },
        { id: 'million_nanobots', name: 'Magnat', description: 'Possédez 1 million de nanobots', icon: '🏆', requirement: 1000000, type: 'nanobots_owned' },
        { id: 'first_upgrade', name: 'Amélioration', description: 'Achetez votre première amélioration', icon: '⬆️', requirement: 1, type: 'upgrades_bought' },
        { id: 'ten_upgrades', name: 'Collectionneur', description: 'Achetez 10 améliorations', icon: '📦', requirement: 10, type: 'upgrades_bought' },
        { id: 'researcher', name: 'Chercheur', description: 'Générez 100 points de recherche', icon: '🔬', requirement: 100, type: 'research_generated' },
        { id: 'energy_master', name: 'Maître de l\'énergie', description: 'Atteignez 1000 d\'énergie', icon: '⚡', requirement: 1000, type: 'energy_max' },
        { id: 'first_prestige', name: 'Renaissance', description: 'Effectuez votre premier prestige', icon: '✨', requirement: 1, type: 'prestiges' },
        { id: 'speed_demon', name: 'Démon de vitesse', description: 'Cliquez 1000 fois', icon: '👆', requirement: 1000, type: 'clicks' },
        { id: 'materials_collector', name: 'Collectionneur de matériaux', description: 'Possédez 100 matériaux rares', icon: '💎', requirement: 100, type: 'materials_owned' }
    ],
    
    settings: {
        autoSave: true,
        notifications: true,
        particles: true,
        soundEffects: false
    }
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
    energyCapacity: 100,
    
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
        totalPlayTime: 0,
        maxNanobotsOwned: 0,
        maxEnergyReached: 100
    },
    
    // Paramètres
    settings: { ...CONFIG.settings },
    
    // Méta
    lastSave: null,
    version: '2.0.0'
};

// Variables globales
let currentScreen = 'main-menu';
let gameLoopInterval = null;
let autoSaveInterval = null;
let particlesInterval = null;
let currentFilter = 'all';

// Éléments DOM
const elements = {};

// Initialisation
function init() {
    console.log("🚀 Initialisation de Nanobot Empire V2");
    
    cacheElements();
    loadGame();
    initializeUpgrades();
    setupEventListeners();
    initializeParticles();
    updateUI();
    startGameLoop();
    
    // Afficher le menu ou continuer selon la sauvegarde
    if (gameState.lastSave) {
        updateContinueButton();
    }
    
    console.log("✅ Initialisation terminée");
}

function cacheElements() {
    // Écrans
    elements.mainMenu = document.getElementById('main-menu');
    elements.gameScreen = document.getElementById('game-screen');
    elements.achievementsScreen = document.getElementById('achievements-screen');
    elements.statsScreen = document.getElementById('stats-screen');
    elements.settingsScreen = document.getElementById('settings-screen');
    
    // Ressources
    elements.nanobots = document.getElementById('nanobots');
    elements.energy = document.getElementById('energy');
    elements.research = document.getElementById('research');
    elements.rareMaterials = document.getElementById('rare-materials');
    elements.nanobotsRate = document.getElementById('nanobots-rate');
    elements.researchRate = document.getElementById('research-rate');
    elements.materialsRate = document.getElementById('materials-rate');
    elements.energyMax = document.getElementById('energy-max');
    elements.energyFill = document.getElementById('energy-fill');
    
    // Interface
    elements.levelDisplay = document.getElementById('level-display');
    elements.levelProgress = document.getElementById('level-progress');
    elements.levelProgressText = document.getElementById('level-progress-text');
    elements.prestigePoints = document.getElementById('prestige-points');
    elements.prestigeGain = document.getElementById('prestige-gain');
    elements.prestigePanel = document.getElementById('prestige-panel');
    
    // Conteneurs
    elements.upgradesContainer = document.getElementById('upgrades-container');
    elements.achievementsContainer = document.getElementById('achievements-container');
    elements.statsContainer = document.getElementById('stats-container');
    elements.toastContainer = document.getElementById('toast-container');
    
    // Compteurs
    elements.achievementsCount = document.getElementById('achievements-count');
    elements.achievementsUnlocked = document.getElementById('achievements-unlocked');
    elements.achievementsTotal = document.getElementById('achievements-total');
    
    // Modal
    elements.modalOverlay = document.getElementById('modal-overlay');
    elements.modalTitle = document.getElementById('modal-title');
    elements.modalMessage = document.getElementById('modal-message');
    elements.modalConfirm = document.getElementById('modal-confirm');
    elements.modalCancel = document.getElementById('modal-cancel');
    
    // Vérifier que tous les éléments critiques existent
    const criticalElements = [
        'main-menu', 'game-screen', 'nanobots', 'energy', 'upgrades-container', 'toast-container'
    ];
    
    criticalElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.error(`Élément critique manquant: ${id}`);
        }
    });
}

function setupEventListeners() {
    // Menu principal
    document.getElementById('btn-new-game').addEventListener('click', newGame);
    document.getElementById('btn-continue').addEventListener('click', continueGame);
    document.getElementById('btn-achievements').addEventListener('click', () => showScreen('achievements-screen'));
    document.getElementById('btn-stats').addEventListener('click', () => showScreen('stats-screen'));
    document.getElementById('btn-settings').addEventListener('click', () => showScreen('settings-screen'));
    
    // Jeu
    document.getElementById('btn-produce').addEventListener('click', produceNanobots);
    document.getElementById('btn-research').addEventListener('click', doResearch);
    document.getElementById('btn-save').addEventListener('click', saveGame);
    document.getElementById('btn-menu').addEventListener('click', () => showScreen('main-menu'));
    document.getElementById('btn-prestige').addEventListener('click', doPrestige);
    
    // Navigation
    document.getElementById('btn-back-achievements').addEventListener('click', () => showScreen('main-menu'));
    document.getElementById('btn-back-stats').addEventListener('click', () => showScreen('main-menu'));
    document.getElementById('btn-back-settings').addEventListener('click', () => showScreen('main-menu'));
    
    // Filtres d'améliorations
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFilter = e.target.dataset.filter;
            updateUpgradeFilters();
            updateUpgradesDisplay();
        });
    });
    
    // Paramètres
    document.getElementById('auto-save').addEventListener('change', (e) => {
        gameState.settings.autoSave = e.target.checked;
        if (e.target.checked) {
            startAutoSave();
        } else {
            stopAutoSave();
        }
    });
    
    document.getElementById('notifications').addEventListener('change', (e) => {
        gameState.settings.notifications = e.target.checked;
    });
    
    document.getElementById('particles-toggle').addEventListener('change', (e) => {
        gameState.settings.particles = e.target.checked;
        if (e.target.checked) {
            initializeParticles();
        } else {
            clearParticles();
        }
    });
    
    document.getElementById('btn-export').addEventListener('click', exportSave);
    document.getElementById('btn-import').addEventListener('click', importSave);
    document.getElementById('btn-reset-confirm').addEventListener('click', () => {
        showModal('Réinitialisation', 'Êtes-vous sûr de vouloir réinitialiser toutes les données? Cette action est irréversible!', resetGame);
    });
    
    // Modal
    document.getElementById('modal-close').addEventListener('click', hideModal);
    document.getElementById('modal-cancel').addEventListener('click', hideModal);
    elements.modalOverlay.addEventListener('click', (e) => {
        if (e.target === elements.modalOverlay) hideModal();
    });
    
    // Raccourcis clavier
    document.addEventListener('keydown', handleKeyboard);
}

function handleKeyboard(e) {
    if (currentScreen !== 'game-screen') return;
    
    switch(e.key) {
        case ' ':
            e.preventDefault();
            produceNanobots();
            break;
        case 'r':
            doResearch();
            break;
        case 's':
            saveGame();
            break;
        case 'p':
            if (calculatePrestigeGain() > 0) doPrestige();
            break;
    }
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

// Gestion des écrans
function showScreen(screenId) {
    // Masquer tous les écrans
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Afficher l'écran demandé
    document.getElementById(screenId).classList.add('active');
    currentScreen = screenId;
    
    // Mettre à jour le contenu selon l'écran
    switch(screenId) {
        case 'achievements-screen':
            updateAchievementsDisplay();
            break;
        case 'stats-screen':
            updateStatsDisplay();
            break;
        case 'settings-screen':
            updateSettingsDisplay();
            break;
        case 'game-screen':
            updateUI();
            break;
    }
}

// Fonctions du menu
function newGame() {
    showModal('Nouvelle partie', 'Commencer une nouvelle partie? Vos succès seront conservés mais tout le reste sera réinitialisé.', () => {
        const preservedAchievements = { ...gameState.achievements };
        const preservedStats = {
            gameStartTime: Date.now(),
            totalPlayTime: gameState.stats.totalPlayTime
        };
        
        gameState = {
            nanobots: 0,
            energy: 100,
            research: 0,
            rareMaterials: 0,
            productionRate: 0,
            energyRate: 1,
            researchRate: 0,
            rareMaterialsRate: 0,
            energyCapacity: 100,
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
                totalClicks: 0,
                totalUpgradesPurchased: 0,
                maxNanobotsOwned: 0,
                maxEnergyReached: 100,
                ...preservedStats
            },
            settings: { ...CONFIG.settings },
            lastSave: null,
            version: '2.0.0'
        };
        
        initializeUpgrades();
        showScreen('game-screen');
        updateUI();
        showToast('Nouvelle partie démarrée!', 'success');
    });
}

function continueGame() {
    if (gameState.lastSave) {
        showScreen('game-screen');
        showToast('Partie chargée!', 'success');
    } else {
        showToast('Aucune sauvegarde trouvée!', 'warning');
    }
}

function updateContinueButton() {
    const continueBtn = document.getElementById('btn-continue');
    if (gameState.lastSave) {
        continueBtn.classList.remove('secondary');
        continueBtn.classList.add('primary');
    }
}

// Fonctions de jeu
function produceNanobots() {
    const energyCost = Math.max(1, 1 - (gameState.upgrades.energy_efficiency?.level || 0) * 0.05);
    
    if (gameState.energy >= energyCost) {
        const production = 1 + getPrestigeBonus();
        gameState.nanobots += production;
        gameState.energy -= energyCost;
        gameState.totalNanobotsProduced += production;
        gameState.totalEnergyUsed += energyCost;
        gameState.stats.totalClicks += 1;
        gameState.stats.maxNanobotsOwned = Math.max(gameState.stats.maxNanobotsOwned, gameState.nanobots);
        
        // Animation du bouton
        const btn = document.getElementById('btn-produce');
        btn.classList.add('clicked');
        setTimeout(() => btn.classList.remove('clicked'), 200);
        
        checkAchievements();
        updateUI();
    } else {
        showToast('Pas assez d\'énergie!', 'warning');
    }
}

function doResearch() {
    const energyCost = Math.max(3, 5 - (gameState.upgrades.energy_efficiency?.level || 0) * 0.2);
    
    if (gameState.energy >= energyCost) {
        const research = 1 + Math.floor(getPrestigeBonus() / 2);
        gameState.research += research;
        gameState.energy -= energyCost;
        gameState.totalResearchGenerated += research;
        gameState.totalEnergyUsed += energyCost;
        
        // Animation du bouton
        const btn = document.getElementById('btn-research');
        btn.classList.add('clicked');
        setTimeout(() => btn.classList.remove('clicked'), 200);
        
        checkAchievements();
        updateUI();
    } else {
        showToast('Pas assez d\'énergie pour la recherche!', 'warning');
    }
}

function buyUpgrade(upgradeId) {
    const upgrade = CONFIG.upgrades.find(u => u.id === upgradeId);
    const currentLevel = gameState.upgrades[upgradeId].level;
    
    if (currentLevel >= upgrade.maxLevel) {
        showToast('Amélioration au niveau maximum!', 'warning');
        return;
    }
    
    const cost = calculateUpgradeCost(upgrade, currentLevel);
    
    if (gameState.nanobots >= cost) {
        gameState.nanobots -= cost;
        gameState.upgrades[upgradeId].level += 1;
        gameState.upgrades[upgradeId].totalPurchased += 1;
        gameState.stats.totalUpgradesPurchased += 1;
        
        // Animation de l'amélioration
        const upgradeElement = document.querySelector(`[data-upgrade="${upgradeId}"]`);
        if (upgradeElement) {
            upgradeElement.classList.add('just-bought');
            setTimeout(() => upgradeElement.classList.remove('just-bought'), 500);
        }
        
        applyUpgradeEffects();
        checkAchievements();
        updateUI();
        
        showToast(`${upgrade.name} amélioré! (Niveau ${currentLevel + 1})`, 'success');
    } else {
        showToast('Pas assez de nanobots!', 'warning');
    }
}

function calculateUpgradeCost(upgrade, level) {
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, level));
}

function applyUpgradeEffects() {
    // Réinitialiser les taux
    gameState.productionRate = 0;
    gameState.researchRate = 0;
    gameState.rareMaterialsRate = 0;
    gameState.energyCapacity = 100 + (gameState.level * CONFIG.levels[gameState.level]?.energyBonus || 0);
    
    // Appliquer les effets des améliorations
    const upgrades = gameState.upgrades;
    
    // Production de base
    gameState.productionRate += (upgrades.basic_production?.level || 0) * 1;
    
    // Recherche automatique
    gameState.researchRate += (upgrades.auto_research?.level || 0) * 0.5;
    
    // Extraction dimensionnelle
    gameState.rareMaterialsRate += (upgrades.dimensional_mining?.level || 0) * 0.2;
    
    // Cœur énergétique
    gameState.energyCapacity += (upgrades.energy_core?.level || 0) * 50;
    gameState.energyRate = 1 + (upgrades.energy_core?.level || 0) * 0.5;
    
    // Amplificateur quantique (multiplie tout)
    const quantumMultiplier = Math.pow(2, upgrades.quantum_boost?.level || 0);
    gameState.productionRate *= quantumMultiplier;
    gameState.researchRate *= quantumMultiplier;
    gameState.rareMaterialsRate *= quantumMultiplier;
    
    // Réseau neuronal (améliore l'efficacité)
    const neuralBonus = 1 + ((upgrades.neural_network?.level || 0) * 0.5);
    gameState.productionRate *= neuralBonus;
    gameState.researchRate *= neuralBonus;
    gameState.rareMaterialsRate *= neuralBonus;
    
    // Bonus de prestige
    const prestigeMultiplier = 1 + (gameState.prestigePoints * 0.1);
    gameState.productionRate *= prestigeMultiplier;
    gameState.researchRate *= prestigeMultiplier;
    gameState.rareMaterialsRate *= prestigeMultiplier;
}

function doPrestige() {
    const prestigeGain = calculatePrestigeGain();
    
    if (prestigeGain > 0) {
        showModal('Prestige', `Effectuer un prestige?\n\nVous gagnerez ${prestigeGain} points de prestige mais perdrez tous vos nanobots, énergie, recherche et améliorations.\n\nLes points de prestige donnent un bonus permanent de +10% par point à toute la production.`, () => {
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
            
            showToast(`Prestige effectué! +${prestigeGain} points de prestige`, 'success');
        });
    } else {
        showToast('Vous devez avoir produit au moins 1M de nanobots pour faire un prestige!', 'warning');
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
        showToast(`Niveau ${gameState.level + 1} atteint: ${CONFIG.levels[gameState.level].name}!`, 'success');
        
        // Débloquer le prestige au niveau 3
        if (gameState.level >= 3) {
            elements.prestigePanel.style.display = 'block';
        }
        
        // Recalculer la capacité d'énergie
        applyUpgradeEffects();
    }
}

// Système de succès
function checkAchievements() {
    CONFIG.achievements.forEach(achievement => {
        if (!gameState.achievements[achievement.id]) {
            let unlocked = false;
            
            switch (achievement.type) {
                case 'nanobots_produced':
                    unlocked = gameState.totalNanobotsProduced >= achievement.requirement;
                    break;
                case 'nanobots_owned':
                    unlocked = gameState.nanobots >= achievement.requirement;
                    break;
                case 'upgrades_bought':
                    unlocked = gameState.stats.totalUpgradesPurchased >= achievement.requirement;
                    break;
                case 'research_generated':
                    unlocked = gameState.totalResearchGenerated >= achievement.requirement;
                    break;
                case 'energy_max':
                    unlocked = gameState.energyCapacity >= achievement.requirement;
                    break;
                case 'prestiges':
                    unlocked = gameState.totalPrestiges >= achievement.requirement;
                    break;
                case 'clicks':
                    unlocked = gameState.stats.totalClicks >= achievement.requirement;
                    break;
                case 'materials_owned':
                    unlocked = gameState.rareMaterials >= achievement.requirement;
                    break;
            }
            
            if (unlocked) {
                gameState.achievements[achievement.id] = {
                    unlocked: true,
                    unlockedAt: Date.now()
                };
                showToast(`🏆 Succès débloqué: ${achievement.name}!`, 'success');
                
                // Animation si on est sur l'écran des succès
                if (currentScreen === 'achievements-screen') {
                    setTimeout(() => {
                        const achievementElement = document.querySelector(`[data-achievement="${achievement.id}"]`);
                        if (achievementElement) {
                            achievementElement.classList.add('new-unlock');
                            setTimeout(() => achievementElement.classList.remove('new-unlock'), 1000);
                        }
                    }, 100);
                }
            }
        }
    });
    
    // Mettre à jour le compteur de succès
    updateAchievementsCount();
}

function updateAchievementsCount() {
    const unlockedCount = Object.keys(gameState.achievements).length;
    const totalCount = CONFIG.achievements.length;
    
    if (elements.achievementsCount) {
        elements.achievementsCount.textContent = unlockedCount;
    }
    
    if (elements.achievementsUnlocked) {
        elements.achievementsUnlocked.textContent = unlockedCount;
    }
    
    if (elements.achievementsTotal) {
        elements.achievementsTotal.textContent = totalCount;
    }
}

// Boucle de jeu
function gameLoop() {
    if (currentScreen !== 'game-screen') return;
    
    // Vérifier que le jeu est initialisé
    if (!gameState || !gameState.nanobots === undefined) return;
    
    const deltaTime = CONFIG.tickRate / 1000;
    
    // Production automatique
    gameState.nanobots += gameState.productionRate * deltaTime;
    gameState.research += gameState.researchRate * deltaTime;
    gameState.rareMaterials += gameState.rareMaterialsRate * deltaTime;
    
    // Régénération d'énergie
    gameState.energy += gameState.energyRate * deltaTime;
    gameState.energy = Math.min(gameState.energy, gameState.energyCapacity);
    gameState.stats.maxEnergyReached = Math.max(gameState.stats.maxEnergyReached, gameState.energy);
    
    // Mise à jour des statistiques
    gameState.stats.maxNanobotsOwned = Math.max(gameState.stats.maxNanobotsOwned, gameState.nanobots);
    
    // Mise à jour du niveau
    updateLevel();
    
    // Vérification des succès
    if (Math.random() < 0.1) { // 10% de chance à chaque tick
        checkAchievements();
    }
    
    // Mise à jour de l'interface
    updateUI();
    
    // Mise à jour du temps de jeu
    if (gameState.stats && gameState.stats.gameStartTime) {
        gameState.stats.totalPlayTime = Date.now() - gameState.stats.gameStartTime;
    }
}

function startGameLoop() {
    if (gameLoopInterval) clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(gameLoop, CONFIG.tickRate);
    
    if (gameState.settings.autoSave) {
        startAutoSave();
    }
}

function startAutoSave() {
    if (autoSaveInterval) clearInterval(autoSaveInterval);
    autoSaveInterval = setInterval(() => {
        saveGame(false); // Sauvegarde silencieuse
    }, CONFIG.autoSaveInterval);
}

function stopAutoSave() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }
}

// Interface utilisateur
function updateUI() {
    if (currentScreen !== 'game-screen') return;
    
    // Vérifier que les éléments existent avant de les mettre à jour
    if (!elements.nanobots || !elements.energy) return;
    
    // Ressources
    elements.nanobots.textContent = formatNumber(gameState.nanobots);
    elements.energy.textContent = formatNumber(gameState.energy);
    if (elements.research) elements.research.textContent = formatNumber(gameState.research);
    if (elements.rareMaterials) elements.rareMaterials.textContent = formatNumber(gameState.rareMaterials);
    if (elements.nanobotsRate) elements.nanobotsRate.textContent = formatNumber(gameState.productionRate);
    if (elements.researchRate) elements.researchRate.textContent = formatNumber(gameState.researchRate);
    if (elements.materialsRate) elements.materialsRate.textContent = formatNumber(gameState.rareMaterialsRate);
    if (elements.energyMax) elements.energyMax.textContent = formatNumber(gameState.energyCapacity);
    
    // Barre d'énergie
    if (elements.energyFill) {
        const energyPercent = (gameState.energy / gameState.energyCapacity) * 100;
        elements.energyFill.style.width = energyPercent + '%';
    }
    
    // Niveau et prestige
    if (elements.levelDisplay) {
        const currentLevelInfo = CONFIG.levels[gameState.level];
        elements.levelDisplay.textContent = `Niveau ${gameState.level + 1}: ${currentLevelInfo.name}`;
    }
    if (elements.prestigePoints) {
        elements.prestigePoints.textContent = formatNumber(gameState.prestigePoints);
    }
    
    // Barre de progression du niveau
    if (elements.levelProgress && elements.levelProgressText) {
        const nextLevel = CONFIG.levels[gameState.level + 1];
        if (nextLevel) {
            const progress = Math.min(100, (gameState.totalNanobotsProduced / nextLevel.requirement) * 100);
            elements.levelProgress.style.width = progress + '%';
            elements.levelProgressText.textContent = Math.floor(progress) + '%';
        } else {
            elements.levelProgress.style.width = '100%';
            elements.levelProgressText.textContent = 'MAX';
        }
    }
    
    // Prestige
    if (elements.prestigeGain) {
        const prestigeGain = calculatePrestigeGain();
        elements.prestigeGain.textContent = formatNumber(prestigeGain);
        const prestigeBtn = document.getElementById('btn-prestige');
        if (prestigeBtn) {
            prestigeBtn.disabled = prestigeGain === 0;
        }
    }
    
    // Améliorations
    updateUpgradesDisplay();
}

function updateUpgradesDisplay() {
    if (!elements.upgradesContainer) return;
    
    elements.upgradesContainer.innerHTML = '';
    
    CONFIG.upgrades.forEach(upgrade => {
        if (gameState.level >= upgrade.unlockLevel) {
            // Filtrage
            if (currentFilter !== 'all' && upgrade.category !== currentFilter) {
                return;
            }
            
            const upgradeElement = createUpgradeElement(upgrade);
            elements.upgradesContainer.appendChild(upgradeElement);
        }
    });
}

function createUpgradeElement(upgrade) {
    const currentLevel = gameState.upgrades[upgrade.id].level;
    const cost = calculateUpgradeCost(upgrade, currentLevel);
    const canAfford = gameState.nanobots >= cost;
    const maxLevel = currentLevel >= upgrade.maxLevel;
    
    const div = document.createElement('div');
    div.className = 'upgrade-item';
    div.dataset.upgrade = upgrade.id;
    
    if (canAfford && !maxLevel) {
        div.classList.add('affordable');
    }
    
    if (maxLevel) {
        div.classList.add('max-level');
    }
    
    // Calculer l'effet actuel
    let effectText = '';
    switch(upgrade.id) {
        case 'basic_production':
            effectText = `+${formatNumber(currentLevel)} nanobots/s`;
            break;
        case 'energy_efficiency':
            effectText = `-${(currentLevel * 5)}% coût énergie`;
            break;
        case 'auto_research':
            effectText = `+${formatNumber(currentLevel * 0.5)} recherche/s`;
            break;
        case 'quantum_boost':
            effectText = `×${Math.pow(2, currentLevel)} production`;
            break;
        case 'dimensional_mining':
            effectText = `+${formatNumber(currentLevel * 0.2)} matériaux/s`;
            break;
        case 'energy_core':
            effectText = `+${currentLevel * 50} énergie max`;
            break;
        case 'neural_network':
            effectText = `+${currentLevel * 50}% efficacité`;
            break;
    }
    
    div.innerHTML = `
        <div class="upgrade-header">
            <span class="upgrade-name">${upgrade.icon} ${upgrade.name}</span>
            <span class="upgrade-cost">${maxLevel ? 'MAX' : formatNumber(cost) + ' 🤖'}</span>
        </div>
        <div class="upgrade-description">${upgrade.description}</div>
        <div class="upgrade-level">
            <span class="upgrade-owned">Niveau: ${currentLevel}/${upgrade.maxLevel === Infinity ? '∞' : upgrade.maxLevel}</span>
            <span class="upgrade-effect">${effectText}</span>
        </div>
    `;
    
    if (!maxLevel) {
        div.addEventListener('click', () => buyUpgrade(upgrade.id));
    }
    
    return div;
}

function updateUpgradeFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        }
    });
}

function updateAchievementsDisplay() {
    if (!elements.achievementsContainer) return;
    
    elements.achievementsContainer.innerHTML = '';
    
    CONFIG.achievements.forEach(achievement => {
        const unlocked = gameState.achievements[achievement.id]?.unlocked || false;
        
        const div = document.createElement('div');
        div.className = `achievement ${unlocked ? 'unlocked' : ''}`;
        div.dataset.achievement = achievement.id;
        
        div.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `;
        
        elements.achievementsContainer.appendChild(div);
    });
    
    updateAchievementsCount();
}

function updateStatsDisplay() {
    if (!elements.statsContainer) return;
    
    const stats = [
        { label: 'Nanobots produits', value: formatNumber(gameState.totalNanobotsProduced), icon: '🤖' },
        { label: 'Nanobots maximum', value: formatNumber(gameState.stats.maxNanobotsOwned), icon: '📈' },
        { label: 'Énergie utilisée', value: formatNumber(gameState.totalEnergyUsed), icon: '⚡' },
        { label: 'Énergie maximum', value: formatNumber(gameState.stats.maxEnergyReached), icon: '🔋' },
        { label: 'Recherche générée', value: formatNumber(gameState.totalResearchGenerated), icon: '🔬' },
        { label: 'Matériaux collectés', value: formatNumber(gameState.rareMaterials), icon: '💎' },
        { label: 'Clics totaux', value: formatNumber(gameState.stats.totalClicks), icon: '👆' },
        { label: 'Améliorations achetées', value: formatNumber(gameState.stats.totalUpgradesPurchased), icon: '⬆️' },
        { label: 'Prestiges effectués', value: formatNumber(gameState.totalPrestiges), icon: '✨' },
        { label: 'Niveau actuel', value: gameState.level + 1, icon: '🏆' },
        { label: 'Points de prestige', value: formatNumber(gameState.prestigePoints), icon: '⭐' },
        { label: 'Temps de jeu', value: formatTime(gameState.stats.totalPlayTime), icon: '⏰' }
    ];
    
    elements.statsContainer.innerHTML = '';
    stats.forEach(stat => {
        const div = document.createElement('div');
        div.className = 'stat-item';
        div.innerHTML = `
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.icon} ${stat.label}</div>
        `;
        elements.statsContainer.appendChild(div);
    });
}

function updateSettingsDisplay() {
    document.getElementById('auto-save').checked = gameState.settings.autoSave;
    document.getElementById('notifications').checked = gameState.settings.notifications;
    document.getElementById('particles-toggle').checked = gameState.settings.particles;
}

// Système de particules
function initializeParticles() {
    if (!gameState.settings.particles) return;
    
    clearParticles();
    
    // Vérifier que le conteneur de particules existe
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) {
        console.warn('Particles container not found');
        return;
    }
    
    particlesInterval = setInterval(() => {
        if (currentScreen === 'game-screen' && gameState.settings.particles) {
            createParticle();
        }
    }, 2000);
}

function createParticle() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 8000);
}

function clearParticles() {
    if (particlesInterval) {
        clearInterval(particlesInterval);
        particlesInterval = null;
    }
    
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
    }
}

// Système de notifications
function showToast(message, type = 'info', duration = 3000) {
    if (!gameState.settings.notifications) return;
    
    if (!elements.toastContainer) {
        console.warn('Toast container not found');
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✅',
        warning: '⚠️',
        error: '❌',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }, duration);
}

// Système de modal
function showModal(title, message, onConfirm) {
    elements.modalTitle.textContent = title;
    elements.modalMessage.textContent = message;
    elements.modalOverlay.classList.add('active');
    
    // Nettoyer les anciens événements
    elements.modalConfirm.onclick = null;
    
    elements.modalConfirm.onclick = () => {
        hideModal();
        if (onConfirm) onConfirm();
    };
}

function hideModal() {
    elements.modalOverlay.classList.remove('active');
}

// Sauvegarde et chargement
function saveGame(showNotification = true) {
    gameState.lastSave = new Date().toISOString();
    localStorage.setItem(CONFIG.saveKey, JSON.stringify(gameState));
    
    if (showNotification) {
        showToast('Jeu sauvegardé!', 'success');
    }
    
    console.log("💾 Jeu sauvegardé");
}

function loadGame() {
    const savedGame = localStorage.getItem(CONFIG.saveKey);
    if (savedGame) {
        try {
            const loaded = JSON.parse(savedGame);
            
            // Fusionner avec validation
            Object.keys(loaded).forEach(key => {
                if (gameState.hasOwnProperty(key)) {
                    gameState[key] = loaded[key];
                }
            });
            
            // Assurer la compatibilité avec les nouvelles versions
            if (!gameState.settings) {
                gameState.settings = { ...CONFIG.settings };
            }
            
            if (!gameState.stats) {
                gameState.stats = {
                    totalClicks: 0,
                    totalUpgradesPurchased: 0,
                    gameStartTime: Date.now(),
                    totalPlayTime: 0,
                    maxNanobotsOwned: 0,
                    maxEnergyReached: 100
                };
            }
            
            if (gameState.stats.maxNanobotsOwned === undefined) {
                gameState.stats.maxNanobotsOwned = gameState.nanobots;
            }
            
            if (gameState.stats.maxEnergyReached === undefined) {
                gameState.stats.maxEnergyReached = gameState.energy;
            }
            
            // Assurer que les améliorations existent
            if (!gameState.upgrades) {
                gameState.upgrades = {};
            }
            
            // Assurer que les succès existent
            if (!gameState.achievements) {
                gameState.achievements = {};
            }
            
            applyUpgradeEffects();
            console.log("📁 Sauvegarde chargée");
        } catch (error) {
            console.error("❌ Erreur lors du chargement:", error);
            showToast('Erreur lors du chargement de la sauvegarde!', 'error');
            // Réinitialiser en cas d'erreur critique
            localStorage.removeItem(CONFIG.saveKey);
        }
    }
}

function exportSave() {
    const saveData = JSON.stringify(gameState, null, 2);
    const blob = new Blob([saveData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `nanobot-empire-save-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Sauvegarde exportée!', 'success');
}

function importSave() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                
                // Validation basique
                if (imported.version && imported.nanobots !== undefined) {
                    gameState = { ...gameState, ...imported };
                    applyUpgradeEffects();
                    updateUI();
                    saveGame();
                    showToast('Sauvegarde importée avec succès!', 'success');
                } else {
                    showToast('Fichier de sauvegarde invalide!', 'error');
                }
            } catch (error) {
                showToast('Erreur lors de l\'importation!', 'error');
                console.error('Erreur d\'importation:', error);
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

function resetGame() {
    localStorage.removeItem(CONFIG.saveKey);
    location.reload();
}

// Utilitaires
function formatNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) return '0';
    if (num < 1000) return Math.floor(num).toString();
    if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
    if (num < 1000000000) return (num / 1000000).toFixed(1) + 'M';
    if (num < 1000000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num < 1000000000000000) return (num / 1000000000000).toFixed(1) + 'T';
    return (num / 1000000000000000).toFixed(1) + 'Q';
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

// Initialiser le jeu au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Attendre un peu pour s'assurer que tout est chargé
    setTimeout(init, 100);
});

// Sauvegarder avant de fermer la page
window.addEventListener('beforeunload', () => {
    if (gameState && gameState.settings && gameState.settings.autoSave) {
        saveGame(false);
    }
});
