import homepage from '../../pages/homepage'
import HomePage from '../../pages/homepage'
import 'cypress-mochawesome-reporter/register';

describe('Validasi Home Page', () => {
    it('Search Resep', () => {
        HomePage.visit()
        homepage.validateTitle()
        homepage.searchInput()
        homepage.clickCariResepButton()
        homepage.validasipagesearch()
        homepage.validateHasilSearch()
    })

})
