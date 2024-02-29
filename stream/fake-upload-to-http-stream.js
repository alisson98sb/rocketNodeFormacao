import { Readable } from "stream";

class OneToHundredStream extends Readable {
    index = 1

    // O metodo _read() é obrigatorio  - Ele vai basicamente retornar quais são os dados dessa stream
    _read() {  
        const i = this.index++

        setTimeout(() => {
            if(i > 5 ) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                
                this.push(buf)
            }
        }, 1000)
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: "half",
}).then(response => {
    return response.text()
}).then(data => {
    console.log(data)
})
