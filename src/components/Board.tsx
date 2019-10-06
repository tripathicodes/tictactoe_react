import React, { PropsWithChildren } from "react";
import Cell from "./Cell";
import { BoardProps, State } from "../model";
import { connect } from "react-redux";

const Board: React.FC<BoardProps> = (props: PropsWithChildren<BoardProps>) => {
  const getNRows = (n: number) => {
    const result = [];
    for (let r = 0; r < n; r++) {
      result.push(
        <div className="Row" key={r}>
          {getNColumns(n, r)}
        </div>
      );
    }
    return result;
  };

  const getNColumns = (n: number, rowNumber: number) => {
    const result = [];
    for (let columnNumber = 0; columnNumber < n; columnNumber++) {
      const onClick = ()=> !props.isGameOver && props.selectCell(rowNumber,columnNumber,props.currentSymbol);
      const index = rowNumber*3+columnNumber;
      const cell = (
        <Cell
          text={props.boardConfig.get(index)}
          key={`${rowNumber}_${columnNumber}`}
          lightUp={props.victoryPattern.has(index)}
          onClick={onClick}
        ></Cell>
      );

      result.push(cell);
    }
    return result;
  };

  return (
    <div className="container">
      <div className="Board">
        <>{getNRows(3)}</>
      </div>
      <div className="Row Top-separation">
        <Cell text={"X"} lightUp={props.isXTurn}></Cell>
        <Cell text={"O"} lightUp={!props.isXTurn}></Cell>
      </div>
      <div className="Row Top-separation Clickable">
        <span onClick={props.reset}>RESET</span>
      </div>
      
    </div>
  );
};

const getStateFromProps = (allState: State): any => ({
  boardConfig: allState.boardConfig,
  currentSymbol: allState.currentSymbol,
  victoryPattern: allState.victoryPattern,
  isXTurn: allState.currentSymbol === 'X',
  isGameOver: !allState.victoryPattern.isEmpty()
});

const selectCell = (dispatch: (action: any) => void) => (
  rowNumber: number,
  columnNumber: number,
  symbol: string
) => dispatch({ type: "SELECT_CELL" , payload : {rowNumber,columnNumber,symbol} });

const reset = (dispatch:(action:any)=>void) =>() => dispatch({type:"RESET"})

const getDispatchFromProps = (dispatch: () => void): any => ({
  selectCell: selectCell(dispatch),
  reset: reset(dispatch)
});

export default connect(
  getStateFromProps,
  getDispatchFromProps
)(Board);
