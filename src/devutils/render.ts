let Twig = require('twig')

export function render(template: string, data: any): string {
    let temp = Twig.twig({
        data: template
    });

    return temp.render(data)
}