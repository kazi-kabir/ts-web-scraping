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

    let cleanedName = [];
    for(let i = 0; i < name.length; i++) {
        cleanedName.push(name[i]);
    }

    let specificCharacters: string[] = [];
    let indexVal: number[] = [];
    for (let character in cleanedName) {
        if(cleanedName[character] === cleanedName[character].toUpperCase()) {
            specificCharacters.push(cleanedName[character]) 
            indexVal.push(Number(character));
        }
    }

    let len: number = 0; 
    while(len < cleanedName.length) {
        if (cleanedName.indexOf(len) === indexVal[len]) {
            console.log('FOOO')
            return true;
        }
        len++;
    }

    // compare the two arrays
    // check if index of cur === index of indexval


    // look for the pattern here
    // for each time a space is added
    // the rest of the num in indexVal is ++
    // keep adding ++ till end of loop

    cleanedName.splice(3, 0, " ");
    cleanedName.splice(11, 0, " ");
    cleanedName.splice(20, 0, " ");

    console.log(indexVal);
    console.log(cleanedName);
}

splitStringByCapitalisation('SamBankmanFriedandLary');
