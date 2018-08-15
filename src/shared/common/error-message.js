import erroMessages from './error-messages.json'

export const errorMessageService = {
    getErrorByName: (messageName, language = "pt-br") => {
        return erroMessages[language][messageName]
    }
}