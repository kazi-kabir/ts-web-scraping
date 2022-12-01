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

export const splitStringByCapitalisation = (name: string)  => {

    // remove substring
    let conjunctionRemovedName = removeConjunctions(name);
    console.log(conjunctionRemovedName)

    let cleanedName = [];
    cleanedName = conjunctionRemovedName.match(/[A-Z][a-z]+/g);
    console.log(cleanedName);
}

const removeConjunctions = (name: string) => {
    // TODO, remove commas


    return name.replace(/and/g, '')
}

splitStringByCapitalisation('SamBankmanFriedandLary');
