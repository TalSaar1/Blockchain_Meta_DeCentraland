import React from 'react';
import styled from 'styled-components';

/** {
  box-sizing: border-box;
}

html, body {
  overflow: hidden;
  font-family: Helvetica,san-serif;
}*/

const Grid = styled.div`
  box-sizing: content-box;
  padding: 0;
  border-top: 1px solid lightgray;
  border-right: 1px solid lightgray;
  display: flex;
  flex-wrap: wrap;
`;

const GridCellStyle = styled.div`
  border-left: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  background-color: ${props => props.color}
`;

const SnakeApp = styled.div`
  position: relative;
  margin: 10px auto;
  &:focus {
    outline: none;
  }
`;

const SnakeAppOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: hsla(0, 0, 0, .9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.2rem;
`;

const MbOne = styled.div`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color : blue;
  color: white;
  border-radius: 3px;
  border: 2px solid blue;
  padding: .75rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 0 10px black;
`;

// utility functions
function shallowEquals(arr1, arr2) {
    if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
    let equals = true;
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) equals = false;
    }
    return equals;
  }
  
  function arrayDiff(arr1, arr2){
    return arr1.map((a, i)=>{ 
      return a - arr2[i]
    })
  }
  
  // display a single cell
  function GridCell(props) {
    const color = props.foodCell ? 'blue' : props.snakeCell ? 'orange' : '';
    return (
      <GridCellStyle color={color} style={{ height: props.size + "px", width: props.size + "px" }} />
    );
  }
  
  // the main view
  class Snake extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        snake: [],
        food: [],
        // 0 = not started, 1 = in progress, 2= finished
        status: 0,
        // using keycodes to indicate direction
        direction: 39
      };
  
      this.moveFood = this.moveFood.bind(this);
      this.checkIfAteFood = this.checkIfAteFood.bind(this);
      this.startGame = this.startGame.bind(this);
      this.endGame = this.endGame.bind(this);
      this.moveSnake = this.moveSnake.bind(this);
      this.doesntOverlap = this.doesntOverlap.bind(this);
      this.setDirection = this.setDirection.bind(this);
      this.removeTimers = this.removeTimers.bind(this);
    }
    // randomly place snake food
    moveFood() {
      if (this.moveFoodTimeout) clearTimeout(this.moveFoodTimeout)
      const x = parseInt(Math.random() * this.numCells);
      const y = parseInt(Math.random() * this.numCells);
      this.setState({ food: [x, y] });
      this.moveFoodTimeout = setTimeout(this.moveFood, 5000)
    }
  
    setDirection({ keyCode }) {
      // if it's the same direction or simply reversing, ignore
      let changeDirection = true;
      [[38, 40], [37, 39]].forEach(dir => {
        if (dir.indexOf(this.state.direction) > -1 && dir.indexOf(keyCode) > -1) {
          changeDirection = false;
        }
      });
  
      if (changeDirection) this.setState({ direction: keyCode });
    }
  
    moveSnake() {
      const newSnake = [];
      // set in the new "head" of the snake
      switch (this.state.direction) {
          // down
        case 40:
          newSnake[0] = [this.state.snake[0][0], this.state.snake[0][1] + 1];
          break;
          // up
        case 38:
          newSnake[0] = [this.state.snake[0][0], this.state.snake[0][1] - 1];
          break;
          // right
        case 39:
          newSnake[0] = [this.state.snake[0][0] + 1, this.state.snake[0][1]];
          break;
          // left
        case 37:
          newSnake[0] = [this.state.snake[0][0] - 1, this.state.snake[0][1]];
          break;
                                  }
      // now shift each "body" segment to the previous segment's position
      [].push.apply(
        newSnake,
        this.state.snake.slice(1).map((s, i) => {
          // since we're starting from the second item in the list,
          // just use the index, which will refer to the previous item
          // in the original list
          return this.state.snake[i];
        })
      );
  
      this.setState({ snake: newSnake });
  
      this.checkIfAteFood(newSnake);
      if (!this.isValid(newSnake[0]) || !this.doesntOverlap(newSnake)) {
        // end the game
        this.endGame()
      } 
    }
  
    checkIfAteFood(newSnake) {
      if (!shallowEquals(newSnake[0], this.state.food)) return
        // snake gets longer
        let newSnakeSegment;
        const lastSegment = newSnake[newSnake.length - 1];
  
        // where should we position the new snake segment?
        // here are some potential positions, we can choose the best looking one
        let lastPositionOptions = [[-1, 0], [0, -1], [1, 0], [0, 1]];
        
        // the snake is moving along the y-axis, so try that instead
        if ( newSnake.length > 1 ) {
          lastPositionOptions[0] = arrayDiff(lastSegment, newSnake[newSnake.length - 2]);
        }
  
        for (var i = 0; i < lastPositionOptions.length; i++) {
          newSnakeSegment = [
            lastSegment[0] + lastPositionOptions[i][0],
            lastSegment[1] + lastPositionOptions[i][1]
          ];
          if (this.isValid(newSnakeSegment)) {
            break;
          }
        }
  
        this.setState({
          snake: newSnake.concat([newSnakeSegment]),
          food: []
        });
      this.moveFood();
    }
    
    // is the cell's position inside the grid?
    isValid(cell) {
      return (
        cell[0] > -1 &&
        cell[1] > -1 &&
        cell[0] < this.numCells &&
        cell[1] < this.numCells
      );
    }
  
    doesntOverlap(snake) {
      return (
        snake.slice(1).filter(c => {
          return shallowEquals(snake[0], c);
        }).length === 0
      );
    }
  
    startGame() {
      this.removeTimers();
      this.moveSnakeInterval = setInterval(this.moveSnake, 130);
      this.moveFood();
  
      this.setState({
        status: 1,
        snake: [[5, 5]],
        food: [10, 10]
      });
      //need to focus so keydown listener will work!
      this.el.focus();
    }
    
    endGame(){
      this.removeTimers();
      this.setState({
        status : 2
      })
    }
  
    removeTimers() {
      if (this.moveSnakeInterval) clearInterval(this.moveSnakeInterval);
      if (this.moveFoodTimeout) clearTimeout(this.moveFoodTimeout)
    }
  
    componentWillUnmount() {
      this.removeTimers();
    }
  
    render() {
      // each cell should be approximately 15px wide, so calculate how many we need
      this.numCells = Math.floor(this.props.size / 15);
      const cellSize = this.props.size / this.numCells;
      const cellIndexes = Array.from(Array(this.numCells).keys());
      const cells = cellIndexes.map(y => {
        return cellIndexes.map(x => {
          const foodCell = this.state.food[0] === x && this.state.food[1] === y;
          let snakeCell = this.state.snake.filter(c => c[0] === x && c[1] === y);
          snakeCell = snakeCell.length && snakeCell[0];
  
          return (
            <GridCell
              foodCell={foodCell}
              snakeCell={snakeCell}
              size={cellSize}
              key={x + " " + y}
              />
          );
        });
      });
  
      let overlay;
      if (this.state.status === 0) {
        overlay = (
          <SnakeAppOverlay>
            <Button onClick={this.startGame}>Start game!</Button>
          </SnakeAppOverlay>
        );
      } else if (this.state.status === 2) {
        overlay = (
          <SnakeAppOverlay>
            <MbOne><b>GAME OVER!</b></MbOne>
            <MbOne>Your score: {this.state.snake.length} </MbOne>
            <Button onClick={this.startGame}>Start a new game</Button>
          </SnakeAppOverlay>
        );
      }
      return (
        <SnakeApp
          onKeyDown={this.setDirection}
          style={{
            width: this.props.size + "px",
              height: this.props.size + "px"
          }}
          ref={el => (this.el = el)}
          tabIndex={-1}
          >
          {overlay}
          <Grid
            style={{
              width: this.props.size + "px",
                height: this.props.size + "px"
            }}
            >
            {cells}
          </Grid>
        </SnakeApp>
      );
    }
  }
  
export default Snake;