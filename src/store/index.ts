import {
  createStore,
  applyMiddleware,
  Reducer,
  AnyAction as ReduxAction
} from "redux";
import { logger } from "redux-logger";
import { State, Action } from "../model";
import { Set } from "immutable";

const getIndex = (r: number, c: number) => r * 3 + c;
const reducer: Reducer<State, ReduxAction> = (
  state: State = new State(),
  action: ReduxAction
) => {
  switch (action.type) {
    case "SELECT_CELL": {
      const { rowNumber, columnNumber, symbol } = action.payload;
      const targetIndex = getIndex(rowNumber, columnNumber);
      const boardConfig = state.boardConfig.set(targetIndex, symbol);
      let currentSymbol = state.currentSymbol;
      currentSymbol = currentSymbol === "X" ? "O" : "X";
      return { ...state, boardConfig, currentSymbol };
    }
    case "RESET": {
        return new State();
    }
  }

  return state;
};

const checkVictoryDecorator = (
  reducer: Reducer<State, ReduxAction>
): Reducer<State, ReduxAction> => {
  const result: Reducer<State, ReduxAction> = (
    state: State = new State(),
    action: ReduxAction
  ) => {
    const stateAfterReduction = reducer(state, action);
    const newBoardConfig = stateAfterReduction.boardConfig;
    if (state.boardConfig !== newBoardConfig) {
      for (let rowNum = 0; rowNum < 3; rowNum++) {
        for (let colNum = 0; colNum < 3; colNum++) {
          if (rowNum === 0 || colNum === 0) {
            const firstBoxIndex = getIndex(rowNum, colNum);
            const firstBoxChar = newBoardConfig.get(firstBoxIndex);
            if (firstBoxChar !== "X" && firstBoxChar !== "O") {
              continue;
            }
            for (let horizontal = -1; horizontal <= 1; horizontal++) {
              for (let vertical = -1; vertical <= 1; vertical++) {
                if (!(horizontal || vertical)) {
                  continue;
                }
                const secondRow = rowNum + vertical;
                const thirdRow = secondRow + vertical;
                const secondColumn = colNum + horizontal;
                const thirdColumn = secondColumn + horizontal;
                const isValid = inRange(0, 2);
                if (
                  !(
                    isValid(secondRow) &&
                    isValid(thirdRow) &&
                    isValid(secondColumn) &&
                    isValid(thirdColumn)
                  )
                ) {
                  continue;
                }
                const secondBoxIndex = getIndex(
                  secondRow,
                  secondColumn
                );
                const thirdBoxIndex = getIndex(
                  thirdRow,
                  thirdColumn
                );
                const secondBoxChar = newBoardConfig.get(secondBoxIndex);
                const thirdBoxChar = newBoardConfig.get(thirdBoxIndex);
                if (
                  firstBoxChar === secondBoxChar &&
                  secondBoxChar === thirdBoxChar
                ) {
                  console.log("found ", rowNum, colNum, vertical, horizontal);
                  const victoryPattern = Set.of(
                    firstBoxIndex,
                    secondBoxIndex,
                    thirdBoxIndex
                  );
                  return { ...stateAfterReduction, victoryPattern };
                }
              }
            }
          }
        }
      }
    }
    return stateAfterReduction;
  };
  return result;
};

const inRange = (lowerLimit: number, upperLimit: number) => (x: number) =>
  (x - lowerLimit) * (x - upperLimit) <= 0;

const store = createStore(
  checkVictoryDecorator(reducer),
  applyMiddleware(logger)
);

export default store;
