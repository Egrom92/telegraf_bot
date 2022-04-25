const { Telegraf } = require('telegraf')
require('dotenv').config();
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(async (ctx, next) => {
  ctx.state.isSend = true
  await next(ctx)
})


bot.on('message', ctx => {
  console.log(ctx);
  console.log(ctx.updateType);
  console.log(`Message Type is: ${getMessageType(ctx.message)}`)
})

const getMessageType = (message) => {
  const keys = Object.keys(message);
  const messageType = keys.pop();
  console.log(messageType);
  return messageType.toUpperCase();
};

bot.start(ctx =>{
  const {state} = ctx
  ctx.reply(`Start command ${state.isSend}`)
})

bot.help(ctx => {
  ctx.reply('Help command')
})

bot.settings(ctx => {
  ctx.reply('Settings command')
})

bot.command('test', ctx => {
  return ctx.reply('Test command')
})

bot.command('ctx', ctx => {
  console.log(ctx.update.message);
  ctx.reply(`${ctx.update.message.from.first_name} hello`)
})

bot.hears('yoyo', ctx => {
  ctx.reply('Test ok')
})

bot.launch()
  .then((res) => {
    console.log('Started');
  })
  .catch(err => console.log(err))
