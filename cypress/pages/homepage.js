import { homeLoc } from "../locator/home/home-loc"
import homeData from "../fixtures/home-data.json"

const data = homeData.homeData

class HomePage {
    visit() {
        cy.visit(homeLoc.baseurl)
    }

    validateTitle() {
        cy.get(homeLoc.title)
            .should('be.visible')
            .and('have.text', data.title)
    }

    searchInput() {
        cy.get(homeLoc.searchInput)
            .click()
            .type(data.inputsearch)
    }

    clickCariResepButton() {
        cy.get(homeLoc.cariResepButton)
            .click()
    }

    validateHasilSearch() {
        cy.get(homeLoc.hasilSearch)
            .should('be.visible')
            .and(
                'contain.text',
                `${data.hasilsearch}"${data.inputsearch}"`
            )
    }
    validasipagesearch() {
        cy.get(homeLoc.pagesearch)
            .should('be.visible')
            .and('contain.text', data.searchheader)
    }
}

export default new HomePage()