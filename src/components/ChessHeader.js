import React from 'react';
import TableBody from './ChessTable';
import '../styles/components/ChessHeader.scss';

class ChessHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: [],
            movePossible:{
                icon: '',
                icon_name: '',
                cell_name: ''
            },
            cells:[],
            previousCell:'',
            currentCell:'',
            activeCells:'',
            countMove: 0,
        }
        this.onChangeInSelectedHandler = this.onChangeInSelectedHandler.bind(this);
        this.onChangeInMovePossibleHandler = this.onChangeInMovePossibleHandler.bind(this);
        this.onChangeInCells = this.onChangeInCells.bind(this);
        this.onUpdateInCells = this.onUpdateInCells.bind(this);
        this.OnChangeCountMove = this.OnChangeCountMove.bind(this);
    }
    componentDidUpdate(prevProps,prevState) {
        // console.log(this.state.cells);
    }
    componentDidMount() {
        // console.log(this.state);
    }
    onUpdateInCells(prevCell,selectedCell) {
        if(prevCell){
            this.state.cells[prevCell.cell_name].icon = '';
            this.state.cells[prevCell.cell_name].icon_name = '';
            this.state.cells[prevCell.cell_name].classStatus = '';
            this.state.cells[selectedCell.cell_name].icon = prevCell.icon;
            this.state.cells[selectedCell.cell_name].icon_name = prevCell.icon_name;
            this.state.cells[selectedCell.cell_name].classStatus = prevCell.classStatus;
        }
        console.log(this.state.cells[selectedCell.cell_name].icon_name);

        this.state.cells[selectedCell.cell_name].selected = !this.state.cells[selectedCell.cell_name].selected

        var selectedData = this.state.selected;
        let indexes = selectedData.map((elm, idx) => elm == 'active' ? idx : '').filter(String);

        for (const cell of this.state.activeCells) {
                
            this.state.selected[cell] = this.state.selected[cell] == 'active' ? 'default' : 'active';
        }

        this.setState({
            cells : this.state.cells,
            selected : this.state.selected,
            activeCells : ''
        });
    }
    onChangeInCells(cell) {
        const data = this.state.cells;
        data.push({cell});
        const result = Object.assign(...data.map((getCell) => ({[getCell.cell.cell_name]: getCell.cell})));
        this.setState({
            cells: result
        });
    }
    onChangeInSelectedHandler (cell_name,currentCell) {
        if(typeof(cell_name) != 'string' ) {
            if(this.state.currentCell != currentCell && this.state.currentCell != ''){
                let item = this.state.selected;
               let ObjSelected =  Object.keys(item).forEach(function(key) {
                if (item[key] == 'active') {
                  item[key] = 'default';
                }
              });
            }
            for (const cell of cell_name) {
                
                this.state.selected[cell] = this.state.selected[cell] == 'active' ? 'default' : 'active';
            }
            this.setState({
                selected : this.state.selected,
                previousCell: this.state.currentCell,
                currentCell:currentCell,
                activeCells: cell_name
            });
        
        }
        else {
            this.state.selected[cell_name] = 'default';
            this.setState({
                selected : this.state.selected
            });
        }
    }

    onChangeInMovePossibleHandler (prevCell) {
        this.setState({
            movePossible : {
                icon: prevCell && prevCell.icon,
                icon_name: prevCell && prevCell.icon_name,
                cell_name: prevCell && prevCell.cell_name,
                classStatus: prevCell && prevCell.classStatus
            }
        });
    }
    OnChangeCountMove (count) {
        this.setState({
            countMove: count + 1
        });
    }

    render() {
        return (
            <div>
            <h1> Let's Start Our Game </h1>
            <table className="tbl-border">
            <TableBody 
                selected={this.state.selected}
                prevCell={this.state.movePossible}
                cells={this.state.cells}
                countMove={this.state.countMove}
                activeCells={this.state.activeCells}
                handlerCellUpdate={this.onUpdateInCells}
                handlerCell={this.onChangeInCells} 
                handler={this.onChangeInSelectedHandler}
                handlerMove={this.onChangeInMovePossibleHandler}
                OnChangeCountMove={this.OnChangeCountMove} />
            </table>
            </div>
        )
    }
}

export default ChessHeader;