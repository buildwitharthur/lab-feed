import { prisma } from '../src/lib/prisma.js'

const usersData = [
    { name: 'Arthur Reis', username: 'arthur', avatarUrl: null },
    { name: 'Marina Costa', username: 'marina', avatarUrl: null },
    { name: 'Lucas Martins', username: 'lucas', avatarUrl: null },
    { name: 'Ana Lima', username: 'analima', avatarUrl: null },
    { name: 'Rafael Souza', username: 'rafael', avatarUrl: null },
    { name: 'Gabriel Rocha', username: 'gabriel', avatarUrl: null },
    { name: 'Julia Mendes', username: 'julia', avatarUrl: null },
    { name: 'Pedro Henrique', username: 'pedro', avatarUrl: null },
    { name: 'Beatriz Alves', username: 'bia', avatarUrl: null },
    { name: 'Bruno Dias', username: 'bruno', avatarUrl: null },
    { name: 'Camila Ferreira', username: 'camila', avatarUrl: null },
    { name: 'Diego Santos', username: 'diego', avatarUrl: null },
    { name: 'Fernanda Oliveira', username: 'fernanda', avatarUrl: null },
    { name: 'Gustavo Lima', username: 'gustavo', avatarUrl: null },
    { name: 'Helena Martins', username: 'helena', avatarUrl: null },
    { name: 'Igor Costa', username: 'igor', avatarUrl: null },
    { name: 'Larissa Rocha', username: 'larissa', avatarUrl: null },
    { name: 'Mateus Alves', username: 'mateus', avatarUrl: null },
    { name: 'Natalia Souza', username: 'natalia', avatarUrl: null },
    { name: 'Victor Mendes', username: 'victor', avatarUrl: null },
]

const contentTemplates = [
    'Aprendendo cursor-based pagination hoje. Quando o cursor representa a posição atual no conjunto, tudo começa a fazer muito mais sentido.',
    'Finalmente removi aquele useEffect que estava controlando metade da aplicação.',
    'Fastify e PostgreSQL continuam sendo uma combinação simples para construir APIs pequenas.',
    'A melhor parte de projetos pequenos é estudar um conceito sem transformar tudo em arquitetura de empresa gigante.',
    'Hoje foi dia de brincar com IntersectionObserver. A API nem precisa saber que existe scroll infinito.',
    'TanStack Query faz muito mais sentido quando você entende primeiro o problema de cache que ele está resolvendo.',
    'Redis é simples até você perceber quantos problemas diferentes consegue resolver com ele.',
    'Idempotência ficou muito mais clara depois que implementei na prática em vez de apenas ler a definição.',
    'Uma boa API pequena não precisa de vinte camadas de abstração.',
    'Separar a SPA da API deixa explícito onde termina a responsabilidade do cliente e começa a do servidor.',
    'TypeScript ajuda bastante quando os limites entre os módulos ficam claros.',
    'Express continua sendo uma ótima forma de começar uma API e aprender HTTP sem distrações.',
    'Uma query PostgreSQL bem explicada vale mais do que uma otimização prematura cheia de camadas.',
    'Workers ficam mais fáceis de raciocinar quando cada tarefa tem uma responsabilidade pequena.',
    'Webhooks confiáveis precisam considerar retries, idempotência e observabilidade desde o começo.',
    'Cache bom não é apenas guardar dados: é saber quando eles deixam de ser confiáveis.',
    'Docker facilita reproduzir o ambiente local quando a configuração está documentada.',
    'Testes de integração ajudam a descobrir problemas que os tipos não conseguem enxergar.',
    'Uma fila bem desenhada desacopla o pedido do usuário do trabalho que pode esperar.',
    'Performance começa com uma pergunta simples: onde está o gargalo medido?',
    'React fica mais previsível quando o estado representa apenas o que realmente muda na tela.',
    'APIs pequenas também merecem contratos claros e respostas consistentes.',
    'O feed ficou mais fluido depois que parei de buscar páginas inteiras sem necessidade.',
    'Uma arquitetura simples é aquela que deixa a próxima mudança fácil de localizar.',
    'Hoje revisei os limites entre banco, API e interface para reduzir acoplamento.',
]

const tagSets = [
    ['react', 'typescript'],
    ['nodejs', 'express'],
    ['postgresql', 'database'],
    ['redis', 'backend'],
    ['tanstack', 'react'],
    ['backend', 'api'],
    ['docker', 'devops'],
    ['webhooks', 'backend'],
    ['typescript'],
    ['buildinpublic'],
]

const codeSnippets = [
    'fetchNextPage();',
    'const observer = new IntersectionObserver(callback);',
    'const posts = data.pages.flatMap((page) => page.posts);',
    'app.get("/posts", handler);',
    'await prisma.post.findMany();',
]

async function main() {
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()

    await prisma.user.createMany({
        data: usersData,
    })

    const users = await prisma.user.findMany({
        orderBy: {
            id: 'asc',
        },
    })

    const baseDate = new Date('2026-09-28T12:00:00.000Z')

    const posts = Array.from({ length: 500 }, (_, index) => {
        const author = users[index % users.length]
        const hasCode = index % 8 === 0
        const createdAt = new Date(
            baseDate.getTime() - (499 - index) * 1000 * 60 * 3,
        )

        return {
            authorId: author.id,
            content: `${contentTemplates[index % contentTemplates.length]} Post ${index + 1}.`,
            code: hasCode ? codeSnippets[index % codeSnippets.length] : null,
            tags: tagSets[index % tagSets.length],
            commentsCount: index % 41,
            repostsCount: index % 26,
            likesCount: (index * 7) % 251,
            createdAt,
        }
    })

    await prisma.post.createMany({
        data: posts,
    })

    console.log(`Seeded ${users.length} users and ${posts.length} posts.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)

        await prisma.$disconnect()

        process.exit(1)
    })
