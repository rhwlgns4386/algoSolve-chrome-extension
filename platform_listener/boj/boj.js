const observer = new MutationObserver((mutations) => {
    process(mutations);
})

const option = {
    attributes: true,
};

const table_first_line = function first_line(){
    const table_lines = document.querySelectorAll('tbody tr');
    return table_lines[0].querySelector(".result-text");
}

observer.observe(table_first_line(), option);
