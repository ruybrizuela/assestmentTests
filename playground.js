function paginate(items, page, pageSize) {
  if (page < 1 || pageSize <= 0) {
    throw new Error("Invalid page or pageSize");
  }
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return items.slice(startIndex, endIndex);
}
// Example:
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(paginate(arr, 1, 3)); // [1, 2, 3]
console.log(paginate(arr, 2, 3)); // [4, 5, 6]
console.log(paginate(arr, 3, 3)); // [7]


function convertCurrency(
  amount,
  from,
  to,
  rates
  ) {
  const fromRate = rates[from];
  const toRate = rates[to];
  if (fromRate === undefined || toRate === undefined) {
  throw new Error("Unknown currency");
  }
  // Convert from 'from' to base, then base to 'to'
  const amountInBase = amount * fromRate;
  const result = amountInBase / toRate;
  return result;
  }
 
  const rates = { USD: 1, EUR: 0.9, JPY: 110 };
  console.log(convertCurrency(100, "USD", "EUR", rates));
  console.log(convertCurrency(100, "EUR", "JPY", rates));




function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}
// Example usage:
fizzBuzz(100);




function countMultiples(A, B, K) {
  // Calculate the number of multiples of K up to B
  const countUpToB = Math.floor(B / K);

  // Calculate the number of multiples of K up to (A-1)
  const countUpToA_minus_1 = Math.floor((A - 1) / K);

  // The difference gives the number of multiples of K in the range [A..B]
  return countUpToB - countUpToA_minus_1;
}


function productExceptSelf (nums) {
  const res = []
  for(let i=0; i<nums.length; i++){
      const filteredArray = nums.filter((_, index) => index !== i);
      // 2. Multiply all elements in the filtered array using reduce()
      const product = filteredArray.reduce(
          (accumulator, currentValue) => accumulator * currentValue,
          1 // Initial value for the multiplication
      );
      res.push(product)
  }
  return res
};



function orderByOccurrence(arr) {
  const freq = new Map();
  for (const n of arr) freq.set(n, (freq.get(n) || 0) + 1);

  return [...arr].sort((a, b) => {
    const fa = freq.get(a);
    const fb = freq.get(b);
    if (fb !== fa) return fb - fa;  // higher frequency first
    return a - b;                  // tie-breaker: smaller number first
  });
}
console.log(orderByOccurrence([4,3,1,5,4,1,2,4]));
//array
const resultStr = orderByOccurrence([4,3,1,5,4,1,2,4]).join(" ");
console.log(resultStr); 
// "4 4 4 1 1 2 3 5"




function sumaT() {
  console.log(eval(1 + + '2' + 3))
}
sumaT() // 6




function rotateArray(A, K) {
  // Implement your solution here
  const N = A.length;
  if(N === 0 || A===0 || K===0) return A

  //calculating the rotations
  //K%N gives the actual number of unique rotations
  // if K is multiple of N, the array does not change, efectivenes === 0
  const efectivenes = K % N;

  if(efectivenes === 0){
      return A;
  }

  const rotate = A.slice(N - efectivenes);
  const remaining = A.slice(0, N - efectivenes)

  return [...rotate, ...remaining]
}






function duplicatedInArray(A) {
  // Implement your solution here
  const s = new Set();
  let sol;

  A.forEach((e)=>{ 
      if(!s.has(e)){
          s.add(e)
          sol=e
      }
  })
  return sol
}




function jumpsToReach(X, Y, D) {
  if(X===D) return 1

  const jumps = (Y-X)/D
  return Math.ceil(jumps) 
}





function missingInteger(A) {
  const sortedA = A.sort()
  for(let i=0; i<sortedA.length; i++){
      if(sortedA[i]+1 !== sortedA[i+1]){
          return sortedA[i]+1
      }
  }
}

function missingInteger2(A) {
  const setA = new Set(A)
  const arr = [...setA]
  const sorted = arr.sort()
  let res;
  
  for(let i=0; i<sorted.length; i++){
      if(sorted[i]+1 !== sorted[i+1]){
          res = sorted[i]+1
          if(res>0) return res
          else return 1
      }
  }
}



function frogJumpRiver(X, A) {
  // Create a Set to store the unique positions where leaves have fallen.
  const coveredPositions = new Set();

  // Iterate through the array A, which represents the times and positions of falling leaves.
  for (let i = 0; i < A.length; i++) {
      const position = A[i];

      // If the current leaf's position is within the range [1, X]
      // and it hasn't been covered before, add it to the Set.
      if (position >= 1 && position <= X && !coveredPositions.has(position)) {
          coveredPositions.add(position);
      }

      // If the number of unique covered positions equals X,
      // it means all positions from 1 to X are covered,
      // and the frog can jump. Return the current time (index i).
      if (coveredPositions.size === X) {
          return i;
      }
  }

  // If the loop completes and not all positions are covered,
  // the frog can never jump. Return -1.
  return -1;
}




function sortArr(A){
  return A.sort((a,b) => a-b);
}

function getDiskPoints(A){
  const diskStartPoint = [];
  const diskEndPoint = [];

  for(let i=0; i<A.length; i++){
      diskStartPoint.push(i-A[i]);
      diskEndPoint.push(i+A[i]);
  }
  return {
      diskStartPoint: sortArr(diskStartPoint),
      diskEndPoint: sortArr(diskEndPoint)
  }
}

function diskIntersections(A) {
  const { diskEndPoint, diskStartPoint } = getDiskPoints(A);

  let index = 0;
  let openDisks = 0;
  let intersections = 0;

  for(let i=0; i<diskStartPoint.length; i++){
      while(diskStartPoint[i] > diskEndPoint[index]){
          openDisks--;
          index++;
      }
      intersections += openDisks;
      openDisks++;
  }
  return intersections > 10000000 ? -1 : intersections;
}


function isBalancedBrackets(S) {
  const splitted = S.split("");
  const stacked = [];

  for(let i=0; i<splitted.length; i++){
      if(splitted[i] === '{' ||
          splitted[i] === '[' ||
          splitted[i] === '('
      ){
          stacked.push(splitted[i])
      } else if(splitted[i] === '}' ||
          splitted[i] === ']' ||
          splitted[i] === ')'
      ){
          let temp = stacked.pop() + splitted[i]
          if(temp != '{}' && temp != '[]' &&temp != '()') return 0
      } else {
          return 0;
      }
  }
  if(stacked.length > 0) return 0;
  return 1;
}


function avgOfTwoOrThree(A) {
  let minAvg = Infinity;
  let minIndex = 0;

  for(let i=0; i<A.length - 1; i++){
      let avg = (A[i] + A[i+1])/2
      if(avg < minAvg){
          minAvg = avg;
          minIndex = i
      }

      if(i < A.length+2){
          let avg3 = (A[i] + A[i+2] + A[i+3])/3
          if(avg3 < minAvg){
              minAvg = avg;
              minIndex = i;
          }
      }
  }
  return minIndex;
}





const switchCase = (str) => {
  var newString = ''
  for (let letter of str) {
    if (letter.toUpperCase() === letter) {
      newString += letter.toLowerCase()
    } else {
      newString += letter.toUpperCase()
    }
  }
  console.log(newString)
}
//switchCase('hoLa Loco ComO andas?') //HOlA lOCO cOMo ANDAS?




const switchCase2 = (str) => {
  return str.split('').map((letter) => {
    if (letter.toUpperCase() === letter) {
      return letter.toLowerCase()
    } else {
      return letter.toUpperCase()
    }
  }).join('')
}
//console.log(switchCase2('hoLa Loco ComO andas?'))





function replaceCharSens(inputStr, replaceThis, withThis) {
  let retVal = '';
  for (let i = 0; i < inputStr.length; i++) {
    if (inputStr[i] === replaceThis) {
        retVal += withThis
    }
    else {
      retVal += inputStr[i]
    }
 }
  console.log(retVal)
}
//replaceCharSens('HeLlo World!', 'l', 'w') //HeLwo Worwd!





function replaceCharNoSens(inputStr, replaceThis, withThis) {
  let newString = '';
  for (let letter of inputStr) {
    if (letter.toUpperCase() === replaceThis.toUpperCase()) {
      newString += withThis
    } else {
      newString += letter
    }
  }
  console.log(newString)
}
//replaceCharNoSens('HeLlo World!', 'l', 'w') Hewwo Worwd!




const capitalizeArray = (strArr) => {
  for (let i = 0; i < strArr.length; i++) {
    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substr(1);
  }
  console.log(strArr)
}
//capitalizeArray(['hola', 'CHAU', 'nos', 'vemos']) //[ 'Hola', 'CHAU', 'Nos', 'Vemos' ]




const capitalizeString = (str) => {
  console.log(str.split(' ').map((s) => {return s.charAt(0).toUpperCase()+ s.substr(1) }).join(' '))
}
//capitalizeString('hola que tal') //Hola Que Tal




const stringSwitchCase = (str) => {
  console.log(str.split(" ").map((word, index) => {
    return (index % 2 === 0) ? word.toUpperCase() : word.toLowerCase()
    }).join(' '))
}
//stringSwitchCase('hola que tal') //HOLA que TAL




const countLetters = (str) => {
  console.log(str.trim())
  const mapped = str.replace(/\s/g,'')
  .split('')
  .sort()
  .reduce((acc, cur) => {
    if(acc[cur]) {
      acc[cur] += 1;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {});

  console.log(mapped)
}

countLetters('hola que tal como estas')


const stringCompression = (str) => {
  let compressed = '';
  let count = 1;
  const charArray = str.split('');
  const sorted = charArray.sort().join('');

  for(let i=0; i<sorted.length; i++){
    if(sorted[i] === sorted[i+1]){
      count++;
    } else {
      compressed += sorted[i] + count;
      count = 1;
    }
  }
  return compressed;
}
console.log(stringCompression('aabcccccaaa')) //a2b1c5a3


const forCase = () => {
  for (let i = 0; i < 10; i++) {
    console.log(i);
    setTimeout(function() {
      console.log(`The number is ${i}`)
    }, 1);
  }
}
forCase()




const varLet = () => {
  console.log(x)
  //let x = 5
  var x = 5
  console.log(x)
}
varLet() // con var se imprime undefined porque la variable es hoisted y se asigna despues
// con let se imprime error porque la variable no es hoisted  




const arrayToSquare = () => {
  const input = [ 1, 2, 3, 4, 5 ];

  const maped = input.map((num) => {
    return Math.pow(num, 2)
  })
  console.log(maped)
}
arrayToSquare()




const sumPositive = () => {
  const input = [ 1, -4, 12, 0, -3, 29, -150];

  const maped = input
    .filter(num => num > 0)
    .reduce(
      (prev, curr) => prev + curr , 0
    )
  console.log(maped)
}
sumPositive()





const iniciales = () => {
  const input = 'George Raymond Richard Martin';

  const maped = input.split(' ').map((n) => {
    return n[0]
  }).join('')
  console.log(maped)
}
iniciales() //GRRM




const maxMinSum = () => {
  const input = [
    {
      name: 'John',
      age: 13
    },
    {
      name: 'Mark',
      age: 56,
    },
    {
      name: 'Rachel',
      age: 45,
    },
    {
      name: 'Nate',
      age: 67,
    },
    {
      name: 'Jeniffer',
      age: 65,
    }
  ];

  const ages = input.map((p) => p.age)
  const res = [
    Math.min(... ages),
    Math.max(... ages),
    Math.max(... ages) - Math.min(... ages)
  ]
  console.log(res)
}
maxMinSum()


function dominator(A) {
  const n = A.length;
  if (n === 0) {
      return -1;
  }

  let candidate = -1;
  let count = 0;
  let candidateIndex = -1;

  // First pass: Find a candidate for the dominator
  for (let i = 0; i < n; i++) {
      if (count === 0) {
          candidate = A[i];
          candidateIndex = i;
          count = 1;
      } else if (A[i] === candidate) {
          count++;
      } else {
          count--;
      }
  }

  // Second pass: Verify if the candidate is truly a dominator
  let dominatorCount = 0;
  for (let i = 0; i < n; i++) {
      if (A[i] === candidate) {
          dominatorCount++;
      }
  }

  if (dominatorCount > n / 2) {
      return candidateIndex; // Return the index of the candidate
  } else {
      return -1;
  }
}




function twoSum (nums, target) {
  for(let i=0; i<nums.length-1; i++){
      for(let j=i+1; j<nums.length; j++){
          if(nums[i]+nums[j] === target) return [i,j]
      }
  }
};




function maxProfit (prices) {
  let maxPrice = 0
  for(let i=0; i<prices.length-1; i++){
    for(let j=i+1; j<prices.length; j++){
      let sum = prices[j]-prices[i]
      if(sum > maxPrice){
          maxPrice = sum
      }
    }
  }
  return maxPrice;
};


function maxSubArray (nums) {
  //take 1st value
  let max = nums[0];
  //discard it if its negative
  //starting from scratch on loop
  let curr = Math.max(max, 0);

  for(let i=1; i<nums.length; i++){
      curr += nums[i];
      //choose the previous max or the curr max
      max = Math.max(curr, max);
      //discard negatives
      curr = Math.max(curr, 0);
  }
  return max
};


function hammingWeightBinaryCount (n) {
  const binaryString = n.toString(2)
  let count = 0;
  for (const char of binaryString) {
      if (char === '1') {
          count++;
      }
  }
  return count;
};

function reverseBits(n) {
  const binaryN = BigInt(n).toString(2)
  const reversedBin = binaryN.padStart(32, '0').split('').reverse().join('');
  return parseInt(reversedBin, 2);
};



function findMedianSortedArrays (nums1, nums2) {
  const merged = [...nums1, ...nums2]

  if(merged.length === 0) return -1

  const values = [...merged].sort((a, b) => a - b);
  const half = Math.floor(values.length / 2)

  return(
      values.length % 2
      ? values[half]
      : (values[half - 1] + values[half]) / 2
  )
};



function numIslands(grid) {
  // si no hay grid o no hay filas, no hay islas
  if (!grid || grid.length === 0) {
    return 0;
  }

  // contador de islas
  let islandCount = 0;
  // numero de filas
  const numRows = grid.length;
  // numero de columnas
  const numCols = grid[0].length;

  // funcion para marcar como agua todas las celdas que forman parte de la misma isla
  function markIsland(row, col) {
    // checkear si está fuera de los límites o es agua ('0')
    if (row < 0 || row >= numRows || col < 0 || col >= numCols || grid[row][col] === '0') {
      return;
    }

    // Marcar la celda como visitada o agua
    grid[row][col] = '0';

    // Explorar recursivamente en todas las direcciones cardinales
    markIsland(row + 1, col); // arriba >= numRows salgo
    markIsland(row - 1, col); // abajo < 0 salgo
    markIsland(row, col + 1); // derecha >= numCols salgo
    markIsland(row, col - 1); // izquierda < 0 salgo
  }

  // Itero las matriz
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      // Si encuentro tierra incremento el contador y marco la isla como agua
      if (grid[i][j] === '1') {
        islandCount++;
        markIsland(i, j);
      }
    }
  }

  return islandCount;
}

const grid = [
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0']
];
console.log(numIslands(grid)); // Output: 1



const reverseLinkedList = (head) => {
  let prev = null;
  let current = head;
  let nextNode = null;

  while (current !== null) {
    // 1. Store the next node so we don't lose it
    nextNode = current.next;

    // 2. Reverse the current node's pointer to its previous node
    current.next = prev;

    // 3. Move the 'prev' pointer forward to the current node
    prev = current;

    // 4. Move the 'current' pointer forward to the next node in the original list
    current = nextNode;
  }

  // 'prev' will be the new head of the reversed list when the loop finishes
  return prev;
};

const linkedList = new LinkedList();

linkedList.insertFirst(3);
linkedList.insertFirst(2);
linkedList.insertFirst(1);

console.log(reverseLinkedList(linkedList));

let fruits = ['banana', 'orange', 'apple', 'mango'];
fruits.reverse();
console.log(fruits);


function reverseArray(arr) {
  const newArray = [];
  // Loop from the last element to the first
  for (let i = arr.length - 1; i >= 0; i--) {
    newArray.push(arr[i]);
  }
  return newArray;
}

console.log(reverseArray(['apple', 'banana', 'cherry']));


function reverseString(word) {
  let newStr = '';
  
  for (let i = word.length - 1; i >= 0; i--) {
    newStr = newStr + word[i];
  }
  return newStr;
}
console.log(reverseString('cherry'));




function buildJsonString(nums) {
  let s = '{"numbers":[';

  for (let i = 0; i < nums.length; i++) {
    s += String(nums[i]);
    if (i !== nums.length - 1) s += ',';
  }

  s += ']}';
  return s;
}

// Example:
console.log(buildJsonString([1, 2, 3])); // {"numbers":[1,2,3]}




// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersectLines(x1, y1, x2, y2, x3, y3, x4, y4) {

  // Check if none of the lines are of length 0
	if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
		return false
	}

	denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // Lines are parallel
	if (denominator === 0) {
		return false
	}

	let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
	let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

  // is the intersection along the segments
	if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
		return false
	}

  // Return a object with the x and y coordinates of the intersection
	let x = x1 + ua * (x2 - x1)
	let y = y1 + ua * (y2 - y1)

	return {x, y}
}



function isArmstrongNumber(n) {
  if (n < 0) return false;

  const s = String(n);
  const k = s.length;

  let sum = 0;
  for (let i = 0; i < k; i++) {
    //const digit = s.charCodeAt(i) - 48;
    //const digit = Number(s[i]);
    //const digit = parseInt(s[i]);
    const digit = s[i];
    sum += digit ** k;
  }
  return sum === n;
}


function maxProfit(A) {
  const N = A.length;

  let maxProfit = 0;
  let minPrice = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
      minPrice = Math.min(minPrice, A[i]);
      maxProfit = Math.max(maxProfit, A[i] - minPrice);
  }

  return maxProfit;
}


const i10n = () => {
  const input = 'Every developer likes to mix kubernetes and javascript'

  const mapped = input.split(' ').map((word) => {
    if(word.length >= 4) {
      return word[0] + (word.length - 2) +  word[word.length - 1]
    }
    return word
  }).join(' ')

  console.log(mapped)
}
//i10n() //E3y d7r l3s to mix k8s and j8t




const arrayOccurrences = () => {
  const input = [
    ['a', 'b', 'c'],
    ['c', 'd', 'f'],
    ['d', 'f', 'g'],
  ];

  const mapped = input
  .flat()
  .reduce((accumulator, currentValue) => {
    if(accumulator[currentValue]) {
      accumulator[currentValue] += 1;
    } else {
      accumulator[currentValue] = 1;
    }
    return accumulator;
  }, {});

  console.log(mapped)
}
//arrayOccurrences() //{ a: 1, b: 1, c: 2, d: 2, f: 2, g: 1 }





const countVowels = (str) => {
  let count = 0
  const vowels = ['a','e','i','o','u']
  for (let letter of str) {
    if (vowels.includes(letter.toLowerCase())) {
      count ++
    }
  }
  console.log(count)
}
//countVowels('holanDA') //3





function factorial(n) {
  // Base case: when n is 0 or 1, return 1
  if (n === 0 || n === 1) {
    return 1;
  } 
  // Recursive case: n! = n * (n-1)!
  else {
    return n * factorial(n - 1);
  }
}
// Example usage:
console.log(factorial(5)); // Output: 120





function fibonacciRecursive(n) {
  // Base cases to stop the recursion
  if (n < 2) {
    return n;
  }
  // Recursive calls to sum the two preceding numbers
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}
console.log(fibonacciRecursive(10)); // Output: 55





const createBase = (base) => {
  return (N) => {
    return base + N
  }
}
//var addTen = createBase(10)
//console.log(addTen(1)) //11




const anagram = (str1, str2) => {
  if(str1.length != str2.length) console.log(false)
  if(str1.split('').sort().join('') == str2.split('').sort().join('')) {
    console.log(true)
  } else {
    console.log(false)
  }
}
//anagram('fried','fired') // true;
//anagram('gainly', 'laying') //true;
//anagram('listen', 'bye')  // false;




function removeDuplicate(arr) {
  let result = [...new Set(arr)];
  console.log(result);
}
//removeDuplicate([1,2,3,3,4,4,5,1,2,4,7,8,9]) //[ 1, 2, 3, 4, 5, 7, 8, 9 ]

function containsDuplicate (nums) {
  const newNumSet = new Set(nums)
  if(newNumSet.size < nums.length) return true
  return false
};



const removeItem = (arr, v) => {
  console.log(arr.filter((el) => el !== v))
}
//removeItem([5, 6, 5, 4], 5) // [ 6, 4 ]




const spreadOp = () => {
  const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
  const assembled = { a, b, ...rest };

  console.log(a); // 1
  console.log(b); // 2
  console.log(rest); // { c: 3, d: 4 }
  console.log(assembled); // { a: 1, b: 2, c: 3, d: 4 }
}
//spreadOp()





const destruct = () => {
  const { k1, ...rest } = { k1: 'v1', k2: 'v2', k3: 'v3' };
  console.log(k1); // 'v1'
  console.log(rest); //  { k2: 'v2', k3: 'v3' }
}
//destruct()



const deleteEl1 = () => {
  const o = { field1: 'a', field2: 'b', field3: 'c' };
  delete o['field1'];
  console.log(o); // logs { field2: 'b', field3: 'c' }
  delete o.field2;
  console.log(o); // logs { field3: 'c' }
}
//deleteEl1()





const deleteEl2 = () => {
  const o = { field1: 'a', field2: 'b', field3: 'c' };
  const { field1, ...rest } = o;

  console.log(o); // logs {field1: 'a', field2: 'b', field3: 'c' }
  console.log(rest); // logs { field2: 'b', field3: 'c' }
}
//deleteEl2()




const iClosure = () => {
  var i = 42;
  console.log(i++); // shows 42
  console.log(i); // shows 43
  i = 42;
  console.log(++i); // shows 43
  console.log(i); // shows 43
}




function removeFirstItem(arr, value) {
  const index = arr.indexOf(value); //1st item
  //const index = arr.lastIndexOf(value); //1st from last
  if (index === -1) return arr; // no value to remove
  arr.splice(index, 1); // splice mutates (changes) array
  return arr;
}



const isPresent = (string, target) => {
  return string.split("").reduce((acc, curr) => {
    if(curr === target) acc = true;
      return acc;
  }, false)
}


let users = [
  {firstName : "Susan", lastName: "Steward"},
  {firstName : "Daniel", lastName: "Longbottom"},
  {firstName : "Jacob", lastName: "Black"}
];

let userFullnames = users.map(function(element){
    return `${element.firstName} ${element.lastName}`;
})// ["Susan Steward", "Daniel Longbottom", "Jacob Black"]


const head = (array) => array[0];
const rest = (array) => array.slice(1, array.length)

var newArray = []
const map = (array, fun) => {
	newArray.push(fun(head(array)))
  return map(rest(array), fun)
}

//console.log(map([1,2,3], (n) => n*2))


req = {
  body: {
    text: "rule rsa_headlines"
  }
}

const checkText = (req) => {
  if(req.body){
    console.log(req.body.text.split(" "))
    
    console.log(req.body.text.replace("rule ", ""))
  } else {
    console.log("no body")
  }
}

checkText(req)

const assets = [
  {
      "id": "10249662066",
      "totalPrints": 2092,
      "campaignId": "15843829191",
      "text": "Stressfreie Steuererklärung"
  },
  {
      "id": "11746268342",
      "totalPrints": 182904,
      "campaignId": "15843829191",
      "text": "Steuererklärung mit Taxfix"
  },
  {
      "id": "12180320466",
      "totalPrints": 13221,
      "campaignId": "15843829191",
      "text": "Hol dir deine Steuern zurück"
  },
  {
      "id": "19861740418",
      "totalPrints": 507471,
      "campaignId": "15843829191",
      "text": "Taxfix"
  },
  {
      "id": "20634770870",
      "totalPrints": 5996,
      "campaignId": "15843829191",
      "text": "Jetzt Taxfix testen"
  },
  {
      "id": "20634770882",
      "totalPrints": 13099,
      "campaignId": "15843829191",
      "text": "Jetzt kostenlos testen"
  },
  {
      "id": "20634770888",
      "totalPrints": 8366,
      "campaignId": "15843829191",
      "text": "Einfacher als ELSTER"
  },
  {
      "id": "20634770909",
      "totalPrints": 20600,
      "campaignId": "15843829191",
      "text": "Jetzt Rückerstattung berechnen"
  },
  {
      "id": "20715802584",
      "totalPrints": 267897,
      "campaignId": "15843829191",
      "text": "Taxfix: Online-Steuererklärung"
  },
  {
      "id": "20715803286",
      "totalPrints": 7825,
      "campaignId": "15843829191",
      "text": "Jetzt Steuererstattung sichern"
  },
  {
      "id": "20715803289",
      "totalPrints": 32132,
      "campaignId": "15843829191",
      "text": "Taxfix – deine Steuer-App"
  },
  {
      "id": "20715803292",
      "totalPrints": 54636,
      "campaignId": "15843829191",
      "text": "Taxfix: Online Steuern machen"
  },
  {
      "id": "24137805841",
      "totalPrints": 39757,
      "campaignId": "15843829191",
      "text": "Mit Taxfix zur Rückerstattung"
  },
  {
      "id": "40294237498",
      "totalPrints": 86685,
      "campaignId": "15843829191",
      "text": "Ohne Vorwissen auf der Überholspur zur maximalen Erstattung – online mit Taxfix!"
  },
  {
      "id": "43649916021",
      "totalPrints": 412650,
      "campaignId": "15843829191",
      "text": "Maximale Steuerersparnis für dich - Im Durchschnitt erhalten Taxfix-Nutzer 1.072€ zurück."
  },
  {
      "id": "57048018408",
      "totalPrints": 3405,
      "campaignId": "15843829191",
      "text": "Hol dir deine Steuern zurück. Stressfrei, online und super einfach – mit Taxfix."
  },
  {
      "id": "60637243544",
      "totalPrints": 2057,
      "campaignId": "15843829191",
      "text": "Steuern einreichen lohnt sich"
  },
  {
      "id": "60637243547",
      "totalPrints": 1721,
      "campaignId": "15843829191",
      "text": "Im Schnitt 1.072 € Erstattung"
  },
  {
      "id": "60637243550",
      "totalPrints": 1690,
      "campaignId": "15843829191",
      "text": "Deine Steuererklärung mit Taxfix: Lohnsteuerbescheid einscannen und fertig."
  },
  {
      "id": "40294237495",
      "totalPrints": 12800,
      "campaignId": "15843829191",
      "text": "{KeyWord:Taxfix – Steuerprogramm 2022}"
  }
] 
console.log(assets.reduce((sum, a) => sum + parseInt(a.totalPrints), 0))
