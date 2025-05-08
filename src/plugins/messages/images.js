export default {
    name: "image",
    description: "edit image bot welcome",
    comand: ["image"],
    exec: async (m, { sock, db, v}) => {
        if (!v.isMedia) m.reply("Requiere imagen para enviar a la base de datos.")
        const download = await v.download()
        db.data.chats[m.from].image = Buffer.from(download)
        m.reply("Se ha procesado su imagen con exito.")
    },
    isOwner: true
}