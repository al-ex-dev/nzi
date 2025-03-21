export default new class Function {
    byteToSize (bytes) {
        const sizes = ['bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(1000))
        return (bytes / Math.pow(1000, i)).toFixed(2) + ' ' + sizes[i]
    }
    convertTimeOut (ms) {
        const timeUnits = [
            { label: 'semana', value: Math.floor(ms / 604800000) }, // 7 días
            { label: 'día', value: Math.floor((ms % 604800000) / 86400000) }, // 1 día
            { label: 'hora', value: Math.floor((ms % 86400000) / 3600000) }, // 1 hora
            { label: 'minuto', value: Math.floor((ms % 3600000) / 60000) }, // 1 minuto
            { label: 'segundo', value: Math.floor((ms % 60000) / 1000) } // 1 segundo
        ];
    
        return timeUnits.filter(unit => unit.value > 0).map(unit => `${unit.value} ${unit.label}${unit.value > 1 ? 's' : ''}`).join(', ')
    }
    getRandom (ext, num = 10) {
        let code = ''
        for (let i = 0; i < num; i++) {
           const indice = Math.floor(Math.random() * num)
           code += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(indice)
        }
        return code + ext 
    }
}