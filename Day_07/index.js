const reg = /xa+yb/ // literal way to write regex
const reg1 = new RegExp(".")  // constructor way to write regex

// when we write two dots it means two single character
const str = "abcds"
const newReg = reg.test(str)  
console.log(newReg)

const str1 = "mongopxaby"


const matched = str1.match(reg)
console.log(matched)

// * --> zero or more repetitions  previous


// const str2 = "xcxxxxxyba"

// const res  = reg.test(str2)
// console.log(res)
