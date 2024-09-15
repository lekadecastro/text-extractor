const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

// Caminhos das pastas
const inputDir = 'inputs/';
const outputDir = 'output/';

// Função para realizar OCR em uma imagem e salvar o resultado
function recognizeTextFromImage(imagePath, outputFileName) {
    Tesseract.recognize(
        imagePath,
        'eng', // Idioma (pode adicionar outros pacotes de idioma)
        {
            logger: (m) => console.log(m) // Mostra o progresso no console
        }
    ).then(({ data: { text } }) => {
        // Salva o resultado em um arquivo .txt
        fs.writeFileSync(outputFileName, text);
        console.log(`Texto reconhecido e salvo em: ${outputFileName}`);
    }).catch((error) => {
        console.error(`Erro ao processar a imagem: ${imagePath}`, error);
    });
}

// Processa todas as imagens na pasta 'inputs'
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Erro ao ler a pasta de inputs:', err);
        return;
    }

    files.forEach((file) => {
        const imagePath = path.join(inputDir, file);
        const outputFileName = path.join(outputDir, `${path.parse(file).name}.txt`);

        if (file.endsWith('.png') || file.endsWith('.jpg')) {
            recognizeTextFromImage(imagePath, outputFileName);
        }
    });
});
