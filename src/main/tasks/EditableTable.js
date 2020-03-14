import React from "react";
import "./EditableTable.css";
import "../syndrome.css";
import ContentEditable from "react-contenteditable";

class EditableTable extends React.Component {

    initialState = {
        taskList: [
            { id: 0, name: "clean my room", est: 30, category: "school" },
            { id: 1, name: "wash my hair", est: 60, category: "work" },
            { id: 2, name: "read my book", est: 120, category: "personal" },
        ],
        row: {
            name: '',
            est: '',
            category: '',
        },
        currPosition: 0,
    }

    state = this.initialState;
    nextEdit = React.createRef();

    addRow = () => {
        const { taskList, row } = this.state
        const fixedInput = {
            ...row,
            name: this.fixSpecialChars(row.name),
            category: this.fixSpecialChars(row.category),
            id: taskList.length
        }

        this.setState({
            taskList: [...taskList, fixedInput],
            row: this.initialState.row,
        })

        this.nextEdit.current.focus()

    }

    disableEnterButton = event => {
        const key = event.keyCode || event.which;

        if (key === 13) {
            event.returnValue = false;
            if (event.preventDefault) event.preventDefault();
        }
    }

    checkNumberInput = event => {
        const key = event.keyCode || event.which;
        const string = String.fromCharCode(key);
        const regex = /[0-9,]|\./;

        if (!regex.test(string)) {
            event.returnValue = false;
            if (event.preventDefault) event.preventDefault();
        }
    }

    deleteRow = id => {
        this.setState(({ taskList }) => ({
            taskList: taskList.filter(item => id !== item.id)
        }))
    }

    handleEditableRow = event => {
        const { row } = this.state;
        const { currentTarget: { dataset: { column }, }, target: { value },
        } = event;

        this.setState({ row: { ...row, [column]: value } });
        
    }

    handleUpdateRow = event => {
        const { taskList } = this.state;
        const { currentTarget: { dataset: { row, column } }, target: { value },
        } = event;

        let updatedRow = taskList.filter((item, i) => parseInt(i) === parseInt(row))[0]
        updatedRow[column] = value;

        this.setState({ 
            taskList: taskList.map((item, i) => (item[column] === row ? updatedRow : item))
        })
    }

    fixPasteIssues = event => {
        event.preventDefault();

        const text = event.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
    }

    fixSpecialChars = string => {
        return string.replace(/&nbsp;/g, "").replace(/&amp;/g, "&").replace(/&gt;/g, ">")
            .replace(/&lt;/g, "<");
    }

    focusOnEntireElement = () => {
         this.nextEdit.current.scrollIntoView({ behavior: "smooth", block: "start" })
        setTimeout(() => {
            document.execCommand("selectAll", false, null)
        }, 0)

       
    }

    

    render() {
        const { taskList, row: { name, category, est } } = this.state;
        return (
            <div className="task-dump">
                <h2>Task Dump!</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Est. Minutes</th>
                            <th>Category</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskList.map((row, i) => {
                            return (
                                <tr key={row.id}>
                                    <td className="narrow-cell">
                                        <ContentEditable
                                            html={row.name}
                                            data-column="name"
                                            data-row={i}
                                            className="content-editable"
                                            onChange={this.handleUpdateRow}
                                            onPaste={this.fixPasteIssues}
                                            onKeyPress={this.disableEnterButton}
                                            onFocus={this.focusOnEntireElement} /></td>
                                    <td className="narrow-cell">
                                        <ContentEditable
                                            html={row.est.toString()}
                                            data-column="est"
                                            data-row={i}
                                            className="content-editable"
                                            onChange={this.handleUpdateRow}
                                            onPaste={this.fixPasteIssues}
                                            onKeyPress={this.disableEnterButton}
                                            onFocus={this.focusOnEntireElement} /></td>
                                    <td className="narrow-cell">
                                        <ContentEditable
                                            html={row.category}
                                            data-column="category"
                                            data-row={i}
                                            className="content-editable"
                                            onChange={this.handleUpdateRow}
                                            onPaste={this.fixPasteIssues}
                                            onKeyPress={this.disableEnterButton}
                                            onFocus={this.focusOnEntireElement} /></td>
                                    <td className="narrow-cell">
                                        <button onClick={() => { this.deleteRow(row.id) }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td className="narrow-cell">
                                <ContentEditable
                                    html={name}
                                    data-column="name"
                                    className="content-editable"
                                    onChange={this.handleEditableRow}
                                    onPaste={this.fixPasteIssues}
                                    onKeyPress={this.disableEnterButton}
                                    onFocus={this.focusOnEntireElement}
                                    innerRef={this.nextEdit}
                                />
                            </td>
                            <td className="narrow-cell">
                                <ContentEditable
                                    html={est}
                                    data-column="est"
                                    className="content-editable"
                                    onChange={this.handleEditableRow}
                                    onPaste={this.fixPasteIssues}
                                    onKeyPress={this.disableEnterButton, this.checkNumberInput}
                                    onFocus={this.focusOnEntireElement}
                                />
                            </td>
                            <td className="narrow-cell">
                                <ContentEditable
                                    html={category}
                                    data-column="category"
                                    className="content-editable"
                                    onChange={this.handleEditableRow}
                                    onPaste={this.fixPasteIssues}
                                    onKeyPress={this.disableEnterButton}
                                    onFocus={this.focusOnEntireElement}
                                />
                            </td>
                            <td className="narrow-cell">
                                <button onClick={this.addRow} className="yellow-button"
                                    disabled={!name || !est }>Add Task</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EditableTable;