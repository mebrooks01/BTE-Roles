const Discord = require('discord.js')
const client = new Discord.Client()
const token = require('./token.json')
const uwuifier = require('uwuify')
const uwuify = new uwuifier()

const prefix = '='
message1 = {
  guild: '719346844597223464',
  channel: '733102671887728650',
  message: '738867416452300891',
  reaction: '🏓',
  role: '736418797065470051',
}
message2 = {
  guild: '719346844597223464',
  channel: '733102671887728650',
  message: '738867416452300891',
  reaction: '✅',
  role1: '733099168117031052',
  role2: '738478029042614272',
  role3: '738479579437596913',
}

client.on('ready', async () => {
  console.log(`Logged in as: ${client.user.tag}`)
  client.user.setActivity('for reactions', { type: 'WATCHING' })

  await client.guilds.cache
    .get(message1.guild)
    .channels.cache.get(message1.channel)
    .messages.fetch(message1.message)
})

client.on('messageReactionAdd', async (reaction, user) => {
  if (
    reaction.emoji.name == message1.reaction &&
    reaction.message.id == message1.message
  ) {
    reaction.message.guild.members.fetch(user.id).then(async (member) => {
      await member.roles.add(message1.role).catch((err) => {
        console.error(err)
        client.users.get(member.id).send('Failed to add role')
      })
      client.users.cache.get(member.id).send('Role Added')
    })
  }
  if (
    reaction.emoji.name == message2.reaction &&
    reaction.message.id == message2.message
  ) {
    reaction.message.guild.members.fetch(user.id).then(async (member) => {
      await member.roles.add(message2.role1).catch((err) => {
        console.error(err)
        client.users.get(member.id).send('Failed to add role1')
      })
      await member.roles.add(message2.role2).catch((err) => {
        console.error(err)
        client.users.get(member.id).send('Failed to add role2')
      })
      await member.roles.add(message2.role3).catch((err) => {
        console.error(err)
        client.users.get(member.id).send('Failed to add role3')
      })
      client.users.cache.get(member.id).send('Roles Added')
    })
  }
})

client.on('messageReactionRemove', async (reaction, user) => {
  if (
    reaction.emoji.name == message1.reaction &&
    reaction.message.id == message1.message
  ) {
    reaction.message.guild.members.fetch(user.id).then(async (member) => {
      await member.roles.remove(message1.role).catch((err) => {
        console.error(err)
        client.users.get(member.id).send('Failed to remove role')
      })
      client.users.cache.get(member.id).send('Role Removed')
    })
  }
  if (
    reaction.emoji.name == message2.reaction &&
    reaction.message.id == message2.message
  ) {
    reaction.message.guild.members.fetch(user.id).then(async (member) => {
      await member.roles.remove(message2.role1).catch((err) => {
        console.error(err)
        client.users.get(member.id).send('Failed to remove role1')
      })
      await member.roles.remove(message2.role2).catch((err) => {
        console.error(err)
        client.users.get(member.id).send('Failed to remove role2')
      })
      await member.roles.remove(message2.role3).catch((err) => {
        console.error(err)
        client.users.get(member.id).send('Failed to remove role3')
      })
      client.users.cache.get(member.id).send('Roles Removed')
    })
  }
})

const clean = (text) => {
  if (typeof text === 'string')
    return text
      .replace(/`/g, '`' + String.fromCharCode(8203))
      .replace(/@/g, '@' + String.fromCharCode(8203))
  else return text
}
client.on('message', (message) => {
  if (message.author.bot) return
  msg = message.content.toLowerCase()
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  if (command === 'eval' && message.author.id == '496463728661889026') {
    try {
      const code = args.join(' ')
      let evaled = eval(code)

      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)

      message.channel.send(clean(evaled), { code: 'xl' })
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
    }
  }
})

client.login(token.token)
