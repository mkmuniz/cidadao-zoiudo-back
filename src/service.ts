import { chromium } from 'playwright';
type Convenio = {
    convenio: string | null;
    modalidade: string | null;
    situacao: string | null;
    proponente: string | null;
    orgao: string | null;
    categorias: string | null;
    objetoConvenio: string | null;
    dadosBancarios: {
        banco: string | null,
        agencia: string | null,
    },
    dataProposta: string | null;
    dataLimite: string | null;
};

const convenios: Convenio[] = [];

export class Services {
    static async fetchData(pages: any, city: any, state: any) {
        try {
            const browser = await chromium.launch({
                headless: false,

            }); let links: any = [];
            const context = await browser.newContext({ ignoreHTTPSErrors: true });
            const page = await context.newPage();

            await page.goto("https://idp.plataformamaisbrasil.gov.br/idp/");
            await page.click("#login_form > div:nth-child(7) > a");
            await page.click("text=Convênios");
            await page.click("text=Consultar Convênios/Pré-Convênios");
            await page.selectOption("select[name=\"ufAcessoLivre\"]", "SP");
            await page.waitForLoadState('domcontentloaded');
            await page.selectOption("select[id=\"consultarMunicipioAcessoLivre\"]", "6251");
            await page.waitForLoadState();
            await page.click("input[name=\"consultarPropostaPreenchaOsDadosDaConsultaConsultarForm\"]");
            await page.waitForLoadState();
            for (let i = 1; i <= 5; i++) {
                var link = await page.$$("tbody > tr > td > div[class=\"numeroConvenio\"] > a");
                for (const href of link) {
                    links.push({
                        convenio: await href.textContent(),
                        href: await href.getAttribute('href')
                    }
                    );
                }
                await page.click(`text="${i}"`, { timeout: 10000 }).catch(() => null);
            };

            for (const link of links) {
                await page.goto('https://discricionarias.transferegov.sistema.gov.br' + link.href);

                await page.waitForLoadState();

                let modalidadeText: String | any = await page.locator('table tbody tr[class="modalidade"] td[colspan="4"] table tbody td[width="40%"]').textContent()
                let situacaoText: String | any = await page.locator('table tbody tr[class="status"] td[colspan="4"] td[class="field"] div').textContent();
                let proponenteText: String | any = await page.locator('table tbody tr[class="proponente"] td[class="field"] div').textContent();
                let orgaoText: String | any = await page.locator('table tbody tr[class="orgaoConcedente"] td[class="field"]').textContent();
                let categoriasText: String | any = await page.locator('table tbody tr[class="categorias"] td[class="field"]').textContent();
                let objetoConvenioText: String | any = await page.locator('table tbody tr[class="objetoConvenio"] td[class="field"]').textContent();
                let bancoText: String | any = await page.locator('table tbody tr[class="bancoEscolhido"] td[colspan="4"]').textContent();
                let agenciaText: String | any = await page.locator('table tbody tr[class="agencia"]').textContent();
                let dataPropostaText: String | any = await page.locator('table tbody tr[class="dataProposta"] td[colspan="4"]').textContent();
                let dataLimiteText: String | any = await page.locator('table tbody tr[class="dataPrestacao"] td[colspan="4"]').textContent();
                let data: Convenio = {
                    convenio: link.convenio,
                    modalidade: modalidadeText.trim(),
                    situacao: situacaoText.trim(),
                    proponente: proponenteText.trim(),
                    orgao: orgaoText.trim(),
                    categorias: categoriasText.trim(),
                    objetoConvenio: objetoConvenioText.trim(),
                    dadosBancarios: {
                        banco: bancoText.trim(),
                        agencia: agenciaText.split(" ").map((text: any) => text.trim()).filter((element: any) => element != '').join(" - "),
                    },
                    dataProposta: dataPropostaText.trim(),
                    dataLimite: dataLimiteText.trim()
                };

                convenios.push(data);
            };

            await browser.close();

            return convenios;
        } catch (err) {
            return err;
        };
    };
};