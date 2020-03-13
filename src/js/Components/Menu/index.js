import React from 'react';
import {connect} from "react-redux";

class Menu extends React.Component{
    constructor(props){
        super(props);

        this.deleteItems = this.deleteItems.bind(this);
    }

    render() {

        return (
            <div className="d-flex justify-content-center">
                <div className="d-flex col-sm-9 justify-content-between">
                    <div className='menu-item w-100 border p-1 text-center'>Создать файл</div>

                    <div
                        className="menu-item w-100 border p-1 text-center {this.props.selectedFiles.length ? '' : 'text-muted'}"
                        onClick={this.deleteItems}>
                            Удалить
                    </div>

                    <div
                        className="menu-item w-100 border p-1 text-center {this.props.selectedFiles.length === 1 ? '' : 'text-muted'}">
                            Переименовать
                    </div>

                    <div
                        className="menu-item w-100 border p-1 text-center {this.props.selectedFiles.length ? '' : 'text-muted'}">
                            Переместить
                    </div>
                </div>
            </div>
        );
    }

    async deleteItems(){
        let res = await fetch('http://explorer/dist/php/delete.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors',
            body: 'paths=' + JSON.stringify(this.props.selectedFiles)
        });

        console.log(await res.text());
    }
}

const stateToProps = (state) => ({
   selectedFiles: state.select.selectedFiles
});

export default connect(stateToProps, null)(Menu);