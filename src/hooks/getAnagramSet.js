import anagram5 from '../data/anagram_sets/5.json'
import anagram6 from '../data/anagram_sets/6.json'
import anagram7 from '../data/anagram_sets/7.json'

const xorshift64 = (a) => {
    let x = a
    x ^= x << 13
    x ^= x >> 17
    x ^= x << 5
    return x
}

export const getAnagramSet = (length, timestamp=-1) => {
    // Set the days since Unix epoch to use for randomization.
    // Use either current time, or a given timestamp.
    let unixdate = timestamp
    if (unixdate == -1) unixdate = new Date()
    unixdate = 536870911 + Math.floor(unixdate/(8.64e7))

    // const anagramFile = require('json!../anagram_sets/'+length+'.json')
    let anagramFile = {"total":0}
    if(length==5) anagramFile = anagram5
    if(length==6) anagramFile = anagram6
    if(length==7) anagramFile = anagram7

    let random_number = unixdate;
    for(let i=0;i<10;i=i+1) random_number = xorshift64(random_number)

    let random_number_prev = unixdate-1;
    for(let i=0;i<10;i=i+1) random_number_prev = xorshift64(random_number_prev)

    let random_number_prev_alt = random_number_prev;
    for(let i=0;i<10;i=i+1) random_number_prev_alt = xorshift64(random_number_prev_alt)


    if(Math.abs(random_number%anagramFile["total"])==Math.abs(random_number_prev%anagramFile["total"]) ||
       Math.abs(random_number%anagramFile["total"])==Math.abs(random_number_prev_alt%anagramFile["total"])
     ){
        const offset = random_number%anagramFile["total"]
        for(let i=0;i<10;i=i+1) random_number = xorshift64(random_number)
    }

    let index = Math.abs(random_number % anagramFile["total"] )
    let result = anagramFile["anagrams"][index]
    return result
}