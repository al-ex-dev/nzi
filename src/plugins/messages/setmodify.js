export default {
    name: 'setmodify',
    params: ['message'],
    description: 'Modificar el mensaje de modificación',
    comand: ['setmodify'],
    exec: async (m, { sock, db }) => {
        const chat = db.data.chats[m.from]
        if (!chat) return sock.sendMessage(m.from, { text: 'Chat no encontrado.' })
        if (!m.text) return sock.sendMessage(m.from, { text: 'Mensaje inválido.' })
        chat.messages.modify = m.text
        await sock.sendMessage(m.from, { text: 'Mensaje de modificación actualizado.' })
    },
    isOwner: true
}
