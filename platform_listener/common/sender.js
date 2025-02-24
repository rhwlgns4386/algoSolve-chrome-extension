class ProblemStateDto{
    constructor(platform,result_state,problem_id,name,url,solved_date){
        this.platform = platform;
        this.result_state = result_state;
        this.problem_id = problem_id;
        this.name = name;
        this.url = url;
        this.solved_date = solved_date;
    }
}

const send = function send(dto){
    const xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:8080/api/v1/problem');
    xhr.setRequestHeader('content-type','application/json');
    xhr.send(JSON.stringify(dto));
}