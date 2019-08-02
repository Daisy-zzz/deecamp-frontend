import React from 'react';
//import './App.css';
import { Table, Input, Button, Popconfirm, Form, Icon, notification} from 'antd';
import Highlighter from 'react-highlight-words';
//import ReactDOM from 'react-dom';
import './Csv2Table.css';
import data from './Data.js';
import API from './utils/api.js';
import Headers from './utils/headers.js';

const EditableContext = React.createContext();//上下文(Context) 提供了一种通过组件树传递数据的方法，无需在每个级别手动传递 props 属性。
//const { Search } = Input;

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
    handleClick = () => {
        console.log(this.state.dataSource);
        notification.open({
            message: '提交成功！',
            description:
                '患者信息已经成功上传，正在生成调度表。',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
        fetch(API + '/table', Headers(this.state.dataSource)).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(function (json){
            console.log(json);
        });
    };
    // state = {
    //     searchText: '',
    // };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '就诊号',
                dataIndex: 'id',
                width: '10%',
                //editable: true,
                ...this.getColumnSearchProps('id'),
            },
            {
                title: '姓名',
                dataIndex: 'name',
                width: '8%',
                //editable: false,
                ...this.getColumnSearchProps('name'),

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
                sorter: (a, b) => a.department.localeCompare(b.department,"zh"),
                ...this.getColumnSearchProps('department'),
            },
            {
                title: '手术名称',
                width: '20%',
                dataIndex: 'operatingName',
                ...this.getColumnSearchProps('operatingName'),
            },
            {
                title: '主刀医生',
                width: '10%',
                dataIndex: 'doctorName',
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.doctorName.localeCompare(b.doctorName,"zh"),
                ...this.getColumnSearchProps('doctorName'),
            },
            {
                title: '手术时长（分钟）',
                dataIndex: 'predTime',
                width: '10%',
                editable: true,
                defaultSortOrder: 'descend',
                sorter: (a, b) => a.predTime - b.predTime,
            },
            {
                title: '手术室号',
                dataIndex: 'orId',
                width: '8%',
                editable: true,
                initialValue: 0
            },
            {
                title: '开始时间',
                dataIndex: 'startTime',
                width: '10%',
                editable: true,
                initialValue: 0
            },
            // {
            //     title: '操作',
            //     dataIndex: 'operation',
            //     render: (text, record) =>
            //         this.state.dataSource.length >= 1 ? (
            //             <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
            //                 <a href="javascript:;">删除</a>
            //             </Popconfirm>
            //         ) : null,
            // },
        ];

        this.state = {
            searchText: '',
            dataSource : data,
        };
    }

    // handleDelete = key => {
    //     const dataSource = [...this.state.dataSource];
    //     this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    // };
    //
    // handleAdd = () => {
    //     const { count, dataSource } = this.state;
    //     const newData = {
    //         key: count,
    //         name: `Edward King ${count}`,
    //         age: 32,
    //         address: `London, Park Lane no. ${count}`,
    //     };
    //     this.setState({
    //         dataSource: [...dataSource, newData],
    //         count: count + 1,
    //     });
    // };

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
                    <p className="wordFont">患者信息表（可修改预测手术时长，手术室号，开始时间）</p>
                    {/*<Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>*/}
                        {/*Add a row*/}
                    {/*</Button>*/}
                    {/*<Search*/}
                        {/*className="search"*/}
                        {/*placeholder="搜索患者信息"*/}
                        {/*onSearch={value => console.log(value)}*/}
                        {/*style={{ width: 200 }} />*/}
                </div>

                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
                <div>
                    <Button onClick={this.handleClick} type="primary" style={{ marginBottom: 16 }} className="submit"> 提交 </Button>
                </div>
            </div>

        );
    }
}

//ReactDOM.render(<EditableTable />, document.getElementById('root'));
export default EditableTable;