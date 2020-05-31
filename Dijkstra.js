const utilMods = require('./inventory');

/*-------------------------Customization Area--------------------------*/

/**
 * The path of file to import graph. Must be in CSV format.
 * If path = "./default", then default_graph would be used.
 * @type {string}
 */
path = "./default";

/**
 * Start node of path.
 * @type {string}
 */
start = 'a';

/**
 * End node of path.
 * @type {string}
 */
end = 'g';

/**
 * Default graph to be used.
 * @type {{a: {b: number, c: number}, b: {a: number, f: number}, c: {a: number, d: number, e: number, f: number}, d: {c: number, e: number, f: number}, e: {c: number, d: number, g: number}, f: {b: number, c: number, d: number, g: number}, g: {e: number, f: number}}}
 */
default_graph = {
    'a': {'b': 1, 'c': 3},
    'b' : {'a' : 1, 'f' : 2},
    'c' : {'a' : 3, 'd' : 4, 'e' : 6, 'f' : 7},
    'd' : {'c' : 4, 'e' : 5, 'f' : 4},
    'e' : {'c' : 6, 'd' : 5, 'g' : 7},
    'f' : {'b' : 2, 'c' : 7, 'd' : 4, 'g' : 3},
    'g' : {'e' : 7, 'f' : 3}
}
/*---------------------------------End---------------------------------*/


const dijkstra = (start, end, path, callback) => {
    utilMods.read_graph_from_csv(path, graph => {
        let parentNode = {};
        if (path === "./default"){
            graph = default_graph;
        }
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

        callback(accu_dist, parentNode);
    });
}

/**
 *
 * @param from
 * @param to
 * @param parentNode
 * @param callback (trackList, err) the callback function : {
 *     @param trackList
 *          If path exist, the list representing the path from ${from} node to ${to}
 * }
 * @requires from and to is in either keys(parentNode) or values(parentNode)
 * or both.
 */
const track = (from, to, parentNode, callback) => {
    let curr = to;
    let trackList = [curr];
    if (curr === from){
        callback(trackList);
        return;
    }
    while (Object.keys(parentNode).indexOf(curr) >= 0){ // current node is still in parentNode map
        curr = parentNode[curr];
        trackList.unshift(curr);
        if (curr === from){
            callback(trackList);
            return;
        }
    }
    callback(null);
}

// main method.
dijkstra(start, end, path, (accu_dist, parentNode) => {
    console.log("Accumulate distance list: ");
    console.log(accu_dist);
    console.log("Parent node map: ");
    console.log(parentNode);
    track(start, end, parentNode, (trackList) => {
        if (trackList === null){
            console.log("No path found");
        } else {
            console.log("Shortest path is: ");
            console.log(trackList);
        }
    })
});
