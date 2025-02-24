const result_state = function result_state(classList){
    if(ExplationStatus.isAc(classList)){
        return ResultState.AC;
    }
    return ResultState.FAIL;
}

const get_problem_info = function get_problem_info(dom){

    const get_id = function get_problem_id(dom){
        return dom.textContent.trim();
    }
    
    const get_name = function get_problem_id(dom){
        return dom.getAttribute('data-original-title');
    }
    
    const get_url = function get_problem_url(dom){
        return dom.getAttribute('href');
    }

    return {
        id : get_id(dom),
        name : get_name(dom),
        url : 'www.acmicpc.net' + get_url(dom),
    }
}

const create_dto = function(classList){
    const status = result_state(classList);
    const dom = document.querySelector('.problem_title');
    const {id, name, url} = get_problem_info(dom);
    const currentDate = new Date();
    return new ProblemStateDto(Platform.BOJ,status,id,name,url,currentDate)
}

function process(mutations){
    const classList = mutations[0].target.classList;
    if(!StatusGroup.isReady(classList)){
        send(create_dto(classList));
    }
}
