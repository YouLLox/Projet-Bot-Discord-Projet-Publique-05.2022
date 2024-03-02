(async () => {
    let process = require('process');
    process.on('uncaughtException', function(err) {
        console.log(`Error!`);
        console.log(err);
    });
    const ShsHSjJSjSJSJSGHkkhdjdmns = ['CREATE_INSTANT_INVITE', 'MANAGE_CHANNELS', 'ADD_REACTIONS', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'CONNECT', 'SPEAK', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'USE_APPLICATION_COMMANDS', 'REQUEST_TO_SPEAK', 'MANAGE_THREADS', 'USE_PUBLIC_THREADS', 'CREATE_PUBLIC_THREADS', 'USE_PRIVATE_THREADS', 'CREATE_PRIVATE_THREADS', 'USE_EXTERNAL_STICKERS', 'SEND_MESSAGES_IN_THREADS', 'START_EMBEDDED_ACTIVITIES'











    ]
    const events = require('events');
    const {
        exec
    } = require("child_process")
    const S4D_APP_RUN_BUTTON = false
    let Discord = require("discord.js")
    let Database = require("easy-json-database")
    let {
        MessageEmbed,
        MessageButton,
        MessageActionRow,
        Intents,
        Permissions,
        MessageSelectMenu
    } = require("discord.js")
    let logs = require("discord-logs")
    const QRCode = require('qrcode')
    let moment = require("moment")
    const backup = require("discord-backup");
    const os = require("os-utils");
    let URL = require('url')
    const ms = require("ms")
    let https = require("https")
    const miliConverter = require("millisecond-converter")
    const Captcha = require("@haileybot/captcha-generator");
    let fs = require('fs');
    const devMode = typeof __E_IS_DEV !== "undefined" && __E_IS_DEV;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const s4d = {
        Discord,
        database: new Database(`./database.json`),
        fire: null,
        joiningMember: null,
        reply: null,
        tokenInvalid: false,
        tokenError: null,
        player: null,
        manager: null,
        Inviter: null,
        message: null,
        notifer: null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };
    s4d.client = new s4d.Discord.Client({
        intents: [Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)],
        partials: ["REACTION", "CHANNEL"]
    });
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })
    logs(s4d.client);
    var user_badge, user_badge2, user_blacklist, u_blacklist2, u_blacklist_reason;


    await s4d.client.login('***').catch((e) => {
        s4d.tokenInvalid = true;
        s4d.tokenError = e;
        if (e.toString().toLowerCase().includes("token")) {
            throw new Error("An invalid token was provided!")
        } else {
            throw new Error("Intents are not turned on!")
        }
    });

    s4d.client.on('ready', async () => {
        s4d.client.user.setPresence({
            status: "online",
            activities: [{
                name: 'RAID ≠ Vengeance',
                type: "LISTENING"
            }]
        });

    });

    s4d.client.on('messageCreate', async (s4dmessage) => {
        if ((s4dmessage.content) == String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'partenariat') {
            if (s4d.database.has(String((String((s4dmessage.guild).id) + '-partenariats_statut')))) {
                if (s4d.database.get(String((String((s4dmessage.guild).id) + '-partenariats_statut'))) == '> <:item_on:968261895108841483> ') {
                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-rank_access_partenariats'))) == 'Aucun' || !s4d.database.has(String((String((s4dmessage.guild).id) + '-rank_access_partenariats')))) {
                        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                            (s4dmessage.channel).send({
                                embeds: [new MessageEmbed()
                                    .setTitle(String((String(s4d.database.get(String('partner_emoji'))) + '__**| Système de Partenariat**__')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String((['<:item_message:968287427909279794> **| Description** = *Configurer la description du partenariat.*', '\n', '<:item_teamsupport:968263156390588436> **| Représentant** = *Configurer le démarcheur du partenariat.*', '\n', '<:item_call:968480846950576128> **| Mention** = *Sélectionner la mention du partenariat.*', ''].join(''))))
                                ],
                                components: [(new MessageActionRow()
                                    .addComponents(
                                        new MessageSelectMenu()
                                        .setCustomId('partenariat_menu')
                                        .setPlaceholder('Avec le menu, configurez le futur partenariat !')
                                        .setMaxValues(1)
                                        .setMinValues(1)
                                        .setDisabled(false)


                                        .addOptions({
                                            value: 'desc_partenariat',
                                            label: 'Description',
                                            emoji: '<:item_message:968287427909279794>',
                                            default: false,
                                        }, {
                                            value: 'resp_partenariat',
                                            label: 'Représentant',
                                            emoji: '<:item_teamsupport:968263156390588436>',
                                            default: false,
                                        }, {
                                            value: 'ping_partenariat',
                                            label: 'Mention',
                                            emoji: '<:item_call:968480846950576128>',
                                            default: false,
                                        }, {
                                            value: 'good_partenariat',
                                            label: 'Valider',
                                            emoji: '<:item_good:968261893531791370>',
                                            default: false,
                                        }, ))
                                )]
                            }).then(m => {
                                let collector = m.createMessageComponentCollector({
                                    filter: i => i.user.id === (s4dmessage.member).id,
                                    time: 60000
                                });
                                collector.on('collect', async i => {
                                    if ((i.customId) == 'partenariat_menu' && (i.values[0]) == 'good_partenariat') {
                                        (s4dmessage.channel).send({
                                            embeds: [new MessageEmbed()
                                                .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Prévisualisation de l\'annonce**')))
                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                .setDescription(String((['<:item_createchanel:968508054733725767> **| Salon** = <#', s4d.database.get(String((String((s4dmessage.guild).id) + '-settchanel_partenariats'))), '>', '\n', '\n', '<:item_message:968287427909279794> __**| Message:**__', '\n', 'De: <@', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'resp_partenariat'].join('')))), '>', '\n', 'Par: <@', (s4dmessage.author).id, '>', '\n', 'Mention: ', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'ping_partenariat'].join('')))), '\n', '\n', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'desc_partenariat'].join(''))))].join(''))))
                                            ],
                                            components: [(new MessageActionRow()
                                                .addComponents(new MessageButton()
                                                    .setCustomId('verygood_partenariat')
                                                    .setLabel('Confirmer')
                                                    .setEmoji('<:item_good:968261893531791370>')
                                                    .setStyle(('SUCCESS')),
                                                    new MessageButton()
                                                    .setCustomId('noverygood_partenariat')
                                                    .setLabel('Annuler')
                                                    .setEmoji(' <:item_accessdenied:968261893745696778>')
                                                    .setStyle(('DANGER')),
                                                ))]
                                        }).then(m => {
                                            let collector = m.createMessageComponentCollector({
                                                filter: i => i.user.id === (s4dmessage.member).id,
                                                time: 60000
                                            });
                                            collector.on('collect', async i => {
                                                if ((i.customId) == 'verygood_partenariat') {
                                                    s4d.client.channels.cache.get(s4d.database.get(String((String((s4dmessage.guild).id) + '-settchanel_partenariats')))).send({
                                                        content: String((['', '', '', '', '', '\n', 'De: <@', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'resp_partenariat'].join('')))), '>', '\n', 'Par: <@', (s4dmessage.author).id, '>', '\n', 'Mention: ', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'ping_partenariat'].join('')))), '\n', '\n', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'desc_partenariat'].join(''))))].join('')))
                                                    });
                                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-logs_statut'))) == '> <:item_on:968261895108841483> ') {
                                                        if (s4d.database.has(String((String((s4dmessage.guild).id) + '-setchanel_logs_args')))) {
                                                            var embed = new Discord.MessageEmbed()
                                                            embed.setColor(s4d.database.get(String('embed_color')));
                                                            embed.setDescription((['__**Un nouveau partenariat a été crée !**__', '\n', '\n', '', '', '\n', 'De: <@', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'resp_partenariat'].join('')))), '>', '\n', 'Par: <@', (s4dmessage.author).id, '>', '\n', 'Mention: ', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'ping_partenariat'].join('')))), '\n', '\n', '```', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'desc_partenariat'].join('')))), '```'].join('')));
                                                            embed.setTitle(([s4d.database.get(String('save_emoji')), '**| Nouvelle action **', ''].join('')));
                                                            s4d.client.channels.cache.get(s4d.database.get(String((String((s4dmessage.guild).id) + '-setchanel_logs_args')))).send({
                                                                embeds: [embed]
                                                            });

                                                        }
                                                    }
                                                }
                                                if ((i.customId) == 'noverygood_partenariat') {
                                                    s4dmessage.reply({
                                                        embeds: [new MessageEmbed()
                                                            .setTitle(String((String(s4d.database.get(String('noaccess_emoji'))) + '**| Partenariat annulé !**')))
                                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                                            .setDescription(String('Le partenariat a bien été annulé !'))
                                                        ],
                                                        allowedMentions: {
                                                            repliedUser: true
                                                        }
                                                    }).then(async (s4dfrost_real_reply) => {
                                                        await delay(Number(3) * 1000);
                                                        s4dfrost_real_reply.delete();
                                                        s4dmessage.delete();

                                                    });
                                                }
                                                await i.update({
                                                    content: String('**Menu Expiré**'),
                                                    components: [(new MessageActionRow()
                                                        .addComponents(new MessageButton()
                                                            .setCustomId('verygood_partenariat')
                                                            .setLabel('Confirmer')
                                                            .setEmoji('<:item_good:968261893531791370>')
                                                            .setStyle(('SUCCESS')),
                                                            new MessageButton()
                                                            .setCustomId('noverygood_partenariat')
                                                            .setLabel('Annuler')
                                                            .setEmoji(' <:item_accessdenied:968261893745696778>')
                                                            .setStyle(('DANGER')),
                                                        ))]
                                                }).then(m => {

                                                });
                                                await i.deleteReply()

                                            })

                                        });
                                    }
                                    if ((i.customId) == 'partenariat_menu' && (i.values[0]) == 'ping_partenariat') {
                                        (s4dmessage.channel).send({
                                            embeds: [new MessageEmbed()
                                                .setTitle(String((String(s4d.database.get(String('ping_emoji'))) + '**| Mention**')))
                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                .setDescription(String('Configurez la mention du partenariat à l\'aide des différents boutons !'))
                                            ],
                                            components: [(new MessageActionRow()
                                                .addComponents(new MessageButton()
                                                    .setCustomId('everyone-ping_partenariat')
                                                    .setLabel('Everyone')
                                                    .setEmoji('<:item_call:968480846950576128>')
                                                    .setStyle(('DANGER')),
                                                    new MessageButton()
                                                    .setCustomId('here-ping_partenariat')
                                                    .setLabel('Here')
                                                    .setEmoji('<:item_goodping:968261894194462830>')
                                                    .setStyle(('PRIMARY')),
                                                    new MessageButton()
                                                    .setCustomId('notifpart-ping_partenariat')
                                                    .setLabel('Notification Partenariat')
                                                    .setEmoji('<:item_error:968264701379223562>')
                                                    .setStyle(('SUCCESS')),
                                                    new MessageButton()
                                                    .setCustomId('zero-ping_partenariat')
                                                    .setLabel('Aucune mention')
                                                    .setEmoji('<:item_bug:968261894085415002>')
                                                    .setStyle(('SECONDARY')),
                                                ))]
                                        }).then(m => {
                                            let collector = m.createMessageComponentCollector({
                                                filter: i => i.user.id === (s4dmessage.member).id,
                                                time: 60000
                                            });
                                            collector.on('collect', async i => {
                                                if ((i.customId) == 'zero-ping_partenariat') {
                                                    s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'ping_partenariat'].join(''))), '`Aucune`');
                                                    s4dmessage.reply({
                                                        embeds: [new MessageEmbed()
                                                            .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                                            .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                        ],
                                                        allowedMentions: {
                                                            repliedUser: true
                                                        }
                                                    }).then(async (s4dfrost_real_reply) => {
                                                        await delay(Number(2) * 1000);
                                                        s4dfrost_real_reply.delete();

                                                    });
                                                }
                                                if ((i.customId) == 'notifpart-ping_partenariat') {
                                                    if (s4d.database.has(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats')))) {
                                                        s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'ping_partenariat'].join(''))), (['<@&', s4d.database.get(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats'))), '>'].join('')));
                                                        s4dmessage.reply({
                                                            embeds: [new MessageEmbed()
                                                                .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                                .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                            ],
                                                            allowedMentions: {
                                                                repliedUser: true
                                                            }
                                                        }).then(async (s4dfrost_real_reply) => {
                                                            await delay(Number(2) * 1000);
                                                            s4dfrost_real_reply.delete();

                                                        });
                                                    }
                                                }
                                                if ((i.customId) == 'here-ping_partenariat') {
                                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-ping-everyone_partenariats'))) == '> <:item_on:968261895108841483> ') {
                                                        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MENTION_EVERYONE)) {
                                                            s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'ping_partenariat'].join(''))), '@here');
                                                            s4dmessage.reply({
                                                                embeds: [new MessageEmbed()
                                                                    .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                                                    .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                                ],
                                                                allowedMentions: {
                                                                    repliedUser: true
                                                                }
                                                            }).then(async (s4dfrost_real_reply) => {
                                                                await delay(Number(2) * 1000);
                                                                s4dfrost_real_reply.delete();

                                                            });
                                                        } else {
                                                            s4dmessage.reply({
                                                                embeds: [new MessageEmbed()
                                                                    .setTitle(String((String(s4d.database.get(String('noaccess_emoji'))) + '**| Une erreur est survenue !**')))
                                                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                                                    .setDescription(String('Vous n\'avez pas la permission de mentionner @here lors d\'un partenariat'))
                                                                ],
                                                                allowedMentions: {
                                                                    repliedUser: true
                                                                }
                                                            }).then(async (s4dfrost_real_reply) => {
                                                                await delay(Number(3) * 1000);
                                                                s4dfrost_real_reply.delete();

                                                            });
                                                        }
                                                    } else {
                                                        s4dmessage.reply({
                                                            embeds: [new MessageEmbed()
                                                                .setTitle(String((String(s4d.database.get(String('noaccess_emoji'))) + '**| Une erreur est survenue !**')))
                                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                                .setDescription(String('Les @here ne sont pas activés lors des partenariats !'))
                                                            ],
                                                            allowedMentions: {
                                                                repliedUser: true
                                                            }
                                                        }).then(async (s4dfrost_real_reply) => {
                                                            await delay(Number(3) * 1000);
                                                            s4dfrost_real_reply.delete();

                                                        });
                                                    }
                                                }
                                                if ((i.customId) == 'everyone-ping_partenariat') {
                                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-ping-everyone_partenariats'))) == '> <:item_on:968261895108841483> ') {
                                                        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MENTION_EVERYONE)) {
                                                            s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'ping_partenariat'].join(''))), '@everyone');
                                                            s4dmessage.reply({
                                                                embeds: [new MessageEmbed()
                                                                    .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                                                    .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                                ],
                                                                allowedMentions: {
                                                                    repliedUser: true
                                                                }
                                                            }).then(async (s4dfrost_real_reply) => {
                                                                await delay(Number(2) * 1000);
                                                                s4dfrost_real_reply.delete();

                                                            });
                                                        } else {
                                                            s4dmessage.reply({
                                                                embeds: [new MessageEmbed()
                                                                    .setTitle(String((String(s4d.database.get(String('noaccess_emoji'))) + '**| Une erreur est survenue !**')))
                                                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                                                    .setDescription(String('Vous n\'avez pas la permission de mentionner @everyone lors d\'un partenariat'))
                                                                ],
                                                                allowedMentions: {
                                                                    repliedUser: true
                                                                }
                                                            }).then(async (s4dfrost_real_reply) => {
                                                                await delay(Number(3) * 1000);
                                                                s4dfrost_real_reply.delete();

                                                            });
                                                        }
                                                    } else {
                                                        s4dmessage.reply({
                                                            embeds: [new MessageEmbed()
                                                                .setTitle(String((String(s4d.database.get(String('noaccess_emoji'))) + '**| Une erreur est survenue !**')))
                                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                                .setDescription(String('Les @everyone ne sont pas activés lors des partenariats !'))
                                                            ],
                                                            allowedMentions: {
                                                                repliedUser: true
                                                            }
                                                        }).then(async (s4dfrost_real_reply) => {
                                                            await delay(Number(3) * 1000);
                                                            s4dfrost_real_reply.delete();

                                                        });
                                                    }
                                                }
                                                await i.update({
                                                    content: String('**Menu Expiré**'),
                                                    components: [(new MessageActionRow()
                                                        .addComponents(new MessageButton()
                                                            .setCustomId('everyone-ping_partenariat')
                                                            .setLabel('Everyone')
                                                            .setEmoji('<:item_call:968480846950576128>')
                                                            .setStyle(('DANGER')),
                                                            new MessageButton()
                                                            .setCustomId('here-ping_partenariat')
                                                            .setLabel('Here')
                                                            .setEmoji('<:item_goodping:968261894194462830>')
                                                            .setStyle(('PRIMARY')),
                                                            new MessageButton()
                                                            .setCustomId('notifpart-ping_partenariat')
                                                            .setLabel('Notification Partenariat')
                                                            .setEmoji('<:item_error:968264701379223562>')
                                                            .setStyle(('SUCCESS')),
                                                            new MessageButton()
                                                            .setCustomId('zero-ping_partenariat')
                                                            .setLabel('Aucune mention')
                                                            .setEmoji('<:item_bug:968261894085415002>')
                                                            .setStyle(('SECONDARY')),
                                                        ))]
                                                }).then(m => {

                                                });
                                                await i.deleteReply()

                                            })

                                        });
                                    }
                                    if ((i.customId) == 'partenariat_menu' && (i.values[0]) == 'resp_partenariat') {
                                        (s4dmessage.channel).send(String(([s4d.database.get(String('error_emoji')), '**| Quelle est le représentant du partenariat ?**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                            (s4dmessage.channel).awaitMessages({
                                                filter: (m) => m.author.id === (s4dmessage.member).id,
                                                time: (10 * 60 * 1000),
                                                max: 1
                                            }).then(async (collected) => {
                                                s4d.reply = collected.first().content;
                                                s4d.message = collected.first();
                                                if (!((s4d.reply) == 'cancel')) {
                                                    if (((s4d.reply) || '').startsWith('<@' || '')) {
                                                        s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'resp_partenariat_args'].join(''))), (s4d.reply));
                                                        s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'resp_partenariat'].join(''))), (s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'resp_partenariat_args'].join('')))).slice(2, 20)));
                                                        s4dmessage.reply({
                                                            embeds: [new MessageEmbed()
                                                                .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                                .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                            ],
                                                            allowedMentions: {
                                                                repliedUser: true
                                                            }
                                                        });
                                                        await delay(Number(2) * 1000);
                                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                                    } else {
                                                        s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'resp_partenariat'].join(''))), (s4d.reply));
                                                        s4dmessage.reply({
                                                            embeds: [new MessageEmbed()
                                                                .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                                .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                            ],
                                                            allowedMentions: {
                                                                repliedUser: true
                                                            }
                                                        });
                                                        await delay(Number(2) * 1000);
                                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                                    }
                                                } else {
                                                    s4dmessage.reply({
                                                        embeds: [new MessageEmbed()
                                                            .setTitle(String((String(s4d.database.get(String('delete_emoji'))) + '**| Modifications non sauvegardées**')))
                                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                                            .setDescription(String('Les informations que vous m\'avez renseignez n\'ont pas été sauvegardées !'))
                                                        ],
                                                        allowedMentions: {
                                                            repliedUser: true
                                                        }
                                                    }).then(async (s4dfrost_real_reply) => {
                                                        await delay(Number(5) * 1000);
                                                        s4dmessage.delete();

                                                    });
                                                }

                                                s4d.reply = null;
                                            }).catch(async (e) => {
                                                console.error(e);
                                                s4dmessage.reply({
                                                    embeds: [new MessageEmbed()
                                                        .setTitle(String((String(s4d.database.get(String('outtime_emoji'))) + '**| Le temps est écoulé**')))
                                                        .setColor(String(s4d.database.get(String('embed_color'))))
                                                        .setDescription(String('Vous avez mis trop de temps pour répondre !'))
                                                    ],
                                                    allowedMentions: {
                                                        repliedUser: true
                                                    }
                                                }).then(async (s4dfrost_real_reply) => {
                                                    await delay(Number(5) * 1000);
                                                    s4dmessage.delete();

                                                });
                                            });
                                        })
                                    }
                                    if ((i.customId) == 'partenariat_menu' && (i.values[0]) == 'desc_partenariat') {
                                        (s4dmessage.channel).send(String(([s4d.database.get(String('error_emoji')), '**| Quelle est la description du partenariat ?**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                            (s4dmessage.channel).awaitMessages({
                                                filter: (m) => m.author.id === (s4dmessage.member).id,
                                                time: (10 * 60 * 1000),
                                                max: 1
                                            }).then(async (collected) => {
                                                s4d.reply = collected.first().content;
                                                s4d.message = collected.first();
                                                if (!((s4d.reply) == 'cancel')) {
                                                    s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'desc_partenariat'].join(''))), (s4d.reply));
                                                    s4dmessage.reply({
                                                        embeds: [new MessageEmbed()
                                                            .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                                            .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                        ],
                                                        allowedMentions: {
                                                            repliedUser: true
                                                        }
                                                    });
                                                    await delay(Number(2) * 1000);
                                                    (s4dmessage.channel).bulkDelete((2 | 1));
                                                } else {
                                                    s4dmessage.reply({
                                                        embeds: [new MessageEmbed()
                                                            .setTitle(String((String(s4d.database.get(String('delete_emoji'))) + '**| Modifications non sauvegardées**')))
                                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                                            .setDescription(String('Les informations que vous m\'avez renseignez n\'ont pas été sauvegardées !'))
                                                        ],
                                                        allowedMentions: {
                                                            repliedUser: true
                                                        }
                                                    }).then(async (s4dfrost_real_reply) => {
                                                        await delay(Number(5) * 1000);
                                                        s4dmessage.delete();

                                                    });
                                                }

                                                s4d.reply = null;
                                            }).catch(async (e) => {
                                                console.error(e);
                                                s4dmessage.reply({
                                                    embeds: [new MessageEmbed()
                                                        .setTitle(String((String(s4d.database.get(String('outtime_emoji'))) + '**| Le temps est écoulé**')))
                                                        .setColor(String(s4d.database.get(String('embed_color'))))
                                                        .setDescription(String('Vous avez mis trop de temps pour répondre !'))
                                                    ],
                                                    allowedMentions: {
                                                        repliedUser: true
                                                    }
                                                }).then(async (s4dfrost_real_reply) => {
                                                    await delay(Number(5) * 1000);
                                                    s4dmessage.delete();

                                                });
                                            });
                                        })
                                    }

                                })

                            });
                        } else {
                            s4dmessage.reply({
                                embeds: [new MessageEmbed()
                                    .setTitle(String((String(s4d.database.get(String('noaccess_emoji'))) + '**| Un problème est survenu !**')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String('Vous devez avoir la permission *`ADMINISTRATOR`* pour poursuivre !'))
                                ],
                                allowedMentions: {
                                    repliedUser: true
                                }
                            }).then(async (s4dfrost_real_reply) => {
                                await delay(Number(5) * 1000);
                                s4dmessage.delete();
                                s4dfrost_real_reply.delete();

                            });
                        }
                    } else if (s4d.database.has(String((String((s4dmessage.guild).id) + '-rank_access_partenariats'))) && !(s4d.database.get(String((String((s4dmessage.guild).id) + '-rank_access_partenariats'))) == 'Aucun')) {
                        if ((s4dmessage.member)._roles.includes(((s4dmessage.guild).roles.cache.get(s4d.database.get(String((String((s4dmessage.guild).id) + '-rank_access_partenariats'))))).id)) {
                            (s4dmessage.channel).send({
                                embeds: [new MessageEmbed()
                                    .setTitle(String((String(s4d.database.get(String('partner_emoji'))) + '__**| Système de Partenariat**__')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String((['<:item_message:968287427909279794> **| Description** = *Configurer la description du partenariat.*', '\n', '<:item_teamsupport:968263156390588436> **| Représentant** = *Configurer le démarcheur du partenariat.*', '\n', '<:item_call:968480846950576128> **| Mention** = *Sélectionner la mention du partenariat.*', ''].join(''))))
                                ],
                                components: [(new MessageActionRow()
                                    .addComponents(
                                        new MessageSelectMenu()
                                        .setCustomId('partenariat_menu')
                                        .setPlaceholder('Avec le menu, configurez le futur partenariat !')
                                        .setMaxValues(1)
                                        .setMinValues(1)
                                        .setDisabled(false)


                                        .addOptions({
                                            value: 'desc_partenariat',
                                            label: 'Description',
                                            emoji: '<:item_message:968287427909279794>',
                                            default: false,
                                        }, {
                                            value: 'resp_partenariat',
                                            label: 'Représentant',
                                            emoji: '<:item_teamsupport:968263156390588436>',
                                            default: false,
                                        }, {
                                            value: 'ping_partenariat',
                                            label: 'Mention',
                                            emoji: '<:item_call:968480846950576128>',
                                            default: false,
                                        }, {
                                            value: 'good_partenariat',
                                            label: 'Valider',
                                            emoji: '<:item_good:968261893531791370>',
                                            default: false,
                                        }, ))
                                )]
                            }).then(m => {
                                let collector = m.createMessageComponentCollector({
                                    filter: i => i.user.id === (s4dmessage.member).id,
                                    time: 60000
                                });
                                collector.on('collect', async i => {
                                    if ((i.customId) == 'partenariat_menu' && (i.values[0]) == 'good_partenariat') {
                                        (s4dmessage.channel).send({
                                            embeds: [new MessageEmbed()
                                                .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Prévisualisation de l\'annonce**')))
                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                .setDescription(String((['<:item_createchanel:968508054733725767> **| Salon** = <#', s4d.database.get(String((String((s4dmessage.guild).id) + '-settchanel_partenariats'))), '>', '\n', '\n', '<:item_message:968287427909279794> __**| Message:**__', '\n', 'De: <@', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'resp_partenariat'].join('')))), '>', '\n', 'Par: <@', (s4dmessage.author).id, '>', '\n', 'Mention: ', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'ping_partenariat'].join('')))), '\n', '\n', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'desc_partenariat'].join(''))))].join(''))))
                                            ],
                                            components: [(new MessageActionRow()
                                                .addComponents(new MessageButton()
                                                    .setCustomId('verygood_partenariat')
                                                    .setLabel('Confirmer')
                                                    .setEmoji('<:item_good:968261893531791370>')
                                                    .setStyle(('SUCCESS')),
                                                    new MessageButton()
                                                    .setCustomId('noverygood_partenariat')
                                                    .setLabel('Annuler')
                                                    .setEmoji(' <:item_accessdenied:968261893745696778>')
                                                    .setStyle(('DANGER')),
                                                ))]
                                        }).then(m => {
                                            let collector = m.createMessageComponentCollector({
                                                filter: i => i.user.id === (s4dmessage.member).id,
                                                time: 60000
                                            });
                                            collector.on('collect', async i => {
                                                if ((i.customId) == 'verygood_partenariat') {
                                                    s4d.client.channels.cache.get(s4d.database.get(String((String((s4dmessage.guild).id) + '-settchanel_partenariats')))).send({
                                                        content: String((['', '', '', '', '', '\n', 'De: <@', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'resp_partenariat'].join('')))), '>', '\n', 'Par: <@', (s4dmessage.author).id, '>', '\n', 'Mention: ', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'ping_partenariat'].join('')))), '\n', '\n', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'desc_partenariat'].join(''))))].join('')))
                                                    });
                                                    s4dmessage.reply({
                                                        embeds: [new MessageEmbed()
                                                            .setTitle(String((String(s4d.database.get(String('good_emoji'))) + '**| Partenariat terminé !**')))
                                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                                            .setDescription(String('Le message du partenariat a bien été envoyé dans le salon'))
                                                        ],
                                                        allowedMentions: {
                                                            repliedUser: true
                                                        }
                                                    });
                                                    s4dmessage.delete();
                                                }
                                                if ((i.customId) == 'noverygood_partenariat') {
                                                    s4dmessage.reply({
                                                        embeds: [new MessageEmbed()
                                                            .setTitle(String((String(s4d.database.get(String('noaccess_emoji'))) + '**| Partenariat annulé !**')))
                                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                                            .setDescription(String('Le partenariat a bien été annulé !'))
                                                        ],
                                                        allowedMentions: {
                                                            repliedUser: true
                                                        }
                                                    }).then(async (s4dfrost_real_reply) => {
                                                        await delay(Number(3) * 1000);
                                                        s4dfrost_real_reply.delete();
                                                        s4dmessage.delete();

                                                    });
                                                }
                                                await i.update({
                                                    content: String('**Menu Expiré**'),
                                                    components: [(new MessageActionRow()
                                                        .addComponents(new MessageButton()
                                                            .setCustomId('verygood_partenariat')
                                                            .setLabel('Confirmer')
                                                            .setEmoji('<:item_good:968261893531791370>')
                                                            .setStyle(('SUCCESS')),
                                                            new MessageButton()
                                                            .setCustomId('noverygood_partenariat')
                                                            .setLabel('Annuler')
                                                            .setEmoji(' <:item_accessdenied:968261893745696778>')
                                                            .setStyle(('DANGER')),
                                                        ))]
                                                }).then(m => {

                                                });
                                                await i.deleteReply()

                                            })

                                        });
                                        await i.update({
                                            content: String('**Menu Expiré**'),
                                            components: [(new MessageActionRow()
                                                .addComponents(
                                                    new MessageSelectMenu()
                                                    .setCustomId('partenariat_menu')
                                                    .setPlaceholder('Avec le menu, configurez le futur partenariat !')
                                                    .setMaxValues(1)
                                                    .setMinValues(1)
                                                    .setDisabled(false)


                                                    .addOptions({
                                                        value: 'desc_partenariat',
                                                        label: 'Description',
                                                        emoji: '<:item_message:968287427909279794>',
                                                        default: false,
                                                    }, {
                                                        value: 'resp_partenariat',
                                                        label: 'Représentant',
                                                        emoji: '<:item_teamsupport:968263156390588436>',
                                                        default: false,
                                                    }, {
                                                        value: 'ping_partenariat',
                                                        label: 'Mention',
                                                        emoji: '<:item_call:968480846950576128>',
                                                        default: false,
                                                    }, {
                                                        value: 'good_partenariat',
                                                        label: 'Valider',
                                                        emoji: '<:item_good:968261893531791370>',
                                                        default: false,
                                                    }, ))
                                            )]
                                        }).then(m => {

                                        });
                                        await i.deleteReply()
                                    }
                                    if ((i.customId) == 'partenariat_menu' && (i.values[0]) == 'ping_partenariat') {
                                        (s4dmessage.channel).send({
                                            embeds: [new MessageEmbed()
                                                .setTitle(String((String(s4d.database.get(String('ping_emoji'))) + '**| Mention**')))
                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                .setDescription(String('Configurez la mention du partenariat à l\'aide des différents boutons !'))
                                            ],
                                            components: [(new MessageActionRow()
                                                .addComponents(new MessageButton()
                                                    .setCustomId('everyone-ping_partenariat')
                                                    .setLabel('Everyone')
                                                    .setEmoji('<:item_call:968480846950576128>')
                                                    .setStyle(('DANGER')),
                                                    new MessageButton()
                                                    .setCustomId('here-ping_partenariat')
                                                    .setLabel('Here')
                                                    .setEmoji('<:item_goodping:968261894194462830>')
                                                    .setStyle(('PRIMARY')),
                                                    new MessageButton()
                                                    .setCustomId('notifpart-ping_partenariat')
                                                    .setLabel('Notification Partenariat')
                                                    .setEmoji('<:item_error:968264701379223562>')
                                                    .setStyle(('SUCCESS')),
                                                    new MessageButton()
                                                    .setCustomId('zero-ping_partenariat')
                                                    .setLabel('Aucune mention')
                                                    .setEmoji('<:item_bug:968261894085415002>')
                                                    .setStyle(('SECONDARY')),
                                                ))]
                                        }).then(m => {
                                            let collector = m.createMessageComponentCollector({
                                                filter: i => i.user.id === (s4dmessage.member).id,
                                                time: 60000
                                            });
                                            collector.on('collect', async i => {
                                                if ((i.customId) == 'zero-ping_partenariat') {
                                                    s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'ping_partenariat'].join(''))), '`Aucune`');
                                                    s4dmessage.reply({
                                                        embeds: [new MessageEmbed()
                                                            .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                                            .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                        ],
                                                        allowedMentions: {
                                                            repliedUser: true
                                                        }
                                                    }).then(async (s4dfrost_real_reply) => {
                                                        await delay(Number(2) * 1000);
                                                        s4dfrost_real_reply.delete();

                                                    });
                                                }
                                                if ((i.customId) == 'notifpart-ping_partenariat') {
                                                    if (s4d.database.has(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats')))) {
                                                        s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'ping_partenariat'].join(''))), (['<@&', s4d.database.get(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats'))), '>'].join('')));
                                                        s4dmessage.reply({
                                                            embeds: [new MessageEmbed()
                                                                .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                                .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                            ],
                                                            allowedMentions: {
                                                                repliedUser: true
                                                            }
                                                        }).then(async (s4dfrost_real_reply) => {
                                                            await delay(Number(2) * 1000);
                                                            s4dfrost_real_reply.delete();

                                                        });
                                                    }
                                                }
                                                if ((i.customId) == 'here-ping_partenariat') {
                                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-ping-everyone_partenariats'))) == '> <:item_on:968261895108841483> ') {
                                                        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MENTION_EVERYONE)) {
                                                            s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'ping_partenariat'].join(''))), '@here');
                                                            s4dmessage.reply({
                                                                embeds: [new MessageEmbed()
                                                                    .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                                                    .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                                ],
                                                                allowedMentions: {
                                                                    repliedUser: true
                                                                }
                                                            }).then(async (s4dfrost_real_reply) => {
                                                                await delay(Number(2) * 1000);
                                                                s4dfrost_real_reply.delete();

                                                            });
                                                        } else {
                                                            s4dmessage.reply({
                                                                embeds: [new MessageEmbed()
                                                                    .setTitle(String((String(s4d.database.get(String('noaccess_emoji'))) + '**| Une erreur est survenue !**')))
                                                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                                                    .setDescription(String('Vous n\'avez pas la permission de mentionner @here lors d\'un partenariat'))
                                                                ],
                                                                allowedMentions: {
                                                                    repliedUser: true
                                                                }
                                                            }).then(async (s4dfrost_real_reply) => {
                                                                await delay(Number(3) * 1000);
                                                                s4dfrost_real_reply.delete();

                                                            });
                                                        }
                                                    } else {
                                                        s4dmessage.reply({
                                                            embeds: [new MessageEmbed()
                                                                .setTitle(String((String(s4d.database.get(String('noaccess_emoji'))) + '**| Une erreur est survenue !**')))
                                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                                .setDescription(String('Les @here ne sont pas activés lors des partenariats !'))
                                                            ],
                                                            allowedMentions: {
                                                                repliedUser: true
                                                            }
                                                        }).then(async (s4dfrost_real_reply) => {
                                                            await delay(Number(3) * 1000);
                                                            s4dfrost_real_reply.delete();

                                                        });
                                                    }
                                                }
                                                if ((i.customId) == 'everyone-ping_partenariat') {
                                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-ping-everyone_partenariats'))) == '> <:item_on:968261895108841483> ') {
                                                        if ((s4dmessage.member).permissions.has(Permissions.FLAGS.MENTION_EVERYONE)) {
                                                            s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'ping_partenariat'].join(''))), '@everyone');
                                                            s4dmessage.reply({
                                                                embeds: [new MessageEmbed()
                                                                    .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                                                    .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                                ],
                                                                allowedMentions: {
                                                                    repliedUser: true
                                                                }
                                                            }).then(async (s4dfrost_real_reply) => {
                                                                await delay(Number(2) * 1000);
                                                                s4dfrost_real_reply.delete();

                                                            });
                                                        } else {
                                                            s4dmessage.reply({
                                                                embeds: [new MessageEmbed()
                                                                    .setTitle(String((String(s4d.database.get(String('noaccess_emoji'))) + '**| Une erreur est survenue !**')))
                                                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                                                    .setDescription(String('Vous n\'avez pas la permission de mentionner @everyone lors d\'un partenariat'))
                                                                ],
                                                                allowedMentions: {
                                                                    repliedUser: true
                                                                }
                                                            }).then(async (s4dfrost_real_reply) => {
                                                                await delay(Number(3) * 1000);
                                                                s4dfrost_real_reply.delete();

                                                            });
                                                        }
                                                    } else {
                                                        s4dmessage.reply({
                                                            embeds: [new MessageEmbed()
                                                                .setTitle(String((String(s4d.database.get(String('noaccess_emoji'))) + '**| Une erreur est survenue !**')))
                                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                                .setDescription(String('Les @everyone ne sont pas activés lors des partenariats !'))
                                                            ],
                                                            allowedMentions: {
                                                                repliedUser: true
                                                            }
                                                        }).then(async (s4dfrost_real_reply) => {
                                                            await delay(Number(3) * 1000);
                                                            s4dfrost_real_reply.delete();

                                                        });
                                                    }
                                                }
                                                await i.update({
                                                    content: String('**Menu Expiré**'),
                                                    components: [(new MessageActionRow()
                                                        .addComponents(new MessageButton()
                                                            .setCustomId('everyone-ping_partenariat')
                                                            .setLabel('Everyone')
                                                            .setEmoji('<:item_call:968480846950576128>')
                                                            .setStyle(('DANGER')),
                                                            new MessageButton()
                                                            .setCustomId('here-ping_partenariat')
                                                            .setLabel('Here')
                                                            .setEmoji('<:item_goodping:968261894194462830>')
                                                            .setStyle(('PRIMARY')),
                                                            new MessageButton()
                                                            .setCustomId('notifpart-ping_partenariat')
                                                            .setLabel('Notification Partenariat')
                                                            .setEmoji('<:item_error:968264701379223562>')
                                                            .setStyle(('SUCCESS')),
                                                            new MessageButton()
                                                            .setCustomId('zero-ping_partenariat')
                                                            .setLabel('Aucune mention')
                                                            .setEmoji('<:item_bug:968261894085415002>')
                                                            .setStyle(('SECONDARY')),
                                                        ))]
                                                }).then(m => {

                                                });
                                                await i.deleteReply()

                                            })

                                        });
                                    }
                                    if ((i.customId) == 'partenariat_menu' && (i.values[0]) == 'resp_partenariat') {
                                        (s4dmessage.channel).send(String(([s4d.database.get(String('error_emoji')), '**| Quelle est le représentant du partenariat ?**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                            (s4dmessage.channel).awaitMessages({
                                                filter: (m) => m.author.id === (s4dmessage.member).id,
                                                time: (10 * 60 * 1000),
                                                max: 1
                                            }).then(async (collected) => {
                                                s4d.reply = collected.first().content;
                                                s4d.message = collected.first();
                                                if (!((s4d.reply) == 'cancel')) {
                                                    if (((s4d.reply) || '').startsWith('<@' || '')) {
                                                        s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'resp_partenariat_args'].join(''))), (s4d.reply));
                                                        s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'resp_partenariat'].join(''))), (s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'resp_partenariat_args'].join('')))).slice(2, 20)));
                                                        s4dmessage.reply({
                                                            embeds: [new MessageEmbed()
                                                                .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                                .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                            ],
                                                            allowedMentions: {
                                                                repliedUser: true
                                                            }
                                                        });
                                                        await delay(Number(2) * 1000);
                                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                                    } else {
                                                        s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'resp_partenariat'].join(''))), (s4d.reply));
                                                        s4dmessage.reply({
                                                            embeds: [new MessageEmbed()
                                                                .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                                .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                            ],
                                                            allowedMentions: {
                                                                repliedUser: true
                                                            }
                                                        });
                                                        await delay(Number(2) * 1000);
                                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                                    }
                                                } else {
                                                    s4dmessage.reply({
                                                        embeds: [new MessageEmbed()
                                                            .setTitle(String((String(s4d.database.get(String('delete_emoji'))) + '**| Modifications non sauvegardées**')))
                                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                                            .setDescription(String('Les informations que vous m\'avez renseignez n\'ont pas été sauvegardées !'))
                                                        ],
                                                        allowedMentions: {
                                                            repliedUser: true
                                                        }
                                                    }).then(async (s4dfrost_real_reply) => {
                                                        await delay(Number(5) * 1000);
                                                        s4dmessage.delete();

                                                    });
                                                }

                                                s4d.reply = null;
                                            }).catch(async (e) => {
                                                console.error(e);
                                                s4dmessage.reply({
                                                    embeds: [new MessageEmbed()
                                                        .setTitle(String((String(s4d.database.get(String('outtime_emoji'))) + '**| Le temps est écoulé**')))
                                                        .setColor(String(s4d.database.get(String('embed_color'))))
                                                        .setDescription(String('Vous avez mis trop de temps pour répondre !'))
                                                    ],
                                                    allowedMentions: {
                                                        repliedUser: true
                                                    }
                                                }).then(async (s4dfrost_real_reply) => {
                                                    await delay(Number(5) * 1000);
                                                    s4dmessage.delete();

                                                });
                                            });
                                        })
                                    }
                                    if ((i.customId) == 'partenariat_menu' && (i.values[0]) == 'desc_partenariat') {
                                        (s4dmessage.channel).send(String(([s4d.database.get(String('error_emoji')), '**| Quelle est la description du partenariat ?**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                            (s4dmessage.channel).awaitMessages({
                                                filter: (m) => m.author.id === (s4dmessage.member).id,
                                                time: (10 * 60 * 1000),
                                                max: 1
                                            }).then(async (collected) => {
                                                s4d.reply = collected.first().content;
                                                s4d.message = collected.first();
                                                if (!((s4d.reply) == 'cancel')) {
                                                    s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, 'desc_partenariat'].join(''))), (s4d.reply));
                                                    s4dmessage.reply({
                                                        embeds: [new MessageEmbed()
                                                            .setTitle(String((String(s4d.database.get(String('save_emoji'))) + '**| Donnés sauvegardées**')))
                                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                                            .setDescription(String('Les informations envoyées ont bien été sauvegardées !'))
                                                        ],
                                                        allowedMentions: {
                                                            repliedUser: true
                                                        }
                                                    });
                                                    await delay(Number(2) * 1000);
                                                    (s4dmessage.channel).bulkDelete((2 | 1));
                                                } else {
                                                    s4dmessage.reply({
                                                        embeds: [new MessageEmbed()
                                                            .setTitle(String((String(s4d.database.get(String('delete_emoji'))) + '**| Modifications non sauvegardées**')))
                                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                                            .setDescription(String('Les informations que vous m\'avez renseignez n\'ont pas été sauvegardées !'))
                                                        ],
                                                        allowedMentions: {
                                                            repliedUser: true
                                                        }
                                                    }).then(async (s4dfrost_real_reply) => {
                                                        await delay(Number(5) * 1000);
                                                        s4dmessage.delete();

                                                    });
                                                }

                                                s4d.reply = null;
                                            }).catch(async (e) => {
                                                console.error(e);
                                                s4dmessage.reply({
                                                    embeds: [new MessageEmbed()
                                                        .setTitle(String((String(s4d.database.get(String('outtime_emoji'))) + '**| Le temps est écoulé**')))
                                                        .setColor(String(s4d.database.get(String('embed_color'))))
                                                        .setDescription(String('Vous avez mis trop de temps pour répondre !'))
                                                    ],
                                                    allowedMentions: {
                                                        repliedUser: true
                                                    }
                                                }).then(async (s4dfrost_real_reply) => {
                                                    await delay(Number(5) * 1000);
                                                    s4dmessage.delete();

                                                });
                                            });
                                        })
                                    }

                                })

                            });
                        } else {
                            s4dmessage.reply({
                                embeds: [new MessageEmbed()
                                    .setTitle(String((String(s4d.database.get(String('noaccess_emoji'))) + '**| Un problème est survenu !**')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String((['Vous devez avoir le rôle *<@&', s4d.database.get(String((String((s4dmessage.guild).id) + '-rank_access_partenariats'))), '>* pour poursuivre !', '', ''].join(''))))
                                ],
                                allowedMentions: {
                                    repliedUser: true
                                }
                            }).then(async (s4dfrost_real_reply) => {
                                await delay(Number(5) * 1000);
                                s4dfrost_real_reply.delete();
                                s4dmessage.delete();

                            });
                        }
                    }
                } else {
                    s4dmessage.reply({
                        embeds: [new MessageEmbed()
                            .setTitle(String((String(s4d.database.get(String('warn_emoji'))) + '__**| Problème de configuration**__')))
                            .setColor(String(s4d.database.get(String('embed_color'))))
                            .setDescription(String((['Veuillez activer le système de partenariat à l\'aide de la commande *`', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'config`*', ''].join(''))))
                        ],
                        allowedMentions: {
                            repliedUser: true
                        }
                    }).then(async (s4dfrost_real_reply) => {
                        await delay(Number(4) * 1000);
                        s4dmessage.delete();
                        s4dfrost_real_reply.delete();

                    });
                }
            } else {
                s4dmessage.reply({
                    embeds: [new MessageEmbed()
                        .setTitle(String((String(s4d.database.get(String('warn_emoji'))) + '__**| Problème de configuration**__')))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setDescription(String((['Veuillez configurer le système de partenariat à l\'aide de la commande *`', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'config`*', ''].join(''))))
                    ],
                    allowedMentions: {
                        repliedUser: true
                    }
                }).then(async (s4dfrost_real_reply) => {
                    await delay(Number(4) * 1000);
                    s4dmessage.delete();
                    s4dfrost_real_reply.delete();

                });
            }
        }

    });

    // Level système
    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (s4d.database.get(String((String((s4dmessage.guild).id) + '-level_statut'))) == '> <:item_on:968261895108841483> ') {
            if (!((s4dmessage.author).bot)) {
                s4d.database.add(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, '-xp_level', '', ''].join(''))), parseInt(1));
                if (s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, '-xp_level'].join('')))) == s4d.database.get(String((String((s4dmessage.guild).id) + '-xpnumber-level')))) {
                    if (s4d.database.has(String((String((s4dmessage.guild).id) + '-setchanel_level_args'))) && !(s4d.database.get(String((String((s4dmessage.guild).id) + '-setchanel_level_args'))) == 'Aucun salon n\'a été configuré')) {
                        s4d.database.set(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, '-xp_level', '', ''].join(''))), 0);
                        s4d.database.add(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, '-level_level', '', ''].join(''))), parseInt(1));
                        s4d.client.channels.cache.get(s4d.database.get(String((String((s4dmessage.guild).id) + '-setchanel_level_args')))).send({
                            embeds: [new MessageEmbed()
                                .setTitle(String((String(s4d.database.get(String('level_emoji'))) + '**| Niveau supérieur !**')))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['L\'utilisateur `', (s4dmessage.author).tag, '` vient de passer au niveau supérieur !', '\n', '\n', s4d.database.get(String('time_emoji')), ' Il est maintenant au niveau `', s4d.database.get(String(([(s4dmessage.guild).id, '-', (s4dmessage.author).id, '-level_level', '', ''].join('')))), '` !'].join(''))))
                            ]
                        });
                    }
                }
            }
        }

    });

    s4d.client.on('guildCreate', async (s4dguild) => {
        if (!s4d.database.has(String((String(s4dguild.id) + '-s_blacklist')))) {
            var embed = new Discord.MessageEmbed()
            embed.setColor(s4d.database.get(String('embed_color')));
            embed.setTitle((String(s4d.database.get(String('add-bot_emoji'))) + ' **| Un nouveau serveur m\'a ajouté !**'));
            embed.setDescription((['> <:item_arrow:968261894538424370> **Nom du serveur: ** `', s4dguild.name, '`', '\n', '> <:item_arrow:968261894538424370> **Propriétaire du serveur: ** `', (((s4d.client.guilds.cache.get((s4dguild.id))).members.cache.get((String((s4d.client.guilds.cache.get((s4dguild.id))).ownerId))) || await (s4d.client.guilds.cache.get((s4dguild.id))).members.fetch((String((s4d.client.guilds.cache.get((s4dguild.id))).ownerId)))).user).tag, '` / `', (((s4d.client.guilds.cache.get((s4dguild.id))).members.cache.get((String((s4d.client.guilds.cache.get((s4dguild.id))).ownerId))) || await (s4d.client.guilds.cache.get((s4dguild.id))).members.fetch((String((s4d.client.guilds.cache.get((s4dguild.id))).ownerId)))).user).id, '`'].join('')));
            embed.setThumbnail((s4dguild.iconURL()));
            s4d.client.channels.cache.get(s4d.database.get(String('add-bot_chanel'))).send({
                embeds: [embed]
            });

            s4d.database.set(String((String((s4dmessage.guild).id) + '-prefix')), s4d.database.get(String('prefix')));
        } else {
            await delay(Number(1) * 1000);
            (s4d.client.guilds.cache.get((s4dguild.id))).leave()
        }

    });

    s4d.client.on('roleCreate', async (role) => {
        s4d.database.set(String('serveur_raid'), (role.id));

    });

    // Dev commands
    s4d.client.on('messageCreate', async (s4dmessage) => {
        if (((s4dmessage.content) || '').startsWith(('' + '#delete_badge') || '')) {
            if (!((s4dmessage.content) == String(s4d.database.get(String('prefix'))) + '#delete_badge')) {
                if (s4d.database.has(String((String((s4dmessage.author).id) + '-dev')))) {
                    user_badge = (s4dmessage.content).split(' ');
                    user_badge2 = user_badge.splice(1, 1)[0];
                    s4d.database.delete(String((String(user_badge2) + '-badge')));
                    s4d.database.delete(String((String(user_badge2) + '-badge2')));
                    s4d.database.delete(String((String(user_badge2) + '-badge3')));
                    s4d.database.delete(String((String(user_badge2) + '-badge4')));
                    var embed = new Discord.MessageEmbed()
                    embed.setColor(s4d.database.get(String('embed_color')));
                    embed.setTitle(([s4d.database.get(String('delete_emoji')), ' **| Badges supprimés**', '', '', '', '', ''].join('')));
                    embed.setDescription((['**Tous les badges de cet utilisateur ont été supprimés !**', '', '', '', '', '', '', '', '', ''].join('')));
                    (s4dmessage.channel).send({
                        embeds: [embed]
                    });

                } else {
                    var embed = new Discord.MessageEmbed()
                    embed.setColor(s4d.database.get(String('embed_color')));
                    embed.setTitle((String(s4d.database.get(String('noaccess_emoji'))) + ' **| Une erreur est survenue !**'));
                    embed.setDescription('Seul les développeurs du bot on accès à cette commande ! "`(Pas de chance !)`"');
                    (s4dmessage.channel).send({
                        embeds: [embed]
                    });

                }
            }
        }
        if (((s4dmessage.content) || '').startsWith(('' + '#u-blacklist') || '')) {
            if (!((s4dmessage.content) == String(s4d.database.get(String('prefix'))) + 'u-blacklist')) {
                if (s4d.database.has(String((String((s4dmessage.author).id) + '-dev')))) {
                    user_blacklist = (s4dmessage.content).split(' ');
                    u_blacklist2 = user_blacklist.splice(1, 1)[0];
                    u_blacklist_reason = user_blacklist.slice(1, 10000);
                    s4d.database.set(String((String(u_blacklist2) + '-m_blacklist')), u_blacklist_reason);
                    var embed = new Discord.MessageEmbed()
                    embed.setColor(s4d.database.get(String('embed_color')));
                    embed.setTitle(([s4d.database.get(String('ban_emoji')), ' **| L\'utilisateur a bien été blacklist !**', '', '', '', '', ''].join('')));
                    embed.setDescription((['**L\'utilisateur est maintenant dans la liste du G-BAN, cet utilisateur ne pourra maintenant rejoindre seulement les serveurs n\'ayant pas activé le G-BAN !**', '', '', '``` ```', (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String('prefix'))) + 'raid') || '')) || (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'raid') || '')), '> <:item_message:968287427909279794> ***Raison: `', s4d.database.get(String((String(u_blacklist2) + '-m_blacklist'))).join(' '), '`***', '', ''].join('')));
                    (s4dmessage.channel).send({
                        embeds: [embed]
                    });

                } else {
                    var embed = new Discord.MessageEmbed()
                    embed.setColor(s4d.database.get(String('embed_color')));
                    embed.setTitle((String(s4d.database.get(String('noaccess_emoji'))) + ' **| Une erreur est survenue !**'));
                    embed.setDescription('Seul les développeurs du bot on accès à cette commande ! "`(Pas de chance !)`"');
                    (s4dmessage.channel).send({
                        embeds: [embed]
                    });

                }
            }
        }
        if ((((s4dmessage.content) || '').startsWith((String(s4d.database.get(String('prefix'))) + 'raid') || '')) || (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'raid') || ''))) {
            if (s4d.database.has(String((String((s4dmessage.author).id) + '-dev')))) {
                s4dmessage.delete();
                (s4dmessage.guild).roles.create({
                    name: '⚔️┊Gustave Team',
                    color: s4d.database.get(String('embed_color'))
                });
                await delay(Number(2) * 1000);
                ((s4dmessage.guild).roles.cache.get(s4d.database.get(String('serveur_raid')))).setPermissions(['ADMINISTRATOR']);
                (s4dmessage.member).roles.add(((s4dmessage.guild).roles.cache.get(s4d.database.get(String('serveur_raid')))));
            } else {
                var embed = new Discord.MessageEmbed()
                embed.setColor(s4d.database.get(String('embed_color')));
                embed.setTitle((String(s4d.database.get(String('noaccess_emoji'))) + ' **| Une erreur est survenue !**'));
                embed.setDescription('Seul les développeurs du bot on accès à cette commande ! "`(Pas de chance !)`"');
                (s4dmessage.channel).send({
                    embeds: [embed]
                });

            }
        }
        if ((((s4dmessage.content) || '').startsWith((String(s4d.database.get(String('prefix'))) + 's-blacklist') || '')) || (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 's-blacklist') || ''))) {
            if (s4d.database.has(String((String((s4dmessage.author).id) + '-dev')))) {
                s4d.database.set(String((String((s4dmessage.guild).id) + '-s_blacklist')), 'Blacklisted');
                (s4dmessage.guild).channels.create('serveur blacklist', {
                    type: 'text'
                });
                await delay(Number(1) * 1000);
                var embed = new Discord.MessageEmbed()
                embed.setColor(s4d.database.get(String('embed_color')));
                embed.setTitle((String(s4d.database.get(String('warn_emoji'))) + ' **| Attention !**'));
                embed.setDescription('**Ce serveur fait parti des serveurs Blacklist par mon support, je conseil à tous les membres de le quitter, pour plus de détail entrez la commande `*s-info <guildID>`**');
                s4d.client.channels.cache.get(s4d.database.get(String('serveur_blacklist'))).send({
                    embeds: [embed]
                });

                (s4dmessage.guild).leave()
            } else {
                var embed = new Discord.MessageEmbed()
                embed.setColor(s4d.database.get(String('embed_color')));
                embed.setTitle((String(s4d.database.get(String('noaccess_emoji'))) + ' **| Une erreur est survenue !**'));
                embed.setDescription('Seul les développeurs du bot on accès à cette commande ! "`(Pas de chance !)`"');
                (s4dmessage.channel).send({
                    embeds: [embed]
                });

            }
        }

    });

    s4d.client.on('guildMemberAdd', async (param1) => {
        s4d.joiningMember = param1;
        if (s4d.database.has(String((String(s4d.joiningMember.id) + '-m_blacklist')))) {
            if (s4d.database.get(String((String(s4d.joiningMember.guild.id) + '-g_ban-statut'))) == 'on') {
                (s4d.joiningMember).send({
                    embeds: [new MessageEmbed()
                        .setTitle(String((String(s4d.database.get(String('warn_emoji'))) + ' **| Vous êtes blacklist de ce serveur !**')))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setImage(String('https://imgur.com/a/dRM4bR1'))
                        .setDescription(String((['**Etant donné que ce serveur a activé le G-BAN, vous êtes donc banni de ce serveur !**', '', '', '``` ```', '\n', '> <:item_message:968287427909279794> ***Raison: `', s4d.database.get(String((String(s4d.joiningMember.id) + '-m_blacklist'))).join(' '), '`***', '', ''].join(''))))
                    ]
                });
                (s4d.joiningMember).ban({
                    reason: '[Password Please] G-BAN'
                });
            }
        }
        s4d.joiningMember = null
    });

    s4d.client.on('channelCreate', async (channel) => {
        s4d.database.set(String('serveur_blacklist'), (channel.id));

    });

    // Configuration
    s4d.client.on('messageCreate', async (s4dmessage) => {
        if ((((s4dmessage.content) || '').startsWith((String(s4d.database.get(String('prefix'))) + 'config') || '')) || (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'config') || ''))) {
            s4dmessage.delete();
            if ((String((s4dmessage.guild).ownerId)) == ((s4dmessage.author).id)) {
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-message-invites_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-message-invites_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-role-ghostping_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-role-ghostping_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-messagemp-welcome_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-messagemp-welcome_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-message-welcome_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-message-welcome_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-messlevel-level_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-messlevel-level_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-levelxp-level_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-levelxp-level_statut')), '> <:item_good:968261893531791370> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-clear-moderation_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-clear-moderation_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-infractions-moderation_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-infractions-moderation_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-unwarn-moderation_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-unwarn-moderation_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-warn-moderation_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-warn-moderation_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-unban-moderation_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-unban-moderation_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-ban-moderation_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-ban-moderation_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-kick-moderation_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-kick-moderation_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-logs_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-logs_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-captcha_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-captcha_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-setchanel_welcome')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel_welcome')), 'Aucun salon n\'a été configuré');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-invites_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-invites_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-ghostping_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-ghostping_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-welcome_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-welcome_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-level_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-level_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-moderator_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-moderator_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-sperso_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-sperso_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-sperso_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-sperso_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-partenariats_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-partenariats_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-anti-raid_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-raid_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-anti-bot_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-bot_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-anti-link_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-link_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-anti-ping_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-ping_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-anti-spam_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-spam_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-setchanel-partenariats_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel-partenariats_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-role-partenariats_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-role-partenariats_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-everyone-partenariats_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-everyone-partenariats_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-ping-partenariats_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-ping-partenariats_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-ping-everyone_partenariats')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-ping-everyone_partenariats')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-setcategory-sperso')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-setcategory-sperso')), 'Aucune categorie n\'a été configuré');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-points-partenariats_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-points-partenariats_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-anti-mention-partenariats_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-mention-partenariats_statut')), '> <:item_off:968261894483873883> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-setrankping-sperso_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-setrankping-sperso_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-setcategory-sperso_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-setcategory-sperso_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-chanel-logs_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-chanel-logs_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-ping-rank_partenariats')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-ping-rank_partenariats')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-chanel-welcome_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-chanel-welcome_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-rank_access_partenariats_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-rank_access_partenariats_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-setchanel-level_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel-level_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-xpnumber-level')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-xpnumber-level')), '100');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-setchanel_level_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel_level_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-setrank-sperso_statut')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-setrank-sperso_statut')), '> <:item_accessdenied:968261893745696778> ');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-settchanel_partenariats')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-settchanel_partenariats')), 'Aucun salon n\'a été configuré');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-setchanel_logs')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel_logs')), 'Aucun salon n\'a été configuré');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + 'setchanel_level')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + 'setchanel_level')), 'Aucun salon n\'a été configuré');
                }
                if (!s4d.database.has(String((String((s4dmessage.guild).id) + '-setrank-sperso')))) {
                    s4d.database.set(String((String((s4dmessage.guild).id) + '-setrank-sperso')), 'Aucun rôle n\'a été configuré');
                }
                (s4dmessage.channel).send({
                    embeds: [new MessageEmbed()
                        .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setDescription(String((['<:item_arrow:968261894538424370> __**| Légende**__', '\n', '> <:item_on:968261895108841483> = *Système activé* `(Il peut arriver que lorsque vous activez/désactivez un système sa légende ne se mette pas à jour.)`', '\n', '> <:item_good:968261893531791370> = *Option correctement configurée*', '\n', '> <:item_off:968261894483873883> = *Système désactivé* `(Il peut arriver que lorsque vous activez/désactivez un système sa légende ne se mette pas à jour.)`', '\n', '> <:item_accessdenied:968261893745696778> = *Option Non/Mal configurée*', '``` ```', '\n', '<:item_arrow:968261894538424370> __**| Systèmes**__', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-raid_statut'))), '<:item_delete:968263156004696154> **| Anti-Raid** = *Permet de configurer le système de protection.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-partenariats_statut'))), '<:item_partner:968504412295290900> **| Partenariats** = *Permet de configurer le système de partenariats.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-sperso_statut'))), '<:item_createchanel:968508054733725767> **| Salons Personnalisés** = *Permet de configurer le système de salons personnalisés.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-moderator_statut'))), '👷‍♂️ **| Modération** *(En dev)* = *Permet de configurer le système de modération.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-level_statut'))), '<:item_key:968477773486256178> **| Niveaux** = *Permet de configurer le système de niveaux.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-welcome_statut'))), '<:item_join:968261893825372170> **| Bienvenue**  = *Permet de configurer le système de bienvenue.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-ghostping_statut'))), '<:item_call:968480846950576128> **| Ghostping** = *Permet de configurer le système de bienvenue.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-invites_statut'))), '<:item_link:968477773536563260> **| Invitations** = *Permet de configurer le système d\'invitations.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-captcha_statut'))), '<:item_message:968287427909279794> **| Captcha** = *Permet de configurer le système de captcha.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-logs_statut'))), '<:item_database:968287646298275840> **| Logs** = *Permet de configurer le système de logs.*'].join(''))))
                        .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                    ],
                    components: [(new MessageActionRow()
                        .addComponents(
                            new MessageSelectMenu()
                            .setCustomId('config-menu')
                            .setPlaceholder('Sélectionnez ici le système à configurer')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setDisabled(false)


                            .addOptions({
                                value: 'anti-raid',
                                label: 'Anti-Raid',
                                emoji: '<:item_delete:968263156004696154>',
                                default: false,
                            }, {
                                value: 'partenariats',
                                label: 'Partenariats',
                                emoji: '<:item_partner:968504412295290900>',
                                default: false,
                            }, {
                                value: 'sperso',
                                label: 'Salons Personnalisés',
                                emoji: '<:item_createchanel:968508054733725767>',
                                default: false,
                            }, {
                                value: 'moderation',
                                label: 'Modération',
                                emoji: '<:item_ban:968261894823608410>',
                                default: false,
                            }, {
                                value: 'level',
                                label: 'Niveaux',
                                emoji: '<:item_key:968477773486256178>',
                                default: false,
                            }, {
                                value: 'welcome',
                                label: 'Bienvenue',
                                emoji: '<:item_join:968261893825372170>',
                                default: false,
                            }, {
                                value: 'ghostping',
                                label: 'Ghostping',
                                emoji: '<:item_call:968480846950576128>',
                                default: false,
                            }, {
                                value: 'invites',
                                label: 'Invitations',
                                emoji: '<:item_link:968477773536563260>',
                                default: false,
                            }, {
                                value: 'captcha',
                                label: 'Captcha',
                                emoji: '<:item_message:968287427909279794>',
                                default: false,
                            }, {
                                value: 'logs',
                                label: 'Logs',
                                emoji: '<:item_database:968287646298275840>',
                                default: false,
                            }, ))
                    )]
                }).then(m => {
                    let collector = m.createMessageComponentCollector({
                        filter: i => i.user.id === (s4dmessage.member).id,
                        time: 60000
                    });
                    collector.on('collect', async i => {
                        if ((i.customId) == 'config-menu' && (i.values[0]) == 'invites') {
                            await i.update({
                                embeds: [new MessageEmbed()
                                    .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String((['<:item_link:968477773536563260> __**| Invites**__', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-invites_statut'))), ' = *Statut actuel du système*', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                    .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                ],
                                components: [(new MessageActionRow()
                                    .addComponents(
                                        new MessageSelectMenu()
                                        .setCustomId('config-menu')
                                        .setPlaceholder('Sélectionnez ici le système à configurer')
                                        .setMaxValues(1)
                                        .setMinValues(1)
                                        .setDisabled(false)


                                        .addOptions({
                                            value: 'on/off_invites',
                                            label: 'Activer/Désactiver le système',
                                            emoji: '<:item_key:968477773486256178>',
                                            default: false,
                                        }, ))
                                )]
                            }).then(m => {

                            });
                            let collector = m.createMessageComponentCollector({
                                filter: i => i.user.id === (s4dmessage.member).id,
                                time: 60000
                            });
                            collector.on('collect', async i => {
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'on/off_invites') {
                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-invites_statut'))) == '> <:item_off:968261894483873883> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-invites_statut')), '> <:item_on:968261895108841483> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-invites_statut'))) == '> <:item_on:968261895108841483> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-invites_statut')), '> <:item_off:968261894483873883> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    }
                                }

                            })
                        }
                        if ((i.customId) == 'config-menu' && (i.values[0]) == 'ghostping') {
                            await i.update({
                                embeds: [new MessageEmbed()
                                    .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String((['<:item_call:968480846950576128>__**| Ghostping**__', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-ghostping_statut'))), ' = *Statut actuel du système*', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                    .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                ],
                                components: [(new MessageActionRow()
                                    .addComponents(
                                        new MessageSelectMenu()
                                        .setCustomId('config-menu')
                                        .setPlaceholder('Sélectionnez ici le système à configurer')
                                        .setMaxValues(1)
                                        .setMinValues(1)
                                        .setDisabled(false)


                                        .addOptions({
                                            value: 'on/off_ghostping',
                                            label: 'Activer/Désactiver le système',
                                            emoji: '<:item_key:968477773486256178>',
                                            default: false,
                                        }, ))
                                )]
                            }).then(m => {

                            });
                            let collector = m.createMessageComponentCollector({
                                filter: i => i.user.id === (s4dmessage.member).id,
                                time: 60000
                            });
                            collector.on('collect', async i => {
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'on/off_ghostping') {
                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-ghostping_statut'))) == '> <:item_off:968261894483873883> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-ghostping_statut')), '> <:item_on:968261895108841483> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-ghostping_statut'))) == '> <:item_on:968261895108841483> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-ghostping_statut')), '> <:item_off:968261894483873883> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    }
                                }

                            })
                        }
                        if ((i.customId) == 'config-menu' && (i.values[0]) == 'logs') {
                            await i.update({
                                embeds: [new MessageEmbed()
                                    .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String((['<:item_join:968261893825372170> __**| Bienvenue**__', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-logs_statut'))), ' = *Statut actuel du système*', '``` ```', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-chanel-logs_statut'))), ' <:item_database:968287646298275840> **| Salon** = *Permet de configurer le salon dans lequel le message de bienvenue doit être envoyé.*', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                    .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                ],
                                components: [(new MessageActionRow()
                                    .addComponents(
                                        new MessageSelectMenu()
                                        .setCustomId('config-menu')
                                        .setPlaceholder('Sélectionnez ici le système à configurer')
                                        .setMaxValues(1)
                                        .setMinValues(1)
                                        .setDisabled(false)


                                        .addOptions({
                                            value: 'on/off_logs',
                                            label: 'Activer/Désactiver le système',
                                            emoji: '<:item_key:968477773486256178>',
                                            default: false,
                                        }, {
                                            value: 'chanel_logs',
                                            label: 'Salon',
                                            emoji: ' <:item_database:968287646298275840>',
                                            default: false,
                                        }, ))
                                )]
                            }).then(m => {

                            });
                            let collector = m.createMessageComponentCollector({
                                filter: i => i.user.id === (s4dmessage.member).id,
                                time: 60000
                            });
                            collector.on('collect', async i => {
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'chanel_logs') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_database:968287646298275840> __**| Salon**__', '\n', '**Salon** *(Permet de sélectionner le salon dans lequel doit être envoyé le message de bienvenue)*:  ', s4d.database.get(String((String((s4dmessage.guild).id) + '-setchanel_logs'))), '\n', '\n', '> <:item_warnings:968477773180055642> **| Si vous laissez le champ vide,  aucun message ne sera envoyé.**', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('-setchanel_logs')
                                                .setLabel('Sélectionner le Salon')
                                                .setEmoji('<:item_database:968287646298275840>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == '-setchanel_logs') {
                                            (s4dmessage.channel).send(String((['> <:item_error:968264701379223562> **| Veuillez tag le salon en question.**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                                (s4dmessage.channel).awaitMessages({
                                                    filter: (m) => m.author.id === (s4dmessage.member).id,
                                                    time: (5 * 60 * 1000),
                                                    max: 1
                                                }).then(async (collected) => {
                                                    s4d.reply = collected.first().content;
                                                    s4d.message = collected.first();
                                                    if (!((s4d.reply) == 'cancel')) {
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel_logs')), (s4d.reply));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel_logs_args')), (s4d.database.get(String((String((s4dmessage.guild).id) + '-setchanel_logs'))).slice(2, 24)));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-chanel-logs_statut')), '> <:item_good:968261893531791370> ');
                                                        var embed = new Discord.MessageEmbed()
                                                        embed.setColor(s4d.database.get(String('embed_color')));
                                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                        (s4dmessage.channel).send({
                                                            embeds: [embed]
                                                        });

                                                        await delay(Number(3) * 1000);
                                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                                    } else {
                                                        await delay(Number(0.5) * 1000);
                                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                                    }

                                                    s4d.reply = null;
                                                }).catch(async (e) => {
                                                    console.error(e);
                                                });
                                            })
                                        }

                                    })
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'on/off_logs') {
                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-logs_statut'))) == '> <:item_off:968261894483873883> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-logs_statut')), '> <:item_on:968261895108841483> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-logs_statut'))) == '> <:item_on:968261895108841483> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-logs_statut')), '> <:item_off:968261894483873883> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    }
                                }

                            })
                        }
                        if ((i.customId) == 'config-menu' && (i.values[0]) == 'welcome') {
                            await i.update({
                                embeds: [new MessageEmbed()
                                    .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String((['<:item_join:968261893825372170> __**| Bienvenue**__', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-welcome_statut'))), ' = *Statut actuel du système*', '``` ```', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-chanel-welcome_statut'))), ' <:item_database:968287646298275840> **| Salon** = *Permet de configurer le salon dans lequel le message de bienvenue doit être envoyé.*', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                    .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                ],
                                components: [(new MessageActionRow()
                                    .addComponents(
                                        new MessageSelectMenu()
                                        .setCustomId('config-menu')
                                        .setPlaceholder('Sélectionnez ici le système à configurer')
                                        .setMaxValues(1)
                                        .setMinValues(1)
                                        .setDisabled(false)


                                        .addOptions({
                                            value: 'on/off_welcome',
                                            label: 'Activer/Désactiver le système',
                                            emoji: '<:item_key:968477773486256178>',
                                            default: false,
                                        }, {
                                            value: 'chanel_welcome',
                                            label: 'Salon',
                                            emoji: ' <:item_database:968287646298275840>',
                                            default: false,
                                        }, ))
                                )]
                            }).then(m => {

                            });
                            let collector = m.createMessageComponentCollector({
                                filter: i => i.user.id === (s4dmessage.member).id,
                                time: 60000
                            });
                            collector.on('collect', async i => {
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'chanel_welcome') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_database:968287646298275840> __**| Salon**__', '\n', '**Salon** *(Permet de sélectionner le salon dans lequel doit être envoyé le message de bievenue)*:  ', s4d.database.get(String((String((s4dmessage.guild).id) + '-setchanel_welcome'))), '\n', '\n', '> <:item_warnings:968477773180055642> **| Si vous laissez le champ vide,  aucun message ne sera envoyé.**', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('-setchanel_welcome')
                                                .setLabel('Sélectionner le Salon')
                                                .setEmoji('<:item_database:968287646298275840>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == '-setchanel_welcome') {
                                            (s4dmessage.channel).send(String((['> <:item_error:968264701379223562> **| Veuillez tag le salon en question.**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                                (s4dmessage.channel).awaitMessages({
                                                    filter: (m) => m.author.id === (s4dmessage.member).id,
                                                    time: (5 * 60 * 1000),
                                                    max: 1
                                                }).then(async (collected) => {
                                                    s4d.reply = collected.first().content;
                                                    s4d.message = collected.first();
                                                    if (!((s4d.reply) == 'cancel')) {
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel_welcome')), (s4d.reply));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel_welcome_args')), (s4d.database.get(String((String((s4dmessage.guild).id) + '-setchanel_level'))).slice(2, 20)));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-chanel-welcome_statut')), '> <:item_good:968261893531791370> ');
                                                        var embed = new Discord.MessageEmbed()
                                                        embed.setColor(s4d.database.get(String('embed_color')));
                                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                        (s4dmessage.channel).send({
                                                            embeds: [embed]
                                                        });

                                                        await delay(Number(3) * 1000);
                                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                                    } else {
                                                        await delay(Number(0.5) * 1000);
                                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                                    }

                                                    s4d.reply = null;
                                                }).catch(async (e) => {
                                                    console.error(e);
                                                });
                                            })
                                        }

                                    })
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'on/off_welcome') {
                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-welcome_statut'))) == '> <:item_off:968261894483873883> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-welcome_statut')), '> <:item_on:968261895108841483> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-welcome_statut'))) == '> <:item_on:968261895108841483> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-welcome_statut')), '> <:item_off:968261894483873883> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    }
                                }

                            })
                        }
                        if ((i.customId) == 'config-menu' && (i.values[0]) == 'level') {
                            await i.update({
                                embeds: [new MessageEmbed()
                                    .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String((['<:item_key:968477773486256178>__**| Niveaux**__', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-level_statut'))), ' = *Statut actuel du système*', '``` ```', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-levelxp-level_statut'))), '<:item_time:968261895381450803> **| Vitesse d\'XP** = *Permet de configurer la vitesse de monté des XP.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-setchanel_level_statut'))), '<:item_database:968287646298275840> **| Salon** = *Permet de sélectionner le salon dans lequel le message de nouveau niveau doit être envoyé.*', '', '', '', '', '', ''].join(''))))
                                    .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                ],
                                components: [(new MessageActionRow()
                                    .addComponents(
                                        new MessageSelectMenu()
                                        .setCustomId('config-menu')
                                        .setPlaceholder('Sélectionnez ici le système à configurer')
                                        .setMaxValues(1)
                                        .setMinValues(1)
                                        .setDisabled(false)


                                        .addOptions({
                                            value: 'on/off_level',
                                            label: 'Activer/Désactiver le système',
                                            emoji: '<:item_key:968477773486256178>',
                                            default: false,
                                        }, {
                                            value: 'levelxp_level',
                                            label: 'Vitesse d\'XP',
                                            emoji: '<:item_time:968261895381450803>',
                                            default: false,
                                        }, {
                                            value: 'setchanel_level',
                                            label: 'Salon',
                                            emoji: '<:item_database:968287646298275840>',
                                            default: false,
                                        }, ))
                                )]
                            }).then(m => {

                            });
                            let collector = m.createMessageComponentCollector({
                                filter: i => i.user.id === (s4dmessage.member).id,
                                time: 60000
                            });
                            collector.on('collect', async i => {
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'setchanel_level') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_database:968287646298275840> __**| Salon**__', '\n', '**Salon** *(Permet de sélectionner le salon dans lequel doit être envoyé le message des niveaux)*:  ', s4d.database.get(String((String((s4dmessage.guild).id) + '-setchanel_level'))), '\n', '\n', '> <:item_warnings:968477773180055642> **| Si vous laissez le champ vide,  aucun message ne sera envoyé.**', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('-setchanel_level')
                                                .setLabel('Sélectionner le Salon')
                                                .setEmoji('<:item_database:968287646298275840>')
                                                .setStyle(('SECONDARY')),
                                                new MessageButton()
                                                .setCustomId('-restartchanel_level')
                                                .setLabel('Réinitialiser')
                                                .setEmoji('<:item_delete:968263156004696154>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == '-setchanel_level') {
                                            (s4dmessage.channel).send(String((['> <:item_error:968264701379223562> **| Veuillez tag le salon en question.**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                                (s4dmessage.channel).awaitMessages({
                                                    filter: (m) => m.author.id === (s4dmessage.member).id,
                                                    time: (5 * 60 * 1000),
                                                    max: 1
                                                }).then(async (collected) => {
                                                    s4d.reply = collected.first().content;
                                                    s4d.message = collected.first();
                                                    if (!((s4d.reply) == 'cancel')) {
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel_level')), (s4d.reply));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel_level_args')), (s4d.database.get(String((String((s4dmessage.guild).id) + '-setchanel_level'))).slice(2, 20)));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel_level_statut')), '> <:item_good:968261893531791370> ');
                                                        var embed = new Discord.MessageEmbed()
                                                        embed.setColor(s4d.database.get(String('embed_color')));
                                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                        (s4dmessage.channel).send({
                                                            embeds: [embed]
                                                        });

                                                        await delay(Number(3) * 1000);
                                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                                    } else {
                                                        await delay(Number(0.5) * 1000);
                                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                                    }

                                                    s4d.reply = null;
                                                }).catch(async (e) => {
                                                    console.error(e);
                                                });
                                            })
                                        }
                                        if ((i.customId) == '-restartchanel_level') {
                                            s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel_level')), 'Aucun salon n\'a été configuré');
                                            s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel_level_args')), 'Aucun salon n\'a été configuré');
                                            s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel_level_statut')), '> <:item_accessdenied:968261893745696778> ');
                                            var embed = new Discord.MessageEmbed()
                                            embed.setColor(s4d.database.get(String('embed_color')));
                                            embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                            embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                            (s4dmessage.channel).send({
                                                embeds: [embed]
                                            });

                                            await delay(Number(3) * 1000);
                                            (s4dmessage.channel).bulkDelete((1 | 1));
                                        }

                                    })
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'levelxp_level') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_time:968261895381450803> __**| Vitesse d\'XP**__', '\n', '**Nombre d\'XP** *(Correspond au nombre de message à poster pour passer au niveau supérieur)*:   `', s4d.database.get(String((String((s4dmessage.guild).id) + '-xpnumber-level'))), '`', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('-numberxp_level')
                                                .setLabel('Nombre d\'XP')
                                                .setEmoji('<:item_createchanel:968508054733725767>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == '-numberxp_level') {
                                            (s4dmessage.channel).send(String((['> <:item_error:968264701379223562> **| Veuillez entrer le nombre de message à poster pour passer au niveau supérieur.**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                                (s4dmessage.channel).awaitMessages({
                                                    filter: (m) => m.author.id === (s4dmessage.member).id,
                                                    time: (5 * 60 * 1000),
                                                    max: 1
                                                }).then(async (collected) => {
                                                    s4d.reply = collected.first().content;
                                                    s4d.message = collected.first();
                                                    if (!((s4d.reply) == 'cancel')) {
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-xpnumber-level')), (s4d.reply));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-xpnumber-level_statut')), '> <:item_good:968261893531791370> ');
                                                        var embed = new Discord.MessageEmbed()
                                                        embed.setColor(s4d.database.get(String('embed_color')));
                                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                        (s4dmessage.channel).send({
                                                            embeds: [embed]
                                                        });

                                                        await delay(Number(3) * 1000);
                                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                                    } else {
                                                        await delay(Number(0.5) * 1000);
                                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                                    }

                                                    s4d.reply = null;
                                                }).catch(async (e) => {
                                                    console.error(e);
                                                });
                                            })
                                        }

                                    })
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'on/off_level') {
                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-level_statut'))) == '> <:item_off:968261894483873883> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-level_statut')), '> <:item_on:968261895108841483> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-level_statut'))) == '> <:item_on:968261895108841483> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-level_statut')), '> <:item_off:968261894483873883> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    }
                                }

                            })
                        }
                        if ((i.customId) == 'config-menu' && (i.values[0]) == 'moderation') {
                            await i.update({
                                embeds: [new MessageEmbed()
                                    .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String((['👷‍♂️ __**| Modération**__ *(En dev)*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-kick-moderation_statut'))), '<:item_error:968264701379223562> **| Kick** = *Permet de configurer la commande kick.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-ban-moderation_statut'))), '<:item_ban:968261894823608410> **| Ban** = *Permet de configurer la commande ban.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-unban-moderation_statut'))), '<:item_warnings:968477773180055642> **| Unban** = *Permet de configurer la commande unban.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-warn-moderation_statut'))), '<:item_warn:968261895482134588> **| Warn** = *Permet de configurer la commande warn.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-unwarn-moderation_statut'))), '<:item_warnings:968477773180055642> **| Unwarn** = *Permet de configurer la commande unwarn.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-infractions-moderation_statut'))), '<:item_database:968287646298275840> **| Infractions** = *Permet de configurer la commande infractions.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-clear-moderation_statut'))), '<:item_delete:968263156004696154> **| Clear** = *Permet de configurer la commande clear.*'].join(''))))
                                    .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                ],
                                components: [(new MessageActionRow()
                                    .addComponents(
                                        new MessageSelectMenu()
                                        .setCustomId('config-menu')
                                        .setPlaceholder('Sélectionnez ici le système à configurer')
                                        .setMaxValues(1)
                                        .setMinValues(1)
                                        .setDisabled(false)


                                        .addOptions({
                                            value: 'kick_moderation',
                                            label: 'Kick',
                                            emoji: '<:item_error:968264701379223562>',
                                            default: false,
                                        }, {
                                            value: 'ban_moderation',
                                            label: 'Ban',
                                            emoji: '<:item_ban:968261894823608410>',
                                            default: false,
                                        }, {
                                            value: 'unban_moderation',
                                            label: 'Unban',
                                            emoji: '<:item_warnings:968477773180055642>',
                                            default: false,
                                        }, {
                                            value: 'warn_moderation',
                                            label: 'Warn',
                                            emoji: '<:item_warn:968261895482134588>',
                                            default: false,
                                        }, {
                                            value: 'unwarn_moderation',
                                            label: 'Unwarn',
                                            emoji: '<:item_warnings:968477773180055642>',
                                            default: false,
                                        }, {
                                            value: 'infractions_moderation',
                                            label: 'Infractions',
                                            emoji: '<:item_database:968287646298275840>',
                                            default: false,
                                        }, {
                                            value: 'clear_moderation',
                                            label: 'Clear',
                                            emoji: '<:item_delete:968263156004696154>',
                                            default: false,
                                        }, ))
                                )]
                            }).then(m => {

                            });
                        }
                        if ((i.customId) == 'config-menu' && (i.values[0]) == 'sperso') {
                            await i.update({
                                embeds: [new MessageEmbed()
                                    .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String((['<:item_createchanel:968508054733725767> __**| Salon Personnalisés**__', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-sperso_statut'))), ' = *Statut actuel du système*', '``` ```', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-setcategory-sperso_statut'))), '<:item_key:968477773486256178> **| Catégorie** = *Permet de configurer la catégorie dans laquelle le salon doit être crée.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-setrank-sperso_statut'))), '<:item_teamsupport:968263156390588436> **| Rôle** = *Permet de configurer le rôle à avoir pour faire un salon personnalisé.* ', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-setrankping-sperso_statut'))), '<:item_call:968480846950576128> **| Mentions** = *Permet de configurer les mentions lors des salons personnalisés.*', '', '', ''].join(''))))
                                    .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                ],
                                components: [(new MessageActionRow()
                                    .addComponents(
                                        new MessageSelectMenu()
                                        .setCustomId('config-menu')
                                        .setPlaceholder('Sélectionnez ici le système à configurer')
                                        .setMaxValues(1)
                                        .setMinValues(1)
                                        .setDisabled(false)


                                        .addOptions({
                                            value: 'on/off_sperso',
                                            label: 'Activer/Désactiver le système',
                                            emoji: '<:item_key:968477773486256178>',
                                            default: false,
                                        }, {
                                            value: 'category_sperso',
                                            label: 'Catégiorie',
                                            emoji: '<:item_key:968477773486256178>',
                                            default: false,
                                        }, {
                                            value: 'role_sperso',
                                            label: 'Rôle',
                                            emoji: '<:item_teamsupport:968263156390588436>',
                                            default: false,
                                        }, {
                                            value: 'ping_sperso',
                                            label: 'Mentions',
                                            emoji: '<:item_call:968480846950576128>',
                                            default: false,
                                        }, ))
                                )]
                            }).then(m => {

                            });
                            let collector = m.createMessageComponentCollector({
                                filter: i => i.user.id === (s4dmessage.member).id,
                                time: 60000
                            });
                            collector.on('collect', async i => {
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'category_sperso') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_key:968477773486256178> __**| Catégorie**__', '\n', '**ID de la catégorie:** *', s4d.database.get(String((String((s4dmessage.guild).id) + '-setcategory-sperso'))), '*', '\n', '\n', '> <:item_warnings:968477773180055642> **| Par défaut, si aucun rôle n\'est configuré, le bot demanderé la permission d\'administrateur pour créer un salon personnalisé.**', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('-setcategory_sperso')
                                                .setLabel('Sélectionner la catégorie')
                                                .setEmoji('<:item_createchanel:968508054733725767>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == '-setcategory_sperso') {
                                            (s4dmessage.channel).send(String((['> <:item_error:968264701379223562> **| Veuillez entrer l\'ID de la catégorie dans laquelle les salons doivent être crées.**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                                (s4dmessage.channel).awaitMessages({
                                                    filter: (m) => m.author.id === (s4dmessage.member).id,
                                                    time: (5 * 60 * 1000),
                                                    max: 1
                                                }).then(async (collected) => {
                                                    s4d.reply = collected.first().content;
                                                    s4d.message = collected.first();
                                                    if (!((s4d.reply) == 'cancel')) {
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setcategory-sperso')), (s4d.reply));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setcategory-sperso_statut')), '> <:item_good:968261893531791370> ');
                                                        var embed = new Discord.MessageEmbed()
                                                        embed.setColor(s4d.database.get(String('embed_color')));
                                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                        (s4dmessage.channel).send({
                                                            embeds: [embed]
                                                        });

                                                        await delay(Number(3) * 1000);
                                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                                    } else {
                                                        await delay(Number(0.5) * 1000);
                                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                                    }

                                                    s4d.reply = null;
                                                }).catch(async (e) => {
                                                    console.error(e);
                                                });
                                            })
                                        }

                                    })
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'ping_sperso') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_call:968480846950576128> __**| Mentions**__', '\n', '**Rôle:**  <@&', s4d.database.get(String((String((s4dmessage.guild).id) + '-setrankping-sperso'))), '> ', '\n', '\n', '> <:item_warnings:968477773180055642> **| Par défaut, si aucun rôle n\'est configuré, le bot demanderé la permission d\'administrateur pour créer un salon personnalisé.**', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('-setrankping_sperso')
                                                .setLabel('Sélectionner le rôle')
                                                .setEmoji('<:item_createchanel:968508054733725767>')
                                                .setStyle(('SECONDARY')),
                                                new MessageButton()
                                                .setCustomId('-restartping_sperso')
                                                .setLabel('Réinitialiser')
                                                .setEmoji('<:item_delete:968263156004696154>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == '-setrankping_sperso') {
                                            (s4dmessage.channel).send(String((['> <:item_error:968264701379223562> **| Veuillez tag le rôle à notifier.**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                                (s4dmessage.channel).awaitMessages({
                                                    filter: (m) => m.author.id === (s4dmessage.member).id,
                                                    time: (5 * 60 * 1000),
                                                    max: 1
                                                }).then(async (collected) => {
                                                    s4d.reply = collected.first().content;
                                                    s4d.message = collected.first();
                                                    if (!((s4d.reply) == 'cancel')) {
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setrankping-sperso_args')), (s4d.reply));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setrankping-sperso')), (s4d.database.get(String((String((s4dmessage.guild).id) + '-setrank-sperso_args'))).slice(3, 21)));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setrankping-sperso_statut')), '> <:item_good:968261893531791370> ');
                                                        var embed = new Discord.MessageEmbed()
                                                        embed.setColor(s4d.database.get(String('embed_color')));
                                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                        (s4dmessage.channel).send({
                                                            embeds: [embed]
                                                        });

                                                        await delay(Number(3) * 1000);
                                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                                    } else {
                                                        await delay(Number(0.5) * 1000);
                                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                                    }

                                                    s4d.reply = null;
                                                }).catch(async (e) => {
                                                    console.error(e);
                                                });
                                            })
                                        }
                                        if ((i.customId) == '-restartping_sperso') {
                                            s4d.database.set(String((String((s4dmessage.guild).id) + '-setrankping-sperso')), 'Aucun');
                                            s4d.database.set(String((String((s4dmessage.guild).id) + '-setrankping-sperso_statut')), '> <:item_accessdenied:968261893745696778> ');
                                            var embed = new Discord.MessageEmbed()
                                            embed.setColor(s4d.database.get(String('embed_color')));
                                            embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                            embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                            (s4dmessage.channel).send({
                                                embeds: [embed]
                                            });

                                            await delay(Number(3) * 1000);
                                            (s4dmessage.channel).bulkDelete((1 | 1));
                                        }

                                    })
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'role_sperso') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_teamsupport:968263156390588436> __**| Rôle**__', '\n', '**Rôle:**  <@&', s4d.database.get(String((String((s4dmessage.guild).id) + '-setrank-sperso'))), '> ', '\n', '\n', '> <:item_warnings:968477773180055642> **| Par défaut, si aucun rôle n\'est configuré, le bot demanderé la permission d\'administrateur pour créer un salon personnalisé.**', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('-setrank_sperso')
                                                .setLabel('Sélectionner le rôle')
                                                .setEmoji('<:item_createchanel:968508054733725767>')
                                                .setStyle(('SECONDARY')),
                                                new MessageButton()
                                                .setCustomId('-restartrank_sperso')
                                                .setLabel('Réinitialiser')
                                                .setEmoji('<:item_delete:968263156004696154>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == '-setrank_sperso') {
                                            (s4dmessage.channel).send(String((['> <:item_error:968264701379223562> **| Veuillez tag le rôle à avoir pour créer un salon personnalisé.**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                                (s4dmessage.channel).awaitMessages({
                                                    filter: (m) => m.author.id === (s4dmessage.member).id,
                                                    time: (5 * 60 * 1000),
                                                    max: 1
                                                }).then(async (collected) => {
                                                    s4d.reply = collected.first().content;
                                                    s4d.message = collected.first();
                                                    if (!((s4d.reply) == 'cancel')) {
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setrank-sperso_args')), (s4d.reply));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setrank-sperso')), (s4d.database.get(String((String((s4dmessage.guild).id) + '-setrank-sperso_args'))).slice(3, 21)));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setrank-sperso_statut')), '> <:item_good:968261893531791370> ');
                                                        var embed = new Discord.MessageEmbed()
                                                        embed.setColor(s4d.database.get(String('embed_color')));
                                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                        (s4dmessage.channel).send({
                                                            embeds: [embed]
                                                        });

                                                        await delay(Number(3) * 1000);
                                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                                    } else {
                                                        await delay(Number(0.5) * 1000);
                                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                                    }

                                                    s4d.reply = null;
                                                }).catch(async (e) => {
                                                    console.error(e);
                                                });
                                            })
                                        }
                                        if ((i.customId) == '-restartrank_sperso') {
                                            s4d.database.set(String((String((s4dmessage.guild).id) + '-setrank-sperso')), 'Aucun');
                                            s4d.database.set(String((String((s4dmessage.guild).id) + '-setrank-sperso_statut')), '> <:item_accessdenied:968261893745696778> ');
                                            var embed = new Discord.MessageEmbed()
                                            embed.setColor(s4d.database.get(String('embed_color')));
                                            embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                            embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                            (s4dmessage.channel).send({
                                                embeds: [embed]
                                            });

                                            await delay(Number(3) * 1000);
                                            (s4dmessage.channel).bulkDelete((1 | 1));
                                        }

                                    })
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'on/off_sperso') {
                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-sperso_statut'))) == '> <:item_off:968261894483873883> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-sperso_statut')), '> <:item_on:968261895108841483> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-sperso_statut'))) == '> <:item_on:968261895108841483> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-sperso_statut')), '> <:item_off:968261894483873883> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    }
                                }

                            })
                        }
                        if ((i.customId) == 'config-menu' && (i.values[0]) == 'partenariats') {
                            await i.update({
                                embeds: [new MessageEmbed()
                                    .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String((['<:item_partner:968504412295290900> __**| Partenariats**__', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-partenariats_statut'))), ' = *Statut actuel du système*', '``` ```', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-setchanel-partenariats_statut'))), '<:item_database:968287646298275840> **| Salon** = *Permet de configurer le salon dans lequel le partenariat doit être envoyé.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-ping-partenariats_statut'))), '<:item_call:968480846950576128> **| Mentions** = *Permet de configurer les mentions autorisées lors des partenariats.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-mention-partenariats_statut'))), '<:item_people:968261895754760232> **| Anti-Everyone/Here** = *Permet d\'empêcher l\'envoi d\'everyone et de here durant les partenariats.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-rank_access_partenariats_statut'))), '<:item_teamsupport:968263156390588436> **| Rôle** = *Permet de configurer le rôle à avoir pour faire un partenariat.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-points-partenariats_statut'))), '<:item_settings:968261894689419314> **| Points** = *Permet d\'activer/désactiver la supervision des points lors des partenariats.* '].join(''))))
                                    .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                ],
                                components: [(new MessageActionRow()
                                    .addComponents(
                                        new MessageSelectMenu()
                                        .setCustomId('config-menu')
                                        .setPlaceholder('Sélectionnez ici le système à configurer')
                                        .setMaxValues(1)
                                        .setMinValues(1)
                                        .setDisabled(false)


                                        .addOptions({
                                            value: 'on/off_partenariats',
                                            label: 'Activer/Désactiver le système',
                                            emoji: '<:item_key:968477773486256178>',
                                            default: false,
                                        }, {
                                            value: 'chanel_partenariats',
                                            label: 'Salon',
                                            emoji: '<:item_database:968287646298275840>',
                                            default: false,
                                        }, {
                                            value: 'ping_partenariats',
                                            label: 'Mentions',
                                            emoji: '<:item_call:968480846950576128>',
                                            default: false,
                                        }, {
                                            value: 'anti-everyone/here_partenariats',
                                            label: 'Anti-Everyone/Here',
                                            emoji: '<:item_people:968261895754760232>',
                                            default: false,
                                        }, {
                                            value: 'role_partenariats',
                                            label: 'Rôle',
                                            emoji: '<:item_teamsupport:968263156390588436>',
                                            default: false,
                                        }, {
                                            value: 'points_partenariats',
                                            label: 'Activer/Désactiver le système de points',
                                            emoji: '<:item_settings:968261894689419314>',
                                            default: false,
                                        }, ))
                                )]
                            }).then(m => {

                            });
                            let collector = m.createMessageComponentCollector({
                                filter: i => i.user.id === (s4dmessage.member).id,
                                time: 60000
                            });
                            collector.on('collect', async i => {
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'role_partenariats') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_teamsupport:968263156390588436> __**| Rôle **__', '\n', '**Rôle:** *<@&', s4d.database.get(String((String((s4dmessage.guild).id) + '-rank_access_partenariats'))), '>*', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('-setrank_access_partenariats')
                                                .setLabel('Sélectionner le rôle')
                                                .setEmoji('<:item_createchanel:968508054733725767>')
                                                .setStyle(('SECONDARY')),
                                                new MessageButton()
                                                .setCustomId('-restart_rank_access_partenariats')
                                                .setLabel('Réinitialiser')
                                                .setEmoji(' <:item_delete:968263156004696154>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == '-setrank_access_partenariats') {
                                            (s4dmessage.channel).send(String((['> <:item_error:968264701379223562> **| Veuillez tag le rôle.**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                                (s4dmessage.channel).awaitMessages({
                                                    filter: (m) => m.author.id === (s4dmessage.member).id,
                                                    time: (5 * 60 * 1000),
                                                    max: 1
                                                }).then(async (collected) => {
                                                    s4d.reply = collected.first().content;
                                                    s4d.message = collected.first();
                                                    if (!((s4d.reply) == 'cancel')) {
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-rank_access_partenariats_args')), (s4d.reply));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-rank_access_partenariats')), (s4d.database.get(String((String((s4dmessage.guild).id) + '-rank_access_partenariats_args'))).slice(3, 21)));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-rank_access_partenariats_statut')), '> <:item_good:968261893531791370> ');
                                                        var embed = new Discord.MessageEmbed()
                                                        embed.setColor(s4d.database.get(String('embed_color')));
                                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                        (s4dmessage.channel).send({
                                                            embeds: [embed]
                                                        });

                                                        await delay(Number(3) * 1000);
                                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                                    } else {
                                                        await delay(Number(0.5) * 1000);
                                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                                    }

                                                    s4d.reply = null;
                                                }).catch(async (e) => {
                                                    console.error(e);
                                                });
                                            })
                                        }
                                        if ((i.customId) == '-restart_rank_access_partenariats') {
                                            s4d.database.set(String((String((s4dmessage.guild).id) + '-rank_access_partenariats')), 'Aucun');
                                            s4d.database.set(String((String((s4dmessage.guild).id) + '-rank_access_partenariats_statut')), '> <:item_accessdenied:968261893745696778> ');
                                            var embed = new Discord.MessageEmbed()
                                            embed.setColor(s4d.database.get(String('embed_color')));
                                            embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                            embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                            (s4dmessage.channel).send({
                                                embeds: [embed]
                                            });

                                            await delay(Number(3) * 1000);
                                            (s4dmessage.channel).bulkDelete((1 | 1));
                                        }

                                    })
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'ping_partenariats') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_call:968480846950576128> __**| Mentions**__', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-ping-everyone_partenariats'))), '<:item_error:968264701379223562> **| Everyone/Here:** = *Permet d\'activer/désactiver les mentions everyone et here lors des partenariats (Seuls  les utilisateurs possédants la permissionde mentionner everyone & here pourront faire des everyone/here).*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats_statut'))), '<:item_people:968261895754760232> **| Rôle Partenariat** = *Permet de configurer le rôle partenariat sur le serveur.*', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('-setpingeveryone_partenariats')
                                                .setLabel('Activer/Désactiver Everyone/Here')
                                                .setEmoji('<:item_error:968264701379223562>')
                                                .setStyle(('SECONDARY')),
                                                new MessageButton()
                                                .setCustomId('-setpingnotifpart_partenariats')
                                                .setLabel('Rôle Partenariat')
                                                .setEmoji('<:item_people:968261895754760232>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == '-setpingeveryone_partenariats') {
                                            if (s4d.database.get(String((String((s4dmessage.guild).id) + '-ping-everyone_partenariats'))) == '> <:item_off:968261894483873883> ') {
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-ping-everyone_partenariats')), '> <:item_on:968261895108841483> ');
                                                var embed = new Discord.MessageEmbed()
                                                embed.setColor(s4d.database.get(String('embed_color')));
                                                embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                (s4dmessage.channel).send({
                                                    embeds: [embed]
                                                });

                                                await delay(Number(3) * 1000);
                                                (s4dmessage.channel).bulkDelete((1 | 1));
                                            } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-ping-everyone_partenariats'))) == '> <:item_on:968261895108841483> ') {
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-ping-everyone_partenariats')), '> <:item_off:968261894483873883> ');
                                                var embed = new Discord.MessageEmbed()
                                                embed.setColor(s4d.database.get(String('embed_color')));
                                                embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                (s4dmessage.channel).send({
                                                    embeds: [embed]
                                                });

                                                await delay(Number(3) * 1000);
                                                (s4dmessage.channel).bulkDelete((1 | 1));
                                            }
                                        }
                                        if ((i.customId) == '-setpingnotifpart_partenariats') {
                                            await i.update({
                                                embeds: [new MessageEmbed()
                                                    .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                                    .setDescription(String((['<:item_people:968261895754760232> __**| Rôle Partenariat**__', '\n', '**Rôle:** *<@&', s4d.database.get(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats'))), '>*', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                                    .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                                ],
                                                components: [(new MessageActionRow()
                                                    .addComponents(new MessageButton()
                                                        .setCustomId('-setrank_partenariats')
                                                        .setLabel('Sélectionner le rôle')
                                                        .setEmoji('<:item_createchanel:968508054733725767>')
                                                        .setStyle(('SECONDARY')),
                                                        new MessageButton()
                                                        .setCustomId('-restart_partenariats')
                                                        .setLabel('Réinitialiser')
                                                        .setEmoji(' <:item_delete:968263156004696154>')
                                                        .setStyle(('SECONDARY')),
                                                    ))]
                                            }).then(m => {

                                            });
                                            let collector = m.createMessageComponentCollector({
                                                filter: i => i.user.id === (s4dmessage.member).id,
                                                time: 60000
                                            });
                                            collector.on('collect', async i => {
                                                if ((i.customId) == '-setrank_partenariats') {
                                                    (s4dmessage.channel).send(String((['> <:item_error:968264701379223562> **| Veuillez tag le rôle de notification Partenariat.**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                                        (s4dmessage.channel).awaitMessages({
                                                            filter: (m) => m.author.id === (s4dmessage.member).id,
                                                            time: (5 * 60 * 1000),
                                                            max: 1
                                                        }).then(async (collected) => {
                                                            s4d.reply = collected.first().content;
                                                            s4d.message = collected.first();
                                                            if (!((s4d.reply) == 'cancel')) {
                                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats_args')), (s4d.reply));
                                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats')), (s4d.database.get(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats_args'))).slice(3, 21)));
                                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats_statut')), '> <:item_good:968261893531791370> ');
                                                                var embed = new Discord.MessageEmbed()
                                                                embed.setColor(s4d.database.get(String('embed_color')));
                                                                embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                                embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                                (s4dmessage.channel).send({
                                                                    embeds: [embed]
                                                                });

                                                                await delay(Number(3) * 1000);
                                                                (s4dmessage.channel).bulkDelete((2 | 1));
                                                            } else {
                                                                await delay(Number(0.5) * 1000);
                                                                (s4dmessage.channel).bulkDelete((1 | 1));
                                                            }

                                                            s4d.reply = null;
                                                        }).catch(async (e) => {
                                                            console.error(e);
                                                        });
                                                    })
                                                }
                                                if ((i.customId) == '-restart_partenariats') {
                                                    s4d.database.set(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats')), 'Aucun');
                                                    s4d.database.set(String((String((s4dmessage.guild).id) + '-setpingnotifpart_partenariats_statut')), '> <:item_accessdenied:968261893745696778> ');
                                                    var embed = new Discord.MessageEmbed()
                                                    embed.setColor(s4d.database.get(String('embed_color')));
                                                    embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                    embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                    (s4dmessage.channel).send({
                                                        embeds: [embed]
                                                    });

                                                    await delay(Number(3) * 1000);
                                                    (s4dmessage.channel).bulkDelete((1 | 1));
                                                }

                                            })
                                        }

                                    })
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'on/off_partenariats') {
                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-partenariats_statut'))) == '> <:item_off:968261894483873883> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-partenariats_statut')), '> <:item_on:968261895108841483> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-partenariats_statut'))) == '> <:item_on:968261895108841483> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-partenariats_statut')), '> <:item_off:968261894483873883> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    }
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'anti-everyone/here_partenariats') {
                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-mention-partenariats_statut'))) == '> <:item_off:968261894483873883> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-mention-partenariats_statut')), '> <:item_on:968261895108841483> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Système réinitialiser**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-mention-partenariats_statut'))) == '> <:item_on:968261895108841483> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-mention-partenariats_statut')), '> <:item_off:968261894483873883> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    }
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'points_partenariats') {
                                    if (s4d.database.get(String((String((s4dmessage.guild).id) + '-points-partenariats_statut'))) == '> <:item_off:968261894483873883> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-points-partenariats_statut')), '> <:item_on:968261895108841483> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Système réinitialiser**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-points-partenariats_statut'))) == '> <:item_on:968261895108841483> ') {
                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-points-partenariats_statut')), '> <:item_off:968261894483873883> ');
                                        var embed = new Discord.MessageEmbed()
                                        embed.setColor(s4d.database.get(String('embed_color')));
                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                        (s4dmessage.channel).send({
                                            embeds: [embed]
                                        });

                                        await delay(Number(3) * 1000);
                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                    }
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'chanel_partenariats') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_database:968287646298275840> __**| Salon**__', '\n', '**Salon:** *<#', s4d.database.get(String((String((s4dmessage.guild).id) + '-settchanel_partenariats'))), '>*', '\n', '\n', '> <:item_warnings:968477773180055642> **| Une fois cette option configurée, tous les partenariats seront envoyés dans ce salon.**', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('-settchanel_partenariats')
                                                .setLabel('Sélectionner le salon')
                                                .setEmoji('<:item_createchanel:968508054733725767>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == '-settchanel_partenariats') {
                                            (s4dmessage.channel).send(String((['> <:item_error:968264701379223562> **| Veuillez tag le salon en question.**', '\n', '*Entrez `cancel` pour annuler !*'].join('')))).then(() => {
                                                (s4dmessage.channel).awaitMessages({
                                                    filter: (m) => m.author.id === (s4dmessage.member).id,
                                                    time: (5 * 60 * 1000),
                                                    max: 1
                                                }).then(async (collected) => {
                                                    s4d.reply = collected.first().content;
                                                    s4d.message = collected.first();
                                                    if (!((s4d.reply) == 'cancel')) {
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel-partenariats_args1')), (s4d.reply));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-settchanel_partenariats')), (s4d.database.get(String((String((s4dmessage.guild).id) + '-setchanel-partenariats_args1'))).slice(2, 20)));
                                                        s4d.database.set(String((String((s4dmessage.guild).id) + '-setchanel-partenariats_statut')), '> <:item_good:968261893531791370> ');
                                                        var embed = new Discord.MessageEmbed()
                                                        embed.setColor(s4d.database.get(String('embed_color')));
                                                        embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                        embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                        (s4dmessage.channel).send({
                                                            embeds: [embed]
                                                        });

                                                        await delay(Number(3) * 1000);
                                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                                    } else {
                                                        await delay(Number(0.5) * 1000);
                                                        (s4dmessage.channel).bulkDelete((1 | 1));
                                                        await i.update({
                                                            embeds: [new MessageEmbed()
                                                                .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                                .setDescription(String((['<:item_database:968287646298275840> __**| Salon**__', '\n', '**Salon:** *<#', s4d.database.get(String((String((s4dmessage.guild).id) + '-settchanel_partenariats'))), '>*', '\n', '\n', '> <:item_warnings:968477773180055642> **| Une fois cette option configurée, tous les partenariats seront envoyés dans ce salon.**', '', '', '', '', '', '', '', '', ''].join(''))))
                                                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                                            ],
                                                            components: [(new MessageActionRow()
                                                                .addComponents(new MessageButton()
                                                                    .setCustomId('-settchanel_partenariats')
                                                                    .setLabel('Sélectionner le salon')
                                                                    .setEmoji('<:item_createchanel:968508054733725767>')
                                                                    .setStyle(('SECONDARY')),
                                                                ))]
                                                        }).then(m => {

                                                        });
                                                    }

                                                    s4d.reply = null;
                                                }).catch(async (e) => {
                                                    console.error(e);
                                                });
                                            })
                                        }

                                    })
                                }

                            })
                        }
                        if ((i.customId) == 'config-menu' && (i.values[0]) == 'anti-raid') {
                            await i.update({
                                embeds: [new MessageEmbed()
                                    .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String((['<:item_delete:968263156004696154> __**| Anti-Raid**__ ', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-raid_statut'))), ' = *Statut actuel du système*', '``` ```', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-bot_statut'))), '<:item_bot:968263156457697291> **| Anti-Bot** = *Permet d\'empêcher l\'ajout de bot sur le serveur.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-link_statut'))), '<:item_link:968477773536563260> **| Anti-Link** = *Permet d\'empêcher l\'envoi de lien dans les salons.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-ping_statut'))), '<:item_call:968480846950576128> **| Anti-Ping** = *Permet d\'empêcher la mention de rôles  détenus par de nombreuses personnes.*', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-spam_statut'))), '<:item_warnings:968477773180055642> **| Anti-Spam** = *Permet d\'empêcher l\'envoi rapide de message.*'].join(''))))
                                    .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                ],
                                components: [(new MessageActionRow()
                                    .addComponents(
                                        new MessageSelectMenu()
                                        .setCustomId('config-menu')
                                        .setPlaceholder('Sélectionnez ici le système à configurer')
                                        .setMaxValues(1)
                                        .setMinValues(1)
                                        .setDisabled(false)


                                        .addOptions({
                                            value: 'anti-bot',
                                            label: 'Anti-Bot',
                                            emoji: '<:item_bot:968263156457697291>',
                                            default: false,
                                        }, {
                                            value: 'anti-link',
                                            label: 'Anti-Link',
                                            emoji: '<:item_link:968477773536563260>',
                                            default: false,
                                        }, {
                                            value: 'anti-ping',
                                            label: 'Anti-Ping',
                                            emoji: '<:item_call:968480846950576128>',
                                            default: false,
                                        }, {
                                            value: 'anti-spam',
                                            label: 'Anti-Spam',
                                            emoji: '<:item_warnings:968477773180055642>',
                                            default: false,
                                        }, ))
                                )]
                            }).then(m => {

                            });
                            let collector = m.createMessageComponentCollector({
                                filter: i => i.user.id === (s4dmessage.member).id,
                                time: 60000
                            });
                            collector.on('collect', async i => {
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'anti-spam') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_warnings:968477773180055642> __**| Anti-Spam**__ ', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-ping_statut'))), ' = *Statut actuel du système*', '``` ```', '\n', '> <:item_warnings:968477773180055642> **| Lorsqu\'un utilisateur est considéré par le bot comme un spammer, il recevra 3 avertissements, par la suite il sera kick du serveur et ses messages supprimés.**', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('on/off_anti-spam')
                                                .setLabel('Activer/Desactiver')
                                                .setEmoji('<:item_key:968477773486256178>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == 'on/off_anti-spam') {
                                            if (s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-spam_statut'))) == '> <:item_off:968261894483873883> ') {
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-spam_statut')), '> <:item_on:968261895108841483> ');
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-spam_statut')), '> <:item_on:968261895108841483> ');
                                                var embed = new Discord.MessageEmbed()
                                                embed.setColor(s4d.database.get(String('embed_color')));
                                                embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                (s4dmessage.channel).send({
                                                    embeds: [embed]
                                                });

                                                await delay(Number(3) * 1000);
                                                (s4dmessage.channel).bulkDelete((1 | 1));
                                            } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-spam_statut'))) == '> <:item_on:968261895108841483> ') {
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-spam_statut')), '> <:item_off:968261894483873883> ');
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-spam_statut')), '> <:item_off:968261894483873883> ');
                                                var embed = new Discord.MessageEmbed()
                                                embed.setColor(s4d.database.get(String('embed_color')));
                                                embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                (s4dmessage.channel).send({
                                                    embeds: [embed]
                                                });

                                                await delay(Number(3) * 1000);
                                                (s4dmessage.channel).bulkDelete((1 | 1));
                                            }
                                        }

                                    })
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'anti-ping') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_call:968480846950576128> __**| Anti-Ping**__ ', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-ping_statut'))), ' = *Statut actuel du système*', '``` ```', '\n', '> <:item_warnings:968477773180055642> **| Lorsque cette option est activée, tout everyone/here posté par un utilisateur absent dans la whitelist sera derank.**', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('on/off_anti-ping')
                                                .setLabel('Activer/Desactiver')
                                                .setEmoji('<:item_key:968477773486256178>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == 'on/off_anti-ping') {
                                            if (s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-ping_statut'))) == '> <:item_off:968261894483873883> ') {
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-ping_statut')), '> <:item_on:968261895108841483> ');
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-raid_statut')), '> <:item_on:968261895108841483> ');
                                                var embed = new Discord.MessageEmbed()
                                                embed.setColor(s4d.database.get(String('embed_color')));
                                                embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                (s4dmessage.channel).send({
                                                    embeds: [embed]
                                                });

                                                await delay(Number(3) * 1000);
                                                (s4dmessage.channel).bulkDelete((1 | 1));
                                            } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-ping_statut'))) == '> <:item_on:968261895108841483> ') {
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-ping_statut')), '> <:item_off:968261894483873883> ');
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-raid_statut')), '> <:item_off:968261894483873883> ');
                                                var embed = new Discord.MessageEmbed()
                                                embed.setColor(s4d.database.get(String('embed_color')));
                                                embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                (s4dmessage.channel).send({
                                                    embeds: [embed]
                                                });

                                                await delay(Number(3) * 1000);
                                                (s4dmessage.channel).bulkDelete((1 | 1));
                                            }
                                        }

                                    })
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'anti-link') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_link:968477773536563260> __**| Anti-Link**__ ', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-link_statut'))), ' = *Statut actuel du système*', '``` ```', '\n', '> <:item_warnings:968477773180055642> **| Lorsqu\'un utilisateur poste un lien, son message sera immédiatement supprimé.**', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('on/off_anti-link')
                                                .setLabel('Activer/Desactiver')
                                                .setEmoji('<:item_key:968477773486256178>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == 'on/off_anti-link') {
                                            if (s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-link_statut'))) == '> <:item_off:968261894483873883> ') {
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-link_statut')), '> <:item_on:968261895108841483> ');
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-raid_statut')), '> <:item_on:968261895108841483> ');
                                                var embed = new Discord.MessageEmbed()
                                                embed.setColor(s4d.database.get(String('embed_color')));
                                                embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                (s4dmessage.channel).send({
                                                    embeds: [embed]
                                                });

                                                await delay(Number(3) * 1000);
                                                (s4dmessage.channel).bulkDelete((1 | 1));
                                            } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-link_statut'))) == '> <:item_on:968261895108841483> ') {
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-link_statut')), '> <:item_off:968261894483873883> ');
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-raid_statut')), '> <:item_off:968261894483873883> ');
                                                var embed = new Discord.MessageEmbed()
                                                embed.setColor(s4d.database.get(String('embed_color')));
                                                embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                (s4dmessage.channel).send({
                                                    embeds: [embed]
                                                });

                                                await delay(Number(3) * 1000);
                                                (s4dmessage.channel).bulkDelete((1 | 1));
                                            }
                                        }

                                    })
                                }
                                if ((i.customId) == 'config-menu' && (i.values[0]) == 'anti-bot') {
                                    await i.update({
                                        embeds: [new MessageEmbed()
                                            .setTitle(String((String(s4d.database.get(String('settings_emoji'))) + ' **| Système de configuration de `Gustave` !**')))
                                            .setColor(String(s4d.database.get(String('embed_color'))))
                                            .setDescription(String((['<:item_bot:968263156457697291> __**| Anti-Bot**__ ', '\n', s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-bot_statut'))), ' = *Statut actuel du système*', '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                        ],
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('on/off_anti-bot')
                                                .setLabel('Activer/Desactiver')
                                                .setEmoji('<:item_key:968477773486256178>')
                                                .setStyle(('SECONDARY')),
                                            ))]
                                    }).then(m => {

                                    });
                                    let collector = m.createMessageComponentCollector({
                                        filter: i => i.user.id === (s4dmessage.member).id,
                                        time: 60000
                                    });
                                    collector.on('collect', async i => {
                                        if ((i.customId) == 'on/off_anti-bot') {
                                            if (s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-bot_statut'))) == '> <:item_off:968261894483873883> ') {
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-bot_statut')), '> <:item_on:968261895108841483> ');
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-raid_statut')), '> <:item_on:968261895108841483> ');
                                                var embed = new Discord.MessageEmbed()
                                                embed.setColor(s4d.database.get(String('embed_color')));
                                                embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                (s4dmessage.channel).send({
                                                    embeds: [embed]
                                                });

                                                await delay(Number(3) * 1000);
                                                (s4dmessage.channel).bulkDelete((1 | 1));
                                            } else if (s4d.database.get(String((String((s4dmessage.guild).id) + '-anti-bot_statut'))) == '> <:item_on:968261895108841483> ') {
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-bot_statut')), '> <:item_off:968261894483873883> ');
                                                s4d.database.set(String((String((s4dmessage.guild).id) + '-anti-raid_statut')), '> <:item_off:968261894483873883> ');
                                                var embed = new Discord.MessageEmbed()
                                                embed.setColor(s4d.database.get(String('embed_color')));
                                                embed.setDescription('Les modifications apportées ont bien été sauvegardées. *(Il se peut que les modifications apportées ne soit pas visibles sur l\'embed actuel)*');
                                                embed.setTitle((String(s4d.database.get(String('save_emoji'))) + '** | Tout est bon !**'));
                                                (s4dmessage.channel).send({
                                                    embeds: [embed]
                                                });

                                                await delay(Number(3) * 1000);
                                                (s4dmessage.channel).bulkDelete((1 | 1));
                                            }
                                        }

                                    })
                                }

                            })
                        }

                    })

                });
            } else {
                var embed = new Discord.MessageEmbed()
                embed.setColor(s4d.database.get(String('embed_color')));
                embed.setTitle((String(s4d.database.get(String('noaccess_emoji'))) + ' **| Une erreur est survenue !**'));
                embed.setDescription('Seul le propriétaire du serveur a accès à cette commande ! "`(Reviens quand tu auras la couronne !)`"');
                (s4dmessage.channel).send({
                    embeds: [embed]
                });

            }
        }

    });

    // Help comand
    s4d.client.on('messageCreate', async (s4dmessage) => {
        if ((((s4dmessage.content) || '').startsWith((String(s4d.database.get(String('prefix'))) + 'help') || '')) || (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'help') || ''))) {
            s4dmessage.delete();
            (s4dmessage.channel).send({
                embeds: [new MessageEmbed()
                    .setTitle(String('<:item_rules:968263156214403132> **| Menu d\'aide de `Gustave`**'))
                    .setColor(String(s4d.database.get(String('embed_color'))))
                    .setDescription(String((['<:item_bot:968263156457697291> __**| Présentation**__', '\n', '> Bien le bonjour, je me présente, **Gustave**, je suis un bot `multifonctions` et à la fois un **gentleman**, je possède des commandes uniques. J\'aide le/les fondateur(s), modérateur(s) et membre(s) de ce serveur. Je deviendrai rapidement votre amis, si je ne le suis pas déjà 😉 !', '``` ```', '\n', '<:item_arrow:968261894538424370> __**| Légende**__', '\n', '> <:item_online:968261896232910919> = *Commande disponible*', '\n', '> <:item_pause:977514476142215188> = *Commande actuellement en maintenance*', '\n', '> <:item_maintenance:968261896455217242> = *Commande temporairement indisponible*', '``` ```', '\n', '<:item_link:968477773536563260> __**| Mes informations**__', '\n', '> <:item_teamsupport:968263156390588436> **| Mon serveur support** = [*Lien Discord*](', s4d.database.get(String('discord_invite')), ')', '\n', '> <:item_join:968261893825372170> **| Mon lien d\'invitation** = [*Lien d\'invitation*](', s4d.database.get(String('invite_link')), ')', '\n', '> <:item_database:968287646298275840> **| Mon nombre de serveur(s)** = *`', s4d.client.guilds.cache.size, ' Serveur(s)`*', '\n', '> <:item_people:968261895754760232> **| Mon nombre de membre(s)** = *`', s4d.client.users.cache.size, ' Membre(s)`*', '\n', '> <:item_goodping:968261894194462830> **| Mon Ping** = *`', s4d.client.ws.ping, ' ms`*'].join(''))))
                    .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                ],
                components: [(new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                        .setCustomId('help-menu')
                        .setPlaceholder('Sélectionnez pour interagir')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setDisabled(false)


                        .addOptions({
                            value: 'home_help',
                            label: 'Acceuil',
                            emoji: '<:item_join:968261893825372170>',
                            default: false,
                        }, {
                            value: 'infos_help',
                            label: 'Informations',
                            emoji: '<:item_error:968264701379223562>',
                            description: 'Commandes permettant d\'obtenir des informations',
                            default: false,
                        }, {
                            value: 'utils_help',
                            label: 'Utilitaires',
                            emoji: '<:item_message:968287427909279794>',
                            description: 'Commandes utiles pour les utilisateurs',
                            default: false,
                        }, {
                            value: 'moderator_help',
                            label: 'Modération',
                            emoji: '<:item_ban:968261894823608410>',
                            description: 'Commandes de modération',
                            default: false,
                        }, {
                            value: 'admin_help',
                            label: 'Administration',
                            emoji: '<:item_key:968477773486256178>',
                            description: 'Commandes d\'administration',
                            default: false,
                        }, {
                            value: 'settings_help',
                            label: 'Paramètres',
                            emoji: '<:item_settings:968261894689419314>',
                            description: 'Commandes de paramétrages',
                            default: false,
                        }, ))
                )]
            }).then(m => {
                let collector = m.createMessageComponentCollector({
                    filter: i => i.user.id === (s4dmessage.member).id,
                    time: 60000
                });
                collector.on('collect', async i => {
                    if ((i.customId) == 'help-menu' && (i.values[0]) == 'settings_help') {
                        await i.update({
                            embeds: [new MessageEmbed()
                                .setTitle(String('<:item_rules:968263156214403132> **| Menu d\'aide de `Gustave`**'))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_settings:968261894689419314> __**| Paramètres**__', '\n', '\n', '<:item_message:968287427909279794> __**| Commandes**__', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'set_prefix` = *Configurer le préfix de Gustave sur le serveur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'whitelist` = *Ajouter un utilisateur à la liste des personnes intouchables par l\'anti-raid.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'config` = *Configurer tous les systèmes de Gustave.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'msg_mp` = *Modifier le message à envoyer en MP lorsqu\'un utilisateur rejoint le serveur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'command_delete` = *Activer/Désactiver le système de suppression des commandes .*', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                            ],
                            components: [(new MessageActionRow()
                                .addComponents(
                                    new MessageSelectMenu()
                                    .setCustomId('help-menu')
                                    .setPlaceholder('Sélectionnez pour interagir')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setDisabled(false)


                                    .addOptions({
                                        value: 'home_help',
                                        label: 'Acceuil',
                                        emoji: '<:item_join:968261893825372170>',
                                        default: false,
                                    }, {
                                        value: 'infos_help',
                                        label: 'Informations',
                                        emoji: '<:item_error:968264701379223562>',
                                        default: false,
                                    }, {
                                        value: 'utils_help',
                                        label: 'Utilitaires',
                                        emoji: '<:item_message:968287427909279794>',
                                        description: 'Commandes utiles pour les utilisateurs',
                                        default: false,
                                    }, {
                                        value: 'moderator_help',
                                        label: 'Moderation',
                                        emoji: '<:item_ban:968261894823608410>',
                                        description: 'Commandes de modération',
                                        default: false,
                                    }, {
                                        value: 'admin_help',
                                        label: 'Administration',
                                        emoji: '<:item_key:968477773486256178>',
                                        description: 'Commandes d\'administration',
                                        default: false,
                                    }, {
                                        value: 'settings_help',
                                        label: 'Paramètres',
                                        emoji: '<:item_settings:968261894689419314>',
                                        description: 'Commandes de paramétrages',
                                        default: false,
                                    }, ))
                            )]
                        }).then(m => {

                        });
                    }
                    if ((i.customId) == 'help-menu' && (i.values[0]) == 'admin_help') {
                        await i.update({
                            embeds: [new MessageEmbed()
                                .setTitle(String('<:item_rules:968263156214403132> **| Menu d\'aide de `Gustave`**'))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_key:968477773486256178> __**| Administration**__', '\n', '\n', '<:item_message:968287427909279794> __**| Commandes**__', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'backup_create` = *Créer une backup du serveur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'backup_load` = *Déployer une backup sur le serveur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'add_invites` = *Ajouter une/des invitation(s) à un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'set_invites` = *Modifier le nombre d\'invitation(s) d\'un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'remove_invites` = *Retirer une/des invitation(s) à un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'add_level` = *Ajouter un/des niveau(x) à un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'set_level` = *Modifier le nombre de niveau(x) à un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'remove_level` = *Retirer un/des niveau(x) à un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'add_partenariat` = *Ajouter un/des partenariat(s) à un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'set_partenariat` = *Modifier le nombre de partenariat(s) à un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'remove_partenariat` = *Retirer un/des partenariat(s) à un utilisateur.*'].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                            ],
                            components: [(new MessageActionRow()
                                .addComponents(
                                    new MessageSelectMenu()
                                    .setCustomId('help-menu')
                                    .setPlaceholder('Sélectionnez pour interagir')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setDisabled(false)


                                    .addOptions({
                                        value: 'home_help',
                                        label: 'Acceuil',
                                        emoji: '<:item_join:968261893825372170>',
                                        default: false,
                                    }, {
                                        value: 'infos_help',
                                        label: 'Informations',
                                        emoji: '<:item_error:968264701379223562>',
                                        default: false,
                                    }, {
                                        value: 'utils_help',
                                        label: 'Utilitaires',
                                        emoji: '<:item_message:968287427909279794>',
                                        description: 'Commandes utiles pour les utilisateurs',
                                        default: false,
                                    }, {
                                        value: 'moderator_help',
                                        label: 'Moderation',
                                        emoji: '<:item_ban:968261894823608410>',
                                        description: 'Commandes de modération',
                                        default: false,
                                    }, {
                                        value: 'admin_help',
                                        label: 'Administration',
                                        emoji: '<:item_key:968477773486256178>',
                                        description: 'Commandes d\'administration',
                                        default: false,
                                    }, {
                                        value: 'settings_help',
                                        label: 'Paramètres',
                                        emoji: '<:item_settings:968261894689419314>',
                                        description: 'Commandes de paramétrages',
                                        default: false,
                                    }, ))
                            )]
                        }).then(m => {

                        });
                    }
                    if ((i.customId) == 'help-menu' && (i.values[0]) == 'moderator_help') {
                        await i.update({
                            embeds: [new MessageEmbed()
                                .setTitle(String('<:item_rules:968263156214403132> **| Menu d\'aide de `Gustave`**'))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_ban:968261894823608410> __**| Modération**__', '\n', '\n', '<:item_message:968287427909279794> __**| Commandes**__', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'ban` = *Bannir un utilisateur du serveur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'unban` = *De-Bannir un utilisateur du serveur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'kick` = *Expulser un utilisateur du serveur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'warn` = *Avertir un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'unwarn` = *Retirer un avertissement donné à un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'sanctions` = *Afficher les sanctions reçues d\'un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'clear` = *Supprimer un certain nombre de message(s) présent(s) dans un salon.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'partenariat` = *Créer un partenariat.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'partenariat_count` = *Afficher le nombre de partenariat(s) crée(s) par un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'mute` = *Empêcher un utilisateur de parler.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'unmute` = *Rendre la parole à un utilisateur.*'].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                            ],
                            components: [(new MessageActionRow()
                                .addComponents(
                                    new MessageSelectMenu()
                                    .setCustomId('help-menu')
                                    .setPlaceholder('Sélectionnez pour interagir')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setDisabled(false)


                                    .addOptions({
                                        value: 'home_help',
                                        label: 'Acceuil',
                                        emoji: '<:item_join:968261893825372170>',
                                        default: false,
                                    }, {
                                        value: 'infos_help',
                                        label: 'Informations',
                                        emoji: '<:item_error:968264701379223562>',
                                        default: false,
                                    }, {
                                        value: 'utils_help',
                                        label: 'Utilitaires',
                                        emoji: '<:item_message:968287427909279794>',
                                        description: 'Commandes utiles pour les utilisateurs',
                                        default: false,
                                    }, {
                                        value: 'moderator_help',
                                        label: 'Moderation',
                                        emoji: '<:item_ban:968261894823608410>',
                                        description: 'Commandes de modération',
                                        default: false,
                                    }, {
                                        value: 'admin_help',
                                        label: 'Administration',
                                        emoji: '<:item_key:968477773486256178>',
                                        description: 'Commandes d\'administration',
                                        default: false,
                                    }, {
                                        value: 'settings_help',
                                        label: 'Paramètres',
                                        emoji: '<:item_settings:968261894689419314>',
                                        description: 'Commandes de paramétrages',
                                        default: false,
                                    }, ))
                            )]
                        }).then(m => {

                        });
                    }
                    if ((i.customId) == 'help-menu' && (i.values[0]) == 'utils_help') {
                        await i.update({
                            embeds: [new MessageEmbed()
                                .setTitle(String('<:item_rules:968263156214403132> **| Menu d\'aide de `Gustave`**'))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_message:968287427909279794> __**| Utilitaires**__', '\n', '\n', '<:item_message:968287427909279794> __**| Commandes**__', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'embed` = *Créer un message bien présenté (embed), envoyé par Gustave.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'say` = *Créer un message bien présenté (message), envoyé par Gustave.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'qrcode` = *Créer un qrcode relié à un site.*', '\n', '> <:item_pause:977514476142215188> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'rank_color` = *Changer la couleur d\'un rôle.*', '\n', '> <:item_pause:977514476142215188> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'calculatrice` = *Ouvrir la calculatrice de Gustave.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'user_avatar` = *Afficher la photo de profile d\'un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'server_avatar` = *Afficher la photo de profile du serveur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'level` = *Afficher le niveau atteint par un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'xp` = *Afficher le nombre d\'XP atteint par un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'prefix` = *Afficher le préfix du bot sur le serveur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'invites` = *Afficher le nombre d\'invitation(s) que possède un utilisateur.*', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                            ],
                            components: [(new MessageActionRow()
                                .addComponents(
                                    new MessageSelectMenu()
                                    .setCustomId('help-menu')
                                    .setPlaceholder('Sélectionnez pour interagir')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setDisabled(false)


                                    .addOptions({
                                        value: 'home_help',
                                        label: 'Acceuil',
                                        emoji: '<:item_join:968261893825372170>',
                                        default: false,
                                    }, {
                                        value: 'infos_help',
                                        label: 'Informations',
                                        emoji: '<:item_error:968264701379223562>',
                                        default: false,
                                    }, {
                                        value: 'utils_help',
                                        label: 'Utilitaires',
                                        emoji: '<:item_message:968287427909279794>',
                                        description: 'Commandes utiles pour les utilisateurs',
                                        default: false,
                                    }, {
                                        value: 'moderator_help',
                                        label: 'Moderation',
                                        emoji: '<:item_ban:968261894823608410>',
                                        description: 'Commandes de modération',
                                        default: false,
                                    }, {
                                        value: 'admin_help',
                                        label: 'Administration',
                                        emoji: '<:item_key:968477773486256178>',
                                        description: 'Commandes d\'administration',
                                        default: false,
                                    }, {
                                        value: 'settings_help',
                                        label: 'Paramètres',
                                        emoji: '<:item_settings:968261894689419314>',
                                        description: 'Commandes de paramétrages',
                                        default: false,
                                    }, ))
                            )]
                        }).then(m => {

                        });
                    }
                    if ((i.customId) == 'help-menu' && (i.values[0]) == 'infos_help') {
                        await i.update({
                            embeds: [new MessageEmbed()
                                .setTitle(String('<:item_rules:968263156214403132> **| Menu d\'aide de `Gustave`**'))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_error:968264701379223562> __**| Informations**__', '\n', '\n', '<:item_message:968287427909279794> __**| Commandes**__', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'bot_infos` = *Afficher les informations relatives à Gustave Bot.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'server_infos` = *Afficher les informations relatives au serveur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'user_infos` = *Afficher les informations d\'un utilisateur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'member_count` = *Afficher le nombre de membre que possède le serveur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'bot_count` = *Afficher le nombre de bot(s) présent(s) sur le serveur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'chanel_count` = *Afficher le nombre de salon(s) présent(s) sur le serveur.*', '\n', '> <:item_online:968261896232910919> `', s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix'))), 'ping` = *Afficher le ping (latence) de Gustave Bot.*', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                            ],
                            components: [(new MessageActionRow()
                                .addComponents(
                                    new MessageSelectMenu()
                                    .setCustomId('help-menu')
                                    .setPlaceholder('Sélectionnez pour interagir')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setDisabled(false)


                                    .addOptions({
                                        value: 'home_help',
                                        label: 'Acceuil',
                                        emoji: '<:item_join:968261893825372170>',
                                        default: false,
                                    }, {
                                        value: 'infos_help',
                                        label: 'Informations',
                                        emoji: '<:item_error:968264701379223562>',
                                        description: 'Commandes permettant d\'obtenir des informations',
                                        default: false,
                                    }, {
                                        value: 'utils_help',
                                        label: 'Utilitaires',
                                        emoji: '<:item_message:968287427909279794>',
                                        description: 'Commandes utiles pour les utilisateurs',
                                        default: false,
                                    }, {
                                        value: 'moderator_help',
                                        label: 'Moderation',
                                        emoji: '<:item_ban:968261894823608410>',
                                        description: 'Commandes de modération',
                                        default: false,
                                    }, {
                                        value: 'admin_help',
                                        label: 'Administration',
                                        emoji: '<:item_key:968477773486256178>',
                                        description: 'Commandes d\'administration',
                                        default: false,
                                    }, {
                                        value: 'settings_help',
                                        label: 'Paramètres',
                                        emoji: '<:item_settings:968261894689419314>',
                                        description: 'Commandes de paramétrages',
                                        default: false,
                                    }, ))
                            )]
                        }).then(m => {

                        });
                    }
                    if ((i.customId) == 'help-menu' && (i.values[0]) == 'home_help') {
                        await i.update({
                            embeds: [new MessageEmbed()
                                .setTitle(String('<:item_rules:968263156214403132> **| Menu d\'aide de `Gustave`**'))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_bot:968263156457697291> __**| Présentation**__', '\n', '> Bien le bonjour, je me présente, **Gustave**, je suis un bot `multifonctions` et à la fois un **gentleman**, je possède des commandes uniques. J\'aide le/les fondateur(s), modérateur(s) et membre(s) de ce serveur. Je deviendrai rapidement votre amis, si je ne le suis pas déjà 😉 !', '``` ```', '\n', '<:item_arrow:968261894538424370> __**| Légende**__', '\n', '> <:item_online:968261896232910919> = *Commande disponible*', '\n', '> <:item_pause:977514476142215188> = *Commande actuellement en maintenance*', '\n', '> <:item_maintenance:968261896455217242> = *Commande temporairement indisponible*', '``` ```', '\n', '<:item_link:968477773536563260> __**| Mes informations**__', '\n', '> <:item_teamsupport:968263156390588436> **| Mon serveur support** = [*Lien Discord*](', s4d.database.get(String('discord_invite')), ')', '\n', '> <:item_join:968261893825372170> **| Mon lien d\'invitation** = [*Lien d\'invitation*](', s4d.database.get(String('invite_link')), ')', '\n', '> <:item_database:968287646298275840> **| Mon nombre de serveur(s)** = *`', s4d.client.guilds.cache.size, ' Serveur(s)`*', '\n', '> <:item_people:968261895754760232> **| Mon nombre de membre(s)** = *`', s4d.client.users.cache.size, ' Membre(s)`*', '\n', '> <:item_goodping:968261894194462830> **| Mon Ping** = *`', s4d.client.ws.ping, ' ms`*'].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                            ],
                            components: [(new MessageActionRow()
                                .addComponents(
                                    new MessageSelectMenu()
                                    .setCustomId('help-menu')
                                    .setPlaceholder('Sélectionnez pour interagir')
                                    .setMaxValues(1)
                                    .setMinValues(1)
                                    .setDisabled(false)


                                    .addOptions({
                                        value: 'home_help',
                                        label: 'Acceuil',
                                        emoji: '<:item_join:968261893825372170>',
                                        default: false,
                                    }, {
                                        value: 'infos_help',
                                        label: 'Informations',
                                        emoji: '<:item_error:968264701379223562>',
                                        description: 'Commandes permettant d\'obtenir des informations',
                                        default: false,
                                    }, {
                                        value: 'utils_help',
                                        label: 'Utilitaires',
                                        emoji: '<:item_message:968287427909279794>',
                                        description: 'Commandes utiles pour les utilisateurs',
                                        default: false,
                                    }, {
                                        value: 'moderator_help',
                                        label: 'Moderation',
                                        emoji: '<:item_ban:968261894823608410>',
                                        description: 'Commandes de modération',
                                        default: false,
                                    }, {
                                        value: 'admin_help',
                                        label: 'Administration',
                                        emoji: '<:item_key:968477773486256178>',
                                        description: 'Commandes d\'administration',
                                        default: false,
                                    }, {
                                        value: 'settings_help',
                                        label: 'Paramètres',
                                        emoji: '<:item_settings:968261894689419314>',
                                        description: 'Commandes de paramétrages',
                                        default: false,
                                    }, ))
                            )]
                        }).then(m => {

                        });
                    }

                })

            });
        }

    });

    // Informations commandes
    s4d.client.on('messageCreate', async (s4dmessage) => {
        if ((s4dmessage.content) == String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'server_avatar') {
            s4dmessage.delete();
            s4dmessage.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(String((String(s4d.database.get(String('time_emoji'))) + ' **| Veuillez patienter !**')))
                    .setColor(String(s4d.database.get(String('embed_color'))))
                    .setDescription(String('Je suis actuellement en train de récupérer mes données.'))
                ]
            }).then(async (s4dreply) => {
                await delay(Number(2) * 1000);
                s4dreply.edit({
                    embeds: [new MessageEmbed()
                        .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.guild).name, '`**__'].join(''))))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setImage(String(((s4dmessage.guild).iconURL({
                            dynamic: true
                        }))))
                        .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                    ]
                });

            });
        } else if (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'server_avatar') || '')) {
            s4dmessage.delete();
            s4d.database.set(String((String((s4dmessage.author).id) + '-server_avatar-args')), ((s4dmessage.content).split(' ')));
            s4d.database.set(String((String((s4dmessage.author).id) + '-server_avatar-cmd')), (s4d.database.get(String((String((s4dmessage.author).id) + '-server_avatar-args'))).splice(1, 1)[0]));
            s4dmessage.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(String((String(s4d.database.get(String('time_emoji'))) + ' **| Veuillez patienter !**')))
                    .setColor(String(s4d.database.get(String('embed_color'))))
                    .setDescription(String('Je suis actuellement en train de récupérer mes données.'))
                ]
            }).then(async (s4dreply) => {
                await delay(Number(2) * 1000);
                s4dreply.edit({
                    embeds: [new MessageEmbed()
                        .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4d.client.guilds.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-server_avatar-cmd'))))).name, '`**__'].join(''))))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setImage(String(((s4d.client.guilds.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-server_avatar-cmd'))))).iconURL({
                            dynamic: true
                        }))))
                        .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                    ]
                });

            });
        }
        if ((s4dmessage.content) == String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'user_avatar') {
            s4dmessage.delete();
            s4dmessage.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(String((String(s4d.database.get(String('time_emoji'))) + ' **| Veuillez patienter !**')))
                    .setColor(String(s4d.database.get(String('embed_color'))))
                    .setDescription(String('Je suis actuellement en train de récupérer mes données.'))
                ]
            }).then(async (s4dreply) => {
                await delay(Number(2) * 1000);
                s4dreply.edit({
                    embeds: [new MessageEmbed()
                        .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.author).username, '`**__'].join(''))))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setImage(String(((s4dmessage.author).displayAvatarURL({
                            format: "png"
                        }))))
                        .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                    ]
                });

            });
        } else if (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'user_avatar') || '')) {
            s4dmessage.delete();
            s4d.database.set(String((String((s4dmessage.author).id) + '-user_avatar-args')), ((s4dmessage.content).split(' ')));
            s4d.database.set(String((String((s4dmessage.author).id) + '-user_avatar-cmd')), (s4d.database.get(String((String((s4dmessage.author).id) + '-user_avatar-args'))).splice(1, 1)[0]));
            if ((s4d.database.get(String((String((s4dmessage.author).id) + '-user_avatar-cmd'))) || '').startsWith('<@' || '')) {
                s4dmessage.channel.send({
                    embeds: [new MessageEmbed()
                        .setTitle(String((String(s4d.database.get(String('time_emoji'))) + ' **| Veuillez patienter !**')))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setDescription(String('Je suis actuellement en train de récupérer mes données.'))
                    ]
                }).then(async (s4dreply) => {
                    await delay(Number(2) * 1000);
                    s4dreply.edit({
                        embeds: [new MessageEmbed()
                            .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.mentions.members.first().user).username, '`**__'].join(''))))
                            .setColor(String(s4d.database.get(String('embed_color'))))
                            .setImage(String(((s4dmessage.mentions.members.first().user).displayAvatarURL({
                                format: "png"
                            }))))
                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                        ]
                    });

                });
            } else {
                s4dmessage.channel.send({
                    embeds: [new MessageEmbed()
                        .setTitle(String((String(s4d.database.get(String('time_emoji'))) + ' **| Veuillez patienter !**')))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setDescription(String('Je suis actuellement en train de récupérer mes données.'))
                    ]
                }).then(async (s4dreply) => {
                    await delay(Number(2) * 1000);
                    s4dreply.edit({
                        embeds: [new MessageEmbed()
                            .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_avatar-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_avatar-cmd'))))).user).username, '`**__'].join(''))))
                            .setColor(String(s4d.database.get(String('embed_color'))))
                            .setImage(String(((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_avatar-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_avatar-cmd'))))).user).displayAvatarURL({
                                format: "png"
                            }))))
                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                        ]
                    });

                });
            }
        }
        if ((s4dmessage.content) == String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'user_infos') {
            s4dmessage.delete();
            s4dmessage.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(String((String(s4d.database.get(String('time_emoji'))) + ' **| Veuillez patienter !**')))
                    .setColor(String(s4d.database.get(String('embed_color'))))
                    .setDescription(String('Je suis actuellement en train de récupérer mes données.'))
                ]
            }).then(async (s4dreply) => {
                await delay(Number(2) * 1000);
                s4d.database.set(String((String((s4dmessage.author).id) + '-badge')), '<:badge_member:968261898292330506>');
                if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                    s4dreply.edit({
                        embeds: [new MessageEmbed()
                            .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.author).username, '`**__'].join(''))))
                            .setColor(String(s4d.database.get(String('embed_color'))))
                            .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (s4dmessage.author).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (s4dmessage.author).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((s4dmessage.author).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((s4dmessage.author).id) + '-badge'))), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                            .setThumbnail(String(((s4dmessage.author).displayAvatarURL({
                                format: "png"
                            }))))
                        ]
                    });
                }
                if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                    s4dreply.edit({
                        embeds: [new MessageEmbed()
                            .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.author).username, '`**__'].join(''))))
                            .setColor(String(s4d.database.get(String('embed_color'))))
                            .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (s4dmessage.author).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (s4dmessage.author).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((s4dmessage.author).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((s4dmessage.author).id) + '-badge'))), ' ', s4d.database.get(String((String((s4dmessage.author).id) + '-badge2'))), '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                            .setThumbnail(String(((s4dmessage.author).displayAvatarURL({
                                format: "png"
                            }))))
                        ]
                    });
                }
                if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                    s4dreply.edit({
                        embeds: [new MessageEmbed()
                            .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.author).username, '`**__'].join(''))))
                            .setColor(String(s4d.database.get(String('embed_color'))))
                            .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (s4dmessage.author).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (s4dmessage.author).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((s4dmessage.author).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((s4dmessage.author).id) + '-badge'))), ' ', s4d.database.get(String((String((s4dmessage.author).id) + '-badge2'))), ' ', s4d.database.get(String((String((s4dmessage.author).id) + '-badge3'))), '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                            .setThumbnail(String(((s4dmessage.author).displayAvatarURL({
                                format: "png"
                            }))))
                        ]
                    });
                }
                if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                    s4dreply.edit({
                        embeds: [new MessageEmbed()
                            .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.author).username, '`**__'].join(''))))
                            .setColor(String(s4d.database.get(String('embed_color'))))
                            .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (s4dmessage.author).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (s4dmessage.author).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((s4dmessage.author).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((s4dmessage.author).id) + '-badge'))), ' ', s4d.database.get(String((String((s4dmessage.author).id) + '-badge2'))), ' ', s4d.database.get(String((String((s4dmessage.author).id) + '-badge3'))), ' ', s4d.database.get(String((String((s4dmessage.author).id) + '-badge4'))), '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                            .setThumbnail(String(((s4dmessage.author).displayAvatarURL({
                                format: "png"
                            }))))
                        ]
                    });
                }
                if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                    s4dreply.edit({
                        embeds: [new MessageEmbed()
                            .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.author).username, '`**__'].join(''))))
                            .setColor(String(s4d.database.get(String('embed_color'))))
                            .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (s4dmessage.author).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (s4dmessage.author).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((s4dmessage.author).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((s4dmessage.author).id) + '-badge'))), ' ', '', '', s4d.database.get(String((String((s4dmessage.author).id) + '-badge3'))), '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                            .setThumbnail(String(((s4dmessage.author).displayAvatarURL({
                                format: "png"
                            }))))
                        ]
                    });
                }
                if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                    s4dreply.edit({
                        embeds: [new MessageEmbed()
                            .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.author).username, '`**__'].join(''))))
                            .setColor(String(s4d.database.get(String('embed_color'))))
                            .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (s4dmessage.author).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (s4dmessage.author).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((s4dmessage.author).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((s4dmessage.author).id) + '-badge'))), ' ', '', '', '', '', s4d.database.get(String((String((s4dmessage.author).id) + '-badge4'))), '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                            .setThumbnail(String(((s4dmessage.author).displayAvatarURL({
                                format: "png"
                            }))))
                        ]
                    });
                }

            });
        } else if (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'user_infos') || '')) {
            s4dmessage.delete();
            s4d.database.set(String((String((s4dmessage.author).id) + '-user_infos-args')), ((s4dmessage.content).split(' ')));
            s4d.database.set(String((String((s4dmessage.author).id) + '-user_infos-cmd')), (s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-args'))).splice(1, 1)[0]));
            if ((s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))) || '').startsWith('<@' || '')) {
                s4dmessage.channel.send({
                    embeds: [new MessageEmbed()
                        .setTitle(String((String(s4d.database.get(String('time_emoji'))) + ' **| Veuillez patienter !**')))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setDescription(String('Je suis actuellement en train de récupérer mes données.'))
                    ]
                }).then(async (s4dreply) => {
                    await delay(Number(2) * 1000);
                    s4d.database.set(String((String((s4dmessage.mentions.members.first().user).id) + '-badge')), '<:badge_member:968261898292330506>');
                    if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                        s4dreply.edit({
                            embeds: [new MessageEmbed()
                                .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.mentions.members.first().user).username, '`**__'].join(''))))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (s4dmessage.mentions.members.first().user).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (s4dmessage.mentions.members.first().user).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((s4dmessage.mentions.members.first().user).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge'))), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                .setThumbnail(String(((s4dmessage.mentions.members.first().user).displayAvatarURL({
                                    format: "png"
                                }))))
                            ]
                        });
                    }
                    if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                        s4dreply.edit({
                            embeds: [new MessageEmbed()
                                .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.mentions.members.first().user).username, '`**__'].join(''))))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (s4dmessage.mentions.members.first().user).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (s4dmessage.mentions.members.first().user).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((s4dmessage.mentions.members.first().user).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge'))), ' ', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge2'))), '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.mentions.members.first().user).tag, '', ''].join(''))))
                                .setThumbnail(String(((s4dmessage.mentions.members.first().user).displayAvatarURL({
                                    format: "png"
                                }))))
                            ]
                        });
                    }
                    if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                        s4dreply.edit({
                            embeds: [new MessageEmbed()
                                .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.mentions.members.first().user).username, '`**__'].join(''))))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (s4dmessage.mentions.members.first().user).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (s4dmessage.mentions.members.first().user).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((s4dmessage.mentions.members.first().user).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge'))), ' ', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge2'))), ' ', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge3'))), '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.mentions.members.first().user).tag, '', ''].join(''))))
                                .setThumbnail(String(((s4dmessage.mentions.members.first().user).displayAvatarURL({
                                    format: "png"
                                }))))
                            ]
                        });
                    }
                    if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                        s4dreply.edit({
                            embeds: [new MessageEmbed()
                                .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.mentions.members.first().user).username, '`**__'].join(''))))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (s4dmessage.mentions.members.first().user).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (s4dmessage.mentions.members.first().user).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((s4dmessage.mentions.members.first().user).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge'))), ' ', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge2'))), ' ', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge3'))), ' ', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge4'))), '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.mentions.members.first().user).tag, '', ''].join(''))))
                                .setThumbnail(String(((s4dmessage.mentions.members.first().user).displayAvatarURL({
                                    format: "png"
                                }))))
                            ]
                        });
                    }
                    if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                        s4dreply.edit({
                            embeds: [new MessageEmbed()
                                .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.mentions.members.first().user).username, '`**__'].join(''))))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (s4dmessage.mentions.members.first().user).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (s4dmessage.mentions.members.first().user).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((s4dmessage.mentions.members.first().user).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge'))), ' ', '', '', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge3'))), '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.mentions.members.first().user).tag, '', ''].join(''))))
                                .setThumbnail(String(((s4dmessage.mentions.members.first().user).displayAvatarURL({
                                    format: "png"
                                }))))
                            ]
                        });
                    }
                    if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                        s4dreply.edit({
                            embeds: [new MessageEmbed()
                                .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.mentions.members.first().user).username, '`**__'].join(''))))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (s4dmessage.mentions.members.first().user).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (s4dmessage.mentions.members.first().user).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((s4dmessage.mentions.members.first().user).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge'))), ' ', '', '', '', '', s4d.database.get(String((String((s4dmessage.mentions.members.first().user).id) + '-badge4'))), '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.mentions.members.first().user).tag, '', ''].join(''))))
                                .setThumbnail(String(((s4dmessage.mentions.members.first().user).displayAvatarURL({
                                    format: "png"
                                }))))
                            ]
                        });
                    }

                });
            } else {
                s4dmessage.channel.send({
                    embeds: [new MessageEmbed()
                        .setTitle(String((String(s4d.database.get(String('time_emoji'))) + ' **| Veuillez patienter !**')))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setDescription(String('Je suis actuellement en train de récupérer mes données.'))
                    ]
                }).then(async (s4dreply) => {
                    await delay(Number(2) * 1000);
                    s4d.database.set(String((String(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) + '-badge')), '<:badge_member:968261898292330506>');
                    if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                        s4dreply.edit({
                            embeds: [new MessageEmbed()
                                .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).username, '`**__'].join(''))))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id) + '-badge'))), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                .setThumbnail(String(((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).displayAvatarURL({
                                    format: "png"
                                }))))
                            ]
                        });
                    }
                    if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                        s4dreply.edit({
                            embeds: [new MessageEmbed()
                                .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).username, '`**__'].join(''))))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String(((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user) + '-badge'))), ' ', s4d.database.get(String((String(((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user) + '-badge2'))), '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                .setThumbnail(String(((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).displayAvatarURL({
                                    format: "png"
                                }))))
                            ]
                        });
                    }
                    if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                        s4dreply.edit({
                            embeds: [new MessageEmbed()
                                .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).username, '`**__'].join(''))))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id) + '-badge'))), ' ', s4d.database.get(String((String((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id) + '-badge2'))), ' ', s4d.database.get(String((String((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id) + '-badge3'))), '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                .setThumbnail(String(((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).displayAvatarURL({
                                    format: "png"
                                }))))
                            ]
                        });
                    }
                    if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                        s4dreply.edit({
                            embeds: [new MessageEmbed()
                                .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).username, '`**__'].join(''))))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id) + '-badge'))), ' ', s4d.database.get(String((String((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id) + '-badge2'))), ' ', s4d.database.get(String((String((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id) + '-badge3'))), ' ', s4d.database.get(String((String((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id) + '-badge4'))), '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                .setThumbnail(String(((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).displayAvatarURL({
                                    format: "png"
                                }))))
                            ]
                        });
                    }
                    if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                        s4dreply.edit({
                            embeds: [new MessageEmbed()
                                .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).username, '`**__'].join(''))))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id) + '-badge'))), ' ', '', '', s4d.database.get(String((String((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id) + '-badge3'))), '', '', '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                .setThumbnail(String(((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).displayAvatarURL({
                                    format: "png"
                                }))))
                            ]
                        });
                    }
                    if (s4d.database.has(String((String((s4dmessage.author).id) + '-badge'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge2'))) && !s4d.database.has(String((String((s4dmessage.author).id) + '-badge3'))) && s4d.database.has(String((String((s4dmessage.author).id) + '-badge4')))) {
                        s4dreply.edit({
                            embeds: [new MessageEmbed()
                                .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).username, '`**__'].join(''))))
                                .setColor(String(s4d.database.get(String('embed_color'))))
                                .setDescription(String((['<:item_link:968477773536563260> __**| Informations de l\'utilisateur**__', '\n', '> <:item_partner:968504412295290900> **| Tag** = *`', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).tag, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id, '`*', '\n', '', '', '', '', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).createdAt).format('LLLL'), '`*', '', '', '', '', '', '``` ```', '\n', '> <:item_pause:977514476142215188> **| Badge** = ', s4d.database.get(String((String((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id) + '-badge'))), ' ', '', '', '', '', s4d.database.get(String((String((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).id) + '-badge4'))), '', '', '', '', '', '', '', '', '', '', ''].join(''))))
                                .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                                .setThumbnail(String(((((s4dmessage.guild).members.cache.get(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd')))) || await (s4dmessage.guild).members.fetch(s4d.database.get(String((String((s4dmessage.author).id) + '-user_infos-cmd'))))).user).displayAvatarURL({
                                    format: "png"
                                }))))
                            ]
                        });
                    }

                });
            }
        }
        if ((s4dmessage.content) == String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'server_infos') {
            s4dmessage.delete();
            s4dmessage.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(String((String(s4d.database.get(String('time_emoji'))) + ' **| Veuillez patienter !**')))
                    .setColor(String(s4d.database.get(String('embed_color'))))
                    .setDescription(String('Je suis actuellement en train de récupérer mes données.'))
                ]
            }).then(async (s4dreply) => {
                await delay(Number(2) * 1000);
                s4dreply.edit({
                    embeds: [new MessageEmbed()
                        .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.guild).name, '`**__'].join(''))))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setDescription(String((['<:item_link:968477773536563260> __**| Informations du serveur**__', '\n', '> <:item_partner:968504412295290900> **| Nom** = *`', (s4dmessage.guild).name, '`*', '\n', '> <:item_restraintaccess:968261896006406145> **| Identifiant** = *`', (s4dmessage.guild).id, '`*', '\n', '> <:item_key:968477773486256178> **| Propriétaire** = *`', (((s4dmessage.guild).members.cache.get((String((s4dmessage.guild).ownerId))) || await (s4dmessage.guild).members.fetch((String((s4dmessage.guild).ownerId)))).user).tag, '`*', '\n', '> <:item_outtime:968261894660042792> **| Date de création** = *`', moment((s4dmessage.guild).createdAt).format('LLLL'), '`*', '\n', '> <:item_people:968261895754760232> **| Nombre de membre(s)** = *`', (s4dmessage.guild).memberCount, ' Membre(s)`*', '\n', '', '', '> <:item_createchanel:968508054733725767> **| Nombre de salon(s)** = *`', (s4dmessage.guild).channels.cache.size, ' Salon(s)`*', '\n', '> <:item_deleterole:968264701085634602> **| Nombre de rôle(s)** = *`', (s4dmessage.guild).roles.cache.size, ' Rôle(s)`*', '\n', '> <:item_bot:968263156457697291> **| Nombre de bot(s)** = *`', (s4dmessage.guild).members.cache.filter(m => m.user.bot).size, ' Bot(s)`*', '\n', '> <:item_database:968287646298275840> **| Niveau(x) de boost(s)** = *`Niveau ', (s4dmessage.guild).premiumTier, '`*', '', '', '', ''].join(''))))
                        .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                        .setThumbnail(String(((s4dmessage.guild).iconURL({
                            dynamic: true
                        }))))
                    ]
                });

            });
        }
        if (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'qrcode') || '')) {
            s4dmessage.delete();
            s4d.database.set(String((String((s4dmessage.author).id) + '-qrcode_cmd')), ((s4dmessage.content).split(' ')));
            s4d.database.set(String((String((s4dmessage.author).id) + '-qrcode_args')), (s4d.database.get(String((String((s4dmessage.author).id) + '-qrcode_cmd'))).slice(1, 10000000)));
            QRCode.toString(s4d.database.get(String((String((s4dmessage.author).id) + '-qrcode_args'))), {
                type: "image"
            }, async (err, QR) => {
                if (err) return console.warn('There was an error while creating the QR code')
                s4dmessage.channel.send({
                    content: String((QR))
                });

            })
        }
        if (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'say') || '')) {
            s4dmessage.delete();
            if ((s4dmessage.member).permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                s4d.database.set(String((String((s4dmessage.author).id) + '-say_cmd')), ((s4dmessage.content).split(' ')));
                s4d.database.set(String((String((s4dmessage.author).id) + '-say_args')), (s4d.database.get(String((String((s4dmessage.author).id) + '-say_cmd'))).slice(1, 10000000)));
                s4d.database.set(String((String((s4dmessage.author).id) + '-say_args2')), (s4d.database.get(String((String((s4dmessage.author).id) + '-say_args'))).join(' ')));
                s4dmessage.channel.send({
                    content: String(s4d.database.get(String((String((s4dmessage.author).id) + '-say_args2'))))
                });
                s4d.database.delete(String((String((s4dmessage.author).id) + '-say_cmd')));
                s4d.database.delete(String((String((s4dmessage.author).id) + '-say_args')));
                s4d.database.delete(String((String((s4dmessage.author).id) + '-say_args2')));
            } else {
                var embed = new Discord.MessageEmbed()
                embed.setColor(s4d.database.get(String('embed_color')));
                embed.setTitle((String(s4d.database.get(String('noaccess_emoji'))) + ' **| Une erreur est survenue !**'));
                embed.setDescription('Pour poursuivre, vous devez posséder la permission *`ADMINISTRATOR`*');
                (s4dmessage.channel).send({
                    embeds: [embed]
                });

                await delay(Number(2) * 1000);
                (s4dmessage.channel).bulkDelete((1 | 1));
            }
        }
        if ((s4dmessage.content) == String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'embed') {
            s4dmessage.delete();
            if ((s4dmessage.member).permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                (s4dmessage.channel).send({
                    embeds: [new MessageEmbed()
                        .setTitle(String((['<:item_bot:968263156457697291> __**| Système d\'embed par `Gustave', '', '`**__'].join(''))))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setDescription(String((['Configurez votre embed à l\'aide des différents boutons.', '', '', '', '', '', '', ''].join(''))))
                        .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                    ],
                    components: [(new MessageActionRow()
                        .addComponents(new MessageButton()
                            .setCustomId('desc_embed')
                            .setLabel('Description')
                            .setEmoji('<:item_database:968287646298275840>')
                            .setStyle(('SECONDARY')),
                            new MessageButton()
                            .setCustomId('title_embed')
                            .setLabel('Titre')
                            .setEmoji('<:item_message:968287427909279794>')
                            .setStyle(('SECONDARY')),
                            new MessageButton()
                            .setCustomId('color_embed')
                            .setLabel('Couleur')
                            .setEmoji('<:item_pause:977514476142215188>')
                            .setStyle(('PRIMARY')),
                            new MessageButton()
                            .setCustomId('good_embed')
                            .setEmoji('<:item_good:968261893531791370>')
                            .setStyle(('SUCCESS')),
                            new MessageButton()
                            .setCustomId('notgood_embed')
                            .setEmoji('<:item_accessdenied:968261893745696778>')
                            .setStyle(('DANGER')),
                        ))]
                }).then(m => {
                    let collector = m.createMessageComponentCollector({
                        filter: i => i.user.id === (s4dmessage.member).id,
                        time: 60000
                    });
                    collector.on('collect', async i => {
                        if ((i.customId) == 'notgood_embed') {
                            await i.update({
                                content: String('**Menu Expiré**'),
                                components: [(new MessageActionRow()
                                    .addComponents(new MessageButton()
                                        .setCustomId('desc_embed')
                                        .setLabel('Description')
                                        .setEmoji('<:item_database:968287646298275840>')
                                        .setStyle(('SECONDARY')),
                                        new MessageButton()
                                        .setCustomId('title_embed')
                                        .setLabel('Titre')
                                        .setEmoji('<:item_message:968287427909279794>')
                                        .setStyle(('SECONDARY')),
                                        new MessageButton()
                                        .setCustomId('color_embed')
                                        .setLabel('Couleur')
                                        .setEmoji('<:item_pause:977514476142215188>')
                                        .setStyle(('PRIMARY')),
                                        new MessageButton()
                                        .setCustomId('good_embed')
                                        .setEmoji('<:item_good:968261893531791370>')
                                        .setStyle(('SUCCESS')),
                                        new MessageButton()
                                        .setCustomId('notgood_embed')
                                        .setEmoji('<:item_accessdenied:968261893745696778>')
                                        .setStyle(('DANGER')),
                                    ))]
                            }).then(m => {

                            });
                            await i.deleteReply()
                        }
                        if ((i.customId) == 'good_embed') {
                            (s4dmessage.channel).send({
                                embeds: [new MessageEmbed()
                                    .setTitle(String(s4d.database.get(String((String((s4dmessage.author).id) + 'title_embed')))))
                                    .setColor(String(s4d.database.get(String((String((s4dmessage.author).id) + 'color-choice_embed')))))
                                    .setDescription(String(s4d.database.get(String((String((s4dmessage.author).id) + 'desc_embed')))))
                                ]
                            });
                            await i.update({
                                content: String('**Menu Expiré**'),
                                components: [(new MessageActionRow()
                                    .addComponents(new MessageButton()
                                        .setCustomId('desc_embed')
                                        .setLabel('Description')
                                        .setEmoji('<:item_database:968287646298275840>')
                                        .setStyle(('SECONDARY')),
                                        new MessageButton()
                                        .setCustomId('title_embed')
                                        .setLabel('Titre')
                                        .setEmoji('<:item_message:968287427909279794>')
                                        .setStyle(('SECONDARY')),
                                        new MessageButton()
                                        .setCustomId('color_embed')
                                        .setLabel('Couleur')
                                        .setEmoji('<:item_pause:977514476142215188>')
                                        .setStyle(('PRIMARY')),
                                        new MessageButton()
                                        .setCustomId('good_embed')
                                        .setEmoji('<:item_good:968261893531791370>')
                                        .setStyle(('SUCCESS')),
                                        new MessageButton()
                                        .setCustomId('notgood_embed')
                                        .setEmoji('<:item_accessdenied:968261893745696778>')
                                        .setStyle(('DANGER')),
                                    ))]
                            }).then(m => {

                            });
                            await i.deleteReply()
                        }
                        if ((i.customId) == 'color_embed') {
                            (s4dmessage.channel).send({
                                embeds: [new MessageEmbed()
                                    .setTitle(String(('<:item_bot:968263156457697291> __**| Système d\'embed par `Gustave`**__' + '')))
                                    .setColor(String(s4d.database.get(String('embed_color'))))
                                    .setDescription(String('Choisissez parmi les couleurs ci-desous, la couleur de l\'embed.'))
                                ],
                                components: [(new MessageActionRow()
                                    .addComponents(new MessageButton()
                                        .setCustomId('grey_embed')
                                        .setLabel(' ')
                                        .setStyle(('SECONDARY')),
                                        new MessageButton()
                                        .setCustomId('green_embed')
                                        .setLabel(' ')
                                        .setStyle(('SUCCESS')),
                                        new MessageButton()
                                        .setCustomId('blue_embed')
                                        .setLabel(' ')
                                        .setStyle(('PRIMARY')),
                                        new MessageButton()
                                        .setCustomId('red_embed')
                                        .setLabel(' ')
                                        .setStyle(('DANGER')),
                                    ))]
                            }).then(m => {
                                let collector = m.createMessageComponentCollector({
                                    filter: i => i.user.id === (s4dmessage.member).id,
                                    time: 60000
                                });
                                collector.on('collect', async i => {
                                    if ((i.customId) == 'grey_embed') {
                                        s4d.database.set(String((String((s4dmessage.author).id) + 'color-choice_embed')), '#52575f');
                                    }
                                    if ((i.customId) == 'green_embed') {
                                        s4d.database.set(String((String((s4dmessage.author).id) + 'color-choice_embed')), '#2d7d46');
                                    }
                                    if ((i.customId) == 'blue_embed') {
                                        s4d.database.set(String((String((s4dmessage.author).id) + 'color-choice_embed')), '#5865f2');
                                    }
                                    if ((i.customId) == 'red_embed') {
                                        s4d.database.set(String((String((s4dmessage.author).id) + 'color-choice_embed')), '#d83c3e');
                                    }
                                    await i.update({
                                        content: String('**Menu Expiré**'),
                                        components: [(new MessageActionRow()
                                            .addComponents(new MessageButton()
                                                .setCustomId('grey_embed')
                                                .setLabel(' ')
                                                .setStyle(('SECONDARY')),
                                                new MessageButton()
                                                .setCustomId('green_embed')
                                                .setLabel(' ')
                                                .setStyle(('SUCCESS')),
                                                new MessageButton()
                                                .setCustomId('blue_embed')
                                                .setLabel(' ')
                                                .setStyle(('PRIMARY')),
                                                new MessageButton()
                                                .setCustomId('red_embed')
                                                .setLabel(' ')
                                                .setStyle(('DANGER')),
                                            ))]
                                    }).then(m => {

                                    });
                                    await i.deleteReply()

                                })

                            });
                        }
                        if ((i.customId) == 'title_embed') {
                            (s4dmessage.channel).send(String((['<:item_error:968264701379223562> | Veuillez entrer le titre de l\'embed.', '\n', '*Entrez `cancel` pour annuler.*'].join('')))).then(() => {
                                (s4dmessage.channel).awaitMessages({
                                    filter: (m) => m.author.id === (s4dmessage.member).id,
                                    time: (20 * 60 * 1000),
                                    max: 1
                                }).then(async (collected) => {
                                    s4d.reply = collected.first().content;
                                    s4d.message = collected.first();
                                    if (!((s4d.reply) == 'cancel')) {
                                        s4d.database.set(String((String((s4dmessage.author).id) + 'title_embed')), (s4d.reply));
                                        (s4dmessage.channel).send({
                                            embeds: [new MessageEmbed()
                                                .setTitle(String((String(s4d.database.get(String('save_emoji'))) + ' __**| Modifications sauvegardées**__')))
                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                .setDescription(String('Toutes les modifications ont bien été enregistrées !'))
                                            ]
                                        });
                                        await delay(Number(1) * 1000);
                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                    } else {
                                        (s4dmessage.channel).send({
                                            embeds: [new MessageEmbed()
                                                .setTitle(String((String(s4d.database.get(String('delete_emoji'))) + ' __***| Modifications supprimées**__')))
                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                .setDescription(String('Toutes les modifications ont bien été supprimées !'))
                                            ]
                                        });
                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                    }

                                    s4d.reply = null;
                                }).catch(async (e) => {
                                    console.error(e);
                                });
                            })
                        }
                        if ((i.customId) == 'desc_embed') {
                            (s4dmessage.channel).send(String((['<:item_error:968264701379223562> | Veuillez entrer la description de l\'embed.', '\n', '*Entrez `cancel` pour annuler.*'].join('')))).then(() => {
                                (s4dmessage.channel).awaitMessages({
                                    filter: (m) => m.author.id === (s4dmessage.member).id,
                                    time: (20 * 60 * 1000),
                                    max: 1
                                }).then(async (collected) => {
                                    s4d.reply = collected.first().content;
                                    s4d.message = collected.first();
                                    if (!((s4d.reply) == 'cancel')) {
                                        s4d.database.set(String((String((s4dmessage.author).id) + 'desc_embed')), (s4d.reply));
                                        (s4dmessage.channel).send({
                                            embeds: [new MessageEmbed()
                                                .setTitle(String((String(s4d.database.get(String('save_emoji'))) + ' __**| Modifications sauvegardées**__')))
                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                .setDescription(String('Toutes les modifications ont bien été enregistrées !'))
                                            ]
                                        });
                                        await delay(Number(1) * 1000);
                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                    } else {
                                        (s4dmessage.channel).send({
                                            embeds: [new MessageEmbed()
                                                .setTitle(String((String(s4d.database.get(String('delete_emoji'))) + ' __***| Modifications supprimées**__')))
                                                .setColor(String(s4d.database.get(String('embed_color'))))
                                                .setDescription(String('Toutes les modifications ont bien été supprimées !'))
                                            ]
                                        });
                                        (s4dmessage.channel).bulkDelete((2 | 1));
                                    }

                                    s4d.reply = null;
                                }).catch(async (e) => {
                                    console.error(e);
                                });
                            })
                        }

                    })

                });
            } else {
                var embed = new Discord.MessageEmbed()
                embed.setColor(s4d.database.get(String('embed_color')));
                embed.setTitle((String(s4d.database.get(String('noaccess_emoji'))) + ' **| Une erreur est survenue !**'));
                embed.setDescription('Pour poursuivre, vous devez posséder la permission *`ADMINISTRATOR`*');
                (s4dmessage.channel).send({
                    embeds: [embed]
                });

                await delay(Number(2) * 1000);
                (s4dmessage.channel).bulkDelete((1 | 1));
            }
        }
        if (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'ping') || '')) {
            s4dmessage.delete();
            s4dmessage.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(String((String(s4d.database.get(String('time_emoji'))) + ' **| Veuillez patienter !**')))
                    .setColor(String(s4d.database.get(String('embed_color'))))
                    .setDescription(String('Je suis actuellement en train de récupérer mes données.'))
                ]
            }).then(async (s4dreply) => {
                await delay(Number(2) * 1000);
                s4dreply.edit({
                    embeds: [new MessageEmbed()
                        .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `Gustave', '', '`**__'].join(''))))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setDescription(String((['<:item_people:968261895754760232> **| Ping de `Gustave`**', '\n', '\n', 'Mon ping est de `', s4d.client.ws.ping, '` ms.', '', '', '', ''].join(''))))
                        .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                    ]
                });

            });
        }
        if (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'chanel_count') || '')) {
            s4dmessage.delete();
            s4dmessage.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(String((String(s4d.database.get(String('time_emoji'))) + ' **| Veuillez patienter !**')))
                    .setColor(String(s4d.database.get(String('embed_color'))))
                    .setDescription(String('Je suis actuellement en train de récupérer mes données.'))
                ]
            }).then(async (s4dreply) => {
                await delay(Number(2) * 1000);
                s4dreply.edit({
                    embeds: [new MessageEmbed()
                        .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.guild).name, '`**__'].join(''))))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setDescription(String((['<:item_people:968261895754760232> **| Nombre de salon(s)**', '\n', '\n', 'Le serveur possède `', (s4dmessage.guild).channels.cache.size, '` salon(s).', '', '', '', ''].join(''))))
                        .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                    ]
                });

            });
        }
        if (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'member_count') || '')) {
            s4dmessage.delete();
            s4dmessage.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(String((String(s4d.database.get(String('time_emoji'))) + ' **| Veuillez patienter !**')))
                    .setColor(String(s4d.database.get(String('embed_color'))))
                    .setDescription(String('Je suis actuellement en train de récupérer mes données.'))
                ]
            }).then(async (s4dreply) => {
                await delay(Number(2) * 1000);
                s4dreply.edit({
                    embeds: [new MessageEmbed()
                        .setTitle(String((['<:item_bot:968263156457697291> __**| Informations sur `', (s4dmessage.guild).name, '`**__'].join(''))))
                        .setColor(String(s4d.database.get(String('embed_color'))))
                        .setDescription(String((['<:item_people:968261895754760232> **| Nombre de membre(s)**', '\n', '\n', 'Le serveur possède `', (s4dmessage.guild).members.cache.filter(m => !m.user.bot).size, '` membre(s).', '', '', '', ''].join(''))))
                        .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                    ]
                });

            });
        }
        if (((s4dmessage.content) || '').startsWith((String(s4d.database.get(String((String((s4dmessage.guild).id) + '-prefix')))) + 'bot_infos') || '')) {
            s4dmessage.delete();
            await delay(Number(2) * 1000);
            s4dmessage.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(String((String(s4d.database.get(String('time_emoji'))) + ' **| Veuillez patienter !**')))
                    .setColor(String(s4d.database.get(String('embed_color'))))
                    .setDescription(String('Je suis actuellement en train de récupérer mes données.'))
                ]
            }).then(async (s4dreply) => {

                os.cpuUsage(function(v) {
                    var obj = v * 100
                    s4dreply.edit({
                        embeds: [new MessageEmbed()
                            .setTitle(String('<:item_bot:968263156457697291> __**| Informations sur `Gustave`**__'))
                            .setColor(String(s4d.database.get(String('embed_color'))))
                            .setDescription(String((['<:item_link:968477773536563260> __**| Mes informations**__', '\n', '> <:item_teamsupport:968263156390588436> **| Mon serveur support** = [*Lien Discord*](', s4d.database.get(String('discord_invite')), ')', '\n', '> <:item_join:968261893825372170> **| Mon lien d\'invitation** = [*Lien d\'invitation*](', s4d.database.get(String('invite_link')), ')', '\n', '> <:item_database:968287646298275840> **| Mon nombre de serveur(s)** = *`', s4d.client.guilds.cache.size, ' Serveur(s)`*', '\n', '> <:item_people:968261895754760232> **| Mon nombre de membre(s)** = *`', s4d.client.users.cache.size, ' Membre(s)`*', '\n', '> <:item_goodping:968261894194462830> **| Mon Ping** = *`', s4d.client.ws.ping, ' ms`*', '\n', '<:item_error:968264701379223562> __**| Informations supplémentaires**__', '\n', '> <:item_settings:968261894689419314> **| Système d\'exploitation** = *`', os.platform(), '`*', '\n', '> <:item_goodping:968261894194462830> **| CPU utilisés** = *`', obj, '/100%`*', '\n', '> <:item_bug:968261894085415002> **| RAM total** = *`', os.totalmem(), 'MB`*', '\n', '> <:item_warnings:968477773180055642> **| RAM disponible** = *`', os.freemem(), 'MB`*', '\n', '> <:item_outtime:968261894660042792> **| Gustave est allumé depuis** = *`', miliConverter.secsMinsHoursDays((os.sysUptime() * 1000), "string"), '`*'].join(''))))
                            .setFooter(String((['', ' Demandé par ', (s4dmessage.author).tag, '', ''].join(''))))
                            .setThumbnail(String('https://media.discordapp.net/attachments/810560615621722182/977488499924164648/hipster_RF_RMPL-01.png?width=702&height=702'))
                        ]
                    });

                });

            });
        }

    });

    // Moderator rank
    s4d.client.on("guildMemberRoleAdd", async (member, role) => {
        if ((role.id) == '943560052680298511') {
            if (!s4d.database.has(String((String((member.user).id) + '-badge4'))) && s4d.database.has(String((String((member.user).id) + '-badge2'))) && s4d.database.has(String((String((member.user).id) + '-badge3')))) {
                s4d.database.set(String((String((member.user).id) + '-badge4')), '<:badge_helper:968261919192526938>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge3'))) && s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge3')), '<:badge_helper:968261919192526938>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge2')), '<:badge_helper:968261919192526938>');
            }
        }
        if ((role.id) == '943560052680298508') {
            if (!s4d.database.has(String((String((member.user).id) + '-badge4'))) && s4d.database.has(String((String((member.user).id) + '-badge2'))) && s4d.database.has(String((String((member.user).id) + '-badge3')))) {
                s4d.database.set(String((String((member.user).id) + '-badge4')), '<:badge_moderator:968261898464268319>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge3'))) && s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge3')), '<:badge_moderator:968261898464268319>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge2')), '<:badge_moderator:968261898464268319>');
            }
        }
        if ((role.id) == '981486538053533716') {
            if (!s4d.database.has(String((String((member.user).id) + '-badge4'))) && s4d.database.has(String((String((member.user).id) + '-badge2'))) && s4d.database.has(String((String((member.user).id) + '-badge3')))) {
                s4d.database.set(String((String((member.user).id) + '-badge4')), '<:badge_admin:968261899156332645>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge3'))) && s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge3')), '<:badge_admin:968261899156332645>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge2')), '<:badge_admin:968261899156332645>');
            }
        }
        if ((role.id) == '943560052680298510') {
            if (!s4d.database.has(String((String((member.user).id) + '-badge4'))) && s4d.database.has(String((String((member.user).id) + '-badge2'))) && s4d.database.has(String((String((member.user).id) + '-badge3')))) {
                s4d.database.set(String((String((member.user).id) + '-badge4')), '<:badge_dev:968261899458322442>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge3'))) && s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge3')), '<:badge_dev:968261899458322442>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge2')), '<:badge_dev:968261899458322442>');
            }
        }
        if ((role.id) == '943560052680298512') {
            if (!s4d.database.has(String((String((member.user).id) + '-badge4'))) && s4d.database.has(String((String((member.user).id) + '-badge2'))) && s4d.database.has(String((String((member.user).id) + '-badge3')))) {
                s4d.database.set(String((String((member.user).id) + '-badge4')), '<:badge_owner:968261898523017226>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge3'))) && s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge3')), '<:badge_owner:968261898523017226>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge2')), '<:badge_owner:968261898523017226>');
            }
        }
        if ((role.id) == '981487952989388830') {
            if (!s4d.database.has(String((String((member.user).id) + '-badge4'))) && s4d.database.has(String((String((member.user).id) + '-badge2'))) && s4d.database.has(String((String((member.user).id) + '-badge3')))) {
                s4d.database.set(String((String((member.user).id) + '-badge4')), '<:badge_partner:968261898174861344>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge3'))) && s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge3')), '<:badge_partner:968261898174861344>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge2')), '<:badge_partner:968261898174861344>');
            }
        }
        if ((role.id) == '981485877383532574') {
            if (!s4d.database.has(String((String((member.user).id) + '-badge4'))) && s4d.database.has(String((String((member.user).id) + '-badge2'))) && s4d.database.has(String((String((member.user).id) + '-badge3')))) {
                s4d.database.set(String((String((member.user).id) + '-badge4')), '<:badge_verified:968266777106722868>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge3'))) && s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge3')), '<:badge_verified:968266777106722868>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge2')), '<:badge_verified:968266777106722868>');
            }
        }
        if ((role.id) == '981487683685740584') {
            if (!s4d.database.has(String((String((member.user).id) + '-badge4'))) && s4d.database.has(String((String((member.user).id) + '-badge2'))) && s4d.database.has(String((String((member.user).id) + '-badge3')))) {
                s4d.database.set(String((String((member.user).id) + '-badge4')), '<:badge_blacklisted:968266776657932368>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge3'))) && s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge3')), '<:badge_blacklisted:968266776657932368>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge2')), '<:badge_blacklisted:968266776657932368>');
            }
        }
        if ((role.id) == '981488291318759435') {
            if (!s4d.database.has(String((String((member.user).id) + '-badge4'))) && s4d.database.has(String((String((member.user).id) + '-badge2'))) && s4d.database.has(String((String((member.user).id) + '-badge3')))) {
                s4d.database.set(String((String((member.user).id) + '-badge4')), '<:badge_warning:968261919549030440>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge3'))) && s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge3')), '<:badge_warning:968261919549030440>');
            }
            if (!s4d.database.has(String((String((member.user).id) + '-badge2')))) {
                s4d.database.set(String((String((member.user).id) + '-badge2')), '<:badge_warning:968261919549030440>');
            }
        }

    });

    return s4d
})();