import { CompanyData } from "./types";

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
            industry: stringArray[3],
            country: stringArray[4],
            founders: stringArray[5],
        }

        convertedData.push(newObj);
    });
    return convertedData;
}

export const splitStringByCapitalisation = (name: String)  => {

    // strings come as one single text
    // skip over the first capitalised letter
    // search for the next capitalised letter
    // insert a space before it
    // search for comma 
    // and insert a space AFTER the comma
    // search for and
    // insert a space before and after

    let nameArray: string[] = [];

    for(let i = 0; i < name.length; i++) {
        nameArray.push(name[i]);
    }

    for(let letter in name) {
        if(nameArray.indexOf(letter) === 0) return;

        if(nameArray[letter] === nameArray[letter].toUpperCase()) {
            
        }
    }

    console.log(name);

}

let res = splitStringByCapitalisation('SamBankmanFriedandLary');
console.log(res);
