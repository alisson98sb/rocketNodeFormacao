import { Readable, Transform, Writable } from "stream";

class OneToHundredStream extends Readable {
    index = 1

    // O metodo _read() é obrigatorio  - Ele vai basicamente retornar quais são os dados dessa stream
    _read() {  
        const i = this.index++

        setTimeout(() => {
            if(i > 100 ) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

//Stream de escrita
//chuck - Informação que a steam de escrita vai ler, ela fica salva no buff que demos pull na stream de leitura. 
//encoding - Ver mais pra frente
//callback - Função que a steam de escrita chama quando terminar de processar o dado. 
class MultiplyByTenStream extends Writable {
    _write(chunck, encoding, callback) {
        console.log(Number(chunck.toString()) * 10)
        callback();
    }
}

//stream de transformação
class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream)
    .pipe(new MultiplyByTenStream)