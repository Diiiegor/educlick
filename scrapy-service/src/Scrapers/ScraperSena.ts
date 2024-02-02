import puppeteer, {Browser, Page} from "puppeteer";
import IScraper from "../Interfaces/IScraper";
import Course from "../Models/Course";

export default class ScraperSena implements IScraper {
    baseUrl = 'https://oferta.senasofiaplus.edu.co/sofia-oferta/buscar-oferta-educativa.html';
    private isLastPage = false
    private browser?: Browser
    private page?: Page


    async fetchCourses(): Promise<Course[]> {
        this.browser = await puppeteer.launch()
        this.page    = await this.browser.newPage()
        let results: Course[] = []

        await this.page.goto(this.baseUrl)
        await this.page.waitForSelector('.resultados');

        do {
            try {
                const pageData = await this.page.evaluate(() => {
                    const results = document.querySelectorAll('.resultados table tr>td>div>li')
                    return Array.from(results).map(node => {
                        return {
                            name: node.querySelector('h3')?.innerText ?? '',
                            modality: node.classList.contains('virtual') ? 'virtual' : 'presencial',
                            description: node.querySelector('.cuerpo_resultado')?.innerHTML ?? '',
                            title: node.querySelector('.left > p:nth-child(2) > strong')?.innerHTML ?? '',
                            duration: node.querySelector('.duracion')?.innerHTML ?? ''
                        }
                    })
                })

                if (pageData.length) {
                    results = [...results, ...pageData]
                    await this.goToNextPage()
                } else {
                    this.isLastPage = true
                }
            } catch (e) {
                this.isLastPage = true
            }

        } while (!this.isLastPage)
        return results
    }

    async goToNextPage(): Promise<void> {
        await this.page?.click('.busqueda_siguiente')
    }

}