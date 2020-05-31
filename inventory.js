const fsMod = require('fs');
const readLineMod = require('readline');


const readFromFile = (fileName) => {
    let graph = {};
    let inputStream = fsMod.createReadStream(fileName);
    var data = "";

    inputStream.pipe(data);
    console.log(data);
    let i = 0;
    let line = "";
    let line_arr = [];
    while (i < data.length){
        if (data[i] !== '.'){
            line += data[i];
        } else {
            if (line.length > 0) {
                line_arr.push(line);
                line = "";
            }
        }
        i++;
    }
    if (line.length > 0){
        line_arr.push(line);
        line = "";
    }
    for (let input of line_arr){
        let base = "";
        let index = 0;
        while(!(input[index] === ',')){
            base += input[index];
            index++;
        }
        graph[base] = null;

        let str = "";
        let key = "";
        let isEdgeLength = false;
        for (let i = index + 1; i < input.length; i++){
            if (input[i] !== ","){
                str += input[i];
            }else {
                if (!isEdgeLength) {
                    graph[base][str] = null;
                    key = str;
                    isEdgeLength = true;
                } else {
                    graph[base][key] = parseInt(str);
                    isEdgeLength = false;
                }
                str = "";
            }
        }
    }
    return graph;
}

console.log(readFromFile("a.txt"));
