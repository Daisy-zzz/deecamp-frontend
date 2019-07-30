import React from 'react';
//import './App.css';
import { Table, Input, Button, Popconfirm, Form, } from 'antd';
//import ReactDOM from 'react-dom';
import './Csv2Table.css';
import data from './Data.js';

const EditableContext = React.createContext();//上下文(Context) 提供了一种通过组件树传递数据的方法，无需在每个级别手动传递 props 属性。
const { Search } = Input;

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: false,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '就诊号',
                dataIndex: 'id',
                width: '10%',
                //editable: true,
            },
            {
                title: '姓名',
                dataIndex: 'name',
                width: '8%',
                //editable: false,
            },
            {
                title: '性别',
                width: '6%',
                dataIndex: 'gender',
            },
            {
                title: '年龄',
                width: '6%',
                dataIndex: 'age',
            },
            {
                title: '科室',
                width: '10%',
                dataIndex: 'department',
            },
            {
                title: '手术名称',
                width: '20%',
                dataIndex: 'operatingName',
            },
            {
                title: '主刀医生',
                width: '10%',
                dataIndex: 'doctorName',
            },
            {
                title: '预测手术时长（min）',
                dataIndex: 'predTime',
                width: '10%',
                editable: true,
            },
            {
                title: '手术室号',
                dataIndex: 'orId',
                width: '8%',
                editable: true,
            },
            {
                title: '开始时间',
                dataIndex: 'startTime',
                width: '10%',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                    ) : null,
            },
        ];

        this.state = {
            // dataSource: [
            //     {
            //         "id": "1",
            //         "name": "张三",
            //         "gender": "男",
            //         "age": "70",
            //         "department": "心血管科",
            //         "operatingName": "心脏搭桥手术",
            //         "doctorName": "李四",
            //         "predTime": "120",
            //         "orId": "3",
            //         "startTime": "8:00"
            //     },
            //     {
            //         key: '1',
            //         "id": "2",
            //         "name": "王二",
            //         "gender": "女",
            //         "age": "23",
            //         "department": "妇产科",
            //         "operatingName": "剖腹产手术",
            //         "doctorName": "王小二",
            //         "predTime": "100",
            //         "orId": "5",
            //         "startTime": "15:00"
            //     },
            // ],
            dataSource : data,
            count: 2,
        };
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <div>
                    <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                        Add a row
                    </Button>
                    <Search
                        className="search"
                        placeholder="搜索患者信息"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }} />
                </div>

                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}

//ReactDOM.render(<EditableTable />, document.getElementById('root'));
export default EditableTable;