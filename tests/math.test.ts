import { describe, it, expect } from 'vitest'
import { generateQuestion } from '../src/utils/math'

describe('Math Utilities', () => {
  it('should generate a valid question', () => {
    const q = generateQuestion()
    expect(q).toHaveProperty('question')
    expect(q).toHaveProperty('answer')
    expect(typeof q.question).toBe('string')
    expect(typeof q.answer).toBe('number')
  })
})
