export default {
    name: 'setpromote',
    params: ['message'],
    description: 'Modificar el mensaje de promoción',
    comand: ['setpromote'],
    exec: async (m, { sock, db }) => {
        const chat = db.data.chats[m.from];
        if (!chat) return sock.sendMessage(m.from, { text: 'Chat no encontrado.' })
        if (!m.text) return sock.sendMessage(m.from, { text: 'Mensaje inválido.' })
        chat.messages.promote = m.text
        await sock.sendMessage(m.from, { text: 'Mensaje de promoción actualizado.' })
    },
    isOwner: true
}