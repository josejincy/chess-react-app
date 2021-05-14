import React from 'react';
import TableData from '../db/TableData';
import ChessIcons from '../db/ChessIcon';
import 'font-awesome/css/font-awesome.min.css';
import ChessCell from './ChessCell';

class TableBody extends React.Component {
    constructor(props) {
        super(props);
        this.OnChangeHandler = this.OnChangeHandler.bind(this);
        this.handlerMove = this.handlerMove.bind(this);
        this.onChangeInCell = this.onChangeInCell.bind(this);
        this.onHandlerCellUpdate = this.onHandlerCellUpdate.bind(this);
        this.handleCountMove = this.handleCountMove.bind(this);
    }
    OnChangeHandler (cell,prevCell) {
        this.props.handler(cell,prevCell);
    }
    handleCountMove (count) {
        this.props.OnChangeCountMove(count);
    }
    handlerMove (cell) {
        this.props.handlerMove(cell);
    }
    onChangeInCell (cell) {
        this.props.handlerCell(cell);
    }
    onHandlerCellUpdate (prevCell,selectedCell) {
        this.props.handlerCellUpdate(prevCell,selectedCell);
    }
  
    buildRow = (data,data_index) => {
        
        const {id, Name} = data;
        let icons = [];
        const row = data_index+1;
        icons =  ChessIcons.filter((data) => (data.row == row));
        const cells = [];

        for(let i=0; i<=7; i++) {
            const icon = icons.length > 0 ? icons.find((icon,index) => icon.cell == i+1 ) : '';
            cells.push({
                'id':i+1,
                'cell_name': `cell_${i}_row_${data_index}`,
                'icon': icon && icon.icon,
                'icon_name': icon && icon.name,
                'classStatus': icon && icon.class
            });
        }

      return ( 
        cells.map((cell, index) => {
            const {id, cell_name,icon,icon_name,classStatus} = cell;
               return <ChessCell 
                selected={this.props.selected}
                cells={this.props.cells} 
                prevCell={this.props.prevCell} 
                handlerCell={this.onChangeInCell} 
                handlerMove={this.handlerMove} 
                OnChangeHandler={this.OnChangeHandler}
                onHandlerCellUpdate={this.onHandlerCellUpdate} 
                key={index} 
                cell_name={cell_name} 
                icon={icon} 
                icon_name={icon_name}
                classStatus={classStatus}
                countMove={this.props.countMove}
                OnChangeCountMove={this.handleCountMove} />
            })
       );
    };
  
    render() {
        return (
            <tbody>
            { TableData && TableData.map((data,data_index) => {
                    return <tr key={data_index}>
                    {this.buildRow(data,data_index)}
                    </tr>
                })}
          </tbody>
        );
    }
  }

  export default TableBody;