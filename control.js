class Calculator{
   constructor(currentTextElement, previousTextElement){
    this.currentTextElement = currentTextElement
    this.previousTextElement = previousTextElement
    this.currentOperand = ''
    this.previousOperand = ''
   }

   clear(){
      this.currentOperand = ''
      this.previousOperand = ''
      this.arthimetic = undefined
   }
   delete(){
      this.currentOperand = this.currentOperand.toString().slice(0 , -1)
   }

   number(number){
      this.currentOperand =this.currentOperand +  number
   }

operation(oprSymbol){
if(this.previousOperand !== '') {
   this.compute()
};
  this.previousOperand = this.currentOperand
  this.currentOperand = ''
  this.arthimetic = oprSymbol
}

   compute(){
     if(this.arthimetic === undefined) return;
      let computed;
      let curr = parseFloat(this.currentOperand)
      let pre = parseFloat(this.previousOperand)
      switch(this.arthimetic){
         case '*': 
              computed = curr * pre
              break;
         case '/': 
              computed = pre / curr
              break;
        case '+': 
              computed = curr + pre
              break;
         case '-': 
              computed = pre - curr
              break;
         default:
                 return;
      }
      this.previousOperand = ''
      this.currentOperand = computed
      this.currentTextElement.innerText = this.currentOperand
      this.currentTextElement.style.color = 'grey'
   }
   update(){
      this.currentTextElement.innerText = this.currentOperand 
      this.previousTextElement.innerText = this.previousOperand
   }
}

const previousOperand = document.querySelector('.previousOperand')
const currentOperand = document.querySelector('.currentOperand')
const numberBtn = document.querySelectorAll('.number')
const operationBtn = document.querySelectorAll('.operation')
const equalBtn = document.querySelector('[equal]')
const clearBtn = document.querySelector('[clear]')
const deleteBtn = document.querySelector('[del]')

const calculator = new Calculator(currentOperand, previousOperand)

numberBtn.forEach(number => {
   number.addEventListener('click', btn => {
      calculator.number(btn.target.innerText)
      calculator.update()
   })
})

operationBtn.forEach(operation => {
   operation.addEventListener('click', opr => {
      calculator.operation(opr.target.innerText)
      calculator.update()
   })
})
equalBtn.addEventListener('click', () => {
   calculator.compute()
})
clearBtn.addEventListener('click', btn => {
        calculator.clear()
        calculator.update()
})
deleteBtn.addEventListener('click', () => {
   calculator.delete()
   calculator.update()
})