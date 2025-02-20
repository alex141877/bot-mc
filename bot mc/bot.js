const mineflayer = require('mineflayer');
const dns = require('dns');
const net = require('net');

dns.setDefaultResultOrder('ipv4first');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Alex142877.aternos.me',
    port: 11056,
    username: 'antiafk',
    version: '1.20.4',
    keepAlive: true
  });

  bot.once('connect', () => {
    bot._client.socket = net.connect({
      host: 'Alex142877.aternos.me',
      port: 11056,
      family: 4
    });
    console.log('🌐 Connexion en IPv4 établie.');
  });

  bot.on('spawn', () => {
    console.log('✅ Bot connecté et opérationnel !');

    setInterval(() => {
      if (bot._client) {
        bot._client.write('ping_start', {});
        console.log('🏓 Ping envoyé au serveur.');
      }
    }, 60000);

    setInterval(() => {
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI / 2;
      bot.look(yaw, pitch, true);
      console.log('🎥 Caméra déplacée.');

      const movements = ['forward', 'back', 'left', 'right', 'jump'];
      const movement = movements[Math.floor(Math.random() * movements.length)];
      bot.setControlState(movement, true);
      setTimeout(() => bot.setControlState(movement, false), 1000);
      console.log(`🏃 Mouvement : ${movement}`);

      if (Math.random() > 0.7) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
        console.log('🦘 Saut effectué.');
      }
    }, 30000);
  });

  bot.on('kicked', (reason) => console.log(`⛔ Kick : ${reason}`));

  bot.on('error', (err) => {
    console.error(`❌ Erreur détectée : ${err.code} - ${err.message}`);
    if (err.code === 'ECONNRESET') {
      console.log('🔄 Tentative de reconnexion dans 10 secondes...');
      setTimeout(createBot, 10000);
    }
  });

  bot.on('end', () => {
    console.log('⚡ Déconnecté. Reconnexion dans 10 secondes...');
    setTimeout(createBot, 10000);
  });

  bot._client.on('keep_alive', () => {
    console.log('🟢 Keep-alive reçu du serveur.');
  });
}

global.createBot = createBot;
createBot();