
const onHandlePawnSecondMove =  (data,handler,state,cells) => {
    let prevPawnCell = data.cell_name;
    let selectedCell = [];
    let objArray = [];

     for(let i = 1; i <= state.count; i++) {
          
          selectedCell.push(checkIfExistCells(cells, data.cell_name,`cell_${data.colIndex}_row_${data.rowIndex - (i)}`));
     }

     const objectArray = Object.entries(cells);

     objectArray.forEach(([key, value]) => {
          objArray.push(value);
     });
     let filteredCell =  objArray.filter(e => e.cell_name == `cell_${data.colIndex - 1}_row_${data.rowIndex - 1}` ||
          e.cell_name == `cell_${data.colIndex + 1}_row_${data.rowIndex - 1}`);
     filteredCell = filteredCell.filter(e => e.icon != '').map(function (cell) {
          return cell.cell_name;
        });

     const destinationCellsPawn = [
          ...(selectedCell).filter(data => data != false),
          ...(filteredCell).filter(data => data != false)];
     handler(destinationCellsPawn, prevPawnCell);
    
}

const checkIfExistCells = (selectedData, currentCell, search) => {
     let index = Object.keys(selectedData).find(function(key, index) {
          if(key == search && currentCell != search){
              return key;
          }
        });

     const objArray = [];

     const objectArray = Object.entries(selectedData);

     objectArray.forEach(([key, value]) => {
          objArray.push(value);
     });
     let filteredCell =  objArray.filter(e => e.cell_name == index);
     filteredCell = filteredCell.filter(e => e.icon == '').map(function (cell) {
          return cell.cell_name;
     });

     return filteredCell != undefined && filteredCell;
}

const onHandleRookSecondMove = (data,handler,state,cells) => {
     let prevRookCell = data.cell_name;
     let selectedCell = {
          'left': [],
          'right': [],
          'above': [],
          'below':[]
     };
     for(let r = 0; r <= 8; r++) {
         selectedCell['left'].push(checkIfExistCells(cells, data.cell_name, `cell_${data.colIndex - (r)}_row_${data.rowIndex}`));
         selectedCell['right'].push(checkIfExistCells(cells, data.cell_name, `cell_${data.colIndex + (r)}_row_${data.rowIndex}`));
         selectedCell['above'].push(checkIfExistCells(cells, data.cell_name, `cell_${data.colIndex}_row_${data.rowIndex - (r)}`));
         selectedCell['below'].push(checkIfExistCells(cells, data.cell_name, `cell_${data.colIndex}_row_${data.rowIndex + (r)}`));
     }

     const destinationCellsRook = [...(selectedCell.left).filter(data => data != false),
                              ...(selectedCell.right).filter(data => data != false),
                              ...(selectedCell.above).filter(data => data != false),
                              ...(selectedCell.below).filter(data => data != false)];
                              
     handler(destinationCellsRook, prevRookCell);
}

const onHandleKnightSecondMove = (data,handler,state,cells) => {
     let row = data.rowIndex;
     let col = data.colIndex;
     let prevKnightCell = data.cell_name;
     let selectedKnightCell = [];
     let rowPositions = [row+2,row-2,row+1,row-1].filter((e) => ((e > 0) && (e<9)) );
     // .filter((e) => ((e > 0) && (e<9)) )
     let colPositions = [col+1,col-1,col+2,col-2].filter((e) => ((e > 0) && (e<9)) );
     for (let r = 0; r < rowPositions.length; r++) {
          for (let c = 0; c < colPositions.length; c++) {
               if (Math.abs(row - rowPositions[r]) + Math.abs(col - colPositions[c]) === 3) {
                    
                    selectedKnightCell.push(checkIfExistCells(cells,data.cell_name,`cell_${colPositions[c]}_row_${rowPositions[r]}`));
               }
          }
     }
     handler(selectedKnightCell, prevKnightCell);
 }

 const onHandleBishopSecondMove = (data,handler,state,cells) => {
     let rowBishop = data.rowIndex;
     let colBishop = data.colIndex;
     let prevBishopCell = data.cell_name;
     let selectedCell = {
          'left': [],
          'right': [],
          'above': [],
          'below':[]
     };
     for (let r = 0; r <= 7; r++) {
          // for (let c = 0; c <= 7; c++) {
               if (Math.abs(rowBishop - r) + Math.abs(colBishop - r) === colBishop) {
                    
                     selectedCell['left'].push(checkIfExistCells(cells, data.cell_name, 
                         `cell_${Math.abs(colBishop - r)}_row_${Math.abs(rowBishop - r)}`)
                    );
               }
                    
                     selectedCell['right'].push(
                         checkIfExistCells(cells, data.cell_name, 
                         `cell_${Math.abs(colBishop - r)}_row_${Math.abs(rowBishop + r)}`)
                    );
                    
                     selectedCell['above'].push(
                         checkIfExistCells(cells, data.cell_name, 
                              `cell_${Math.abs(colBishop - r)}_row_${Math.abs(rowBishop + r)}`)
                    );
                    
                     selectedCell['below'].push(
                         checkIfExistCells(cells, data.cell_name, 
                         `cell_${Math.abs(colBishop + r)}_row_${Math.abs(rowBishop + r)}`)
                    );
     }
     
     const destinationCellsBishop = [...(selectedCell.left).filter(data => data != false),
          ...(selectedCell.right).filter(data => data != false),
          ...(selectedCell.above).filter(data => data != false),
          ...(selectedCell.below).filter(data => data != false)];
     handler(destinationCellsBishop, prevBishopCell);
 }

 const onHandleQueenSecondMove = (data,handler,state,cells) => {
     let prevQueenCell = data.cell_name;
     let selectedCell = {
          'left': [],
          'right': [],
          'above': [],
          'below':[],
          'd1':[],
          'd2':[],
          'd3':[],
          'd4':[],
     };
     for(let r = 0; r <= 8; r++) {
         selectedCell['left'].push(checkIfExistCells(cells, data.cell_name, `cell_${data.colIndex - (r)}_row_${data.rowIndex}`));
         selectedCell['right'].push(checkIfExistCells(cells, data.cell_name, `cell_${data.colIndex + (r)}_row_${data.rowIndex}`));
         selectedCell['above'].push(checkIfExistCells(cells, data.cell_name, `cell_${data.colIndex}_row_${data.rowIndex - (r)}`));
         selectedCell['below'].push(checkIfExistCells(cells, data.cell_name, `cell_${data.colIndex}_row_${data.rowIndex + (r)}`));
         if (Math.abs(data.rowIndex - r) + Math.abs(data.colIndex - r) === data.colIndex) {
                    
          selectedCell['d1'].push(checkIfExistCells(cells, data.cell_name, 
              `cell_${Math.abs(data.colIndex - r)}_row_${Math.abs(data.rowIndex - r)}`)
         );
    }
         
          selectedCell['d2'].push(
              checkIfExistCells(cells, data.cell_name, 
              `cell_${Math.abs(data.colIndex - r)}_row_${Math.abs(data.rowIndex + r)}`)
         );
         
          selectedCell['d3'].push(
              checkIfExistCells(cells, data.cell_name, 
                   `cell_${Math.abs(data.colIndex - r)}_row_${Math.abs(data.rowIndex + r)}`)
         );
         
          selectedCell['d4'].push(
              checkIfExistCells(cells, data.cell_name, 
              `cell_${Math.abs(data.colIndex + r)}_row_${Math.abs(data.rowIndex + r)}`)
         );
     }

     const destinationCellsQueen = [...(selectedCell.left).filter(data => data != false),
                              ...(selectedCell.right).filter(data => data != false),
                              ...(selectedCell.above).filter(data => data != false),
                              ...(selectedCell.below).filter(data => data != false),
                              ...(selectedCell.d1).filter(data => data != false),
                              ...(selectedCell.d2).filter(data => data != false),
                              ...(selectedCell.d3).filter(data => data != false),
                              ...(selectedCell.d4).filter(data => data != false)];
                              
     handler(destinationCellsQueen, prevQueenCell);
}


const onHandleKingSecondMove = (data,handler,state,cells) => {
     let prevQueenCell = data.cell_name;
     let selectedCell = {
          'left': [],
          'right': [],
          'above': [],
          'below':[],
          'd1':[],
          'd2':[],
          'd3':[],
          'd4':[],
     };
     let r = 1;
         selectedCell['left'].push(checkIfExistCells(cells, data.cell_name, `cell_${data.colIndex - (r)}_row_${data.rowIndex}`));
         selectedCell['right'].push(checkIfExistCells(cells, data.cell_name, `cell_${data.colIndex + (r)}_row_${data.rowIndex}`));
         selectedCell['above'].push(checkIfExistCells(cells, data.cell_name, `cell_${data.colIndex}_row_${data.rowIndex - (r)}`));
         selectedCell['below'].push(checkIfExistCells(cells, data.cell_name, `cell_${data.colIndex}_row_${data.rowIndex + (r)}`));
         if (Math.abs(data.rowIndex - r) + Math.abs(data.colIndex - r) === data.colIndex) {
                    
          selectedCell['d1'].push(checkIfExistCells(cells, data.cell_name, 
              `cell_${Math.abs(data.colIndex - r)}_row_${Math.abs(data.rowIndex - r)}`)
         );
    }
         
          selectedCell['d2'].push(
              checkIfExistCells(cells, data.cell_name, 
              `cell_${Math.abs(data.colIndex - r)}_row_${Math.abs(data.rowIndex + r)}`)
         );
         
          selectedCell['d3'].push(
              checkIfExistCells(cells, data.cell_name, 
                   `cell_${Math.abs(data.colIndex - r)}_row_${Math.abs(data.rowIndex + r)}`)
         );
         
          selectedCell['d4'].push(
              checkIfExistCells(cells, data.cell_name, 
              `cell_${Math.abs(data.colIndex + r)}_row_${Math.abs(data.rowIndex + r)}`)
         );

     const destinationCellsQueen = [...(selectedCell.left).filter(data => data != false),
                              ...(selectedCell.right).filter(data => data != false),
                              ...(selectedCell.above).filter(data => data != false),
                              ...(selectedCell.below).filter(data => data != false),
                              ...(selectedCell.d1).filter(data => data != false),
                              ...(selectedCell.d2).filter(data => data != false),
                              ...(selectedCell.d3).filter(data => data != false),
                              ...(selectedCell.d4).filter(data => data != false)];
                              
     handler(destinationCellsQueen, prevQueenCell);
}
export {
     onHandlePawnSecondMove,
     onHandleRookSecondMove,
     onHandleKnightSecondMove,
     onHandleBishopSecondMove,
     onHandleQueenSecondMove,
     onHandleKingSecondMove
     };