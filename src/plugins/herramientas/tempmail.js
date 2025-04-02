import tempmail from "../../scraper/tempmail.js"

export default {
    name: 'tempmail',
    description: 'Crea un correo temporal',
    comand: ['tempmail', 'tempmail'],
    isGroup: true,
    isAdmin: false,
    exec: async (m, { sock }) => {
        const mail = await tempmail.initialize()
        const inbox = await mail.getInbox()
        console.log(inbox)

        if (!inbox || !inbox.data.name) {
            return sock.sendMessage(m.from, { text: "Error al obtener el correo temporal. Intenta nuevamente." })
        }

        const email = inbox.data.name
        const inboxCount = inbox.inbox?.length || 0

        const message = `*Correo Temporal*  
Email: *${email}*  
Bandeja: *${inboxCount}* mensajes.  
Revisando mensajes nuevos cada 5 segundos...`

        sock.sendMessage(m.from, { text: message })

        const intervalId = setInterval(async () => {
            const updatedInbox = await mail.getInbox()

            if (updatedInbox.inbox?.length > 0) {
                const latestEmail = updatedInbox.inbox[0]
                console.log(latestEmail)
                const emailContent = await mail.getMessage(latestEmail.data.id)
                console.log(emailContent)

                const newMessage = `*¡Nuevo Mensaje!*  
De: ${latestEmail.from}  
Asunto: ${latestEmail.subject}  
Hora: ${latestEmail.time}`

                await sock.sendMessage(m.from, { text: newMessage })
            }

            clearInterval(intervalId)
            if (updatedInbox.expires < Date.now()) {
                clearInterval(intervalId)
                await sock.sendMessage(m.from, { text: "El correo temporal ha expirado." })
            }
        }, 5000)
    }
}
