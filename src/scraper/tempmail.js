import axios from 'axios'

export default new class TempMail {
    constructor() {
        this.cookie = null;
        this.baseUrl = 'https://tempmail.so'
    }

    async #cookies(response) {
        if (response.headers['set-cookie']) {
            this.cookie = response.headers['set-cookie'].join('; ')
        }
    }

    async #request(url) {
        const response = await axios({
            method: 'GET',
            url: url,
            headers: {
                'accept': 'application/json',
                'cookie': this.cookie || '',
                'referer': this.baseUrl + '/',
                'x-inbox-lifespan': '600',
                'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"',
                'sec-ch-ua-mobile': '?1'
            }
        });

        await this.#cookies(response)
        return response
    }

    async initialize() {
        const response = await axios.get(this.baseUrl, {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
                'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132"'
            }
        });
        await this.#cookies(response)
        return this
    }

    async getInbox() {
        const url = `${this.baseUrl}/us/api/inbox?requestTime=${Date.now()}&lang=us`
        const response = await this.#request(url)
        return response.data
    }

    async getMessage(messageId) {
        const url = `${this.baseUrl}/us/api/inbox/messagehtmlbody/${messageId}?requestTime=${Date.now()}&lang=us`
        const response = await this.#request(url)
        return response.data
    }
}
