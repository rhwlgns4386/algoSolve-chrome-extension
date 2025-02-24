
const button = document.querySelector("#submit-code");
button.addEventListener('click',function(){
    const modal = document.querySelector(".modal");
    const observer = new MutationObserver((mutations) => {
        if(mutations[0].target.querySelector(".modal-title")){
            observer.disconnect();

            process(mutations)
        }
    })
    
    const option = {
        attributes: true,
    };

    observer.observe(modal, option);
})