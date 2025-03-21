export default {
    name: 'broadcast',
    params: ['message'],
    description: 'Envía un mensaje a todos los grupos donde el bot es administrador',
    comand: ['broadcast'],
    isMedia: ['image', 'video', 'audio', 'document', 'sticker'],
    exec: async (m, { sock, delay }) => {
        const groups = Object.entries(await sock.groupFetchAllParticipating())
            .map(x => x[1])
            .filter(x => !x.announce)
            .filter(x => !x.isCommunityAnnounce)
            .map(x => x.id);

        let count = 0;
        for (let id of groups) {
            if (m.text) {
                await sock.sendMessage(id, {
                    text: m.text,
                    contextInfo: { mentionedJid: m.metadata.participants.map((p) => p.id), remoteJid: id }
                });
            }
            if (m.quoted) {
                await sock.sendMessage(id, {
                    forward: m.quoted,
                    contextInfo: { mentionedJid: m.metadata.participants.map((p) => p.id), remoteJid: id }
                });
            }
            count++
            await delay(10000)
        }
        sock.sendMessage(m.from, { text: `Enviado a ${count} grupos` });
    },
    isOwner: true,
    isGroup: true
}
