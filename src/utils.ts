export const cleanData = (topCompanies: string[]): String[]  => {
    topCompanies.length = 20;

    let unacceptableStrings: string[] = ['CBInsights', 'VentureBeat', 'TechCrunch', 'Incmagazine'];

    // BADLY needs refactoring
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

    console.log(filterOutVentureBeat);
    return [];
};