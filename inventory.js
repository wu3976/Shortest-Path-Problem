const fsMod = require('fs');

seperators = [' ', ',', '\r', '\n'];

const getNextToken = (datas, seperators) => {
    let index = 0;
    if (isSeperator(datas[0], seperators)){ // take a seperator
        while (isSeperator(datas[index], seperators) && index < datas.length){
            index ++;
        }
    } else { // take a word
        while (!(isSeperator(datas[index], seperators)) && index < datas.length){
            index ++;
        }
    }
    return datas.substring(0, index);
}

const isSeperator = (ch, seperators) => {
    result = false;
    for (let ele of seperators){
        if (ele === ch) {result = true; break;}
    }
    return result;
}

const convert_to_graph = (datas, callback) => {
    let graph = {};
    while (datas.length > 0) {
        let i = 0;
        while (datas[i] !== '\n' && i < datas.length) {
            i++;
        }
        let line = datas.substring(0, i);
        datas = i === datas.length ? "" : datas.substring(i + 1);

        // state = 0: root, state = 1 : neighbour, state = 2 : edge length
        let machine_state = 0;
        let root = "";
        let neigh = '';
        while (line.length > 0) {
            let token = getNextToken(line, seperators);
            line = line.substring(token.length, line.length);
            if (isSeperator(token[0], seperators)) {
                token = "";
            }
            if (machine_state === 0) {
                if (token.length > 0) {
                    root = token;
                    graph[token] = {};
                } else {
                    machine_state = 1;
                }
            } else {
                if (token.length > 0 && machine_state === 1) {
                    neigh = token;
                } else if (token.length > 0 && machine_state === 2) {
                    graph[root][neigh] = parseInt(token);
                } else {
                    machine_state =
                        machine_state === 1 ? machine_state + 1 : machine_state - 1;
                }
            }

        }

    }
    callback(graph);
}

const read_data_from_csv = (path, callback) => {
    let datas = "";
    const inputStream = fsMod.createReadStream(path);
    inputStream.on('data', chunk => {
        datas += chunk;
    })

    inputStream.on('end', () => {
        inputStream.close();
        callback(datas);
    });
}

const read_graph_from_csv = (path, callback) => {
    read_data_from_csv(path, (datas) => {
        convert_to_graph(datas, (graph) => {
            callback(graph);
        });
    });

}

module.exports = {
    read_graph_from_csv : read_graph_from_csv
}


