export default {
    name: 'setbye',
    params: ['message'],
    description: 'Modificar el mensaje de despedida',
    comand: ['setbye'],
    exec: async (m, { sock, db }) => {
        const chat = db.data.chats[m.from]
        if (!chat) return sock.sendMessage(m.from, { text: 'Chat no encontrado.' })
        if (!m.text) return sock.sendMessage(m.from, { text: 'Mensaje inválido.' })
        chat.messages.remove = m.text
        await sock.sendMessage(m.from, { text: 'Mensaje de despedida actualizado.' })
    },
    isOwner: true
}
