export interface IMessages {
    search?: string;
    buttonNext?: string;
    buttonEnd?: string;
    buttonPrevious?: string;
    upload?: string;
    invalidFileSize?: string;
    invalidDate?: string;
    invalidText?: string;
    invalidPattern?: string;
    noFile?: string;
}

export const defaultMessages: IMessages = {
    search: 'Search...',
    buttonNext: 'Next',
    buttonEnd: 'End',
    buttonPrevious: 'Previous',
    upload: 'Choose file',
    invalidFileSize: 'File limit exceed',
    invalidDate: 'Date invalid',
    invalidText: 'Invalid answer',
    invalidPattern: 'Invalid format',
    noFile: 'No uploaded file'
};