export type UserAccount = {
    id: string,
    tags: {text: string}[],
    type: 'LDAP' | 'Локальная',
    login: string,
    password: string | null
}