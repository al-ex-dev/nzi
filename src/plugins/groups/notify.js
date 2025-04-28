export default {
    name: 'notify',
    description: 'Activa o desactiva las notificaciones en el grupo',
    comand: ['notify'],
    exec: async (m, { sock, db }) => {
        const chat = db.data.chats[m.from]

        const types = Object.keys(chat.notify)

        if (types.includes(m.args[0])) {
            const type = m.args[0];
            const str = type === 'add' ? 'Bienvenida' : type === 'bye' ? 'Despedida' : type === 'demote' ? 'Degradado' : type === 'promote' ? 'Promovido' : type === 'modify' ? 'Ajustes del Grupo' : type

            if (m.args[1] === 'on' || m.args[1] === 'off') {
                chat.notify[type].status = m.args[1] === 'on' ? true : false
            } else {
                chat.notify[type].status = !chat.notify[type].status
            }
            await sock.sendMessage(m.from, {
                title: str,
                text: `Notificaciones ${str} ${chat.notify[type].status ? 'activadas' : 'desactivadas'}`,
                footer: _config.bot.credits,
            }, { quoted: m })
        } else {
            await sock.sendMessage(m.from, {
                text: "Seleccione una opción para cambiar el estado de las notificaciones:",
                footer: _config.bot.credits,
                interactiveButtons: [{
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'options',
                        sections: [
                            {
                                title: 'Opciones',
                                rows: types.map(type => ({
                                    header: 'Estado',
                                    title: type === 'add' ? 'Bienvenida' :
                                           type === 'bye' ? 'Despedida' :
                                           type === 'demote' ? 'Degradado' :
                                           type === 'promote' ? 'Promovido' :
                                           type === 'modify' ? 'Ajustes del Grupo' : type,
                                    description: `${chat.notify[type].status ? 'activado' : 'desactivado'}`,
                                    id: `.notify ${type}`
                                }))
                            }
                        ]
                    })
                }]
            })
        }
    },
    isGroup: true
}