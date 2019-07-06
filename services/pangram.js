
// This service will return whether or not the string provided is a Pangram (true or false).
// A pangram is defined as sentence or verse that contains all the letters of the alphabet.
const isPangram = (phrase, callback) => {

    // Validation: check for existence.
    if (!phrase) {
        return callback(false, 'Error: string is empty. Please provide a valid string and try again.')
    }

    // Ignore case.
    phrase = phrase.toLowerCase();

    // Use regex to capture alpha characters from string. It's all we care about.
    let regex = /([A-Za-z])/g

    phrase = phrase.match(regex);

    // If string array is empty, return false.
    if (!phrase) {
        return callback(false);
    }

    // Convert our capture Array to a Set. This will ensure we have no duplicate characters in our array (Thanks Sets!).
    // In the end, if the set's size is 26 (# of letters in the alphabet) then we know this string is a pangram.
    phrase = new Set(phrase);

    if (phrase.size !== 26) {
        return callback(false);
    }

    return callback(true);
};

module.exports.isPangram = isPangram;