class ValidateCPF {
    constructor(cpfSent) {
      Object.defineProperty(this, 'cpfClear', {
        writable: false,
        enumerable: true,
        configurable: false,
        value: cpfSent.replace(/\D+/g, '')
      });
    }
  
    isSequency() {
      return this.cpfClear.charAt(0).repeat(11) === this.cpfClear;
    }
  
    generateCpf() {
      const cpfWithoutDigits = this.cpfClear.slice(0, -2);
      const digit1 = ValidateCPF.generateDigit(cpfWithoutDigits);
      const digit2 = ValidateCPF.generateDigit(cpfWithoutDigits + digit1);
      this.newCPF = cpfWithoutDigits + digit1 + digit2;
    }
  
    static generateDigit(cpfWithoutDigits) {
      let total = 0;
      let revers = cpfWithoutDigits.length + 1;
  
      for(let stringNumerical of cpfWithoutDigits) {
        total += revers * Number(stringNumerical);
        revers--;
      }
  
      const digit = 11 - (total % 11);
      return digit <= 9 ? String(digit) : '0';
    }
  
    validate() {
      if(!this.cpfClear) return false;
      if(typeof this.cpfClear !== 'string') return false;
      if(this.cpfClear.length !== 11) return false;
      if(this.isSequency()) return false;
      this.generateCpf();
  
      return this.newCPF === this.cpfClear;
    }
  }