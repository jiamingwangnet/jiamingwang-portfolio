const relu = (matrix:Matrix) => {
    for(let i = 0; i < matrix.values.length; i++)
    {
        matrix.values[i] = Math.max(0,  matrix.values[i]);
    }
    return matrix;
}

const linear = (matrix:Matrix) => {
    return matrix;
}

interface InfoLayer
{
    nodes: number;
    inNodes: number;
    activ: (arg0: Matrix) => Matrix;
}

export const layerInfo:InfoLayer[] = [
    {
        nodes: 11,
        inNodes: 0,
        activ: relu
    },
    {
        nodes: 256,
        inNodes: 11,
        activ: relu
    },
    {
        nodes: 128,
        inNodes: 256,
        activ: relu
    },
    {
        nodes: 3,
        inNodes: 128,
        activ: linear
    }
];


export class Data {
    name: string;
    url: string;
    actvalue: Uint8Array | undefined;
    fetched: boolean;

    constructor(name:string, url:string)
    {
        this.name = name;
        this.url = url;

        // file values set set to Uint8Arrays
        // matrices
        this.actvalue = undefined;

        this.fetched = false;
    }

    async Read()
    {
        // await new Promise(resolve => {setTimeout(() => resolve(null), 2000)});

        const actres = await fetch(`${this.url}${this.name}.actvalue`);
        const actdata = await actres.arrayBuffer()
        this.actvalue = new Uint8Array(actdata);

        if(!this.actvalue) throw new Error("Could not fetch resources");

        this.fetched = true;
    }

    // Uint8Array of 8 bytes
    ToDouble(data:Uint8Array|undefined)
    {
        // size of double is 8
        const buf = new ArrayBuffer(8);
        const view = new DataView(buf);

        data?.forEach((byte, i) => {
            view.setUint8(7 - i, byte);
        });

        return view.getFloat64(0);
    }

    // returns all the matrices
    // bias matrix and weight matrix
    GetMatrices(info:InfoLayer[])
    {
        const array = this.actvalue;

        const res:{weights:number[][],biases:number[][]} = {
            weights: [[]],
            biases: [[]]
        };

        // current byte location
        let loc = 0;
        
        for(let i = 1; i < info.length; i++)
        {
            const wrow = info[i].inNodes;
            const wcol = info[i].nodes;

            const brow = 1;
            const bcol = info[i].nodes;

            // load weights
            const wvalues:number[] = [];
            
            for(let i = 0; i < wrow * wcol; loc += 8, ++i)
            {
                const bytes = array?.slice(loc, loc + 8);
                wvalues.push(this.ToDouble(bytes));
            }

            res.weights.push(wvalues);

            // load biases
            const bvalues:number[] = [];

            for(let i = 0; i < brow * bcol; loc += 8, ++i)
            {
                const bytes = array?.slice(loc, loc + 8);
                bvalues.push(this.ToDouble(bytes));
            }

            res.biases.push(bvalues);
        }

        return res;
    }
}

// define matrix

class Matrix
{
    values: number[];
    rows: number;
    columns: number;

    // values in 1D array
    constructor(values:number[], rows:number, columns:number)
    {
        this.values = values;
        this.rows = rows;
        this.columns = columns;
    }

    Get(r:number, c:number)
    {
        return this.values[r * this.columns + c];
    }

    Set(r:number, c:number, v:number)
    {
        this.values[r * this.columns + c] = v;
    }

    // Set(matrix)
    // {

    // }

    // does not set current matrix
    // returns a new matrix
    Mul(rhs:Matrix)
    {
        if(this.columns !== rhs.rows) throw new Error("Invalid Matrices");

        const res = new Matrix(new Array(this.rows * rhs.columns).fill(0), this.rows, rhs.columns);

        for(let i = 0; i < this.rows; i++)
        {
            for(let j = 0; j < rhs.columns; j++)
            {
                for(let k = 0; k < rhs.rows; k++)
                {
                    res.Set(i, j, res.Get(i,j) + this.Get(i, k) * rhs.Get(k, j));
                }
            }
        }

        return res;
    }

    Add(rhs:Matrix)
    {
        if(this.rows !== rhs.rows || this.columns !== rhs.columns) throw new Error("Invalid Matrices");

        const res = new Matrix(new Array(this.rows * this.columns).fill(0), this.rows, this.columns);

        for(let i = 0; i < this.rows * this.columns; i++)
        {
            res.values[i] = this.values[i] + rhs.values[i];
        }

        return res;
    }
}

class Layer 
{
    nodes: number;
    weights: Matrix;
    biases: Matrix;
    activation: (arg0:Matrix) => Matrix;

    // value: {weights, biases} object
    constructor(info:InfoLayer, value:{weights:number[],biases:number[]})
    {
        this.nodes = info.nodes;
        this.weights = new Matrix(value.weights, info.inNodes, info.nodes);
        this.biases = new Matrix(value.biases, 1, info.nodes);
        this.activation = info.activ;
    }

    Forward(input:Matrix, start = false)
    {
        if(start)
            return input;
        const outputs = this.activation(input.Mul(this.weights).Add(this.biases));
        return outputs;
    }
}

// no learning code needed
class NeuralNet
{
    layers: Layer[];

    constructor(info:InfoLayer[], data:Data)
    {
        this.layers = [];

        const matrices = data.GetMatrices(info);
        for(let i = 0; i < info.length; i++)
        {
            this.layers.push(new Layer(info[i], {weights: matrices.weights[i], biases: matrices.biases[i]}));
        }
    }

    CalculateOutputs(input:Matrix)
    {
        let output;

        if(input.columns !== this.layers[0].nodes)
        {
            throw new Error("Invalid input");
        }

        output = this.layers[0].Forward(input, true);

        for(let i = 1; i < this.layers.length; i++)
        {
            output = this.layers[i].Forward(output);
        }

        return output;
    }
}

export class Agent
{
    net:NeuralNet;
    actions:(()=>void)[];

    constructor(info:InfoLayer[], data:Data, actions:(()=>void)[])
    {
        this.net = new NeuralNet(info, data);
        this.actions = actions;
    }

    TakeAction(state:Matrix)
    {
        const action = this.net.CalculateOutputs(state);
        const index = action.values.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

        this.actions[index]();
    }
}


// snake game
// all objects in the game will not be responsible for rendering
// - this means objects will **not** have a Render() function
// the renderer must retrieve the relevent data itself

export interface coord {
    x:number;
    y:number;
}

export type state = 'empty' | 'snake' | 'apple';

// coordinate system reversed??
export const DIR:{north:coord,east:coord,south:coord,west:coord} = {
    north: {x:0, y:1},
    east: {x: 1, y: 0},
    south: {x:0,y:-1},
    west: {x:-1,y:0}
}

export class Snake
{
    segments:coord[];
    heading:coord;

    constructor(len:number, sx:number, sy:number)
    {
        this.segments = [];
        this.heading = DIR.east;

        for(let i = 0; i < len; i++)
        {
            this.segments.push({x: sx + len - i, y: sy});
        }
    }

    Update()
    {
        let last = {x: this.segments[0].x, y: this.segments[0].y};
        this.segments[0].x += this.heading.x;
        this.segments[0].y += this.heading.y;

        for(let i = 1; i < this.segments.length; i++)
        {
            let tmp = {x: last.x, y: last.y};
            last = {x: this.segments[i].x, y: this.segments[i].y};

            this.segments[i].x = tmp.x;
            this.segments[i].y = tmp.y;
        }
    }

    SetHeading(heading:coord)
    {
        if(this.heading === DIR.north && heading === DIR.south) return;
        if(this.heading === DIR.south && heading === DIR.north) return;
        if(this.heading === DIR.east && heading === DIR.west) return;
        if(this.heading === DIR.west && heading === DIR.east) return;

        this.heading = heading;
    }

    Collide(width:number, height:number, grid:state[])
    {
        return this.segments[0].x + this.heading.x >= width || this.segments[0].y + this.heading.y >= height || this.segments[0].x + this.heading.x < 0 ||
            this.segments[0].y + this.heading.y < 0 || grid[(this.segments[0].y + this.heading.y) * width + this.segments[0].x + this.heading.x] === "snake";
    }
}

export class Board
{
    grid:state[]
    applePos: coord;
    state: 'playing' | 'lose';
    snake: Snake;
    lastSnakePos: coord;
    lastApplePos: coord;
    width: number;
    height: number;

    constructor(w:number, h:number)
    {
        this.grid = [];
        this.applePos = {x: Math.floor(Math.random() * w), y: Math.floor(Math.random() * h)};

        this.state = "playing";
        this.snake = new Snake(3, Math.floor(w / 2), Math.floor(h / 2));

        this.lastSnakePos = {x: 0, y: 0};
        this.lastApplePos = {x: 0, y: 0};

        this.width = w;
        this.height = h;

        for(let i = 0; i < w * h; i++)
        {
            this.grid.push("empty");
        }
    }

    IsCollide(x:number, y:number)
    {
        return x >= this.width || y >= this.height || x < 0 || y < 0 || this.grid[y * this.width + x] === "snake";
    }

    GetAgentState()
    {
        const state = new Matrix(new Array(0).fill(11), 1, 11);

        const sx = this.snake.segments[0].x;
        const sy = this.snake.segments[0].y;

        const foodx = this.applePos.x;
        const foody = this.applePos.y;

        const nextn = {x: this.snake.segments[0].x, y: this.snake.segments[0].y-1};
        const nexte = {x: this.snake.segments[0].x+1, y: this.snake.segments[0].y};
        const nexts = {x: this.snake.segments[0].x, y: this.snake.segments[0].y+1};
        const nextw = {x: this.snake.segments[0].x-1, y: this.snake.segments[0].y};

        const dirn = Number(this.snake.heading === DIR.north);
        const dire = Number(this.snake.heading === DIR.east);
        const dirs = Number(this.snake.heading === DIR.south);
        const dirw = Number(this.snake.heading === DIR.west);

        // collide straight
        state.Set(0, 0, Number(
            (dirn && this.IsCollide(nextn.x,nextn.y)) ||
            (dire && this.IsCollide(nexte.x,nexte.y)) ||
            (dirs && this.IsCollide(nexts.x,nexts.y)) ||
            (dirw && this.IsCollide(nextw.x,nextw.y)) 
        ));

        // collide right
        state.Set(0, 1, Number(
            (dirn && this.IsCollide(nexte.x,nexte.y)) ||
            (dire && this.IsCollide(nexts.x,nexts.y)) ||
            (dirs && this.IsCollide(nextw.x,nextw.y)) ||
            (dirw && this.IsCollide(nextn.x,nextn.y)) 
        ));

        // collide left
        state.Set(0, 2, Number(
            (dirn && this.IsCollide(nextw.x,nextw.y)) ||
            (dire && this.IsCollide(nextn.x,nextn.y)) ||
            (dirs && this.IsCollide(nexte.x,nexte.y)) ||
            (dirw && this.IsCollide(nexts.x,nexts.y)) 
        ));

        // move dir
        state.Set(0, 3, Number(dirn));
        state.Set(0, 4, Number(dire));
        state.Set(0, 5, Number(dirs));
        state.Set(0, 6, Number(dirw));

        // food pos
        state.Set(0, 7,  Number(foodx < sx)); // west
        state.Set(0, 8,  Number(foodx > sx)); // east
        state.Set(0, 9,  Number(foody < sy)); // north
        state.Set(0, 10, Number(foody > sy)); // south

        return state;
    }

    Update()
    {
        if(this.state === "lose") return;
        
        this.grid[this.lastApplePos.y * this.width + this.lastApplePos.x] = "empty";
        this.grid[this.lastSnakePos.y * this.width + this.lastSnakePos.x] = "empty";

        if(!this.snake.Collide(this.width, this.height, this.grid))
        {
            this.snake.Update();

            const sbody = this.snake.segments; // reference to snake's segments
            for(let i = 0; i < sbody.length; i++)
            {
                this.grid[sbody[i].y * this.width + sbody[i].x] = "snake";
            }

            if(sbody[0].x === this.applePos.x && sbody[0].y === this.applePos.y)
            {
                do 
                {
                    this.applePos = {x: Math.floor(Math.random() * this.width), y: Math.floor(Math.random() * this.height)};
                } 
                while((() => {
                    for(const body of this.snake.segments)
                    {
                        if(this.applePos.x === body.x && this.applePos.y === body.y) return true;
                    }
                    return false;
                })());
                sbody.push({x: 0, y: 0});
            }

            this.lastSnakePos.x = sbody[sbody.length - 1].x;
            this.lastSnakePos.y = sbody[sbody.length - 1].y;
        }
        else
        {
            this.state = "lose";
            this.grid[this.lastSnakePos.y * this.width + this.lastSnakePos.x] = "snake";
        }

        this.grid[this.applePos.y * this.width + this.applePos.x] = "apple";
        this.lastApplePos = this.applePos;
    }

    Reset()
    {
        this.snake = new Snake(3, Math.floor(this.width / 2), Math.floor(this.height / 2));

        for(let i = 0; i < this.grid.length; i++)
        {
            this.grid[i] = "empty";
        }

        this.applePos = {x: Math.floor(Math.random() * this.width), y: Math.floor(Math.random() * this.height)};
        this.state = "playing";
    }
}