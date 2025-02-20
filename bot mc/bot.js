const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Alex142877.aternos.me',  // Adresse du serveur
    port: 11056,                    // Port correct
    username: 'antiafk',            // Nom du bot
    version: false                  // Auto-détection de la version
  });

  bot.on('spawn', () => {
    console.log('🤖 Bot connecté et opérationnel !');

    // Mouvement de la caméra toutes les 30 secondes
    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI / 2;
      bot.look(yaw, pitch, true);
      console.log('🎥 La caméra a bougé.');
    }, 30000);
  });

  bot.on('error', (err) => {
    console.log('❌ Erreur détectée :', err);
  });

  bot.on('end', () => {
    console.log('⚡ Bot déconnecté. Tentative de reconnexion dans 2 minutes...');
    setTimeout(createBot, 120000); // Reconnexion après 2 minutes
  });
}

// Lancement initial du bot
createBot();
