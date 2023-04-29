function main() {
    
    const input = document.querySelector('#InputCPF');
    const btn = document.querySelector('#btn');
    const res = document.querySelector('#res');

    input.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            const cpf = new ValidaCPF(input.value);
            if (cpf.valida()) {
                console.log('Cpf válido');
                res.innerHTML = "CPF Válido.";
                res.classList.add('valid');
                res.classList.remove('invalid');

            } else {
                console.log('Cpf inválido');
                res.innerHTML = "CPF Inválido.";
                res.classList.add('invalid');
                res.classList.remove('valid');
            }
        }
    });


    btn.addEventListener('click', function () {
        const cpf = new ValidaCPF(input.value);
        if (cpf.valida()) {
            console.log('Cpf válido');
            res.innerHTML = "CPF Válido.";
            res.classList.add('valid');
            res.classList.remove('invalid');

        } else {
            console.log('Cpf inválido');
            res.innerHTML = "CPF Inválido.";
            res.classList.add('invalid');
            res.classList.remove('valid');
        }
    });


    function ValidaCPF(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable: true,
            get: function () {
                return cpfEnviado.replace(/\D+/g, '');
            }
        });
    }

    ValidaCPF.prototype.valida = function () {
        if (typeof this.cpfLimpo === 'undefined') return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.isSequencia()) return false;

        const cpfParcial = this.cpfLimpo.slice(0, -2);
        const digito1 = this.criaDigito(cpfParcial);
        const digito2 = this.criaDigito(cpfParcial + digito1);

        const novoCpf = cpfParcial + digito1 + digito2;
        return novoCpf === this.cpfLimpo;
    };

    ValidaCPF.prototype.criaDigito = function (cpfParcial) {
        const cpfArray = Array.from(cpfParcial);

        let regressivo = cpfArray.length + 1;
        const total = cpfArray.reduce((ac, val) => {
            ac += (regressivo * Number(val));
            regressivo--;
            return ac;
        }, 0);

        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito);
    };

    ValidaCPF.prototype.isSequencia = function () {
        const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
        return sequencia === this.cpfLimpo;
    };

}
main();