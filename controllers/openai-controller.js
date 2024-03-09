const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});

const generateImage = async (request, response) => {

    const { prompt, size } = request.body;

    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'

    try{

        const openAIresponse = await openai.images.generate({
            prompt,
            n: 1,
            size: imageSize
        });

        const imageUrl = openAIresponse.data[0].url

        response.status(200).json({
            success: true,
            data: imageUrl
        })

    }catch(error){

        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        response.status(400).json({
            success: false,
            error: 'Image could not be generated.',
            msgtest: error.message,
        })

    }

}

module.exports = { generateImage };
