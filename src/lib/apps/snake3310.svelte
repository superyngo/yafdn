<script lang="ts">
  import {onMount, onDestroy, afterUpdate} from "svelte";
  export let canvasWidth: number = 10,
    canvasHeight: number = 10,
    speed: number = 5,
    controlHeight: string = "50px";

  const phoneImage: HTMLElement = <HTMLElement>(
    document.querySelector(".phoneImage")
  );

  onMount(() => {
    document.documentElement.style.setProperty(
      "--controlHeight",
      controlHeight
    );
    console.log(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--controlHeight"
      )
    );
    const canvas: HTMLElement = <HTMLElement>document.getElementById("canvas");

    setCanvas();
    phoneImage.focus();
    window.addEventListener("resize", async () => {
      await tick();
      setCanvas();
    });
  });
  onDestroy(() => snake.stop());
  afterUpdate(() => {
    setCanvas();
  });

  function setCanvas() {
    const innerAppWrapper: HTMLElement =
      document.querySelector(".innerAppWrapper");
    const control: HTMLElement = document.querySelector(".control");
    const canvasHeightPx: number =
      +getComputedStyle(innerAppWrapper).height.replace("px", "") -
      (control ? +getComputedStyle(control).height.replace("px", "") : 0) -
      +getComputedStyle(innerAppWrapper).padding.replace("px", "") * 4;
    const canvasWidthPx: number =
      +getComputedStyle(innerAppWrapper).width.replace("px", "") -
      +getComputedStyle(innerAppWrapper).padding.replace("px", "") * 4;
    const unit: number = Math.min(
      canvasHeightPx / canvasHeight,
      canvasWidthPx / canvasWidth
    );
    document.documentElement.style.setProperty("--br-height", unit + "px");
    document.documentElement.style.setProperty(
      "--canvas-border-height",
      unit * canvasHeight + "px"
    );
    document.documentElement.style.setProperty(
      "--canvas-border-width",
      unit * canvasWidth + "px"
    );
  }

  class Snake {
    enumStatus: {
      null: null;
      stopped: number;
      running: number;
      paused: number;
      win: number;
    };
    enumDimensions: {
      x: number;
      y: number;
    };
    enumDirections: {
      right: number;
      down: number;
      left: number;
      up: number;
    };
    headAngle: number;
    canvasWidth: number;
    canvasHeight: number;
    countAllBricks: number;
    speed: number;
    status: number | null;
    headPosition: number;
    baitPosition: null | number;
    oldBaitElement: null | HTMLElement;
    body: number[];
    length: number;
    direction: number;
    dimension: number;
    interval: null | number;
    touchParams: {clientXStart: null | number; clientYStart: null | number};

    constructor(canvasWidth: number, canvasHeight: number, speed: number) {
      this.enumStatus = {
        stopped: 0,
        running: 1,
        paused: 2,
        win: 3,
        null: null,
      };
      this.enumDimensions = {
        x: 0,
        y: 1,
      };
      this.enumDirections = {
        right: 1,
        down: +canvasWidth,
        left: -1,
        up: -canvasWidth,
      };
      this.headAngle = 0;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.countAllBricks = 0;
      this.speed = speed;
      this.status = null;
      this.headPosition = 0;
      this.baitPosition = null;
      this.oldBaitElement = null;
      this.body = [0];
      this.length = 1;
      this.direction = 1;
      this.dimension = 0;
      this.interval = null;
      this.touchParams = {clientXStart: null, clientYStart: null};
    }

    //set control
    setDirection(e: KeyboardEvent) {
      e.key != "F12" && e.preventDefault();
      if (e.key === " ") {
        switch (snake.status) {
          case this.enumStatus.running:
            this.pause();
            break;
          default:
            this.start();
            break;
        }
      }
      if (snake.status != this.enumStatus.running) return;

      const temp: number[] = [this.dimension, this.direction, this.headAngle];
      switch (e.key) {
        case "ArrowRight":
          //right
          this.dimension = this.enumDimensions.x;
          this.direction = this.enumDirections.right;
          this.headAngle = 0;
          break;
        case "ArrowDown":
          //down
          this.dimension = this.enumDimensions.y;
          this.direction = this.enumDirections.down;
          this.headAngle = 90;
          break;
        case "ArrowLeft":
          //left
          this.dimension = this.enumDimensions.x;
          this.direction = this.enumDirections.left;
          this.headAngle = 180;
          break;
        case "ArrowUp":
          //up
          this.dimension = this.enumDimensions.y;
          this.direction = this.enumDirections.up;
          this.headAngle = 270;
          break;
        default:
          break;
      }
      if (this.move("test") === this.body[1]) {
        [this.dimension, this.direction, this.headAngle] = temp;
        return;
      }
    }
    touchstart(e: TouchEvent) {
      e.preventDefault();
      snake.start();
      const touch = e.touches[0];
      this.touchParams.clientXStart = touch.clientX;
      this.touchParams.clientYStart = touch.clientY;
    }
    touchmove(e: TouchEvent) {
      const touch = e.touches[0];
      const dx = touch.clientX - <number>this.touchParams.clientXStart;
      const dy = touch.clientY - <number>this.touchParams.clientYStart;

      const threshold = 50;
      if (Math.abs(dx) > threshold) {
        const key: string = dx > 0 ? "ArrowRight" : "ArrowLeft";
        this.setDirection(new KeyboardEvent("keydown", {key}));
      } else if (Math.abs(dy) > threshold) {
        const key: string = dy > 0 ? "ArrowDown" : "ArrowUp";
        this.setDirection(new KeyboardEvent("keydown", {key}));
      }
    }
    touchend(e: TouchEvent) {
      this.touchParams.clientXStart = null;
      this.touchParams.clientYStart = null;
    }
    mousedown(e: MouseEvent) {
      e.preventDefault();
      this.touchParams.clientXStart = e.clientX;
      this.touchParams.clientYStart = e.clientY;
    }
    mouseup(e: MouseEvent) {
      const dx = e.clientX - <number>this.touchParams.clientXStart;
      const dy = e.clientY - <number>this.touchParams.clientYStart;

      const threshold = 50;
      if (Math.abs(dx) > threshold) {
        const key: string = dx > 0 ? "ArrowRight" : "ArrowLeft";
        this.setDirection(new KeyboardEvent("keydown", {key}));
      } else if (Math.abs(dy) > threshold) {
        const key: string = dy > 0 ? "ArrowDown" : "ArrowUp";
        this.setDirection(new KeyboardEvent("keydown", {key}));
      } else if (snake.status === this.enumStatus.running) {
        snake.pause();
      } else {
        snake.start();
      }
      this.touchParams.clientXStart = null;
      this.touchParams.clientYStart = null;
    }

    rolling() {
      this.interval = setInterval(() => {
        //move the head posotion
        snake.status = this.move();

        // judge if the head ate the bait
        if (this.headPosition === this.baitPosition) {
          snake.status = this.eat();
          //set baitPosition and oldBait
          snake.status = this.dropBait();
        }
        // judge if collide
        if (
          [...this.body]
            .slice(0, this.body.length - 1)
            .indexOf(this.headPosition) != -1
        ) {
          snake.status = this.collapse();
          this.stop();
          return;
        }
        //fill in the body with the head
        snake.status = this.unshiftTheHead();
        //draw snake body
        snake.status = this.setBodyColor();
        //judge if all bricks are eaten
        if (this.length === this.countAllBricks) {
          snake.status = this.win();
          this.stop();
          return;
        }
      }, 1000 / this.speed);
    }

    move(test: "test" | null) {
      let newPos: number = this.headPosition + this.direction;
      switch (this.dimension) {
        case this.enumDimensions.x:
          const originalRow = (this.headPosition / this.canvasWidth) | 0;
          const newRow = (newPos / this.canvasWidth) | 0;
          newPos =
            originalRow === newRow
              ? newPos < 0
                ? newPos + this.canvasWidth
                : newPos
              : newPos - this.direction * this.canvasWidth;
          break;
        case this.enumDimensions.y:
          const originalCol = this.headPosition % this.canvasWidth;
          const newCol = newPos % this.canvasWidth;
          newPos =
            newPos < this.canvasWidth * this.canvasHeight
              ? newPos < 0
                ? newPos + this.canvasWidth * this.canvasHeight
                : newPos
              : newPos - this.direction * this.canvasHeight;
          break;
      }
      if (test) {
        return newPos;
      }
      this.headPosition = newPos;
      return this.enumStatus.running;
    }
    eat() {
      // clear oldBait bait tag
      this.oldBaitElement?.classList.remove("bait");
      //add snake length
      this.length++;
      return this.enumStatus.running;
    }
    dropBait() {
      const availableBrick = [
        ...document.querySelectorAll(".brick:not(.body)"),
      ];
      if (this.oldBaitElement)
        availableBrick.splice(availableBrick.indexOf(this.oldBaitElement), 1);
      const baitBrick =
        availableBrick[(Math.random() * availableBrick.length) | 0];
      if (baitBrick) {
        baitBrick.classList.add("bait");
        this.baitPosition = +baitBrick.className.match(/\d+/)[0];
        this.oldBaitElement = document.querySelector(".br" + this.baitPosition);
      }
      return this.enumStatus.running;
    }
    collapse() {
      setTimeout(
        () => alert(`You loose! Total eaten bricks:${this.body.length}`),
        0
      );
      return this.enumStatus.stopped;
    }
    unshiftTheHead() {
      // unshift this.headPosition
      this.body.unshift(this.headPosition);
      //slice the body
      this.body = this.body.slice(0, this.length);
      return this.enumStatus.running;
    }
    setBodyColor() {
      const allBodyBr = document.querySelectorAll(".body");
      allBodyBr?.forEach((b) => {
        const cleanedClass = b?.className.replace(
          /body|right|left|down|up|head/g,
          ""
        );
        b.className = cleanedClass;
      });
      this.body.forEach((b, i, a) => {
        //set snake body
        const brick = document.querySelector(".br" + b);
        brick.classList.add("body");

        //set snake head
        i === 0 && brick.classList.add("head");

        //set snake boarder
        let frontAndBackDirections: unknown[] = [null, null];
        if (a[i + 1] != null) {
          frontAndBackDirections[0] = a[i + 1] - b;
        }
        if (a[i - 1] != null) {
          frontAndBackDirections[1] = a[i - 1] - b;
        }
        frontAndBackDirections.forEach((direction) => {
          switch (direction) {
            case this.enumDirections.right:
              brick?.classList.add("right");
              break;
            case this.enumDirections.down:
              brick?.classList.add("down");
              break;
            case this.enumDirections.left:
              brick?.classList.add("left");
              break;
            case this.enumDirections.up:
              brick?.classList.add("up");
              break;
          }
        });
      });
      return this.enumStatus.running;
    }
    win() {
      setTimeout(() => {
        alert(`You win! Total eaten bricks:${this.body.length}`);
      }, 0);
      return this.enumStatus.stopped;
    }

    //game process
    start() {
      if (snake.status === this.enumStatus.running) return;
      console.log("start");
      snake.status != this.enumStatus.paused && this.reset();
      snake.status = this.enumStatus.running;
      // phone.focus();
      this.rolling();
    }
    stop() {
      clearInterval(this.interval);
      this.interval = null;
    }
    reset() {
      this.countAllBricks = this.canvasWidth * this.canvasHeight;
      this.body = [0];
      this.length = 1;
      this.direction = 1;
      this.headAngle = 0;
      this.dimension = this.enumDimensions.x;
      this.headPosition = 0;
      this.baitPosition = null;
      this.oldBaitElement?.classList.remove("bait");
      this.stop();
      this.setBodyColor();
      this.dropBait();

      snake.status = this.enumStatus.paused;
    }
    pause() {
      snake.status = this.enumStatus.paused;
      this.stop();
    }
  }
  const snake = new Snake(canvasWidth, canvasHeight, speed);
</script>

<div class="phone relative h-full m-auto z-40">
  <img
    class="phoneImage m-auto relative z-0"
    src="/Nokia_3310.png"
    alt=""
    on:keydown={(e) => snake.setDirection(e)}
    on:touchstart={(e) => snake.touchstart(e)}
    on:touchmove={(e) => snake.touchmove(e)}
    on:touchend={(e) => snake.touchend(e)}
    on:click={(e) => {
      e.target.focus();
    }}
    on:mousedown={(e) => snake.mousedown(e)}
    on:mouseup={(e) => snake.mouseup(e)}
    role="button"
    tabindex={0}
  />
  <div class="screen border-4 absolute">
    <div class="innerAppWrapper absolute">
      <!-- <div class="canvasWrapper"> -->
      <div
        id="canvas"
        class="z-20"
        style="grid-template-columns: repeat({canvasWidth}, auto);"
      >
        {#each Array(canvasWidth * canvasHeight) as _, index (index)}
          <div class="brick br{index}">
            <!-- show tongue -->
            {#if index === snake.body[0] && snake.status != snake.enumStatus.null}
              <div class="face" style="rotate:{snake.headAngle}deg">
                <div class="tongue">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:sketchjs="https://sketch.io/dtd/"
                    sketchjs:metadata="eyJuYW1lIjoiRHJhd2luZy0zLnNrZXRjaHBhZCIsInN1cmZhY2UiOnsiaXNQYWludCI6dHJ1ZSwibWV0aG9kIjoiZmlsbCIsImJsZW5kIjoibm9ybWFsIiwiZW5hYmxlZCI6dHJ1ZSwib3BhY2l0eSI6MSwidHlwZSI6InBhdHRlcm4iLCJwYXR0ZXJuIjp7InR5cGUiOiJwYXR0ZXJuIiwicmVmbGVjdCI6Im5vLXJlZmxlY3QiLCJyZXBlYXQiOiJyZXBlYXQiLCJzbW9vdGhpbmciOmZhbHNlLCJzcmMiOiJ0cmFuc3BhcmVudExpZ2h0Iiwic3giOjEsInN5IjoxLCJ4MCI6MC41LCJ4MSI6MSwieTAiOjAuNSwieTEiOjF9LCJpc0ZpbGwiOnRydWV9LCJjbGlwUGF0aCI6eyJlbmFibGVkIjp0cnVlLCJzdHlsZSI6eyJzdHJva2VTdHlsZSI6ImJsYWNrIiwibGluZVdpZHRoIjoxfX0sImRlc2NyaXB0aW9uIjoiTWFkZSB3aXRoIFNrZXRjaHBhZCIsIm1ldGFkYXRhIjp7fSwiZXhwb3J0RFBJIjo3MiwiZXhwb3J0Rm9ybWF0IjoicG5nIiwiZXhwb3J0UXVhbGl0eSI6MC45NSwidW5pdHMiOiJweCIsIndpZHRoIjozMDAsImhlaWdodCI6MjAwLCJwYWdlcyI6W3sid2lkdGgiOjMwMCwiaGVpZ2h0IjoyMDB9XSwidXVpZCI6IjgxZTU3N2I2LWE2ZmYtNDNkNS1hNGU3LWQ0ZWVmMThhMjVkOCJ9"
                    width="50"
                    height="200"
                    viewBox="0 0 300 200"
                  >
                    <path
                      style="fill: #d7066f; stroke: #000000; mix-blend-mode: source-over; paint-order: stroke fill markers; fill-opacity: 1; stroke-dasharray: none; stroke-dashoffset: 0; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-opacity: 1; stroke-width: 4;"
                      sketchjs:tool="path"
                      d="M9.96 32.41 C31.96 5.41 54.96 -11.59 94.96 9.41 128.96 22.41 135.96 65.41 185.96 64.41 242.96 67.41 295.96 20.41 295.96 20.41 295.96 20.41 247.96 64.41 246.96 64.41 245.96 64.41 317.96 41.41 316.96 41.41 315.96 41.41 194.96 104.41 165.96 110.41 136.96 116.41 129.96 60.41 55.96 66.41 17.96 76.41 12.96 134.41 10.96 134.41 8.96 134.41 -12.04 59.41 9.96 32.41 z"
                      transform="matrix(1,0,0,1,-15.9598774,34.5922776)"
                    />
                  </svg>
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  :root {
    --br-height: 1px;
    --controlHeight: 50px;
    --canvas-border-width: 0px;
    --canvas-border-height: 0px;
    --head-angle: 0deg;
    --wrapper-padding: 0px;
    --canvas-border-line: 2px solid darkgrey;
  }
  .innerAppWrapper {
    padding: var(--wrapper-padding);
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .control {
    height: var(--controlHeight);
    flex-shrink: 0;
    display: grid;
    grid-template-columns: repeat(2, auto);
    place-content: center;
    gap: 1rem;
  }

  #canvas {
    position: relative;
    flex-grow: 1;
    display: grid;
    place-content: center;
  }
  #phone:focus {
    /* outline: none; */
  }
  #canvas:after {
    content: "";
    z-index: 10;
    position: absolute;
    /* border: var(--canvas-border-line); */
    width: var(--canvas-border-width);
    height: var(--canvas-border-height);
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  /* #canvas:focus:after {
    box-shadow: 0 0 10px 10px darkgrey;
  } */

  .brick {
    position: relative;
    aspect-ratio: 1/1;
    height: var(--br-height);
    /* border: 1px solid black; */
  }

  .face {
    position: absolute;
    inset: 0;
    z-index: 999;
    rotate: var(--head-angle);
    display: flex;
  }
  .tongue {
    position: absolute;
    width: calc(var(--br-height) / 3);
    aspect-ratio: 1/1;
    display: flex;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
  /* eyes */

  .body {
    background: black;
    border: calc(var(--br-height) / 5) solid white;
  }
  .up {
    border-top: none;
  }
  .right {
    border-right: none;
  }
  .down {
    border-bottom: none;
  }
  .left {
    border-left: none;
  }
  .bait {
    background: rgba(28, 9, 9, 0.761);
  }

  .phone {
    width: fit-content;
    max-height: 100%;
  }
  .phoneImage {
    max-height: 100%;
  }
  .screen {
    inset: 26% 15% 52%;
    border: 1px solid black;
    background-color: rgb(118, 244, 111);
    border-radius: 5% 5% 15% 15%;
  }
</style>
