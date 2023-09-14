## About

Back-end created for `CidadaoZoiudo` project, where our goal is to inspect companies involved in corruption.

## How to run

- Clone the repository
- Install all the dependencies `npm i`
- Run the server `npm start`

## Routes

### GET /

#### Response:

```json
{"status":"System is working, good job!"}
```

### POST /fetch-data/:pages

`pages` param means how many pages do you wanna that scraper paginate in results table. For example `/fetch-data/5` its saying that I want 5 result pages and each page has 20 itens.

```json
[
  {
        "convenio": "789332/2013",
        "modalidade": "Contrato de Repasse",
        "situacao": "Prestação de Contas Aprovada",
        "proponente": "CNPJ 46.352.746/0001-65 - MUNICIPIO DE BRAGANCA PAULISTA",
        "orgao": "56000 - MINISTERIO DAS CIDADES",
        "categorias": "",
        "objetoConvenio": "Obras de Infraestrutura Urbana – pavimentação com construção de guias, sarjetas, calçadas e drenagem pluvial em vias do Bairro Parque dos Estados no município de Bragança Paulista.",
        "dadosBancarios": {
            "banco": "CAIXA ECONOMICA FEDERAL",
            "agencia": "Agência - 0293-3 - Conta - 0066470878"
        },
        "dataProposta": "10/10/2013",
        "dataLimite": "22/02/2017"
  },
]
```
