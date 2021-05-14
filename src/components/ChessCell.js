import React from 'react';
import {onHandlePawnFirstMove,
        onHandleRookFirstMove,
        onHandleKnightFirstMove,
        onHandleBishopFirstMove,
        onHandleQueenFirstMove,
        onHandleKingFirstMove
    } from './SelectBlack';
import {onHandlePawnSecondMove,
    onHandleRookSecondMove,
    onHandleKnightSecondMove,
    onHandleBishopSecondMove,
    onHandleQueenSecondMove,
    onHandleKingSecondMove
} from './SelectWhite';


class ChessCell extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            cell_name: props.cell_name ? props.cell_name : '',
            icon: props.icon ? props.icon : '',
            icon_name: props.icon_name ? props.icon_name : '',
            classStatus:props.classStatus ? props.classStatus : '',
            count:2,
            selected:true,
        }
    }
    componentDidMount () {
        // console.log('mounted');
        this.props.handlerCell(this.state);
        this.props.OnChangeHandler(this.props.cell_name,'');
    }
    componentDidUpdate(prevProps, prevState) {
        // if(prevState.selected != this.state.selected) {
        //     this.props.onHandlerCellUpdate('',this.state);
        // }
   }

    playerIncheck = () => {
        if(this.props.prevCell && this.props.selected[this.state.cell_name] == 'active') {
            console.log('hello');
            this.props.onHandlerCellUpdate(this.props.prevCell,this.state);
            this.setState({
                count:1
            });
        }   
    }

    checkMate = () => {
        const cells = this.props.cells;

        const objArray = [];

        const objectArray = Object.entries(cells);

        objectArray.forEach(([key, value]) => {
            objArray.push(value);
        });
        // console.log(objArray);
        let filteredCell = objArray.filter(e => e.icon_name == 'King').map(function (cell) {
            return cell;
        });
        console.log(filteredCell);
    }

    selectedPiece = (e) => {
        const cell_name = e.props.cell_name;
        
        this.setState({
            selected: !this.state.selected
        });

        const splitted_cell = cell_name.split("_");
        const rowIndex = parseInt(splitted_cell[3]);
        const colIndex = parseInt(splitted_cell[1]);
        switch(this.props.cells[this.state.cell_name].icon_name){
            case 'Pawn':
                    this.props.handlerMove(this.state);
                    if(this.state.classStatus == 'black') {
                        onHandlePawnFirstMove({rowIndex,colIndex,cell_name},e.props.OnChangeHandler,this.state,e.props.cells);
                    } else {
                        onHandlePawnSecondMove({rowIndex,colIndex,cell_name},e.props.OnChangeHandler,this.state,e.props.cells)
                    }
                    
                    this.setState({
                        selected:  !this.state.selected,
                    });
                    return true;
            case 'Rook':
                    this.props.handlerMove(this.state);
                    if(this.state.classStatus == 'black') {
                        onHandleRookFirstMove({rowIndex,colIndex,cell_name},e.props.OnChangeHandler,this.state,e.props.cells);
                    } else {
                        onHandleRookSecondMove({rowIndex,colIndex,cell_name},e.props.OnChangeHandler,this.state,e.props.cells);
                    }
                    this.setState({
                        selected:  !this.state.selected
                    });
                    return true;
            case 'Knight':
                    this.props.handlerMove(this.state);
                    if(this.state.classStatus == 'black') {
                        onHandleKnightFirstMove({rowIndex,colIndex,cell_name},e.props.OnChangeHandler,this.state,e.props.cells);
                    } else {
                        onHandleKnightSecondMove({rowIndex,colIndex,cell_name},e.props.OnChangeHandler,this.state,e.props.cells);}
                    this.setState({
                        selected:  !this.state.selected
                    });
                    return true;

            case 'Bishop':
                    this.props.handlerMove(this.state);
                    if(this.state.classStatus == 'black') {
                        onHandleBishopFirstMove({rowIndex,colIndex,cell_name},e.props.OnChangeHandler,this.state,e.props.cells);
                    } else {
                        onHandleBishopSecondMove({rowIndex,colIndex,cell_name},e.props.OnChangeHandler,this.state,e.props.cells);}
                    this.setState({
                        selected:  !this.state.selected
                    });
                    return true;
            case 'Queen':
                    this.props.handlerMove(this.state);
                    if(this.state.classStatus == 'black') {
                        onHandleQueenFirstMove({rowIndex,colIndex,cell_name},e.props.OnChangeHandler,this.state,e.props.cells);
                    } else {
                        onHandleQueenSecondMove({rowIndex,colIndex,cell_name},e.props.OnChangeHandler,this.state,e.props.cells);}
                    this.setState({
                        selected:  !this.state.selected
                    });
                    return true;
            case 'King':
                    this.props.handlerMove(this.state);
                    if(this.state.classStatus == 'black') {
                        onHandleKingFirstMove({rowIndex,colIndex,cell_name},e.props.OnChangeHandler,this.state,e.props.cells);
                    } else {
                        onHandleKingSecondMove({rowIndex,colIndex,cell_name},e.props.OnChangeHandler,this.state,e.props.cells);}
                    this.setState({
                        selected:  !this.state.selected
                    });
                    return true;

            default:
                if(this.props.prevCell && this.props.selected[this.state.cell_name] == 'active') {
                    this.props.onHandlerCellUpdate(this.props.prevCell,this.state);
                    this.setState({
                        count:1
                    });
                }

        }
    }
   
    checkBlackOrWhite = (e) => {
        if(this.props.countMove % 2 == 0 && this.state.classStatus == 'white') {
            this.props.OnChangeCountMove(this.props.countMove);
            this.selectedPiece(e);
        } else if(this.props.countMove % 2 != 0 && this.state.classStatus == 'black') {
            this.props.OnChangeCountMove(this.props.countMove);
            this.selectedPiece(e);
        } else {
            console.log('default');
            this.props.OnChangeCountMove(this.props.countMove);
            this.playerIncheck();
        }

    }

    render() {
        const icon = (this.props.cells[this.state.cell_name]) && (this.props.cells[this.state.cell_name]).icon,
        icon_name = (this.props.cells[this.state.cell_name]) && (this.props.cells[this.state.cell_name]).icon_name;
        return (
            <td className={this.props.selected[this.props.cell_name] == 'active' ? 'active': this.props.cell_name} key={this.state.cell_name} onClick={() => this.checkBlackOrWhite(this)} >
            {
                <span dangerouslySetInnerHTML={{__html: icon}}></span>
            }
            </td>
        );
    }
}

export default ChessCell;