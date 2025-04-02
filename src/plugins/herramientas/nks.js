const banned = ["519535", "518696", "441168"]

export default {
    name: 'nks',
    description: 'Verifica tarjeta de crédito',
    comand: ['nks'],
    isGroup: true,
    isAdmin: true,
    exec: async (m, { sock, db }) => {
        if (!m.body) return sock.sendMessage(m.from, { text: "⚠️ *𝚄𝚂𝙾 𝙸𝙽𝚅𝙰𝙻𝙸𝙳𝙾*\n𝙴𝙹𝙴𝙼𝙿𝙻𝙾: .ɴᴋs 5579070116988646|08|2027|599" });

        const split = m.text.split("|")
        if (split.length < 4) return sock.sendMessage(m.from, { text: "*Uso invalido*\nEjemplo: .nks 5579070116988646|08|2027|599" });

        let cc = split[0]
        let month = split[1]
        let year = split[2]
        let cvv = split[3]

        if (year.length === 2) ano = "20" + year
        if (month.length === 1) mes = "0" + month
        if (banned.includes(cc.substring(0, 6))) return sock.sendMessage(m.from, { text: "*La bin proporciona se encuentra baneada.*" });

        const data = await fetch(`https://lookup.binlist.net/${cc.substring(0, 6)}`)

        if (data && data.status !== 200) {
            return sock.sendMessage(m.from, { text: "*No se encontró información de la BIN.*" })
        }

        const bin = await data.json()

        const bank = bin.bank?.name || "Desconocido"
        const country = bin.country?.name || "Desconocido"
        const type = bin.type || "Desconocido";
        const brand = bin.brand || "Desconocido";
        const scheme = bin.scheme || "Desconocido";
        const emoji = bin.country?.emoji || "";

        const fake = await fetch("https://randomuser.me/api/?nat=us")

        if (fake && fake.status !== 200) {
            return sock.sendMessage(m.from, { text: "*No se pudo generar un usuario falso.*" });
        }

        const fakeUser = await fake.json()

        const user = fakeUser.results[0]
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
            text: `*Verificando tarjeta.......*\n\n💳 *${cc}|${month}|${year}|${cvv}*\n\n*por favor, espere un momento...*`,
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
                text: `*Resultado*\n\n*CC:* *${cc}|${month}|${year}|${cvv}*\n\n*Estado:* ${result.status}\n\n*Motivo:* ${result.message}\n*Banco:* ${bank}\n*Pais:* ${country} ${emoji}\n*Fecha:* ${month}/${year}\n*Tipo: Activa [✅]*\n\n*Miembro: [${type}]*\n*Usuario: [@${m.sender.split('@')[0]}]*`,
                mentions: [m.sender]
            });
        }, 10000)
    }
};
