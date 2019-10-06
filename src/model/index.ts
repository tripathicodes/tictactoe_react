import { List,Set } from "immutable";

export interface BoardProps {
  boardConfig: List<string>;
  currentSymbol: string;
  selectCell: (row: number, column: number, symbol: string) => void;
  victoryPattern:Set<number>;
  isXTurn: boolean;
  reset:()=>void;
  isGameOver:boolean
}

const initialBoardConfig: List<string> = List.of(
  "","","","","","","","",""
);

export class State {
  boardConfig: List<string> = initialBoardConfig;
  currentSymbol: string = "O";
  victoryPattern: Set<number> = Set.of()
  getCharAt:(row:number,char:number)=>string = (row:number,column:number)=> this.boardConfig.get(row*3+column) || "_"
}

export class Action {
    payload:any
}
