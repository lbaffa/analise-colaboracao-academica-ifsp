const edgeList = [
    {
        "source": "Alessandro Emilio Teruzzi",
        "target": "Everaldo Paulo da Silva",
        "options": {
            "type": "line",
            "weight": 0.4,
            "label": "cálculo, ensino, matemática",
            "size": 2
        }
    },
    {
        "source": "Alessandro Emilio Teruzzi",
        "target": "Renato Marcon Pugliese",
        "options": {
            "type": "line",
            "weight": 0.23488808780588138,
            "label": "ensino, história, médio",
            "size": 2
        }
    },
    {
        "source": "Ana Marcia Lima Costa",
        "target": "Renato Marcon Pugliese",
        "options": {
            "type": "line",
            "weight": 0.23973165074269204,
            "label": "educação, ensino, médio, públicas, reflexões",
            "size": 2
        }
    },
    {
        "source": "Ana Paula Rodrigues Magalhaes de Barros",
        "target": "Idalise Bernardo Bage",
        "options": {
            "type": "line",
            "weight": 0.2574338543181771,
            "label": "avaliação, contexto, digitais, docentes, ensino, experiência, formação, matemática, olhar, professores, programa, tecnologias",
            "size": 2
        }
    },
    {
        "source": "Claudia Almerinda de Souza Oliveira",
        "target": "Julio Samuel Savio Bernardo",
        "options": {
            "type": "line",
            "weight": 0.2321035412742638,
            "label": "câmpus, ifsp, paulo, pirituba",
            "size": 2
        }
    },
    {
        "source": "Emanoel Fabiano Menezes Pereira",
        "target": "Idalise Bernardo Bage",
        "options": {
            "type": "line",
            "weight": 0.2277281824706413,
            "label": "ensino, estudo, formação, função, funções, ingressantes, matemática, professores, uso, área",
            "size": 2
        }
    },
    {
        "source": "Everaldo Paulo da Silva",
        "target": "Fernando da Silva Pardo",
        "options": {
            "type": "line",
            "weight": 0.32444284226152514,
            "label": "ensino",
            "size": 2
        }
    },
    {
        "source": "Everaldo Paulo da Silva",
        "target": "Moacir Silva de Castro",
        "options": {
            "type": "line",
            "weight": 0.23008949665421113,
            "label": "ensino",
            "size": 2
        }
    },
    {
        "source": "Everaldo Paulo da Silva",
        "target": "Renato Marcon Pugliese",
        "options": {
            "type": "line",
            "weight": 0.23488808780588138,
            "label": "ensino",
            "size": 2
        }
    },
    {
        "source": "Fernando da Silva Pardo",
        "target": "Irando Alves Martins Neto",
        "options": {
            "type": "line",
            "weight": 0.2752988806446741,
            "label": "construção, digitais, ensino, implicações, inglês, literatura, língua, perspectivas, professor, práticas, sociais",
            "size": 2
        }
    },
    {
        "source": "Fernando da Silva Pardo",
        "target": "Renato Cristiano Montanher",
        "options": {
            "type": "line",
            "weight": 0.26943511520719615,
            "label": "conhecimento, construção, ensino, inglês, literatura, língua, línguas",
            "size": 2
        }
    },
    {
        "source": "Fernando da Silva Pardo",
        "target": "Renato Marcon Pugliese",
        "options": {
            "type": "line",
            "weight": 0.2286232764633445,
            "label": "ensino, implicações, professor, reflexões",
            "size": 2
        }
    },
    {
        "source": "Flavia Roberta Torezin",
        "target": "Idalise Bernardo Bage",
        "options": {
            "type": "line",
            "weight": 0.2991830368027063,
            "label": "ensino, formação, professores",
            "size": 2
        }
    },
    {
        "source": "Idalise Bernardo Bage",
        "target": "Moacir Silva de Castro",
        "options": {
            "type": "line",
            "weight": 0.2707455769182841,
            "label": "ensino, formação, paulo, proposta",
            "size": 2
        }
    },
    {
        "source": "Igor Polezi Munhoz",
        "target": "Wilian Ramalho Feitosa",
        "options": {
            "type": "line",
            "weight": 0.2713416780982529,
            "label": "análise, assessing, case, caso, comercial, company, digital, estudo, gestão, green, impactos, implantação, influence, inovação, network, operacionalização, organizacional, paulo, policy, qualidade, relação, study, technology, uso",
            "size": 2
        }
    },
    {
        "source": "Jair Garcia dos Santos",
        "target": "Jeferson Antunes",
        "options": {
            "type": "line",
            "weight": 0.28706637685092545,
            "label": "análise, desenvolvimento, educação, ensino, estudantes, pesquisa, superior, sustentável",
            "size": 2
        }
    },
    {
        "source": "Julio Samuel Savio Bernardo",
        "target": "Maria Cristina Stello Leite",
        "options": {
            "type": "line",
            "weight": 0.2325061496276285,
            "label": "cidade, paulo",
            "size": 2
        }
    },
    {
        "source": "Julio Samuel Savio Bernardo",
        "target": "William Rosseti",
        "options": {
            "type": "line",
            "weight": 0.26233381679809,
            "label": "análise, cidade, cidades, ifsp, paulo, pirituba, região",
            "size": 2
        }
    },
    {
        "source": "Luciana Cavalcanti Maia Santos",
        "target": "Maria Cristina Stello Leite",
        "options": {
            "type": "line",
            "weight": 0.27836134106702487,
            "label": "cidade, ensino, imagens, paulo, urbanização",
            "size": 2
        }
    },
    {
        "source": "Luciana Cavalcanti Maia Santos",
        "target": "William Rosseti",
        "options": {
            "type": "line",
            "weight": 0.25681665558096556,
            "label": "análise, brasil, cidade, cidades, estudo, ifsp, paulo, pirituba, região, urbana",
            "size": 2
        }
    },
    {
        "source": "Luciano Henrique Trindade",
        "target": "William Rosseti",
        "options": {
            "type": "line",
            "weight": 0.24542382289284626,
            "label": "análise, brasil, cidade, cidades, conhecimento, consumo, estudo, formação, gestão, importância, inteligentes, operações, pirituba, projetos, relação, resiliência, urbana",
            "size": 2
        }
    },
    {
        "source": "Moacir Silva de Castro",
        "target": "Renato Marcon Pugliese",
        "options": {
            "type": "line",
            "weight": 0.38282074674438815,
            "label": "básica, docente, educação, ensino, escolar, federal, física, instituto, paulo",
            "size": 2
        }
    },
    {
        "source": "Renato Cristiano Montanher",
        "target": "Teresa Helena Buscato Martins",
        "options": {
            "type": "line",
            "weight": 0.23671603823699966,
            "label": "conhecimento, construção, ensino, experiência, inglês, língua, relato, uso",
            "size": 2
        }
    },
    {
        "source": "Renato Marcon Pugliese",
        "target": "Ricardo Normanha Ribeiro de Almeida",
        "options": {
            "type": "line",
            "weight": 0.26445426534816147,
            "label": "brasil, ensino, políticas, trabalho",
            "size": 2
        }
    },
    {
        "source": "Rogerio Deitali Bruno",
        "target": "Teresa Helena Buscato Martins",
        "options": {
            "type": "line",
            "weight": 0.2631174057921088,
            "label": "campus, construção, curso, ifsp, processo",
            "size": 2
        }
    }
];
export { edgeList };