const ExplationStatus = {
    wait : 'result-wait',
    complie : 'result-compile',
    judging : 'result-judging',
    ac : 'result-ac',

    isAc(classList){
        return classList.contains(this.ac);
    }
};

Object.freeze(ExplationStatus);

const StatusGroup = {
    ready : [ExplationStatus.wait,ExplationStatus.complie,ExplationStatus.judging],
    ac : [ExplationStatus.ac],

    isReady(classList){
       return this.ready.some(element => classList.contains(element));
    }
};
Object.freeze(StatusGroup);