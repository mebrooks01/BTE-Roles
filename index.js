const Discord = require('discord.js')
const client = new Discord.Client()
const token = require('./token.json')
const uwuifier = require('uwuify')
const uwuify = new uwuifier()
const fs = require('fs')

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


client.on('guildMemberAdd', (member) => {
  if (member.guild.id == '727861352101576714') {
    member.roles.add('845449019073363968').catch((error) => {
      client.channels.cache
        .get('796886243324854314')
        .send(`Failed to add intern role to <@${member.id}>`)
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

  if (msg === 'uwu' || msg === 'owo') {
    message.reply('OWO I wuv youwu')
  }

  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  if (command === 'help') {
    message.channel.send({
      embed: {
        title: 'Help',
        description:
          '**Ping:** Ping the bot and see how bad its ping is\n**UWUify:** Convert normal text to uwu text',
        timestamp: new Date(),
        thumbnail: {
          url: 'https://cdn.discordapp.com/emojis/815660709320589313.png?v=1',
        },
      },
    })
  }

  if (command === 'eval' && message.author.id == '496463728661889026') {
    try {
      const code = args.join(' ')
      let evaled = eval(code)

      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)

      fs.writeFile('output.log', clean(evaled), function (err) {
        if (err) {
          return console.log(err)
        }
      })
    } catch (err) {
      fs.writeFile('output.log', clean(err), function (err) {
        if (err) {
          return console.log(err)
        }
      })
    }

    message.channel.send('Output', {
      files: ['./output.log'],
    })
  }

  if (command === 'ping') {
    message.channel.send(
      `🏓Latency is ${
        message.createdTimestamp - message.createdTimestamp
      }ms. API Latency is ${Math.round(client.ws.ping)}ms`,
    )
  }

  if (command === 'uwuify') {
    toUWU = message.content.slice(command.length + 1)
    if (toUWU == '')
      return message.channel.send('Pwease pwovide something t-to uwuify owo')

    let UWU = uwuify.uwuify(toUWU)
    message.channel.send(UWU, { allowedMentions: { parse: [] } })
  }
})

client.login(token)
