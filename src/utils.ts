import { CompanyData } from "./types";
import wordlist from 'wordlist-english';

let words = wordlist['english'];
console.log(words.indexOf('security'));


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
    companyDataArray.length = 10;

    let convertedData: CompanyData[] = [];
    
    companyDataArray.forEach(company => {
        let stringArray = company.split('\n').filter(e => !e.includes('\n'));

        let newObj: CompanyData = {
            company: stringArray[0],
            valuation: Number(stringArray[1]),
            industry: splitStringByDictionaryWord(stringArray[3]),
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

    let cleanedName = conjunctionRemovedName.match(/[A-Z][a-z]+/g);

    return cleanedName.join(' ');
}

const removeConjunctions = (name: string) => {
    // TODO, remove commas
    return name.replace(/[, ]+/g, " ") && name.replace(/and/g, '')
}

// TODO recursively select and remove the THIRD word
export const splitStringByDictionaryWord = (industry: string) => {
    // for now just adding a bunch of returns for the damn values that give me pain
    console.log(industry);
    
    if(industry === 'cybersecurity') return;

    if(industry === 'cryptocurrency') return;

    let accumulateStringValues = '';
    let industryNameInArray = [];
    for(let i = 0; i < industry.length; i++) {
        accumulateStringValues+= industry[i].toLowerCase();
        let fembar = words.indexOf(accumulateStringValues);
        // console.log(words.indexOf(accumulateStringValues))
        // console.log(accumulateStringValues);
        if(fembar !== -1) {
            industryNameInArray.push(accumulateStringValues);
        }
    }
    // console.log(industryNameInArray);

    let finalIndexVal = industryNameInArray.length - 1
    let lowercaseIndustry = industry.toLowerCase();
    let femfoo = lowercaseIndustry.replace(industryNameInArray[finalIndexVal], "");
    // console.log(femfoo);

    if(femfoo.length !== 0) {
        industryNameInArray.push(femfoo);
        console.log(femfoo)
        return industryNameInArray.slice(-2).toString().replace(/[, ]+/g, " ").replace("-", "");
    }

    // find a way to skip single iterations 

    // console.log(industryNameInArray)
    return industryNameInArray.slice(-1).toString().replace(/[, ]+/g, " ").replace("-", "");
}

let res =splitStringByDictionaryWord('cryptocurrency');
console.log(res);
splitStringByCapitalisation('SamBankmanFriedandLary');
