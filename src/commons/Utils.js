export var getInitiative = (text) => {
    let matches = text.match(/\b(\w)/g); // ['J','S','O','N']
    let acronym = matches.join(''); // JSON
    return acronym;
};