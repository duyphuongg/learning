// function findDigits(n) {
//   // Write your code here
//   const nArr = [...n.toString()]
//   let count = 0
//   nArr.forEach(i => {
//     if (n%i === 0) {
//       count++
//     }
//   })
//   return count
// }
// console.log(findDigits(10));

// function hurdleRace(k, height) {
//   // Write your code here
//   const maxHeight = Math.max(...height)
//   return maxHeight > k ? maxHeight - k : 0
// }
// const k = 4, height = [1, 6, 3, 5, 2]
// console.log(hurdleRace(k, height));

// function designerPdfViewer(h, word) {
//   const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
//   const wordArr = [...word]
//   const getheightWord = wordArr.map(w => {
//     let wIndex = alphabet.findIndex(i => i === w)
//     return +h[wIndex]
//   })
//   const maxHeight = Math.max(...getheightWord)
//   const res = maxHeight * word.length * 1
//   console.log("🚀 ~ file: shopify.js:10 ~ designerPdfViewer ~ res:", res)
//   return res
// }
// const h = "1 3 1 3 1 4 1 3 2 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 7".split(' ')
// const word = "zaba"
// console.log(h);
// console.log(designerPdfViewer(h, word));

// function catAndMouse(x, y, z) {
//   const difference = (a, b) => {
//     return Math.abs(a - b);
//   }
//   const xtoz = difference(x, z)
//   const ytoz = difference(y, z)
//   return xtoz === ytoz ? "Mouse C" : xtoz < ytoz ? "Cat A" : "Cat B"
// }
// let x =1, y=3, z=2
// console.log(catAndMouse(x, y, z));

// function getMoneySpent(keyboards, drives, b) {
//   /*
//    * Write your code here.
//    */
//   const keyboardCount = keyboards.length
//   const drivesCount = drives.length
//   const listRes = []
//   for (let i = 0; i < keyboardCount; i++){
//     for (let j = 0; j < drivesCount; j++){
//       listRes.push([keyboards[i], drives[j]])
//     }
//   }
//   const sumArr = (arr) => arr.reduce((a, b) => a + b, 0)

//   const sumRes = []
//   listRes.forEach(i => {
//     let sum = sumArr(i)
//     if (sum <= b) {
//       sumRes.push(sum)
//     }
//   })
//   return sumRes.length === 0 ? -1 : Math.max(...sumRes)
// }
// const keyboards = [3, 1], drives = [5, 2, 8], b = 10
// console.log(getMoneySpent(keyboards, drives, b));

// function pageCount(n, p) {
//   // Write your code here
//   let startCount = parseInt(p/2)
//   let endCount = (n%2 ===0) ? parseInt((n-p+1)/2) : parseInt((n-p)/2)
//   return startCount <= endCount ? startCount : endCount
// }
// const n = 5, p = 4;
// console.log(pageCount(n, p));

// function sockMerchant(n, ar) {
//   // Write your code here
//   const countPerType = ar.reduce((acc, curr) => {
//     if (!acc[curr]) {
//       acc[curr] = 1
//     } else {
//       acc[curr] += 1
//     }
//     return acc
//   }, {})
  
//   let res = 0;
//   Object.values(countPerType).forEach(i => {
//     if (i>=2) {
//       res += parseInt(i/2)
//     }
//   })
//   return res;
// }
// const ar = [10, 20, 20, 10, 10, 30, 50, 10, 20], n = 9
// console.log(sockMerchant(n, ar));

// function bonAppetit(bill, k, b) {
//     // Write your code here
//   bill.splice(k, 1)
//   const sumArr = arr => arr.reduce((a, b) => a + b, 0)
//   const priceMustPay = sumArr(bill) / 2
//   if (priceMustPay === b) {
//     console.log("Bon Appetit"); 
//   } else {
//     console.log(b - priceMustPay);
//   }
// }
// const bill = [3, 10, 2, 9], k = 1, b = 7;
// console.log(bonAppetit(bill, k, b));

// function dayOfProgrammer(year) {
//   if(year == 1918) return "26.09.1918"
//   let leapYear
//   // Write your code here
//   if (year < 1917) {
//     leapYear = year % 4 === 0
//   } else {
//     leapYear = (year % 4 === 0) && (year % 100 != 0) || year % 400 == 0
//   }
  
//   return leapYear ? `12.09.${year}` : `13.09.${year}`;
// }
// console.log(dayOfProgrammer(2023));
// function migratoryBirds(arr) {
//   // Write your code here
//   const birdObj = arr.reduce((acc, cur) => {
//     if (!acc[cur]) {
//       acc[cur] = 1
//     } else {
//       acc[cur]++
//     }
//     return acc
//   }, {})
//   const max = Math.max(...Object.values(birdObj))
//   const valueMax = Object.entries(birdObj).filter(i => i[1] === max)
//   const min = Math.min(...Object.values(valueMax).map(e => e[0]))
//   return min
// }
// const arr = [1,2,3,4,5,4,3,2,1,3,4]
// console.log(migratoryBirds(arr));
// function divisibleSumPairs(n, k, arr) {
//   // Write your code here
//   const sum = arr => arr.reduce((a, b) => a + b, 0)
//   let count = 0
//   for (let i = 0; i < n; i++){
//     for (let j = 1; j < n; j++){
//       const a = [arr[i], arr[j]]
//       if (i >= j) continue;
//       if (sum(a) % k === 0) {
//         console.log(i, j, a);
//         count++
//       }
//     }
//   }
//   return count
// }
// const k = 3
// const ar = [1, 3, 2, 6, 1, 2]
// console.log(divisibleSumPairs(ar.length, k, ar));
// function birthday(s, d, m) {
//   // Write your code here
//   const sum = arr => arr.reduce((a, b) => a + b, 0)
//   let count = 0
//   let newArr = []
//   for (let i in s) {
//     let a = s.slice(+i, +i + +m)
//     if (a.length == m && sum(a) == d) {
//       count++
//     }
    
//   }
//   return count
// }
// const s = [1, 2, 1, 3, 2]
// const d = 3
// const m = 2
// console.log(birthday(s, d, m));
// function breakingRecords(scores) {
//   // Write your code here
//   const arrMin = []
//   const arrMax = []
//   let min = 0, max = 0
//   for (let i in scores) {
//     if (i == 0) {
//       arrMin.push(scores[i])
//       arrMax.push(scores[i])
//     } else {
//       if (arrMin[i - 1] <= scores[i]) {
//         arrMin.push(arrMin[i - 1])
//       } else {
//         min++
//         arrMin.push(scores[i])
//       }
//       if (arrMax[i - 1] >= scores[i]) {
//         arrMax.push(arrMax[i - 1])
//       } else { 
//         max++
//         arrMax.push(scores[i])
//       }
//     }
//   }
//   return [max, min]
// }

// const scores = [12, 24, 10, 24]
// console.log(breakingRecords(scores));


// function kangaroo(x1, v1, x2, v2) {
//   // Write your code here
//   if (x1 < x2 && v1 < v2 || x1 > x2 && v1 > v2 || x1 != x2 && v1 == v2 || x1 == x2 && v1 != v2) {
//     return "NO";
//   }
//   let newX1 = x1 + v1
//   let newX2 = x2 + v2
//   console.log(newX1, newX2);
//   if (newX1 === newX2) {
//     return "YES";
//   } else {
//     return kangaroo(newX1, v1, newX2, v2)
//   }
// }
// console.log(kangaroo(21, 6, 47, 3));
// function countApplesAndOranges(s, t, a, b, apples, oranges) {
//   // Write your code here
//   let countApple = 0
//   let countOrange = 0
//   for (let apple of apples) {
//     let position = apple + a
//     if (position >= s && position <= t) {
//       countApple++
//     }
//   }
//   for (let orange of oranges) {
//     let position = orange + b
//     if (position >= s && position <= t) {
//       countOrange++
//     }
//   }
//   console.log(`${countApple}\n${countOrange}`);
// }
// countApplesAndOranges(7, 11, 5,15, [-2, 2, 1], [5, -6])

// console.log(gradingStudents(7, 11, 5,15, [-2, 2, 1], [5, -6]));

// function gradingStudents(grades) {
//   // Write your code here
//   const gradeFormat = []
//   for (let grade of grades) {
//     console.log(grade);
//     if (grade < 38) {
//       gradeFormat.push(grade)
//       continue;
//     }
//     const boiso = grade % 5 
//     if (boiso >= 3) {
//       gradeFormat.push(grade + (5 - boiso)) 
//       continue;
//     }
//     gradeFormat.push(grade)
//   }
//   return gradeFormat
// }
// console.log(gradingStudents([33, 38, 67, 73]));

/*
44: 4
43: 3
42: 2

46:1
47:2
48:3
49:4
*/


// const s = `07:05:45PM`;
// function timeConversion(s) {
//   // Write your code here
//   let hour = s.slice(0, 2);
//   let minute = s.slice(3, 5);
//   let second = s.slice(6, 8);
//   const timeString = s.slice(-2);
//   console.log(hour, minute, second, timeString);
//   if (timeString == "AM") {
//     if (hour == "12") {
//       hour = "00" 
//     }
//   } else {
//     if (hour == "12") {
//       hour = "12" 
//     } else {
//       hour = +hour + 12
//     }
//   }
//   return `${hour}:${minute}:${second}`
// }
// console.log(timeConversion(s));
