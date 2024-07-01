import { RefObject } from 'react';
import * as THREE from 'three';
import { Board, Agent, layerInfo, Data, DIR } from './gameLogic';
import { EffectComposer, OutputPass, RenderPass, FilmPass } from 'three/examples/jsm/Addons.js';

const APPLE_COLOR = 0xfafafa;
const SNAKE_COLOR = 0x3276AE;
const EMTPY_COLOR = 0x111111;

const SNAKE_MATERIAL = new THREE.MeshBasicMaterial({color:SNAKE_COLOR});
const APPLE_MATERIAL = new THREE.MeshBasicMaterial({color:APPLE_COLOR});
const EMPTY_MATERIAL = new THREE.MeshLambertMaterial({color:EMTPY_COLOR});

const lerp = (x:number, y:number, a:number) => x * (1 - a) + y * a;

export default class Game 
{
    scene: THREE.Scene | undefined;
    camera: THREE.PerspectiveCamera | undefined;
    renderer: THREE.WebGLRenderer | undefined;
    width: number;
    height: number;

    cubes: THREE.Mesh[];
    cubeGroup: THREE.Group;
    light: THREE.PointLight | undefined;

    data: Data;
    board: Board;
    agent: Agent | undefined;

    actions: (()=>void)[];
    clock: THREE.Clock;
    rate: number;
    nextUpdate: number;
    composer: EffectComposer | undefined;

    hasStartedInit: boolean;

    lerpData: {
        timeElapsed: THREE.Clock;
        duration: number;
        startX: number;
        startY: number;

        endX: number;
        endY: number;
    };

    pointerPos: THREE.Vector2;
    raycaster: THREE.Raycaster;

    constructor(w:number, h:number, url:string, name:string)
    {
        this.hasStartedInit = false;

        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;

        this.width = w;
        this.height = h;

        this.cubes = [];
        this.cubeGroup = new THREE.Group();
        this.light = undefined;

        this.composer = undefined;

        this.board = new Board(w, h);
        this.data = new Data(name, url);

        this.lerpData = {
            timeElapsed: new THREE.Clock(true),
            duration: 0.25,
            startX: 0,
            startY: -0.174533,

            endX: 0,
            endY: -0.174533
        }


        this.actions = [
            // straight
            () => {
                // do nothing
            },
    
            // left
            () => {
                switch(this.board.snake.heading)
                {
                    case DIR.north:
                        this.board.snake.SetHeading(DIR.west);
                        break;
                    case DIR.east:
                        this.board.snake.SetHeading(DIR.north);
                        break;
                    case DIR.south:
                        this.board.snake.SetHeading(DIR.east);
                        break;
                    case DIR.west:
                        this.board.snake.SetHeading(DIR.south);
                        break;
                }
            },
    
            // right
            () => {
                switch(this.board.snake.heading)
                {
                    case DIR.north:
                        this.board.snake.SetHeading(DIR.east);
                        break;
                    case DIR.east:
                        this.board.snake.SetHeading(DIR.south);
                        break;
                    case DIR.south:
                        this.board.snake.SetHeading(DIR.west);
                        break;
                    case DIR.west:
                        this.board.snake.SetHeading(DIR.north);
                        break;
                }
            },
        ];
        this.agent = undefined;
        this.clock = new THREE.Clock(false);
        this.rate = 50;
        this.nextUpdate = 0;

        this.pointerPos = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
    }

    async InitSystems(containerRef: RefObject<HTMLDivElement>)
    {
        if (!this.hasStartedInit && typeof window !== 'undefined' && (this.scene === undefined || this.camera === undefined || this.renderer === undefined)) 
        {
            this.hasStartedInit = true;

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({antialias: true});
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            this.composer = new EffectComposer(this.renderer);

            const renderPass = new RenderPass( this.scene, this.camera );
            this.composer.addPass( renderPass );

            this.composer.addPass(new FilmPass(1));
            this.composer.addPass(new FilmPass(0.5));

            const outputPass = new OutputPass();
            this.composer.addPass( outputPass );

            containerRef.current?.append(this.renderer.domElement);
            this.camera.position.z = 5;

            this.scene.background = new THREE.Color(0x0a0a0a);

            // Initialize the Three.js scene here (as in the previous example)
            
            const handleResize = () => {
                if(this.renderer === undefined || this.camera === undefined) return;

                const width = window.innerWidth;
                const height = window.innerHeight;
          
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
          
                this.renderer.setSize(width, height);
            };

            window.addEventListener('resize', handleResize);

            await this.data.Read();

            this.agent = new Agent(layerInfo, this.data, this.actions);
        }
    }

    Init()
    {
        if(this.scene === undefined || this.camera === undefined || this.cubes.length > 0) return;

        this.clock.start();

        // light
        this.light = new THREE.PointLight(0xffffff, 500, 200);
        this.light.position.set(0,0,10);
        this.scene.add(this.light);

        const geometry = new THREE.BoxGeometry();
        
        for(let i = 0; i < this.height; i++)
        {
            for(let j = 0; j < this.width; j++)
            {
                this.cubes.push(new THREE.Mesh(geometry, EMPTY_MATERIAL));
                this.cubes[i * this.width + j].name = `${j} ${i}`;

                this.cubes[i * this.width + j].translateX(j * 1.15 - (this.width / 2) * 1.15);
                this.cubes[i * this.width + j].translateY(i * 1.15 - (this.height / 2) * 1.15);
                this.cubes[i * this.width + j].rotateX(Math.random());

                this.cubeGroup.add(this.cubes[i * this.width + j]);
            }
        }

        this.scene.add(this.cubeGroup);
        this.cubeGroup.rotateY(this.lerpData.startY);

        window.addEventListener('mousemove', event => {
            this.lerpData.startX = this.lerpData.endX;
            this.lerpData.startY = this.lerpData.endY;

            this.lerpData.endX = (lerp(-0.15, 0.15, event.clientY/window.innerHeight));
            this.lerpData.endY = (lerp(-0.15, 0.15, event.clientX/window.innerWidth));

            this.lerpData.timeElapsed = new THREE.Clock(true);
        });

        window.addEventListener('mousedown', event => {
            if(this.camera === undefined) return;

            // convert to NDC
            this.pointerPos.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.pointerPos.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.pointerPos, this.camera);
            const intersects = this.raycaster.intersectObjects(this.scene!.children);

            if(intersects.length > 0)
            {
                const pos = intersects[0].object.name.split(' ');
                this.board.lastApplePos = this.board.applePos;
                this.board.applePos = {x: parseInt(pos[0]), y: parseInt(pos[1]) };
            }
        })

        this.camera.position.z = 15;
    }

    Update()
    {
        const time = this.clock.getElapsedTime() * 1000;
        // console.log(this.lerpData.timeElapsed.getElapsedTime())
        if(this.lerpData.timeElapsed.getElapsedTime() < this.lerpData.duration)
        {   
            this.cubeGroup.rotation.x = lerp(this.lerpData.startX, this.lerpData.endX, this.lerpData.timeElapsed.getElapsedTime() / this.lerpData.duration);
            this.cubeGroup.rotation.y = lerp(this.lerpData.startY, this.lerpData.endY, this.lerpData.timeElapsed.getElapsedTime() / this.lerpData.duration);
        }
        else
        {
            this.cubeGroup.rotation.x = this.lerpData.endX;
            this.cubeGroup.rotation.y = this.lerpData.endY;
        }
        
        if(time >= this.nextUpdate)
        {
            const state = this.board.GetAgentState();
            this.agent?.TakeAction(state);

            this.board.Update();

            if(this.board.state === "lose")
            {
                this.board.Reset();
            }

            this.nextUpdate = time + this.rate;
        }
    }

    Render()
    {
        if(this.renderer === undefined || this.scene === undefined || this.camera === undefined) return;
        
        for(let i = 0; i < this.height; i++)
        {
            for(let j = 0; j < this.width; j++)
            {
                this.cubes[i * this.width + j].rotation.x += 0.01 * Math.random();
                // this.cubes[i * this.width + j].rotation.z += 0.01;
                switch(this.board.grid[i * this.width + j])
                {
                    case 'empty':
                        this.cubes[i * this.width + j].material = EMPTY_MATERIAL;
                        break;
                    case 'snake':
                        this.cubes[i * this.width + j].material = SNAKE_MATERIAL;
                        break;
                    case 'apple':
                        this.cubes[i * this.width + j].material = APPLE_MATERIAL;
                        break;
                }
            }
        }

        this.composer?.render();
    }
}