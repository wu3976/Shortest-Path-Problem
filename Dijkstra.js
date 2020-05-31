graph = {
    'a': {
        'b': 1,
        'c': 3
    },
    'b' : {
        'a' : 1,
        'f' : 2
    },
    'c' : {
        'a' : 3,
        'd' : 4,
        'e' : 6,
        'f' : 7
    },
    'd' : {
        'c' : 4,
        'e' : 5,
        'f' : 4
    },
    'e' : {
        'c' : 6,
        'd' : 5,
        'g' : 7
    },
    'f' : {
        'b' : 2,
        'c' : 7,
        'd' : 4,
        'g' : 3
    },
    'g' : {
        'e' : 7,
        'f' : 3
    }
}

parentNode = {};

const dijkstra = (start, end) => {
    let unvisited = Object.keys(graph);
    let accu_dist = {};
    for (let ele of unvisited){
        accu_dist[ele] = ele === start ? 0 : Number.POSITIVE_INFINITY;
    }
    // find node in unvisited with smallest accu_dist
    while (unvisited.length > 0){
        let smallest = unvisited[0];
        let index = 0;
        for (let i in unvisited){
            if (accu_dist[unvisited[i]] < accu_dist[smallest]){
                smallest = unvisited[i];
                index = i;
            }
        }
        unvisited.splice(index, 1);
        let neighbours = Object.keys(graph[smallest]);
        for (let neigh of neighbours){
            let alt_dist = accu_dist[smallest] + graph[smallest][neigh];
            if (accu_dist[neigh] > alt_dist){
                accu_dist[neigh] = alt_dist;
                parentNode[neigh] = smallest;
            }
        }
    }

    return accu_dist;
}

var accu_dist = dijkstra('a', 'g');
console.log(parentNode);
console.log(accu_dist);