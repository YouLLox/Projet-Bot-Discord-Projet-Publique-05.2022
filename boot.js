const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function load(){
console.log(`
Connexion entre le Bot et Disord...`)
await delay(350)
console.clear()
console.log(`
𝙋𝙖𝙨𝙨𝙬𝙤𝙧𝙙 𝙋𝙡𝙚𝙖𝙨𝙚`)
await delay(200)
console.log(`Bot opérationnel !`)
require("./bot")
}
load()