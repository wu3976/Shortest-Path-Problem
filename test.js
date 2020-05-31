const utilMods = require('./inventory');
utilMods.read_graph_from_csv("./a.txt", (graph) => {
    console.log(graph);
})