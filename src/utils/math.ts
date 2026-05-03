export function generateQuestion(): { question: string; answer: number } {
  const operations = ['+', '-', '*', '/']
  const operation = operations[Math.floor(Math.random() * operations.length)]

  let num1, num2, question, answer

  switch (operation) {
    case '+':
      num1 = Math.floor(Math.random() * 20) + 1
      num2 = Math.floor(Math.random() * 20) + 1
      question = `${num1} + ${num2}`
      answer = num1 + num2
      break
    case '-':
      num1 = Math.floor(Math.random() * 20) + 1
      num2 = Math.floor(Math.random() * num1) + 1
      question = `${num1} - ${num2}`
      answer = num1 - num2
      break
    case '*':
      num1 = Math.floor(Math.random() * 10) + 1
      num2 = Math.floor(Math.random() * 10) + 1
      question = `${num1} × ${num2}`
      answer = num1 * num2
      break
    case '/':
      num2 = Math.floor(Math.random() * 9) + 1
      answer = Math.floor(Math.random() * 10) + 1
      num1 = num2 * answer
      question = `${num1} ÷ ${num2}`
      answer = num1 / num2
      break
    default:
      throw new Error('Invalid operation')
  }

  return { question, answer }
}