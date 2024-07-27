function attachEvents() {

    

    const URL = "http://localhost:3030/jsonstore/messenger";

    onLoad();
    document.getElementById('submit').addEventListener('click', onSubmit)
    document.getElementById('refresh').addEventListener('click', onLoad);

    
    const textArea = document.getElementById('messages');
    const authorRef = document.querySelector("input[name='author']");
    const contentRef = document.querySelector("input[name='content']");

    async function onLoad(e){
        const response  = await fetch(URL);
        const data = await response.json();
        let buffer = "";
        Object.values(data).forEach( rec => {
            buffer += `${rec.author}: ${rec.content}\n`;

        });
        textArea.value = buffer.trim();


    }
    async function  onSubmit(e){
        const author = authorRef.value;
        const content = contentRef.value;

        if(!author || !content){
            return;
        }

        const data = {
            author,
            content
        }
        
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(data)
    }
        await fetch(URL,option );
        authorRef.value = "";
        contentRef.value = "";
        onLoad();
    }
}

attachEvents();