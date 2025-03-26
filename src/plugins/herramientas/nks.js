export default {
    name: 'nks',
    description: 'Verifica tarjeta de crédito',
    comand: ['nks'],
    isGroup: true,
    isAdmin: true,
    exec: async (m, { sock, db, lang }) => {
        if (!m.body) return sock.sendMessage(m.from, { text: "⚠️ *𝚄𝚂𝙾 𝙸𝙽𝚅𝙰𝙻𝙸𝙳𝙾*\n𝙴𝙹𝙴𝙼𝙿𝙻𝙾: .ɴᴋs 5579070116988646|08|2027|599" });

        let sender7 = m.sender
        let mencionado7 = m.mentionedJid
        let usuario7 = (mencionado7 && mencionado7.length > 0) ? mencionado7[0] : sender7
        let miembro7 = db.data.users[usuario7]
        let nombreUsuario7 = miembro7?.name || usuario7.split('@')[0]
        let mentions7 = [usuario7]
        const numero7 = sender7.split('@')[0]
        const bannedBins = ["519535", "518696", "441168"]
        const bannedBin = (bin) => bannedBins.includes(bin)
        const cardDetails = m.body.split("|");
        if (cardDetails.length < 4) return sock.sendMessage(m.from, { text: "*Uso invalido*\nEjemplo: .nks 5579070116988646|08|2027|599" });

        const cc = cardDetails[0];
        let mes = cardDetails[1];
        let ano = cardDetails[2];
        const cvv = cardDetails[3];
        if (ano.length === 2) ano = "20" + ano;
        if (mes.length === 1) mes = "0" + mes;
        if (bannedBin(cc.substring(0, 6))) return sock.sendMessage(m.from, { text: "*La bin proporciona se encuentra baneada.*" });

        const binData = await fetch(`https://lookup.binlist.net/${cc.substring(0, 6)}`).then(res => res.json());
        if (!binData || binData.error) return sock.sendMessage(m.from, { text: "*No se encontro informacion de la bin.*" })

        const bank = binData.bank?.name || "Desconocido"
        const country = binData.country?.name || "Desconocido"
        const type = binData.type || "Desconocido";
        const brand = binData.brand || "Desconocido";
        const scheme = binData.scheme || "Desconocido";
        const emoji = binData.country?.emoji || "";
        const fakeUser = await fetch("https://randomuser.me/api/?nat=us").then(res => res.json());
        const user = fakeUser.results[0];
        const providers = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
        const provider = providers[Math.floor(Math.random() * providers.length)];
        const email = `${user.name.first}.${user.name.last}@${provider}`.toLowerCase();
        const firstname = user.name.first;
        const lastname = user.name.last;
        const street = `${user.location.street.name} ${user.location.street.number}`;
        const city = user.location.city;
        const state = user.location.state;
        const zip = user.location.postcode;
        const phone = user.phone;

        let msg = await sock.sendMessage(m.from, {
            text: `*Verificando tarjeta.......*\n\n💳 *${cc}|${mes}|${ano}|${cvv}*\n\n*por favor, espere un momento...*`,
        });

        setTimeout(async () => {
            const responses = [
                { status: "Aprobada ✅", message: "CVV correcto." },
                { status: "Aprobada ✅", message: "Fondos insuficientes." },
                { status: "Aprobada ✅", message: "Rechazada por AVS." },
                { status: "Declinada ❌", message: "Tarjeta inválida." },
                { status: "Declinada ❌", message: "CVV incorrecto." },
            ];
            const result = responses[Math.floor(Math.random() * responses.length)];
            await sock.sendMessage(m.from, {
                edit: msg.key,
                text: `*Resultado*\n\n*CC:* *${cc}|${mes}|${ano}|${cvv}*\n\n*Estado:* ${result.status}\n\n*Motivo:* ${result.message}\n*Banco:* ${bank}\n*Pais:* ${country} ${emoji}\n*Fecha:* ${mes}/${ano}\n*Tipo: Activa [✅]*\n\n*Miembro: [${type}]*\n*Usuario: [@${usuario7.split('@')[0]}]*`,
                mentions: mentions7
            });
        }, 10000)
    }
};
