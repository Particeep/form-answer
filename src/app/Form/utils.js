export function mapSingleAnswer(answers) {
    return answers && answers[0];
}

export function parseSingleAnswer(answer) {
    if (answer || answer === '') return [answer];
    return undefined;
}
