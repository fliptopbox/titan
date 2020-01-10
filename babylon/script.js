const { MeshBuilder, Vector3, Color3, StandardMaterial } = BABYLON;
var engine = null;
var scene = null;
var canvas = document.getElementById("renderCanvas");



(function() {
    engine = createDefaultEngine();
    if (!engine) throw "engine should not be null.";

    engine.runRenderLoop(function() {
        if (scene) {
            scene.render();
        }
    });

    scene = createScene();
    // Resize
    window.addEventListener("resize", function() {
        engine.resize();
    });
})()

function createDefaultEngine() {
    return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
}

function createScene() {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    createBoard(scene);

    return scene;
}

function createBoard(scene) {
    const parents = [0, 1, 2, 3, 4, 5];
    // const parents = [0];
    parents.map(parent => {
        const pivot = BABYLON.MeshBuilder.CreateSphere("pivot_" + parent, { diameter: 0.05 });
        createSegment(scene, pivot, parent);
        pivot.rotate(BABYLON.Axis.Y, parent * (Math.PI / 3), BABYLON.Space.WORLD);
        return pivot;
    });
}

function createSegment(scene, pivot, index) {
    const segments = [1, 3, 5, 7];
    segments.forEach((children, segment) => {
        createSiblings(segment, children, pivot, index, scene);
    });

    // hexagon.position.y = 1;
}

function createSiblings(segment, children, pivot, index, scene) {
    // return array of x,y for n siblings
    const diameter = 5;
    const scale = 0.98; //0.94;
    let hspace = diameter * 0.5; // 0.578;
    let vspace = diameter * 0.5; // 0.333;
    let degrees = 6;
    const height = 0.05;
    const tileHeight = height * 2;

    const array = [...Array(children)].map((_, child) => {
        // const pivot = BABYLON.MeshBuilder.CreateSphere("pivotx", { diameter: 1.25 })
        const hexagon = MeshBuilder.CreateCylinder("cyl", { height, diameter, tessellation: 3 }, scene);
        const tile = MeshBuilder.CreateCylinder(
            "cyl",
            { height: tileHeight, diameter: diameter * 0.8, tessellation: 3 },
            scene
        );

        let y = 0;
        let z = 0;
        let offset = 0.4234444;
        z = (segment + 1) * (diameter * 0.74555);

        let x = 0;
        x += diameter * offset * child * 1.01229;
        // x = (((child + 1) / diameter) * (diameter * hspace))
        // x += -((children * hspace) / 2)

        let degrees = 6;
        if (child % 2 === 1) {
            degrees /= 3; // vertical flip
            z -= hspace / 2;
        }

        // z -= diameter * segment * (diameter / 10);

        // mesh aligment
        x += -(children * (offset / 2) * diameter);

        // pivot alignment
        x += offset * (diameter / 2);
        z -= offset * (diameter / 1.6665);

        y = (index % 2) * -0.02;
        y += (child % 2) * -0.02;

        const material = new StandardMaterial("white", scene);
        material.diffuseColor = getTerrainColor("white"); //colors[index % 2][segment][child];

        hexagon.rotate(BABYLON.Axis.Y, Math.PI / degrees, BABYLON.Space.LOCAL);
        hexagon.position.z = -z;
        hexagon.position.x = x;
        hexagon.position.y = y;
        hexagon.parent = pivot;
        hexagon.material = material;
        hexagon.scaling = new Vector3(scale, scale, scale);

        tile.rotate(BABYLON.Axis.Y, Math.PI / degrees, BABYLON.Space.LOCAL);
        tile.position.z = -z;
        tile.position.x = x;
        tile.position.y = y + tileHeight * 0.5;
        tile.parent = pivot;
        tile.material = getMaterial(segment, child, index, scene);
        tile.scaling = new Vector3(scale, scale, scale);
    });
}

function getMaterial(segment, child, index, scene) {
    // segment 0-5
    // child: 0-7
    const colors = [
        [
            ["mountains"],
            ["swamp", "plains", "woods"],
            ["jungle", "marsh", "tower", "brush", "hills"],
            ["marsh", "brush", "swamp", "plains", "brush", "marsh", "jungle"]
        ],
        [
            ["tundra"],
            ["desert", "marsh", "hills"],
            ["jungle", "plains", "tower", "brush", "woods"],
            ["plains", "brush", "jungle", "marsh", "brush", "plains", "desert"]
        ]
    ];

    const name = colors[index % 2][segment][child];
    const material = new StandardMaterial(name, scene);

    material.diffuseColor = getTerrainColor(name);
    return material;
}

function getTerrainColor(name) {
    const { FromHexString } = Color3;
    const terrains = {
        white: FromHexString("#EFEFEF"),
        mountains: FromHexString("#A64534"),
        tundra: FromHexString("#CBEAEF"),
        brush: FromHexString("#B8C049"),
        plains: FromHexString("#EFBE5E"),
        woods: FromHexString("#C99D31"),
        hills: FromHexString("#7F534A"),
        desert: FromHexString("#E88A4A"),
        swamp: FromHexString("#57A0C9"),
        jungle: FromHexString("#50AB6A"),
        marsh: FromHexString("#AB6E52"),
        tower: FromHexString("#F2F2F2")
    };
    console.log(name);
    return terrains[name];
}
