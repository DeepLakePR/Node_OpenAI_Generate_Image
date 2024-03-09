function onSubmit(e){

    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if(prompt === ''){
        alert('Por favor insira um texto para que seja convertido em imagem.')
        return;
    }

    generateImageRequest(prompt, size);

}

function showSpinner(){ 
    document.querySelector('.spinner').classList.add('show');

}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');

}

async function generateImageRequest(prompt, size){

    try{

        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });

        if(!response.ok){
            hideSpinner();

            throw new Error('Não foi possível gerar a imagem.');
        }

        const data = await response.json();

        const imageUrl = data.data;
        document.querySelector('#image').src = imageUrl;

        hideSpinner();

        /////////////////
    }catch(error){ // Error
        document.querySelector('.msg').textContent = error;

    }

}

document.querySelector('#image-form').addEventListener('submit', onSubmit)
