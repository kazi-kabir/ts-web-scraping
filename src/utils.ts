import { CompanyData } from "./types";
import wordlist from 'wordlist-english';

let words = wordlist['english'];
console.log(words.indexOf('graphic'));


export const cleanData = (topCompanies: string[]): string[]  => {
    //topCompanies.length = 20;

    const unacceptableStrings = 'CBInsights';

    // BADLY needs refactoring
    // create a function that filters out the string based on the array
    let filterOutEmpty = topCompanies
    .filter(company => company.length > 1);

    let filterOutCBInsights = filterOutEmpty
    .filter(company => !company.includes('CBInsights'));

    let filterOutTechCrunch = filterOutCBInsights
    .filter(company => !company.includes('TechCrunch'));

    let filterOutIncMagazine = filterOutTechCrunch
    .filter(company => !company.includes('Incmagazine'));

    let filterOutVentureBeat = filterOutIncMagazine
    .filter(company => !company.includes('VentureBeat'));

    return filterOutVentureBeat;
};

export const createArrayOfCompanyDataObjects = (companyDataArray: string[]): CompanyData[] => {
    companyDataArray.length = 100;

    let convertedData: CompanyData[] = [];
    
    companyDataArray.forEach(company => {
        let stringArray = company.split('\n').filter(e => !e.includes('\n'));

        let newObj: CompanyData = {
            company: stringArray[0],
            valuation: Number(stringArray[1]),
            industry: stringArray[3],
            country: stringArray[4],
            founders: splitStringByCapitalisation(stringArray[5]),
        }

        convertedData.push(newObj);
    });
    return convertedData;
}

export const splitStringByCapitalisation = (name: string)  => {

    // remove substring
    let conjunctionRemovedName = removeConjunctions(name);

    let cleanedName = [];
    return cleanedName = conjunctionRemovedName.match(/[A-Z][a-z]+/g);
}

const removeConjunctions = (name: string) => {
    // TODO, remove commas
    return name.replace(/[, ]+/g, " ") && name.replace(/and/g, '')
}

export const splitStringByDictionaryWord = (industry: string) => {
    // pass string with valid substring
    // i.e Financialtechnology
    // loop through the word and find out if the word exists
    let accumulateStringValues = '';
    let industryNameInArray = [];
    for(let i = 0; i < industry.length; i++) {
        accumulateStringValues+= industry[i].toLowerCase();
        let fembar = words.indexOf(accumulateStringValues);
        console.log(words.indexOf(accumulateStringValues))
        console.log(accumulateStringValues);
        if(fembar !== -1) {
            industryNameInArray.push(accumulateStringValues);
        }

        if(industryNameInArray.length) {
            let finalIndex = industryNameInArray.length - 1; 
            let finalWord = industry.replace(industryNameInArray[finalIndex], " ")
            console.log(finalWord)
        }
    }

    console.log(industryNameInArray)

}


splitStringByDictionaryWord('Graphicdesign');

splitStringByCapitalisation('SamBankmanFriedandLary');
