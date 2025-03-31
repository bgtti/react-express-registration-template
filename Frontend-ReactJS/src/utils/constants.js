/**
 * Input length requirements for forms
 * @readonly
 * @enum {object}
 */
export const INPUT_LENGTH = Object.freeze({
 name: {
  minValue: 1,
  maxValue: 200
 },
 email: {
  minValue: 3,
  maxValue: 320
 },
 password: {
  minValue: 8,
  maxValue: 60
 }
})