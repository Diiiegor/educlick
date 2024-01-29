import ScraperSena from "./Scrapers/ScraperSena";
import IScraper from "./Interfaces/IScraper";
import Course from "./Models/Course";

async function runScrapers(scrapers:IScraper[]) {
    let data:Course[]=[]
    for (const scraper of scrapers) {
        const courses = await scraper.fetchCourses()
        data = data.concat(courses)
    }
    console.log(data)
}

const scraperSena = new ScraperSena()
runScrapers([scraperSena])