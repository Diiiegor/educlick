import puppeteer from "puppeteer";
import IScraper from "../Interfaces/IScraper";
import Course from "../Models/Course";

export default class ScraperSena implements IScraper {
    baseUrl = 'https://oferta.senasofiaplus.edu.co/sofia-oferta/buscar-oferta-educativa.html';


    async fetchCourses():Promise<Course[]>{
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(this.baseUrl)
        await page.waitForSelector('.resultados');
        return await page.evaluate(() => {
            const results = document.querySelectorAll('.resultados table tr>td>div>li')
            return Array.from(results).map(node => {
                return {
                    name: node.querySelector('h3')?.innerText ?? '',
                    modality:node.classList.contains('virtual') ? 'virtual':'presencial',
                    description:node.querySelector('.cuerpo_resultado')?.innerHTML ?? '',
                    title:node.querySelector('.left > p:nth-child(2) > strong')?.innerHTML ?? '',
                    duration:node.querySelector('.duracion')?.innerHTML??''
                }
            })
        })
    }
}