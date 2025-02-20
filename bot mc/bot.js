const mineflayer = require('mineflayer');
const dns = require('dns');

// 🔧 Force l’usage IPv4 pour Railway
dns.setDefaultResultOrder('ipv4first');

// 🔄 Crée le bot avec un ping régulier pour éviter la déconnexion
function createBot() {
  const bot = mineflayer.createBot({
    host: 'Alex142877.aternos.me',
    port: 11056,
    username: 'antiafk',
    version: false,
    keepAlive: true
  });

  bot.on('spawn', () => {
    console.log('✅ Bot connecté et opérationnel !');

    // 🔁 Ping toutes les 60 secondes
    setInterval(() => {
      if (bot._client) {
        bot._client.write('ping_start', {});
        console.log('🏓 Ping envoyé au serveur.');
      }
    }, 60000);

    // 🎥 Mouvement AFK
    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI / 2;
      bot.look(yaw, pitch, true);
      console.log('🎥 Caméra déplacée.');
    }, 30000);
  });

  bot.on('kicked', (reason) => console.log(`⛔ Kick : ${reason}`));
  bot.on('error', (err) => console.log('❌ Erreur :', err));
  bot.on('end', () => {
    console.log('⚡ Déconnecté. Reconnexion dans 1 minutes...');
    setTimeout(createBot, 60000);
  });
}

// 🚀 Lancement
createBot();
